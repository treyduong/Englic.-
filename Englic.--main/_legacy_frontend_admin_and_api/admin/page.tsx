"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Exam {
  id: string;
  title: string;
  createdAt: string;
}

export default function AdminUploadPage() {
  const [activeTab, setActiveTab] = useState<'create' | 'add-question' | 'scan-pdf' | 'parse-pdf'>('create');
  
  // Create Exam Tab
  const [newExamTitle, setNewExamTitle] = useState('');
  const [newExamCategory, setNewExamCategory] = useState('Tiếng Anh');
  const [newExamTime, setNewExamTime] = useState('60');
  const [isCreating, setIsCreating] = useState(false);
  const [createMessage, setCreateMessage] = useState('');
  const [createdExamId, setCreatedExamId] = useState('');

  // Add Question Tab
  const [examsList, setExamsList] = useState<Exam[]>([]);
  const [selectedExamId, setSelectedExamId] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [optionA, setOptionA] = useState('');
  const [optionB, setOptionB] = useState('');
  const [optionC, setOptionC] = useState('');
  const [optionD, setOptionD] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('A');
  const [explanation, setExplanation] = useState('');
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);
  const [addQuestionMessage, setAddQuestionMessage] = useState('');
  const [questionsCount, setQuestionsCount] = useState(0);

  // PDF Scan Tab
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfFileName, setPdfFileName] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanMessage, setScanMessage] = useState('');
  const [scannedExam, setScannedExam] = useState<any>(null);

  // Parse PDF Tab
  const [pdfFileParser, setPdfFileParser] = useState<File | null>(null);
  const [pdfFileNameParser, setPdfFileNameParser] = useState('');
  const [isParsing, setIsParsing] = useState(false);
  const [parseMessage, setParseMessage] = useState('');
  const [parsedData, setParsedData] = useState<any>(null);
  const [examTitleForSave, setExamTitleForSave] = useState('');
  const [isSavingParsed, setIsSavingParsed] = useState(false);

  // Load exams on mount
  useEffect(() => {
    loadExams();
  }, []);

  const loadExams = async () => {
    try {
      const res = await fetch('/api/parse-pdf');
      const data = await res.json();
      if (Array.isArray(data)) {
        setExamsList(data);
      }
    } catch (error) {
      console.error('Error loading exams:', error);
    }
  };

  const handleCreateExam = async () => {
    if (!newExamTitle.trim()) {
      alert('Vui lòng nhập tên đề thi');
      return;
    }

    setIsCreating(true);
    setCreateMessage('');

    try {
      const res = await fetch('/api/create-exam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newExamTitle,
          category: newExamCategory,
          timeLimit: parseInt(newExamTime) * 60,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || 'Lỗi khi tạo đề thi');
      }

      setCreateMessage(`✅ Tạo thành công! ID: ${data.id}`);
      setCreatedExamId(data.id);
      setNewExamTitle('');
      setNewExamCategory('Tiếng Anh');
      setNewExamTime('60');
      
      // Reload exams list
      setTimeout(() => {
        loadExams();
        setCreateMessage('');
      }, 2000);
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Lỗi không xác định';
      setCreateMessage(`❌ ${msg}`);
    } finally {
      setIsCreating(false);
    }
  };

  const handleAddQuestion = async () => {
    if (!selectedExamId) {
      alert('Vui lòng chọn đề thi');
      return;
    }
    if (!questionText.trim()) {
      alert('Vui lòng nhập câu hỏi');
      return;
    }
    if (!optionA.trim() || !optionB.trim() || !optionC.trim() || !optionD.trim()) {
      alert('Vui lòng nhập đầy đủ 4 đáp án');
      return;
    }

    setIsAddingQuestion(true);
    setAddQuestionMessage('');

    try {
      const res = await fetch(`/api/add-question/${selectedExamId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: questionText,
          options: [
            `A. ${optionA}`,
            `B. ${optionB}`,
            `C. ${optionC}`,
            `D. ${optionD}`,
          ],
          correctAnswer,
          explanation,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || 'Lỗi khi thêm câu hỏi');
      }

      setAddQuestionMessage(`✅ Thêm thành công!`);
      setQuestionText('');
      setOptionA('');
      setOptionB('');
      setOptionC('');
      setOptionD('');
      setCorrectAnswer('A');
      setExplanation('');
      setQuestionsCount(data.questionCount || 0);

      setTimeout(() => setAddQuestionMessage(''), 2000);
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Lỗi không xác định';
      setAddQuestionMessage(`❌ ${msg}`);
    } finally {
      setIsAddingQuestion(false);
    }
  };

  const handleScanPDF = async () => {
    if (!pdfFile) {
      alert('Vui lòng chọn file PDF');
      return;
    }

    setIsScanning(true);
    setScanMessage('⏳ Đang quét PDF...');
    setScannedExam(null);

    try {
      const formData = new FormData();
      formData.append('file', pdfFile);

      const res = await fetch('/api/scan-pdf', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || 'Lỗi khi quét PDF');
      }

      setScannedExam(data.exam);
      setScanMessage(`✅ Quét thành công! Dự tính ${data.exam.parts[0].questions.length} câu hỏi`);
      
      // Auto save exam
      const saveRes = await fetch('/api/save-exam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data.exam),
      });

      const saveData = await saveRes.json();
      if (saveRes.ok) {
        setScanMessage(`✅ Quét thành công! Đề thi ID: ${saveData.id}`);
        setPdfFile(null);
        setPdfFileName('');
        setTimeout(() => {
          setScanMessage('');
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Lỗi không xác định';
      setScanMessage(`❌ ${msg}`);
    } finally {
      setIsScanning(false);
    }
  };

  const handleParsePDF = async () => {
    if (!pdfFileParser) {
      alert('Vui lòng chọn file PDF');
      return;
    }

    setIsParsing(true);
    setParseMessage('⏳ Đang tách đề và câu hỏi...');
    setParsedData(null);

    try {
      const formData = new FormData();
      formData.append('file', pdfFileParser);

      const res = await fetch('/api/parse-pdf', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || 'Lỗi khi tách PDF');
      }

      setParsedData(data);
      setExamTitleForSave(data.title);
      setParseMessage(`✅ Tách thành công! ${data.questions.length} câu hỏi`);
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Lỗi không xác định';
      setParseMessage(`❌ ${msg}`);
    } finally {
      setIsParsing(false);
    }
  };

  const handleSaveParsedExam = async () => {
    if (!parsedData || !examTitleForSave.trim()) {
      alert('Vui lòng nhập tên đề thi');
      return;
    }

    setIsSavingParsed(true);

    try {
      // Tạo exam trước
      const createRes = await fetch('/api/create-exam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: examTitleForSave,
          category: 'Tiếng Anh',
          timeLimit: 3600,
        }),
      });

      const createData = await createRes.json();
      if (!createRes.ok) {
        throw new Error(createData?.error || 'Lỗi tạo đề thi');
      }

      const examId = createData.id;

      // Thêm từng câu hỏi (với passage nếu có)
      for (let i = 0; i < parsedData.questions.length; i++) {
        const question = parsedData.questions[i];

        // Chuẩn bị options giống cấu trúc cũ
        const options = [
          `A. ${question.options.A || ''}`,
          `B. ${question.options.B || ''}`,
          `C. ${question.options.C || ''}`,
          `D. ${question.options.D || ''}`,
        ];

        // Chỉ thêm passage cho câu hỏi đầu tiên
        const passageForQuestion = i === 0 && parsedData.passage ? parsedData.passage : null;

        await fetch(`/api/add-question/${examId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: question.text,
            options,
            correctAnswer: 'A',
            explanation: '',
            passage: passageForQuestion,
          }),
        });
      }

      setParseMessage(`✅ Lưu thành công! ID: ${examId}`);
      setPdfFileParser(null);
      setPdfFileNameParser('');
      setParsedData(null);
      setExamTitleForSave('');

      setTimeout(() => {
        setParseMessage('');
        window.location.reload();
      }, 2000);
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Lỗi không xác định';
      setParseMessage(`❌ ${msg}`);
    } finally {
      setIsSavingParsed(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <div className="font-bold text-xl text-black">Englic Admin Panel</div>
        <Link href="/" className="text-sm text-black hover:text-purple-600 underline">Quay về Trang chủ</Link>
      </header>

      <main className="flex-1 p-8 max-w-6xl mx-auto w-full">
        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('create')}
            className={`px-6 py-4 font-bold transition-all whitespace-nowrap ${
              activeTab === 'create'
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-800 hover:text-purple-600'
            }`}
          >
            📋 Tạo Đề Thi
          </button>
          <button
            onClick={() => { setActiveTab('add-question'); loadExams(); }}
            className={`px-6 py-4 font-bold transition-all whitespace-nowrap ${
              activeTab === 'add-question'
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-800 hover:text-purple-600'
            }`}
          >
            ➕ Thêm Câu Hỏi
          </button>
          <button
            onClick={() => setActiveTab('scan-pdf')}
            className={`px-6 py-4 font-bold transition-all whitespace-nowrap ${
              activeTab === 'scan-pdf'
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-800 hover:text-purple-600'
            }`}
          >
            🤖 Quét PDF
          </button>
          <button
            onClick={() => setActiveTab('parse-pdf')}
            className={`px-6 py-4 font-bold transition-all whitespace-nowrap ${
              activeTab === 'parse-pdf'
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-800 hover:text-purple-600'
            }`}
          >
            📥 Upload PDF
          </button>
        </div>

        {/* Create Exam Tab */}
        {activeTab === 'create' && (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
              <h1 className="text-2xl font-bold mb-2 text-black">📋 Tạo Đề Thi Mới</h1>
              <p className="text-black mb-6">Nhập thông tin cơ bản về đề thi</p>

              <div className="space-y-6">
                {/* Tên đề thi */}
                <div>
                  <label className="block text-sm font-bold text-black mb-2">Tên Đề Thi *</label>
                  <input
                    type="text"
                    value={newExamTitle}
                    onChange={(e) => setNewExamTitle(e.target.value)}
                    placeholder="Ví dụ: Đề thi THPT Quốc Gia 2024"
                    className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  />
                </div>

                {/* Danh mục */}
                <div>
                  <label className="block text-sm font-bold text-black mb-2">Danh Mục *</label>
                  <select
                    value={newExamCategory}
                    onChange={(e) => setNewExamCategory(e.target.value)}
                    className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  >
                    <option>Tiếng Anh</option>
                    <option>Toán</option>
                    <option>Vật Lý</option>
                    <option>Hóa Học</option>
                    <option>Sinh Học</option>
                    <option>Lịch Sử</option>
                    <option>Địa Lý</option>
                    <option>Khác</option>
                  </select>
                </div>

                {/* Thời gian */}
                <div>
                  <label className="block text-sm font-bold text-black mb-2">Thời Gian Làm Bài (phút) *</label>
                  <select
                    value={newExamTime}
                    onChange={(e) => setNewExamTime(e.target.value)}
                    className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  >
                    <option value="30">30 phút</option>
                    <option value="45">45 phút</option>
                    <option value="50">50 phút</option>
                    <option value="60">60 phút (Mặc định)</option>
                    <option value="90">90 phút</option>
                    <option value="120">120 phút</option>
                    <option value="150">150 phút</option>
                    <option value="180">180 phút</option>
                  </select>
                </div>

                {/* Create Button */}
                <button
                  onClick={handleCreateExam}
                  disabled={isCreating || !newExamTitle.trim()}
                  className={`w-full py-3 rounded-lg font-bold text-white transition-all ${
                    isCreating || !newExamTitle.trim()
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-[1.02]'
                  }`}
                >
                  {isCreating ? '⏳ Đang tạo...' : '✨ Tạo Đề Thi'}
                </button>

                {createMessage && (
                  <div className={`p-3 rounded-lg text-sm font-medium ${
                    createMessage.includes('✅')
                      ? 'bg-green-100 border border-green-300 text-green-800'
                      : 'bg-red-100 border border-red-300 text-red-800'
                  }`}>
                    {createMessage}
                  </div>
                )}
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 rounded-2xl p-8 border border-blue-200">
              <h2 className="text-xl font-bold text-black mb-4">💡 Hướng Dẫn</h2>
              <div className="space-y-4 text-sm text-black">
                <div>
                  <p className="font-bold mb-1">1️⃣ Tạo Đề Thi</p>
                  <p>Nhập tên đề thi, chọn danh mục và thời gian làm bài.</p>
                </div>
                <div>
                  <p className="font-bold mb-1">2️⃣ Lấy ID Đề Thi</p>
                  <p>Hệ thống sẽ trả về ID duy nhất (ví dụ: <code className="bg-white px-1 rounded">exam_1234567890</code>)</p>
                </div>
                <div>
                  <p className="font-bold mb-1">3️⃣ Thêm Câu Hỏi</p>
                  <p>Chuyển sang tab "Thêm Câu Hỏi" và sử dụng ID để thêm câu hỏi.</p>
                </div>
                <div>
                  <p className="font-bold mb-1">4️⃣ Xuất Bản</p>
                  <p>Sau khi thêm đủ câu hỏi, đề thi sẽ tự động hiển thị trong danh sách.</p>
                </div>
              </div>

              {createdExamId && (
                <div className="mt-6 p-4 bg-white rounded-lg border-l-4 border-green-500">
                  <p className="text-xs text-black mb-1">ID của đề thi mới tạo:</p>
                  <p className="font-mono text-sm text-black break-all">{createdExamId}</p>
                  <p className="text-xs text-black mt-2">👉 Dùng ID này để thêm câu hỏi</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Add Question Tab */}
        {activeTab === 'add-question' && (
          <div className="grid md:grid-cols-3 gap-8">
            {/* Form thêm câu hỏi */}
            <div className="md:col-span-2 bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
              <h1 className="text-2xl font-bold mb-2 text-black">➕ Thêm Câu Hỏi</h1>
              <p className="text-black mb-6">Thêm câu hỏi vào đề thi đã tạo</p>

              {/* Select Exam */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-black mb-2">Chọn Đề Thi *</label>
                <select
                  value={selectedExamId}
                  onChange={(e) => {
                    setSelectedExamId(e.target.value);
                    setQuestionsCount(0);
                  }}
                  className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                >
                  <option value="">-- Chọn một đề thi --</option>
                  {examsList.map((exam) => (
                    <option key={exam.id} value={exam.id}>
                      {exam.title}
                    </option>
                  ))}
                </select>
              </div>

              {selectedExamId && (
                <>
                  {/* Question */}
                  <div className="mb-6">
                    <label className="block text-sm font-bold text-black mb-2">Câu Hỏi *</label>
                    <textarea
                      value={questionText}
                      onChange={(e) => setQuestionText(e.target.value)}
                      placeholder="Ví dụ: What is the main idea of the passage?"
                      className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none h-[100px]"
                    />
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-bold text-black mb-1">Đáp án A *</label>
                      <input
                        type="text"
                        value={optionA}
                        onChange={(e) => setOptionA(e.target.value)}
                        placeholder="Nội dung đáp án A"
                        className="w-full border border-gray-200 p-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-black mb-1">Đáp án B *</label>
                      <input
                        type="text"
                        value={optionB}
                        onChange={(e) => setOptionB(e.target.value)}
                        placeholder="Nội dung đáp án B"
                        className="w-full border border-gray-200 p-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-black mb-1">Đáp án C *</label>
                      <input
                        type="text"
                        value={optionC}
                        onChange={(e) => setOptionC(e.target.value)}
                        placeholder="Nội dung đáp án C"
                        className="w-full border border-gray-200 p-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-black mb-1">Đáp án D *</label>
                      <input
                        type="text"
                        value={optionD}
                        onChange={(e) => setOptionD(e.target.value)}
                        placeholder="Nội dung đáp án D"
                        className="w-full border border-gray-200 p-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-sm"
                      />
                    </div>
                  </div>

                  {/* Correct Answer */}
                  <div className="mb-6">
                    <label className="block text-sm font-bold text-black mb-2">Đáp Án Đúng *</label>
                    <select
                      value={correctAnswer}
                      onChange={(e) => setCorrectAnswer(e.target.value)}
                      className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    >
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                    </select>
                  </div>

                  {/* Explanation */}
                  <div className="mb-6">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Giải Thích (tùy chọn)</label>
                    <textarea
                      value={explanation}
                      onChange={(e) => setExplanation(e.target.value)}
                      placeholder="Giải thích lý do tại sao đó là đáp án đúng"
                      className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none h-[80px]"
                    />
                  </div>

                  {/* Add Button */}
                  <button
                    onClick={handleAddQuestion}
                    disabled={isAddingQuestion || !questionText.trim()}
                    className={`w-full py-3 rounded-lg font-bold text-white transition-all ${
                      isAddingQuestion || !questionText.trim()
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:scale-[1.02]'
                    }`}
                  >
                    {isAddingQuestion ? '⏳ Đang thêm...' : '➕ Thêm Câu Hỏi'}
                  </button>

                  {addQuestionMessage && (
                    <div className={`mt-4 p-3 rounded-lg text-sm font-medium ${
                      addQuestionMessage.includes('✅')
                        ? 'bg-green-100 border border-green-300 text-green-800'
                        : 'bg-red-100 border border-red-300 text-red-800'
                    }`}>
                      {addQuestionMessage}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Stats & Info */}
            <div className="bg-purple-50 rounded-2xl p-6 border border-purple-200 h-fit">
              <h2 className="text-lg font-bold text-black mb-4">📊 Thông Tin</h2>

              {selectedExamId ? (
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-3 border border-purple-200">
                    <p className="text-xs text-black mb-1">Đề Thi Đã Chọn</p>
                    <p className="font-bold text-sm text-black">
                      {examsList.find(e => e.id === selectedExamId)?.title}
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-green-200">
                    <p className="text-xs text-black mb-1">Số Câu Hỏi</p>
                    <p className="text-2xl font-bold text-black">{questionsCount || 0}</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-blue-200">
                    <p className="text-xs text-black mb-1">ID Đề Thi</p>
                    <p className="font-mono text-xs text-black break-all">{selectedExamId}</p>
                  </div>
                </div>
              ) : (
                <div className="text-center text-black text-sm">
                  <p>👈 Chọn một đề thi ở mục bên trái</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Scan PDF Tab */}
        {activeTab === 'scan-pdf' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
              <h1 className="text-2xl font-bold mb-2 text-black">🤖 Quét PDF với AI Gemini</h1>
              <p className="text-black mb-6">Upload file PDF của đề thi - AI sẽ tự động nhận diện và trích xuất câu hỏi</p>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Upload Area */}
                <div>
                  <div className="border-2 border-dashed border-purple-300 rounded-xl p-8 text-center bg-purple-50 cursor-pointer hover:border-purple-500 transition-all"
                    onClick={() => document.getElementById('pdf-input')?.click()}
                  >
                    <div className="text-4xl mb-2">📄</div>
                    <p className="text-black font-bold">Kéo thả hoặc click để chọn file PDF</p>
                    <p className="text-sm text-gray-600 mt-2">Hỗ trợ file PDF, ảnh JPG/PNG</p>
                    <input
                      id="pdf-input"
                      type="file"
                      accept="application/pdf,image/jpeg,image/png"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setPdfFile(file);
                          setPdfFileName(file.name);
                        }
                      }}
                      className="hidden"
                    />
                  </div>

                  {pdfFileName && (
                    <div className="mt-4 p-3 bg-green-100 rounded-lg border border-green-300">
                      <p className="text-sm text-green-800">
                        ✅ Đã chọn: <strong>{pdfFileName}</strong>
                      </p>
                    </div>
                  )}

                  <button
                    onClick={handleScanPDF}
                    disabled={isScanning || !pdfFile}
                    className={`w-full py-3 rounded-lg font-bold text-white transition-all mt-4 ${
                      isScanning || !pdfFile
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-[1.02]'
                    }`}
                  >
                    {isScanning ? '🧠 AI đang quét...' : '✨ Quét Ngay'}
                  </button>

                  {scanMessage && (
                    <div className={`mt-4 p-3 rounded-lg text-sm font-medium ${
                      scanMessage.includes('✅')
                        ? 'bg-green-100 border border-green-300 text-green-800'
                        : 'bg-yellow-100 border border-yellow-300 text-yellow-800'
                    }`}>
                      {scanMessage}
                    </div>
                  )}
                </div>

                {/* Info & Preview */}
                <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                  <h2 className="text-lg font-bold text-black mb-4">💡 Cách sử dụng</h2>
                  <div className="space-y-3 text-sm text-black">
                    <div>
                      <p className="font-bold">1️⃣ Tải lên PDF</p>
                      <p className="text-xs text-gray-600">Chọn file PDF của đề thi</p>
                    </div>
                    <div>
                      <p className="font-bold">2️⃣ AI quét tự động</p>
                      <p className="text-xs text-gray-600">Gemini AI sẽ phân tích và nhận diện câu hỏi</p>
                    </div>
                    <div>
                      <p className="font-bold">3️⃣ Lưu đề thi</p>
                      <p className="text-xs text-gray-600">Dữ liệu tự động lưu vào hệ thống</p>
                    </div>
                    <div>
                      <p className="font-bold">4️⃣ Chỉnh sửa</p>
                      <p className="text-xs text-gray-600">Kiểm tra và sửa lại nếu cần thiết</p>
                    </div>
                  </div>

                  {scannedExam && (
                    <div className="mt-6 p-4 bg-white rounded-lg border-l-4 border-green-500">
                      <p className="text-xs text-black font-bold mb-2">📊 Kết quả quét:</p>
                      <p className="text-sm text-black">📝 {scannedExam.title}</p>
                      <p className="text-sm text-black">❓ {scannedExam.parts[0].questions.length} câu hỏi</p>
                      <p className="text-sm text-black">⏱️ {scannedExam.timeLimit / 60} phút</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Parse PDF Tab */}
        {activeTab === 'parse-pdf' && (
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
              <h1 className="text-2xl font-bold mb-2 text-black">📥 Upload & Tách Đề + Câu Hỏi</h1>
              <p className="text-black mb-6">Upload file PDF có định dạng: Đề [tên] - Câu 1, Câu 2, ... - Sẽ tự động tách riêng</p>

              <div className="grid md:grid-cols-3 gap-8">
                {/* Upload Area */}
                <div className="md:col-span-2">
                  <div className="border-2 border-dashed border-blue-300 rounded-xl p-8 text-center bg-blue-50 cursor-pointer hover:border-blue-500 transition-all"
                    onClick={() => document.getElementById('pdf-input-parser')?.click()}
                  >
                    <div className="text-4xl mb-2">📄</div>
                    <p className="text-black font-bold">Kéo thả hoặc click để chọn file PDF</p>
                    <p className="text-sm text-gray-600 mt-2">Chỉ hỗ trợ file PDF</p>
                    <input
                      id="pdf-input-parser"
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setPdfFileParser(file);
                          setPdfFileNameParser(file.name);
                        }
                      }}
                      className="hidden"
                    />
                  </div>

                  {pdfFileNameParser && (
                    <div className="mt-4 p-3 bg-green-100 rounded-lg border border-green-300">
                      <p className="text-sm text-green-800">
                        ✅ Đã chọn: <strong>{pdfFileNameParser}</strong>
                      </p>
                    </div>
                  )}

                  <button
                    onClick={handleParsePDF}
                    disabled={isParsing || !pdfFileParser}
                    className={`w-full py-3 rounded-lg font-bold text-white transition-all mt-4 ${
                      isParsing || !pdfFileParser
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:scale-[1.02]'
                    }`}
                  >
                    {isParsing ? '⏳ Đang tách...' : '✨ Tách Câu Hỏi'}
                  </button>

                  {parseMessage && (
                    <div className={`mt-4 p-3 rounded-lg text-sm font-medium ${
                      parseMessage.includes('✅')
                        ? 'bg-green-100 border border-green-300 text-green-800'
                        : 'bg-red-100 border border-red-300 text-red-800'
                    }`}>
                      {parseMessage}
                    </div>
                  )}
                </div>

                {/* Info Box */}
                <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                  <h2 className="text-lg font-bold text-black mb-4">💡 Định dạng PDF</h2>
                  <div className="space-y-3 text-sm text-black font-mono bg-white p-3 rounded-lg border border-blue-200 text-xs">
                    <p className="font-bold">Đề THPT 2024</p>
                    <p className="text-gray-600">---[PASSAGE/BÀI ĐỌC]---</p>
                    <p className="italic text-gray-700">Đây là bài đọc dài...</p>
                    <p className="italic text-gray-700">Có thể nhiều dòng...</p>
                    <p className="text-gray-600">---[QUESTIONS]---</p>
                    <p>Câu 1: What is...?</p>
                    <p>A. Option A</p>
                    <p>B. Option B</p>
                    <p>C. Option C</p>
                    <p>D. Option D</p>
                    <p></p>
                    <p>Câu 2: Why...?</p>
                    <p>A. ...</p>
                  </div>
                  <p className="text-xs text-blue-700 mt-3 font-bold">✨ Hệ thống sẽ tự động tách passage + các câu hỏi liên quan</p>
                </div>
              </div>

              {/* Preview Section */}
              {parsedData && (
                <div className="mt-8 border-t border-gray-200 pt-8">
                  <h2 className="text-2xl font-bold mb-6 text-black">📋 Preview Dữ Liệu Tách</h2>

                  {/* Exam Title Input */}
                  <div className="mb-8 max-w-2xl">
                    <label className="block text-sm font-bold text-black mb-2">Tên Đề Thi *</label>
                    <input
                      type="text"
                      value={examTitleForSave}
                      onChange={(e) => setExamTitleForSave(e.target.value)}
                      placeholder="Nhập tên đề thi"
                      className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">Được tách từ PDF: {parsedData.title}</p>
                  </div>

                  {/* Passage (nếu có) */}
                  {parsedData.passage && (
                    <div className="mb-8 p-6 bg-amber-50 rounded-xl border-l-4 border-amber-400">
                      <h3 className="text-lg font-bold text-black mb-3">📖 Bài Đọc (Passage)</h3>
                      <p className="text-black leading-relaxed italic">{parsedData.passage}</p>
                    </div>
                  )}

                  {/* Questions Preview */}
                  <div className="space-y-6">
                    {parsedData.questions.map((q: any, idx: number) => (
                      <div key={idx} className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-lg font-bold text-black">Câu {q.number}</h3>
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">#{idx + 1}</span>
                        </div>

                        <p className="text-black mb-4 leading-relaxed">{q.text}</p>

                        <div className="space-y-2">
                          {['A', 'B', 'C', 'D'].map((letter) => (
                            <div key={letter} className="flex items-start gap-3 p-2 rounded-lg hover:bg-white transition-colors">
                              <span className="font-bold text-blue-600 min-w-6">{letter}.</span>
                              <span className="text-black flex-1">{q.options[letter] || '(Không có)'}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Save Button */}
                  <div className="mt-8 flex gap-4">
                    <button
                      onClick={handleSaveParsedExam}
                      disabled={isSavingParsed || !examTitleForSave.trim()}
                      className={`px-8 py-3 rounded-lg font-bold text-white transition-all ${
                        isSavingParsed || !examTitleForSave.trim()
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:scale-[1.02]'
                      }`}
                    >
                      {isSavingParsed ? '⏳ Đang lưu...' : '💾 Lưu Vào Hệ Thống'}
                    </button>
                    <button
                      onClick={() => { setParsedData(null); setParseMessage(''); }}
                      className="px-8 py-3 rounded-lg font-bold text-gray-700 bg-gray-200 hover:bg-gray-300 transition-all"
                    >
                      ❌ Hủy
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
