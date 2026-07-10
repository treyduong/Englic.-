'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import UserSidebar from '@/components/UserSidebar';
import { buildDashboardStats, ExamAttemptResult, formatDateTimeVi } from '@/lib/examTypes';
import { loadExamResults } from '@/lib/examLocalStorage';


export default function StudentDashboardPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [results, setResults] = useState<ExamAttemptResult[]>([]);

  useEffect(() => {
    if (isLoaded && !user) router.replace('/sign-in');
  }, [isLoaded, user, router]);

  useEffect(() => {
    setResults(loadExamResults());
  }, []);

  const studentName = user?.fullName || user?.firstName || 'Người dùng';
  const stats = useMemo(() => buildDashboardStats(results), [results]);
  const latestWeakType = stats.mistakesByType[0];

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
            <h1 className="text-3xl font-black text-gray-900 mb-2">Chào mừng trở lại, {studentName.split(' ').pop()}! 👋</h1>
            <p className="text-gray-500">Dashboard này chỉ thống kê từ các bài thi bạn đã làm thật trên website.</p>
          </div>
          <Link href="/de-thi" className="bg-white border border-gray-200 px-5 py-2.5 rounded-xl font-bold text-gray-700 hover:border-purple-300 hover:text-purple-600 transition-colors shadow-sm">
            Làm thêm đề
          </Link>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700" />
            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2 relative z-10">Số đề đã làm</p>
            <p className="text-4xl font-black text-gray-800 relative z-10">{stats.totalExams}</p>
            <p className="text-sm text-blue-500 font-medium mt-2 relative z-10">📚 đề thi hoàn thành</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700" />
            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2 relative z-10">Tổng số câu</p>
            <p className="text-4xl font-black text-gray-800 relative z-10">{stats.totalQuestions}</p>
            <p className="text-sm text-purple-500 font-medium mt-2 relative z-10">🎯 câu đã xử lý</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-50 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700" />
            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2 relative z-10">Điểm trung bình</p>
            <p className="text-4xl font-black text-gray-800 relative z-10">{stats.averageScore}</p>
            <p className="text-sm text-green-500 font-medium mt-2 relative z-10">Tính từ lịch sử làm đề</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700" />
            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2 relative z-10">Điểm cao nhất</p>
            <p className="text-4xl font-black text-gray-800 relative z-10">{stats.bestScore}</p>
            <p className="text-sm text-orange-500 font-medium mt-2 relative z-10">🏆 kết quả tốt nhất</p>
          </div>
        </div>

        {results.length === 0 ? (
          <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] text-center">
            <p className="text-5xl mb-4">📝</p>
            <h2 className="text-2xl font-black text-gray-900 mb-2">Chưa có dữ liệu làm bài</h2>
            <p className="text-gray-500 mb-6">Sau khi bạn nộp bài, điểm số, số câu đúng sai và dạng bài sai nhiều nhất sẽ tự động hiện ở đây.</p>
            <Link href="/de-thi" className="inline-flex px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-black">
              Đi tới kho đề
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
              <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)]">
                <h2 className="text-xl font-bold text-gray-900 mb-2">📈 Biểu đồ tiến độ gần đây</h2>
                <p className="text-sm text-gray-500 mb-6">Điểm số của tối đa 7 lần làm bài gần nhất</p>

                <div className="h-64 flex items-end gap-3 border-b border-gray-100 pb-4">
                  {[...stats.recentExams].reverse().map((result) => {
                    const heightPercent = Math.max((result.score / 10) * 100, 4);
                    return (
                      <div key={result.id} className="flex-1 flex flex-col items-center group relative cursor-pointer">
                        <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs font-bold py-1 px-2 rounded-md whitespace-nowrap z-10">
                          {result.score} điểm
                        </div>
                        <div
                          className="w-full bg-gradient-to-t from-blue-100 to-purple-400 rounded-t-lg group-hover:from-blue-200 group-hover:to-purple-500 transition-colors duration-300 relative overflow-hidden"
                          style={{ height: `${heightPercent}%` }}
                        >
                          <div className="absolute top-0 left-0 w-full h-1 bg-white/40" />
                        </div>
                        <span className="text-xs text-gray-400 mt-2 font-medium text-center line-clamp-2">
                          {new Date(result.submittedAt).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)]">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">📋 Lịch sử thi</h2>
                  <Link href="/dashboard/lich-su" className="text-sm font-bold text-purple-600 hover:text-purple-800">Xem tất cả</Link>
                </div>

                <div className="space-y-4">
                  {stats.recentExams.slice(0, 5).map((result) => (
                    <Link key={result.id} href="/dashboard/lich-su" className="p-4 rounded-2xl border border-gray-100 hover:border-purple-200 hover:shadow-md transition-all flex items-center justify-between group cursor-pointer bg-gray-50/50 hover:bg-white">
                      <div className="min-w-0">
                        <p className="font-bold text-gray-800 text-[15px] mb-1 line-clamp-1 group-hover:text-purple-700 transition-colors">{result.examTitle}</p>
                        <p className="text-xs text-gray-400">{formatDateTimeVi(result.submittedAt)}</p>
                      </div>
                      <div className={`flex items-center justify-center w-12 h-12 rounded-full font-black text-lg flex-shrink-0 ${result.score >= 8 ? 'bg-green-100 text-green-600' : result.score >= 5 ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'}`}>
                        {result.score}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)]">
              <h2 className="text-xl font-bold text-gray-900 mb-6">❌ Dạng bài sai nhiều nhất</h2>

              {stats.mistakesByType.length === 0 ? (
                <p className="text-gray-500">Chưa đủ dữ liệu phân tích dạng bài.</p>
              ) : (
                <div className="space-y-4">
                  {stats.mistakesByType.map((item, idx) => (
                    <div key={item.type} className="p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl border border-red-200 hover:border-red-300 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex-1">
                          <p className="font-bold text-gray-900 capitalize">{idx + 1}. {item.type}</p>
                          <p className="text-xs text-gray-500 mt-1">{item.mistakes}/{item.total} câu sai hoặc bỏ trống</p>
                        </div>
                        <span className="px-4 py-2 bg-red-100 text-red-600 font-black rounded-lg text-sm">
                          {item.errorRate}%
                        </span>
                      </div>
                      <div className="w-full h-2.5 bg-red-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-red-400 to-orange-500 rounded-full" style={{ width: `${item.errorRate}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {latestWeakType && (
                <div className="mt-6 p-5 bg-blue-50 border border-blue-200 rounded-2xl">
                  <p className="text-sm font-bold text-blue-900 mb-2">💡 Gợi ý cải thiện</p>
                  <p className="text-sm text-blue-800">
                    Bạn nên tập trung luyện thêm <strong>{latestWeakType.type}</strong> vì đây là nhóm câu có tỷ lệ sai cao nhất trong dữ liệu làm bài hiện tại.
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
