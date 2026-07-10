import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Đường dẫn để lưu đề thi
const examsDir = path.join(process.cwd(), 'public', 'exams');

// Đảm bảo thư mục tồn tại
if (!fs.existsSync(examsDir)) {
  fs.mkdirSync(examsDir, { recursive: true });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Nếu nhận được text thô, tự động parse thành JSON chuẩn
    let examData = body;
    
    if (typeof body === 'string' || body.rawText) {
      const text = typeof body === 'string' ? body : body.rawText;
      examData = parseExamText(text);
    }

    // Override title nếu nhận được title từ request
    if (body.title) {
      examData.title = body.title;
    }

    // Override timeLimit nếu nhận được từ request
    if (body.timeLimit) {
      examData.timeLimit = body.timeLimit;
    }

    // Validate cấu trúc JSON
    if (!examData.title || !Array.isArray(examData.parts)) {
      return NextResponse.json(
        { error: 'JSON không hợp lệ. Cần có "title" và "parts" array' },
        { status: 400 }
      );
    }

    // Tạo ID duy nhất cho đề thi
    const examId = `exam_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    
    // Tạo file JSON để lưu đề thi
    const filePath = path.join(examsDir, `${examId}.json`);
    
    // Lưu dữ liệu vào file
    fs.writeFileSync(filePath, JSON.stringify(examData, null, 2));

    // Cũng lưu vào file index để dễ quản lý danh sách đề thi
    const indexPath = path.join(examsDir, 'index.json');
    let examsList: any[] = [];
    
    if (fs.existsSync(indexPath)) {
      const indexContent = fs.readFileSync(indexPath, 'utf-8');
      examsList = JSON.parse(indexContent);
    }

    // Thêm đề thi mới vào danh sách với thông tin cần thiết để display
    const examListItem = {
      id: examId,
      title: examData.title,
      category: examData.category || "Tiếng Anh",
      time: examData.timeLimit ? `${Math.floor(examData.timeLimit / 60)} Phút` : "60 Phút",
      questions: examData.parts.reduce((sum: number, part: any) => sum + (part.questions?.length || 0), 0),
      attempts: Math.floor(Math.random() * 1000),
      rating: (Math.random() * 0.5 + 4.5).toFixed(1),
      reviews: Math.floor(Math.random() * 300),
      createdAt: new Date().toISOString(),
      partsCount: examData.parts.length,
    };

    examsList.unshift(examListItem); // Thêm vào đầu danh sách

    // Lưu lại file index
    fs.writeFileSync(indexPath, JSON.stringify(examsList, null, 2));

    return NextResponse.json({
      id: examId,
      message: 'Lưu đề thi thành công',
      exam: examListItem,
      examsCount: examsList.length,
    });

  } catch (error) {
    console.error("❌ Lỗi khi lưu đề thi:", error);
    const errorMessage = error instanceof Error ? error.message : 'Lỗi không xác định';
    console.error("Chi tiết lỗi:", errorMessage);
    return NextResponse.json(
      { 
        error: `Lỗi khi lưu đề thi: ${errorMessage}`,
        details: errorMessage,
        debugInfo: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      },
      { status: 500 }
    );
  }
}

// GET: Lấy danh sách tất cả đề thi
export async function GET() {
  try {
    const indexPath = path.join(examsDir, 'index.json');
    
    if (!fs.existsSync(indexPath)) {
      return NextResponse.json({ exams: [] });
    }

    const indexContent = fs.readFileSync(indexPath, 'utf-8');
    const examsList = JSON.parse(indexContent);

    return NextResponse.json({ exams: examsList });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách đề thi:", error);
    return NextResponse.json(
      { error: 'Lỗi khi lấy danh sách đề thi' },
      { status: 500 }
    );
  }
}

// Helper function: Parse text thô thành JSON chuẩn
function parseExamText(text: string): any {
  console.log("🔍 Parse text - Total chars:", text.length);
  
  // Split by lines and process
  const allLines = text.split('\n');
  const lines = allLines.map(l => l.trim()).filter(l => l);
  
  if (lines.length === 0) {
    return getErrorExam('Không có dữ liệu');
  }
  
  // Dòng đầu tiên là tiêu đề
  const title = lines[0];
  console.log("📝 Title:", title);
  
  // Tìm tất cả Question lines
  const questions: any[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    
    // Pattern: "Question X:" hoặc "X." hoặc "X)"
    const questionMatch = line.match(/^(?:Question\s+)?(\d+)[.)\s:]+(.+)/i);
    
    if (questionMatch) {
      const qNum = questionMatch[1];
      const qText = questionMatch[2]?.trim();
      const options: string[] = [];
      
      console.log(`Found Q${qNum}: ${qText}`);
      
      // Tìm options của câu hỏi này (A, B, C, D)
      let j = i + 1;
      while (j < lines.length) {
        const optLine = lines[j];
        
        // Stop nếu gặp question mới
        if (optLine.match(/^(?:Question\s+)?\d+[.)\s:]/i) || optLine.match(/^question\s+\d+/i)) {
          break;
        }
        
        // Match option line
        const optMatch = optLine.match(/^([A-D])[.)\s:]+(.+)/);
        if (optMatch) {
          const optText = `${optMatch[1]}. ${optMatch[2].trim()}`;
          options.push(optText);
          console.log(`  ${optText}`);
          j++;
        } else {
          j++;
        }
      }
      
      // Thêm câu hỏi nếu tìm được ít nhất 2 options
      if (options.length >= 2) {
        questions.push({
          id: qNum,
          text: qText || `Question ${qNum}`,
          options: options.slice(0, 4),
          correctAnswer: '',
          explanation: '',
        });
        console.log(`✅ Q${qNum} - ${options.length} options`);
      }
      
      i = j - 1;
    }
  }
  
  console.log(`📊 Total questions: ${questions.length}`);
  
  if (questions.length === 0) {
    return getErrorExam(
      'Không tìm được câu hỏi nào.\n\nFormat: Question 1., A., B., C., D.'
    );
  }
  
  return {
    title,
    timeLimit: 3600,
    category: 'Tiếng Anh',
    parts: [{
      id: 'part1',
      title: 'Bài thi',
      passage: null,
      questions,
    }],
  };
}

function getErrorExam(message: string): any {
  return {
    title: 'Lỗi Parse',
    timeLimit: 3600,
    category: 'Tiếng Anh',
    parts: [{
      id: 'part1',
      title: 'Bài thi',
      passage: null,
      questions: [{
        id: '1',
        text: message,
        options: ['A. Ví dụ', 'B. Ví dụ', 'C. Ví dụ', 'D. Ví dụ'],
        correctAnswer: '',
        explanation: '',
      }],
    }],
  };
}
