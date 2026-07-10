'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import UserSidebar from '@/components/UserSidebar';
import { ExamAttemptResult, formatDateTimeVi, formatDuration, getQuestionTypeLabel } from '@/lib/examTypes';
import { loadExamResults } from '@/lib/examLocalStorage';


export default function ExamHistoryPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [results, setResults] = useState<ExamAttemptResult[]>([]);
  const [selectedResultId, setSelectedResultId] = useState<string | null>(null);

  useEffect(() => {
    if (isLoaded && !user) router.replace('/sign-in');
  }, [isLoaded, user, router]);

  useEffect(() => {
    setResults(loadExamResults());
  }, []);

  const selectedResult = useMemo(
    () => results.find((result) => result.id === selectedResultId) || null,
    [results, selectedResultId],
  );

  const studentName = user?.fullName || user?.firstName || 'Người dùng';

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-semibold">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex font-sans text-gray-800">
      <UserSidebar userName={studentName} userRole="Học viên" />

      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        <header className="mb-10 flex justify-between items-end gap-6">
          <div>
            <Link href="/dashboard" className="inline-flex items-center text-gray-500 hover:text-purple-600 font-medium mb-4 transition-colors">
              <span className="mr-2">←</span> Quay lại dashboard
            </Link>
            <h1 className="text-3xl font-black text-gray-900 mb-2">Lịch sử làm đề</h1>
            <p className="text-gray-500">Dữ liệu được lưu sau mỗi lần user nộp bài.</p>
          </div>
          <Link href="/de-thi" className="bg-white border border-gray-200 px-5 py-2.5 rounded-xl font-bold text-gray-700 hover:border-purple-300 hover:text-purple-600 transition-colors shadow-sm">
            Làm đề mới
          </Link>
        </header>

        {results.length === 0 ? (
          <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] text-center">
            <p className="text-5xl mb-4">📭</p>
            <h2 className="text-2xl font-black text-gray-900 mb-2">Chưa có lịch sử thi</h2>
            <p className="text-gray-500 mb-6">Hãy làm và nộp một đề để dashboard bắt đầu thống kê.</p>
            <Link href="/de-thi" className="inline-flex px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-black">
              Đi tới kho đề
            </Link>
          </div>
        ) : !selectedResult ? (
          <div className="space-y-4">
            {results.map((result) => (
              <button
                key={result.id}
                onClick={() => setSelectedResultId(result.id)}
                className="w-full text-left bg-white p-6 rounded-3xl border border-gray-100 hover:border-purple-200 hover:shadow-lg transition-all group"
              >
                <div className="flex items-center justify-between gap-6">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors line-clamp-1">
                      {result.examTitle}
                    </h3>
                    <p className="text-sm text-gray-500">📅 {formatDateTimeVi(result.submittedAt)} • ⏱️ {formatDuration(result.durationSeconds)}</p>
                    <p className="text-xs text-gray-400 mt-2">Đúng {result.correctCount}/{result.totalQuestions}, sai {result.wrongCount}, bỏ trống {result.unansweredCount}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className={`text-3xl font-black mb-1 ${result.score >= 8 ? 'text-green-600' : result.score >= 5 ? 'text-blue-600' : 'text-orange-600'}`}>
                      {result.score}
                    </div>
                    <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-purple-400 to-pink-500" style={{ width: `${(result.score / 10) * 100}%` }} />
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div>
            <button
              onClick={() => setSelectedResultId(null)}
              className="px-4 py-2 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200 transition-colors mb-6"
            >
              ← Quay lại lịch sử
            </button>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] mb-6">
              <div className="flex justify-between items-start gap-6 mb-6">
                <div>
                  <h2 className="text-2xl font-black text-gray-900 mb-2">{selectedResult.examTitle}</h2>
                  <p className="text-gray-500">📅 {formatDateTimeVi(selectedResult.submittedAt)} • ⏱️ {formatDuration(selectedResult.durationSeconds)}</p>
                </div>
                <div className="text-center">
                  <div className={`text-5xl font-black mb-2 ${selectedResult.score >= 8 ? 'text-green-600' : selectedResult.score >= 5 ? 'text-blue-600' : 'text-orange-600'}`}>
                    {selectedResult.score}
                  </div>
                  <p className="text-gray-600 font-bold">/10</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-2xl border border-green-100">
                  <p className="text-xs text-gray-600 font-bold mb-2">Đúng</p>
                  <p className="text-2xl font-black text-green-600">{selectedResult.correctCount}</p>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-2xl border border-red-100">
                  <p className="text-xs text-gray-600 font-bold mb-2">Sai</p>
                  <p className="text-2xl font-black text-red-600">{selectedResult.wrongCount}</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-2xl border border-orange-100">
                  <p className="text-xs text-gray-600 font-bold mb-2">Bỏ trống</p>
                  <p className="text-2xl font-black text-orange-600">{selectedResult.unansweredCount}</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-2xl border border-purple-100">
                  <p className="text-xs text-gray-600 font-bold mb-2">Tổng câu</p>
                  <p className="text-2xl font-black text-purple-600">{selectedResult.totalQuestions}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)]">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Chi tiết từng câu</h3>
              <div className="space-y-3">
                {selectedResult.details.map((detail) => (
                  <div key={detail.questionId} className={`p-4 rounded-2xl border ${detail.isCorrect ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
                    <div className="flex justify-between gap-4 mb-2">
                      <p className="font-bold text-gray-900">Câu {detail.questionNumber} • {getQuestionTypeLabel(detail.sectionType)}</p>
                      <span className={`text-xs font-black px-3 py-1 rounded-full ${detail.isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {detail.isCorrect ? 'Đúng' : detail.userAnswer ? 'Sai' : 'Bỏ trống'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">Bạn chọn: <strong>{detail.userAnswer || 'Không chọn'}</strong> • Đáp án đúng: <strong>{detail.correctAnswer || 'Chưa có đáp án'}</strong></p>
                    {detail.explanation && <p className="text-sm text-gray-700 mt-2">💡 {detail.explanation}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
