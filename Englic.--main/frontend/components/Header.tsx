'use client';

import React from 'react';
import Link from 'next/link';
import { SignInButton, UserButton, useUser } from '@clerk/nextjs';

function AuthNavigation() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) {
    return <div className="h-10 w-32 rounded-full bg-gray-100 animate-pulse" aria-label="Đang tải tài khoản" />;
  }

  if (isSignedIn) {
    return (
      <>
        <Link href="/dashboard" className="hidden sm:block text-sm font-bold text-gray-700 hover:text-purple-600">
          👋 {user?.firstName || user?.fullName || 'Tài khoản'}
        </Link>
        <UserButton
          appearance={{
            elements: {
              avatarBox: 'w-10 h-10',
            },
          }}
        />
      </>
    );
  }

  return (
    <>
      <Link href="/sign-up" className="bg-white border border-gray-300 text-black px-6 py-2.5 rounded-full font-bold hover:bg-gray-50 transition-all">
        Đăng ký
      </Link>
      <SignInButton mode="modal" fallbackRedirectUrl="/dashboard">
        <button className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-6 py-2.5 rounded-full font-bold hover:scale-105 transition-all shadow-md">
          Đăng nhập
        </button>
      </SignInButton>
    </>
  );
}

export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-3xl font-black tracking-tighter bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text" aria-label="Englic trang chủ">
          Englic.
        </Link>

        <nav className="hidden md:flex space-x-8 items-center font-semibold text-gray-600" aria-label="Điều hướng chính">
          <Link href="/de-thi" className="relative group hover:text-gray-900 transition-colors duration-300">
            Đề thi online
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-emerald-400 transition-all duration-300 group-hover:w-full" />
          </Link>
          <Link href="/lo-trinh-hoc" className="relative group hover:text-gray-900 transition-colors duration-300">
            Khóa học
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-purple-400 transition-all duration-300 group-hover:w-full" />
          </Link>
          <Link href="/sach-song-ngu" className="relative group hover:text-gray-900 transition-colors duration-300">
            Sách song ngữ
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-blue-400 transition-all duration-300 group-hover:w-full" />
          </Link>
          <Link href="/huong-dan-thanh-toan" className="relative group hover:text-gray-900 transition-colors duration-300">
            Thanh toán
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full" />
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <AuthNavigation />
        </div>
      </div>
    </header>
  );
}
