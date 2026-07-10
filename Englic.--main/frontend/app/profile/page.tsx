'use client';

import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import UserSidebar from '@/components/UserSidebar';

type ProfileForm = {
  fullName: string;
  email: string;
  phone: string;
  bio: string;
  targetScore: string;
  currentScore: string;
};

const emptyProfile: ProfileForm = {
  fullName: '',
  email: '',
  phone: '',
  bio: '',
  targetScore: '',
  currentScore: '',
};

function formatDate(value?: Date | string | number | null) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export default function ProfilePage() {
  const { user, isLoaded } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ProfileForm>(emptyProfile);

  useEffect(() => {
    if (!user) return;
    setFormData({
      fullName: user.fullName || '',
      email: user.primaryEmailAddress?.emailAddress || '',
      phone: user.primaryPhoneNumber?.phoneNumber || '',
      bio: '',
      targetScore: '',
      currentScore: '',
    });
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!user) return;
    const trimmedName = formData.fullName.trim();
    if (trimmedName && trimmedName !== user.fullName) {
      const [firstName, ...rest] = trimmedName.split(' ');
      await user.update({ firstName, lastName: rest.join(' ') });
    }
    setIsEditing(false);
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-semibold">Đang tải hồ sơ...</p>
        </div>
      </div>
    );
  }

  const displayName = formData.fullName || user?.primaryEmailAddress?.emailAddress || 'Tài khoản';
  const avatarLetter = displayName.trim().charAt(0).toUpperCase() || 'E';
  const joinedAt = formatDate(user?.createdAt);

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex font-sans text-gray-800">
      <UserSidebar />

      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        <header className="mb-12">
          <h1 className="text-3xl font-black text-gray-900 mb-2">Hồ sơ cá nhân</h1>
          <p className="text-gray-500">Thông tin bên dưới được lấy từ tài khoản Clerk. Các trường chưa có dữ liệu sẽ để trống.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Thông tin cơ bản</h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-4 py-2 bg-purple-100 text-purple-600 font-bold rounded-xl hover:bg-purple-200 transition-colors"
                >
                  {isEditing ? 'Huỷ' : 'Chỉnh sửa'}
                </button>
              </div>

              <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-100">
                {user?.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={user.imageUrl} alt="Ảnh đại diện" className="h-24 w-24 rounded-3xl object-cover" />
                ) : (
                  <div className="w-24 h-24 rounded-3xl bg-gradient-to-r from-blue-400 to-purple-500 text-white flex items-center justify-center text-4xl font-black">
                    {avatarLetter}
                  </div>
                )}
                <div>
                  <h3 className="text-2xl font-black text-gray-900">{displayName}</h3>
                  <p className="text-gray-500">{formData.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Họ và tên</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 disabled:bg-gray-50 disabled:text-gray-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    disabled
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Số điện thoại</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    disabled
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Ngày tham gia</label>
                  <input
                    type="text"
                    value={joinedAt}
                    disabled
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Mục tiêu điểm</label>
                  <input
                    type="text"
                    name="targetScore"
                    value={formData.targetScore}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 disabled:bg-gray-50 disabled:text-gray-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Điểm hiện tại</label>
                  <input
                    type="text"
                    name="currentScore"
                    value={formData.currentScore}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 disabled:bg-gray-50 disabled:text-gray-500 transition-colors"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Ghi chú học tập</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 disabled:bg-gray-50 disabled:text-gray-500 transition-colors resize-none"
                  />
                </div>
              </div>

              {isEditing && (
                <div className="mt-8 flex gap-3 justify-end">
                  <button onClick={() => setIsEditing(false)} className="px-6 py-3 border border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors">
                    Huỷ
                  </button>
                  <button onClick={handleSave} className="px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold rounded-xl hover:scale-105 transition-transform">
                    Lưu thay đổi
                  </button>
                </div>
              )}
            </section>
          </div>

          <div className="space-y-8">
            <section className="bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)]">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Tài khoản</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-500">Trạng thái</span>
                  <span className="text-gray-900 font-bold">Đã đăng nhập</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-500">Email xác thực</span>
                  <span className="text-gray-900 font-bold">{user?.primaryEmailAddress?.verification?.status || ''}</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-gray-500">Mã người dùng</span>
                  <span className="text-gray-900 font-bold text-xs truncate max-w-[140px]">{user?.id || ''}</span>
                </div>
              </div>
            </section>

            <section className="bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)]">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Dữ liệu học tập</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Tiến độ, gói học và lịch sử chỉ hiển thị khi có dữ liệu thật phát sinh từ hệ thống. Hiện tại các mục chưa có dữ liệu sẽ được để trống.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
