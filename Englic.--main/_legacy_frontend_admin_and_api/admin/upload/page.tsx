"use client";

import React, { useState } from 'react';

export default function UploadExamPage() {
  const [file, setFile] = useState<File | null>(null);
  const [examName, setExamName] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Xử lý khi người dùng chọn ảnh
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      // Tạo URL tạm thời để hiển thị ảnh preview
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  // Xử lý khi bấm nút Đăng Đề Thi
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !examName) return alert("Vui lòng điền đủ thông tin và chọn ảnh!");

    setIsUploading(true);
    // (Phần này sẽ gọi API để upload lên Cloudinary và lưu vào Database - chúng ta sẽ làm ở bước sau)
    
    // Giả lập thời gian upload
    setTimeout(() => {
      alert("🎉 Đã tải lên đề thi thành công!");
      setIsUploading(false);
      setFile(null);
      setPreviewUrl(null);
      setExamName('');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-8">
        <div className="mb-8 border-b pb-6">
          <h1 className="text-3xl font-black text-gray-900">Tải lên Đề thi mới</h1>
          <p className="text-gray-500 mt-2">Hệ thống quản trị nội dung Englic.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Thông tin cơ bản */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Tên đề thi</label>
            <input 
              type="text" 
              value={examName}
              onChange={(e) => setExamName(e.target.value)}
              placeholder="VD: Đề thi thử THPT Quốc gia 2025 - Sở Hà Nội" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            />
          </div>

          {/* Vùng kéo thả / Chọn ảnh */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Hình ảnh đề thi</label>
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:bg-gray-50 transition-colors relative">
              <input 
                type="file" 
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              
              {!previewUrl ? (
                <div className="space-y-3 pointer-events-none">
                  <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto text-2xl">📸</div>
                  <p className="font-semibold text-gray-700">Kéo thả ảnh vào đây hoặc Click để chọn</p>
                  <p className="text-sm text-gray-500">Hỗ trợ định dạng: JPG, PNG (Tối đa 5MB)</p>
                </div>
              ) : (
                <div className="relative rounded-xl overflow-hidden pointer-events-none">
                  <img src={previewUrl} alt="Preview" className="w-full h-auto max-h-[400px] object-contain bg-gray-100" />
                </div>
              )}
            </div>
          </div>

          {/* Nút Upload */}
          <button 
            type="submit" 
            disabled={isUploading}
            className={`w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg ${isUploading ? 'opacity-70 cursor-wait' : 'hover:scale-[1.02]'}`}
          >
            {isUploading ? 'Đang xử lý tải lên...' : 'Tải lên Hệ thống'}
          </button>
        </form>
      </div>
    </div>
  );
}