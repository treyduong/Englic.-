'use client';

import React from 'react';
import Link from 'next/link';
import UserSidebar from '@/components/UserSidebar';

type Course = {
  id: string;
  name: string;
  instructor?: string;
  progress?: number;
  lessons?: number;
  completedLessons?: number;
  status?: 'in-progress' | 'completed';
  tag?: string;
};

const coursesData: Course[] = [];
const updateTag = 'Sẽ cập nhật thêm trong thời gian sắp tới';

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] flex font-sans text-gray-800">
      <UserSidebar />

      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        <header className="mb-10">
          <div className="flex justify-between items-end gap-6 mb-6">
            <div>
              <span className="inline-flex mb-4 px-4 py-2 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-sm font-black">
                Tag: {updateTag}
              </span>
              <h1 className="text-3xl font-black text-gray-900 mb-2">Khoá học của bạn</h1>
              <p className="text-gray-500">Khu vực quản lý khóa học sẽ hiển thị khi có dữ liệu khóa học thật.</p>
            </div>
            <Link
              href="/de-thi"
              className="px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold rounded-xl hover:scale-105 transition-transform"
            >
              Đi tới kho đề
            </Link>
          </div>

          <div className="flex gap-3 border-b border-gray-200">
            {[
              { value: 'all', label: `📚 Tất cả (${coursesData.length})` },
              { value: 'in-progress', label: '⏳ Đang học (0)' },
              { value: 'completed', label: '✅ Đã hoàn thành (0)' },
            ].map((tab, index) => (
              <button
                key={tab.value}
                disabled={index !== 0}
                className={`px-5 py-3 font-bold transition-all ${
                  index === 0
                    ? 'text-purple-600 border-b-2 border-purple-600'
                    : 'text-gray-400 cursor-not-allowed'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </header>

        {coursesData.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] p-12 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-purple-50 text-4xl">📚</div>
            <h2 className="text-2xl font-black text-gray-900 mb-3">Chưa có khóa học</h2>
            <p className="text-gray-500 max-w-xl mx-auto mb-6">
              Hiện chưa có dữ liệu khóa học thật trong hệ thống. Khi nội dung khóa học được cập nhật, danh sách khóa học, tiến độ và bài học sẽ hiển thị tại đây.
            </p>
            <span className="inline-flex px-4 py-2 rounded-full bg-blue-50 text-blue-700 border border-blue-100 font-bold text-sm">
              {updateTag}
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coursesData.map((course) => (
              <Link
                key={course.id}
                href={`/khoa-hoc/${course.id}`}
                className="bg-white rounded-3xl border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] overflow-hidden hover:shadow-lg hover:border-purple-200 transition-all group cursor-pointer"
              >
                <div className="p-6">
                  <span className="inline-flex mb-3 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-black">
                    {course.tag || updateTag}
                  </span>
                  <h3 className="font-bold text-gray-900 mb-1 line-clamp-2 group-hover:text-purple-600 transition-colors">
                    {course.name}
                  </h3>
                  {course.instructor && <p className="text-xs text-gray-500 mb-4">👨‍🏫 {course.instructor}</p>}
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
