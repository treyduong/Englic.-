import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const examsDir = path.join(process.cwd(), 'public/exams');

export async function POST(req: NextRequest) {
  try {
    const { title, category, timeLimit } = await req.json();

    if (!title || !timeLimit) {
      return NextResponse.json(
        { error: 'Title and timeLimit are required' },
        { status: 400 }
      );
    }

    // Ensure exams directory exists
    if (!fs.existsSync(examsDir)) {
      fs.mkdirSync(examsDir, { recursive: true });
    }
        

    // Generate unique exam ID
    const examId = `exam_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Create new exam structure
    const newExam = {
      title,
      timeLimit,
      category: category || 'Tiếng Anh',
      parts: [{
        id: 'part1',
        title: 'Bài thi',
        passage: null,
        questions: [],
      }],
    };

    // Save exam file
    const examFilePath = path.join(examsDir, `${examId}.json`);
    fs.writeFileSync(examFilePath, JSON.stringify(newExam, null, 2));

    // Update index file
    const indexPath = path.join(examsDir, 'index.json');
    let indexData: any[] = [];

    if (fs.existsSync(indexPath)) {
      const indexContent = fs.readFileSync(indexPath, 'utf-8');
      indexData = JSON.parse(indexContent);
    }

    // Add new exam to index
    indexData.push({
      id: examId,
      title,
      category: category || 'Tiếng Anh',
      time: timeLimit,
      questions: 0,
      attempts: 0,
      rating: 0,
      reviews: 0,
      createdAt: new Date().toISOString(),
      partsCount: 1,
    });

    fs.writeFileSync(indexPath, JSON.stringify(indexData, null, 2));

    return NextResponse.json({
      id: examId,
      title,
      category,
      timeLimit,
      message: 'Exam created successfully',
    });
  } catch (error) {
    console.error('Error creating exam:', error);
    return NextResponse.json(
      { error: 'Failed to create exam' },
      { status: 500 }
    );
  }
}
