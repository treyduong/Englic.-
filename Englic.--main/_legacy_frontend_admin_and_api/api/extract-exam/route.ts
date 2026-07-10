import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

// Khởi tạo Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    // 1. Nhận file ảnh từ Frontend gửi lên
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'Không tìm thấy file ảnh' }, { status: 400 });
    }

    // 2. Chuyển đổi file ảnh sang định dạng Base64 để AI có thể "đọc" được
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Data = buffer.toString('base64');

    // 3. LỜI NHẮC (PROMPT) THẦN CHÚ - Ép AI trả về JSON chuẩn xác
const prompt = `
      Bạn là một chuyên gia số hóa đề thi Tiếng Anh THPT Quốc Gia. 
      Nhiệm vụ của bạn là đọc tài liệu đính kèm (có thể là ảnh hoặc tài liệu PDF nhiều trang) và trích xuất TOÀN BỘ dữ liệu ra định dạng JSON.

      Quy tắc trích xuất nghiêm ngặt:
      1. Đọc từ trang đầu tiên đến trang cuối cùng của tài liệu.
      2. Bỏ qua các tiêu đề rác như "Trang 1/4", "Mã đề 101", "Chữ ký giám thị".
      3. Tìm các bài đọc (Reading Passage) nếu có, và nhóm CÁC CÂU HỎI BÊN DƯỚI NÓ vào chung một "part".
      4. Nếu là các câu hỏi lẻ (Ngữ pháp, từ vựng), gom chúng vào một "part" chung có passage = null.
      5. Tuyệt đối không thêm bất kỳ văn bản nào ngoài chuỗi JSON.
      6. Bắt buộc trả về ĐÚNG cấu trúc JSON sau:
      {
        "title": "Tên đề thi bạn đoán được hoặc để trống",
        "timeLimit": 3600,
        "parts": [
          {
            "id": "tạo_id_ngẫu_nhiên",
            "title": "Part 1: Tên phần thi",
            "passage": "Nội dung đoạn văn bài đọc (nếu có, không thì để null)",
            "questions": [
              {
                "id": "số thứ tự câu hỏi",
                "text": "Nội dung câu hỏi",
                "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
                "correctAnswer": "",
                "explanation": ""
              }
            ]
          }
        ]
      }
    `;

    // 4. Gọi API Gemini 2.0 Flash để phân tích
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: [
        {
          role: 'user',
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType: file.type,
                data: base64Data,
              },
            },
          ],
        },
      ],
      config: {
        // Ép AI bắt buộc phải trả về JSON, không nói luyên thuyên
        responseMimeType: "application/json",
      }
    });

    // 5. Trả kết quả JSON về cho Frontend
    let jsonResult;
    try {
      const responseText = response.text || (response?.content?.[0]?.text) || '{}';
      jsonResult = JSON.parse(responseText);
    } catch (parseError) {
      console.error("Lỗi parse JSON:", parseError);
      console.error("Response nhận được:", response);
      return NextResponse.json({ 
        error: 'Lỗi khi parse JSON từ Gemini',
        details: parseError instanceof Error ? parseError.message : 'Unknown parse error'
      }, { status: 500 });
    }
    return NextResponse.json(jsonResult);

  } catch (error) {
    console.error("Lỗi khi xử lý ảnh:", error);
    const errorMessage = error instanceof Error ? error.message : JSON.stringify(error);
    console.error("Chi tiết lỗi:", errorMessage);
    return NextResponse.json({ 
      error: 'Đã có lỗi xảy ra khi phân tích đề thi',
      details: errorMessage 
    }, { status: 500 });
  }
}