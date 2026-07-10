'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { fetchExamSummaries } from '@/lib/examFetch';
import { loadAdminExamSummaries } from '@/lib/examLocalStorage';
import { ExamSummary } from '@/lib/examTypes';


export default function ExamsListClient() {
  const [activeTab, setActiveTab] = useState('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');
  const [exams, setExams] = useState<ExamSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadExams = async () => {
      try {
        const staticExams = await fetchExamSummaries();
        const localExams = loadAdminExamSummaries();
        const merged = [...localExams, ...staticExams].filter(
          (exam, index, arr) => index === arr.findIndex((item) => item.id === exam.id),
        );
        setExams(merged);
      } catch (err) {
        setError('Không tải được kho đề. Vui lòng kiểm tra /api/exams hoặc frontend/public/exams/index.json.');
      } finally {
        setIsLoading(false);
      }
    };

    loadExams();
  }, []);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(exams.map((exam) => exam.category || 'Tiếng Anh')));
    return ['Tất cả', ...unique];
  }, [exams]);

  const filteredExams = exams.filter((exam) => {
    const matchCategory = activeTab === 'Tất cả' || exam.category === activeTab;
    const query = searchQuery.trim().toLowerCase();
    const matchSearch = !query || `${exam.title} ${exam.source || ''} ${(exam.tags || []).join(' ')}`.toLowerCase().includes(query);
    return matchCategory && matchSearch;
  });

  return (
    <div className={`min-h-screen bg-white text-gray-800 selection:bg-purple-200 font-sans`}>
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <Link href="/" className="inline-flex items-center text-gray-500 hover:text-purple-600 font-medium transition-colors">
            <span className="mr-2">←</span> Trang chủ
          </Link>
          <Link href="/admin/de-thi" className="px-4 py-2 rounded-xl border border-purple-200 text-purple-700 font-bold hover:bg-purple-50 transition-colors">
            Admin quản lý đề
          </Link>
        </div>

        <div className="text-center mb-10">
          <p className="text-sm font-bold text-purple-600 uppercase tracking-[0.2em] mb-3">Kho đề thi</p>
          <h1 className="text-4xl md:text-5xl font-black mb-6">
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text drop-shadow-sm">
              Danh sách đề thi THPTQG
            </span>
          </h1>

          <div className="inline-block relative p-[1px] rounded-2xl bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 max-w-3xl">
            <div className="bg-white/80 backdrop-blur-sm rounded-[15px] p-4 text-sm text-gray-600">
              Dữ liệu đề thi được cập nhập thường xuyên theo từng năm.
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-5 py-2 rounded-full font-semibold text-sm transition-all duration-300 border ${
                activeTab === cat
                  ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white border-transparent shadow-[0_0_15px_rgba(168,85,247,0.4)] scale-105'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-purple-300 hover:text-purple-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex justify-center mb-12">
          <div className="relative w-full max-w-md group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-500" />
            <input
              type="text"
              placeholder="Tìm theo tên đề, nguồn, tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="relative w-full bg-white border border-gray-200 rounded-full px-6 py-3 text-gray-700 outline-none focus:border-transparent focus:ring-2 focus:ring-purple-400 transition-all shadow-sm"
            />
          </div>
        </div>

        {isLoading && (
          <div className="text-center py-16 text-gray-500 font-semibold">Đang tải kho đề...</div>
        )}

        {!isLoading && error && (
          <div className="max-w-2xl mx-auto p-5 rounded-2xl bg-red-50 text-red-700 border border-red-200 text-center font-medium">
            {error}
          </div>
        )}

        {!isLoading && !error && filteredExams.length === 0 && (
          <div className="text-center py-16 bg-gray-50 border border-gray-100 rounded-3xl">
            <p className="text-2xl mb-2">📭</p>
            <p className="font-bold text-gray-700">Chưa có đề phù hợp.</p>
            <p className="text-sm text-gray-500 mt-1">Hãy đổi bộ lọc hoặc upload thêm đề trong admin.</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredExams.map((exam) => (
            <div key={exam.id} className="relative group p-[2px] rounded-2xl bg-gray-200 hover:bg-gradient-to-r hover:from-blue-400 hover:via-purple-400 hover:to-pink-400 transition-all duration-500 shadow-sm hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] flex flex-col">
              <div className="bg-white rounded-[14px] p-6 flex flex-col h-full relative overflow-hidden">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs font-bold text-purple-600 bg-purple-50 border border-purple-200 px-3 py-1 rounded-full">
                    {exam.category}
                  </span>
                  {exam.storage === 'admin-local' && (
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                      Admin upload
                    </span>
                  )}
                </div>

                <h3 className="relative z-10 text-lg font-bold text-gray-900 mb-3 line-clamp-3 leading-snug group-hover:text-purple-700 transition-colors">
                  {exam.title}
                </h3>

                <div className="relative z-10 flex flex-wrap gap-4 text-sm text-gray-500 mb-6 font-medium">
                  <span className="flex items-center gap-1.5"><span className="text-blue-500">⏱</span> {exam.time}</span>
                  <span className="flex items-center gap-1.5"><span className="text-purple-500">📄</span> {exam.questions} câu</span>
                  <span className="flex items-center gap-1.5"><span className="text-pink-500">👤</span> {exam.attempts || 0} lượt làm</span>
                </div>

                {exam.source && <p className="text-xs text-gray-400 mb-5 line-clamp-1">Nguồn: {exam.source}</p>}

                <div className="relative z-10 mt-auto pt-2">
                  <Link href={`/de-thi/${encodeURIComponent(exam.id)}`} className="block w-full">
                    <button className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-500 to-emerald-400 group-hover:from-blue-500 group-hover:via-purple-500 group-hover:to-pink-500 transition-all duration-500 shadow-md group-hover:shadow-[0_0_20px_rgba(168,85,247,0.5)]">
                      Làm bài ngay
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
