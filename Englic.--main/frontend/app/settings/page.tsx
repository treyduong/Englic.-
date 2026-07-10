'use client';

import React from 'react';
import { SignOutButton, UserProfile, useUser } from '@clerk/nextjs';
import UserSidebar from '@/components/UserSidebar';

export default function SettingsPage() {
  const { isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-semibold">Đang tải cài đặt...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex font-sans text-gray-800">
      <UserSidebar />

      <main className="flex-1 ml-64 p-8 overflow-y-auto max-w-6xl">
        <header className="mb-10">
          <h1 className="text-3xl font-black text-gray-900 mb-2">Cài đặt tài khoản</h1>
          <p className="text-gray-500">Thông tin đăng nhập, bảo mật và phiên đăng nhập được quản lý bằng Clerk.</p>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_320px] gap-8">
          <section className="bg-white rounded-3xl border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] p-4 overflow-hidden">
            <UserProfile routing="hash" />
          </section>

          <aside className="space-y-6">
            <section className="bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)]">
              <h2 className="text-lg font-bold text-gray-900 mb-3">Tuỳ chọn học tập</h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                Chưa có dữ liệu cấu hình học tập riêng. Khi có hệ thống lưu cấu hình, các lựa chọn như mục tiêu, lịch nhắc học và ngôn ngữ sẽ hiển thị tại đây.
              </p>
            </section>

            <section className="bg-red-50 p-6 rounded-3xl border border-red-200 shadow-[0_10px_40px_rgba(0,0,0,0.03)]">
              <h2 className="text-lg font-bold text-red-900 mb-3">Đăng xuất</h2>
              <p className="text-sm text-red-700 mb-4">Thoát khỏi tài khoản hiện tại trên thiết bị này.</p>
              <SignOutButton redirectUrl="/">
                <button className="w-full px-6 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors">
                  Đăng xuất
                </button>
              </SignOutButton>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
}
