import { NextRequest, NextResponse } from 'next/server';

interface QuestionData {
  number: string;
  text: string;
  options: {
    A?: string;
    B?: string;
    C?: string;
    D?: string;
  };
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'Không có file được chọn' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    let pdfData;
    try {
      const pdfParse = require('pdf-parse/lib/pdf-parse.js');
      pdfData = await pdfParse(buffer);
    } catch (error) {
      console.error('PDF Parse Error:', error);
      throw new Error('Lỗi đọc file PDF. Vui lòng kiểm tra lại file.');
    }

    const text = pdfData.text;

    // BƯỚC 1: BỘ LỌC CHUYÊN SÂU (Xử lý bảng, ký tự rác và header/footer)
    const lines = text.split('\n')
      .map((line: string) => line.replace(/\$/g, '').trim()) // Xóa ký tự $ do lỗi font PDF
      .filter((line: string) => {
        if (!line) return false;
        // Loại bỏ rác từ trung tâm tiếng anh và các dòng báo hiệu table
        if (line.match(/WELCOME TO|TIẾNG ANH CÔ HOÀI|Trần Hữu Tước|www\.facebook|Hotline:|Học là giỏi|The following table:/i)) return false;
        // Loại bỏ các dòng chỉ chứa toàn dấu phẩy/ngoặc kép do lỗi render bảng
        if (line.match(/^["',]+$/)) return false;
        return true;
      })
      .map((line: string) => line.replace(/^["',]+|["',]+$/g, '').trim()) // Gọt sạch ngoặc kép ở 2 đầu chuỗi
      .filter((line: string) => line);

    let examTitle = 'Đề thi tự động nhận diện';
    let globalPassage = '';
    let pendingText = ''; // Bộ đệm chứa Reading Passage nằm giữa đề
    let questions: QuestionData[] = [];
    
    let currentQuestion: Partial<QuestionData> | null = null;
    let currentOption: 'A' | 'B' | 'C' | 'D' | null = null;
    let firstQuestionFound = false;

    // BƯỚC 2: QUÉT VÀ BÓC TÁCH DỮ LIỆU
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // 1. Bắt tiêu đề
      if (line.toLowerCase().includes('mock test') || line.toLowerCase().startsWith('đề thi')) {
        if (examTitle === 'Đề thi tự động nhận diện') {
          const titleMatch = line.match(/(?:mock\s*test|đề\s*thi|đề)\s*[:\-]?\s*(.+)/i);
          examTitle = titleMatch ? line : examTitle;
        }
        continue;
      }

      // 2. Bắt đầu đoạn văn mới (Reading Passage)
      // Dấu hiệu: Bắt đầu bằng chữ "Read the following..."
      if (line.toLowerCase().includes('read the following') || line.toLowerCase().includes('read the passage')) {
         if (!firstQuestionFound) {
            globalPassage += (globalPassage ? '\n' : '') + line;
         } else {
            pendingText += (pendingText ? '\n\n' : '') + line;
            currentQuestion = null; // Tạm đóng câu hỏi trước đó để dồn text vào bộ đệm
         }
         continue;
      }

      // 3. Bắt đầu câu hỏi mới
      const questionMatch = line.match(/(?:Câu|Question)\s*(\d+)\s*[\.\-:]?\s*(.*)/i);
      if (questionMatch) {
        firstQuestionFound = true;

        if (currentQuestion && currentQuestion.text !== undefined) {
          questions.push(currentQuestion as QuestionData);
        }

        // Nếu có đoạn văn trong bộ đệm, gắn luôn nó lên đầu nội dung câu hỏi này
        currentQuestion = {
          number: questionMatch[1],
          text: (pendingText ? pendingText + '\n\n' : '') + questionMatch[2].trim(),
          options: {},
        };
        currentOption = null;
        pendingText = ''; // Dọn dẹp bộ đệm
        continue;
      }

      // 4. Xử lý nội dung bên trong câu hỏi
      if (currentQuestion) {
        // Regex CỰC KỲ QUAN TRỌNG: Chỉ bắt chữ HOA (A, B, C, D) để không bắt nhầm a, b, c nhỏ của bài sắp xếp
        const optionMatches = [...line.matchAll(/(?:^|\s+)([A-D])\.[\s]*(.*?)(?=\s+[A-D]\.|$)/g)];

        if (optionMatches.length > 0) {
          if (!currentQuestion.options) currentQuestion.options = {};
          
          optionMatches.forEach(match => {
            const optLetter = match[1] as 'A' | 'B' | 'C' | 'D';
            const optText = match[2].trim();
            currentQuestion.options![optLetter] = optText;
            currentOption = optLetter;
          });
        } else {
          if (currentOption) {
            // Nối chữ vào đáp án (nếu đáp án dài xuống dòng)
            currentQuestion.options![currentOption] += ' ' + line;
          } else {
            // Nối chữ vào câu hỏi (Ví dụ: các ý a., b., c., d. của bài sắp xếp)
            currentQuestion.text += (currentQuestion.text ? '\n' : '') + line; 
          }
        }
      } else {
         // 5. Gom text khi chưa nằm trong câu hỏi nào
         if (!firstQuestionFound) {
            globalPassage += (globalPassage ? '\n' : '') + line;
         } else {
            // Đang thu thập Reading Passage ở giữa đề
            pendingText += (pendingText ? '\n' : '') + line;
         }
      }
    }

    if (currentQuestion && currentQuestion.text !== undefined) {
      questions.push(currentQuestion as QuestionData);
    }

    if (questions.length === 0) {
      throw new Error('Không tìm thấy câu hỏi. Vui lòng kiểm tra lại định dạng PDF.');
    }

    const result = {
      title: examTitle,
      passage: globalPassage.trim() || null,
      questions: questions 
    };

    console.log('✅ Parse Success. Questions count:', questions.length);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('❌ API Error:', error.message);
    return NextResponse.json(
      { error: error.message || 'Lỗi không xác định' },
      { status: 400 }
    );
  }
}