'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import React from 'react';

interface UserSidebarProps {
  userName?: string;
  userRole?: string;
}

export default function UserSidebar({ userName, userRole = 'Học viên' }: UserSidebarProps) {
  const pathname = usePathname();
  const { user } = useUser();
  const displayName = userName || user?.fullName || user?.firstName || user?.primaryEmailAddress?.emailAddress || 'Tài khoản';
  const avatarLetter = displayName.trim().charAt(0).toUpperCase() || 'E';

  const navItems = [
    { href: '/dashboard', label: 'Tổng quan', icon: '📊' },
    { href: '/profile', label: 'Hồ sơ cá nhân', icon: '👤' },
    { href: '/khoa-hoc', label: 'Khoá học', icon: '📚' },
    { href: '/de-thi', label: 'Luyện thi', icon: '📝' },
    { href: '/lo-trinh-hoc', label: 'Lộ trình học', icon: '🎯' },
    { href: '/sach-song-ngu', label: 'Tủ sách', icon: '📖' },
    { href: '/settings', label: 'Cài đặt', icon: '⚙️' },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col fixed h-full z-20">
      <div className="p-6 border-b border-gray-100">
        <Link href="/" className="text-2xl font-black tracking-tighter bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-transparent bg-clip-text">
          Englic.
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
              isActive(item.href)
                ? 'bg-purple-50 text-purple-700 font-bold shadow-sm'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <Link href="/profile" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors">
          {user?.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.imageUrl} alt="Ảnh đại diện" className="h-10 w-10 rounded-full object-cover" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
              {avatarLetter}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-gray-900 truncate">{displayName}</p>
            <p className="text-xs text-gray-400 truncate">{userRole}</p>
          </div>
        </Link>
      </div>
    </aside>
  );
}
