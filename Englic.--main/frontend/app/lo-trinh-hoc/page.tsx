'use client';

import React from 'react';
import Link from 'next/link';
import UserSidebar from '@/components/UserSidebar';

type LearningPath = {
  id: string;
  name: string;
  description?: string;
  progress?: number;
};

const learningPathsData: LearningPath[] = [];

export default function LearningPathsPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] flex font-sans text-gray-800">
      <UserSidebar />

      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        <header className="mb-10">
          <span className="inline-flex mb-4 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-black">
            Nội dung sẽ cập nhật thêm trong thời gian sắp tới
          </span>
          <h1 className="text-3xl font-black text-gray-900 mb-2">Lộ trình học tập</h1>
          <p className="text-gray-500">Lộ trình cá nhân hóa sẽ hiển thị khi có dữ liệu học tập thật.</p>
        </header>

        {learningPathsData.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] p-12 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50 text-4xl">🎯</div>
            <h2 className="text-2xl font-black text-gray-900 mb-3">Chưa có lộ trình học</h2>
            <p className="text-gray-500 max-w-xl mx-auto mb-6">
              Hiện chưa có dữ liệu lộ trình thật. Sau khi hệ thống có thông tin học tập hoặc lộ trình được cấu hình, nội dung sẽ được hiển thị tại đây.
            </p>
            <Link href="/de-thi" className="inline-flex px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-black">
              Luyện đề trước
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {learningPathsData.map((path) => (
              <Link key={path.id} href={`/lo-trinh-hoc/${path.id}`} className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
                <h3 className="font-bold text-gray-900">{path.name}</h3>
                {path.description && <p className="text-sm text-gray-500 mt-2">{path.description}</p>}
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
