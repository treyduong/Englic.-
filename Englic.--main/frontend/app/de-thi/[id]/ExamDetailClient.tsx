'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { fetchExamById } from '@/lib/examFetch';
import { getAdminExamById } from '@/lib/examLocalStorage';
import { Exam, getTotalQuestions } from '@/lib/examTypes';


interface ExamDetailClientProps {
  id: string;
}

export default function ExamDetailClient({ id }: ExamDetailClientProps) {

  const [exam, setExam] = useState<Exam | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadExam = async () => {
      if (!id) return;
      try {
        const localExam = getAdminExamById(id);
        if (localExam) {
          setExam(localExam);
          return;
        }

        const staticExam = await fetchExamById(id);
        if (!staticExam) {
          setError('Không tìm thấy đề thi này trong kho frontend.');
          return;
        }
        setExam(staticExam);
      } catch {
        setError('Không tải được nội dung đề thi.');
      } finally {
        setIsLoading(false);
      }
    };

    loadExam();
  }, [id]);

  const totalQuestions = useMemo(() => (exam ? getTotalQuestions(exam) : 0), [exam]);
  const firstPreviewSection = exam?.sections.find((section) => section.passage || section.questions.length > 0);
  const previewQuestion = firstPreviewSection?.questions?.[0];

  return (
    <div className={`min-h-screen bg-gray-50 text-gray-800 selection:bg-purple-200 pb-12 font-sans`}>
      <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 md:px-8 z-10 shadow-sm sticky top-0">
        <Link href="/de-thi" className="text-gray-500 hover:text-purple-600 font-medium transition-colors flex items-center gap-2">
          <span>←</span> Quay lại danh sách
        </Link>
        <Link href="/dashboard" className="text-sm font-bold text-purple-600 hover:text-purple-800">
          Dashboard
        </Link>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 flex flex-col lg:flex-row gap-8">
        {isLoading && (
          <div className="w-full bg-white p-8 rounded-2xl border border-gray-200 text-center text-gray-500 font-semibold">
            Đang tải đề thi...
          </div>
        )}

        {!isLoading && error && (
          <div className="w-full bg-red-50 p-8 rounded-2xl border border-red-200 text-center">
            <p className="text-red-700 font-bold mb-4">{error}</p>
            <Link href="/de-thi" className="inline-flex px-5 py-2 rounded-xl bg-red-600 text-white font-bold">
              Về danh sách đề
            </Link>
          </div>
        )}

        {!isLoading && exam && (
          <>
            <div className="w-full lg:w-2/3 flex flex-col gap-8">
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-100 to-transparent opacity-50 pointer-events-none" />

                <div className="flex flex-wrap gap-2 mb-4">
                  {(exam.tags || []).map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-purple-50 text-purple-600 text-xs font-bold rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>

                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                  {exam.title}
                </h1>

                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6 font-medium">
                  <span className="flex items-center gap-2"><span className="text-blue-500 text-lg">⏱</span> {Math.round(exam.timeLimit / 60)} phút</span>
                  <span className="flex items-center gap-2"><span className="text-purple-500 text-lg">📄</span> {totalQuestions} câu hỏi</span>
                  <span className="flex items-center gap-2"><span className="text-pink-500 text-lg">🧩</span> {exam.sections.length} phần</span>
                  <span className="flex items-center gap-2"><span className="text-emerald-500 text-lg">📌</span> {exam.category}</span>
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <h3 className="font-bold text-gray-900 mb-2">Mô tả đề thi:</h3>
                  <p className="text-gray-600 leading-relaxed text-[15px]">
                    {exam.description || `Đề được đọc trực tiếp từ kho JSON frontend. Nguồn: ${exam.source || 'Englic.'}.`}
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span className="text-purple-500">📚</span> Cấu trúc đề
                </h2>

                <div className="space-y-3">
                  {exam.sections.map((section, index) => (
                    <div key={`${section.sectionType}-${index}`} className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="font-bold text-gray-900 capitalize">Phần {index + 1}: {section.sectionType.replace(/_/g, ' ')}</p>
                          {section.instruction && <p className="text-xs text-gray-500 mt-1 line-clamp-2">{section.instruction}</p>}
                        </div>
                        <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-black whitespace-nowrap">
                          {section.questions.length} câu
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/3 flex flex-col gap-6 lg:sticky lg:top-24 h-fit">
              <div className="bg-white p-6 rounded-2xl shadow-md border border-purple-100 text-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <h3 className="font-bold text-gray-900 mb-2 relative z-10">Bạn đã sẵn sàng?</h3>
                <p className="text-sm text-gray-500 mb-6 relative z-10">Kết quả sau khi nộp bài sẽ được lưu vào dashboard trong trình duyệt.</p>

                <Link href={`/de-thi/${encodeURIComponent(id)}/lam-bai`} className="block w-full relative z-10">
                  <button className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-3.5 rounded-xl font-black text-lg shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] hover:scale-[1.02] transition-all">
                    BẮT ĐẦU LÀM BÀI
                  </button>
                </Link>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100 flex items-center gap-2">
                  <span className="text-blue-500">👁️</span> Xem trước đề thi
                </h3>

                <div className="relative max-h-72 overflow-hidden">
                  {firstPreviewSection?.passageTitle && <h4 className="font-bold text-sm text-purple-700 mb-2">{firstPreviewSection.passageTitle}</h4>}
                  {firstPreviewSection?.passage && (
                    <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap text-justify">
                      {firstPreviewSection.passage}
                    </p>
                  )}
                  {!firstPreviewSection?.passage && previewQuestion && (
                    <div className="text-sm text-gray-600 leading-relaxed">
                      <p className="font-bold text-purple-700 mb-2">Câu {previewQuestion.questionNumber}</p>
                      <p>{previewQuestion.questionText || previewQuestion.context || 'Câu hỏi trắc nghiệm'}</p>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                </div>

                <div className="text-center mt-3">
                  <span className="text-xs text-gray-400 font-medium italic">Vào thi để xem đầy đủ nội dung</span>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
