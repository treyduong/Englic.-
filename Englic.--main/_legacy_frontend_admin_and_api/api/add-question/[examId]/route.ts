import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs'; // Chuyển sang dùng API bất đồng bộ
import path from 'path';

const examsDir = path.join(process.cwd(), 'public/exams');

export async function POST(
  req: NextRequest,
  { params }: { params: { examId: string } }
) {
  try {
    const examId = params.examId;
    
    // Bổ sung partIndex (mặc định là 0) để có thể lưu câu hỏi vào các phần khác nhau của đề thi (Đọc hiểu, Ngữ pháp...)
    const { text, options, correctAnswer, explanation, passage, partIndex = 0 } = await req.json();

    if (!text || !options || options.length < 4) {
      return NextResponse.json(
        { error: 'Question text and at least 4 options are required' },
        { status: 400 }
      );
    }

    const examFilePath = path.join(examsDir, `${examId}.json`);

    // Kiểm tra file tồn tại bằng fs.access (bất đồng bộ)
    try {
      await fs.access(examFilePath);
    } catch {
      return NextResponse.json({ error: 'Exam not found' }, { status: 404 });
    }

    // Đọc file bất đồng bộ
    const examContent = await fs.readFile(examFilePath, 'utf-8');
    const examData = JSON.parse(examContent);

    // Kiểm tra partIndex có hợp lệ không
    if (!examData.parts || !examData.parts[partIndex]) {
        return NextResponse.json({ error: 'Exam part not found' }, { status: 400 });
    }

    const targetPart = examData.parts[partIndex];

    // Gán đoạn văn (passage) nếu là câu hỏi đầu tiên của phần này
    if (passage && targetPart.questions.length === 0) {
      targetPart.passage = passage;
    }

    // Tạo questionId (Nên cân nhắc dùng UUID vd: crypto.randomUUID() thay vì index + 1 để tránh lỗi trùng ID khi xóa câu hỏi)
    const questionId = String(targetPart.questions.length + 1);

    const newQuestion = {
      id: questionId,
      text,
      options: options.slice(0, 4),
      correctAnswer: correctAnswer || '',
      explanation: explanation || '',
    };

    targetPart.questions.push(newQuestion);

    // Ghi file bất đồng bộ
    await fs.writeFile(examFilePath, JSON.stringify(examData, null, 2));

    // Cập nhật file index
    const indexPath = path.join(examsDir, 'index.json');
    try {
      const indexContent = await fs.readFile(indexPath, 'utf-8');
      const indexData = JSON.parse(indexContent);

      const examIndex = indexData.findIndex((e: any) => e.id === examId);
      if (examIndex >= 0) {
        // Tính tổng số câu hỏi của toàn bộ đề (cộng dồn tất cả các part)
        const totalQuestions = examData.parts.reduce(
            (sum: number, part: any) => sum + (part.questions?.length || 0), 0
        );
        indexData[examIndex].questions = totalQuestions;
        await fs.writeFile(indexPath, JSON.stringify(indexData, null, 2));
      }
    } catch (indexError) {
      console.error('Warning: Could not update index.json', indexError);
      // Không ném lỗi ở đây để API vẫn trả về thành công nếu câu hỏi đã được lưu
    }

    return NextResponse.json({
      id: questionId,
      examId,
      questionCount: targetPart.questions.length,
      totalExamQuestions: examData.parts.reduce((sum: number, part: any) => sum + (part.questions?.length || 0), 0),
      message: 'Question added successfully',
    });

  } catch (error) {
    console.error('Error adding question:', error);
    return NextResponse.json(
      { error: 'Failed to add question' },
      { status: 500 }
    );
  }
}