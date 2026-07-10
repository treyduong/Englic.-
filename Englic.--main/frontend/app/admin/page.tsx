'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchExamSummaries } from '@/lib/examFetch';
import { loadAdminExamSummaries, loadExamResults } from '@/lib/examLocalStorage';
import { ExamSummary } from '@/lib/examTypes';

export default function FrontendAdminPage() {
  const [staticExams, setStaticExams] = useState<ExamSummary[]>([]);
  const [localExams, setLocalExams] = useState<ExamSummary[]>([]);
  const [attemptCount, setAttemptCount] = useState(0);

  useEffect(() => {
    fetchExamSummaries().then(setStaticExams).catch(() => setStaticExams([]));
    setLocalExams(loadAdminExamSummaries());
    setAttemptCount(loadExamResults().length);
  }, []);

  const totalQuestions = [...staticExams, ...localExams].reduce((sum, exam) => sum + exam.questions, 0);

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-gray-800 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap justify-between items-start gap-4 mb-8">
          <div>
            <Link href="/" className="text-gray-500 hover:text-purple-600 font-medium">← Về trang chủ</Link>
            <h1 className="text-4xl font-black mt-4 mb-2">Englic. Frontend Admin</h1>
            <p className="text-gray-500">Quản lý đề thi</p>
          </div>
          <Link href="/admin/de-thi/upload" className="px-5 py-3 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-black shadow-md">
            + Upload đề JSON
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <p className="text-sm font-bold text-gray-400 uppercase mb-2">Đề static</p>
            <p className="text-4xl font-black text-gray-900">{staticExams.length}</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <p className="text-sm font-bold text-gray-400 uppercase mb-2">Đề admin upload</p>
            <p className="text-4xl font-black text-gray-900">{localExams.length}</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <p className="text-sm font-bold text-gray-400 uppercase mb-2">Tổng câu hỏi</p>
            <p className="text-4xl font-black text-gray-900">{totalQuestions}</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <p className="text-sm font-bold text-gray-400 uppercase mb-2">Lượt làm bài</p>
            <p className="text-4xl font-black text-gray-900">{attemptCount}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Link href="/admin/de-thi" className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:border-purple-200 hover:shadow-md transition-all">
            <p className="text-3xl mb-3">📚</p>
            <h2 className="text-xl font-black mb-2">Quản lý đề thi</h2>
            <p className="text-sm text-gray-500">Xem đề static và đề đã upload bằng localStorage.</p>
          </Link>
          <Link href="/admin/de-thi/upload" className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:border-purple-200 hover:shadow-md transition-all">
            <p className="text-3xl mb-3">⬆️</p>
            <h2 className="text-xl font-black mb-2">Upload JSON</h2>
            <p className="text-sm text-gray-500">Import file JSON v2 trực tiếp vào frontend admin.</p>
          </Link>
          <Link href="/api/route-map" target="_blank" className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:border-purple-200 hover:shadow-md transition-all">
            <p className="text-3xl mb-3">🧭</p>
            <h2 className="text-xl font-black mb-2">Route map</h2>
            <p className="text-sm text-gray-500">Route đọc dữ liệu và điều hướng dùng khi deploy Vercel.</p>
          </Link>
        </div>

        <div className="mt-8 p-5 rounded-2xl bg-amber-50 border border-amber-200 text-sm text-amber-800">
          <strong>Lưu ý Vercel:</strong> đề upload bằng admin frontend được lưu trong localStorage của trình duyệt hiện tại. Để public đề cho mọi user sau khi deploy, hãy đưa file JSON vào <code>frontend/public/exams</code> và cập nhật <code>index.json</code>, hoặc kết nối database/KV.
        </div>
      </div>
    </div>
  );
}
