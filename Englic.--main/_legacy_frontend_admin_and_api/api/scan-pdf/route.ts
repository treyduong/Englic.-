import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/genai';
import fs from 'fs';
import path from 'path';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Determine MIME type
    const mimeType = file.type || 'application/pdf';
    let base64Data = buffer.toString('base64');

    console.log('📤 Sending to Gemini API:', {
      fileName: file.name,
      fileSize: file.size,
      mimeType,
    });

    // Initialize Gemini and send request
    const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' });

    const response = await model.generateContent([
      {
        inlineData: {
          data: base64Data,
          mimeType: mimeType,
        },
      },
      {
        text: `Analyze this exam image/document and extract all questions with options.

Return ONLY valid JSON in this format:
{
  "title": "Exam title or document name",
  "questions": [
    {
      "id": "1",
      "text": "Question text",
      "options": ["A. Option text", "B. Option text", "C. Option text", "D. Option text"],
      "correctAnswer": "",
      "explanation": ""
    }
  ]
}

IMPORTANT:
- Extract ALL questions visible in the image
- Each question MUST have exactly 4 options (A, B, C, D)
- Question text should be clear and complete
- If you cannot find questions, return empty array
- Must return ONLY JSON, no other text`,
      },
    ]);

    const responseText = response.response.text();
    console.log('📥 Gemini Response:', responseText.substring(0, 500));

    // Parse JSON response
    let parsedData;
    try {
      // Extract JSON from response (might have extra text)
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }
      parsedData = JSON.parse(jsonMatch[0]);
    } catch (parseError) {
      console.error('❌ JSON Parse Error:', parseError);
      throw new Error(
        `Gemini AI không thể phân tích hình ảnh. Vui lòng thử lại với ảnh rõ ràng hơn.`
      );
    }

    // Build exam structure from parsed data
    const examStructure = {
      title: parsedData.title || `Exam from ${file.name}`,
      timeLimit: 3600,
      category: 'Tiếng Anh',
      parts: [
        {
          id: 'part1',
          title: 'Bài thi',
          passage: null,
          questions: (parsedData.questions || []).map((q: any, idx: number) => ({
            id: String(idx + 1),
            text: q.text || `Question ${idx + 1}`,
            options: q.options || [
              'A. Option 1',
              'B. Option 2',
              'C. Option 3',
              'D. Option 4',
            ],
            correctAnswer: q.correctAnswer || '',
            explanation: q.explanation || '',
          })),
        },
      ],
    };

    console.log('✅ Exam Structure:', {
      title: examStructure.title,
      questions: examStructure.parts[0].questions.length,
    });

    return NextResponse.json({
      exam: examStructure,
      message: 'PDF scanned successfully',
    });
  } catch (error) {
    console.error('❌ Error scanning PDF:', error);
    const errorMsg =
      error instanceof Error
        ? error.message
        : 'Failed to scan PDF with AI';
    return NextResponse.json(
      { error: errorMsg },
      { status: 500 }
    );
  }
}
