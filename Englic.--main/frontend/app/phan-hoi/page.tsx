"use client";

import React, { useState } from 'react';
import Link from 'next/link';


export default function FeedbackAndComplaintPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      alert("Cảm ơn bạn! Phản hồi của bạn đã được ghi nhận và sẽ được xử lý sớm nhất.");
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className={`min-h-screen bg-[#f8f7ff] text-gray-800 selection:bg-purple-200 pb-20 font-sans`}>
      
      {/* Nút Quay lại */}
      <div className="absolute top-6 left-6 z-50">
        <Link href="/" className="inline-flex items-center text-white/80 hover:text-white font-medium bg-black/10 hover:bg-black/20 px-4 py-2 rounded-full backdrop-blur-md transition-all">
          <span className="mr-2">←</span> Trang chủ
        </Link>
      </div>

      {/* --- HERO BANNER --- */}
      <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 pt-32 pb-40 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-white/10 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] bg-blue-300/20 rounded-full blur-[80px] pointer-events-none"></div>
        
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-white text-sm font-bold mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            Luôn lắng nghe bạn
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 drop-shadow-md tracking-tight">
            Gửi phản hồi & Khiếu nại
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed font-medium">
            Englic cam kết mang lại môi trường học tập minh bạch và công bằng. Mọi vấn đề của bạn sẽ được đội ngũ ưu tiên xử lý triệt để.
          </p>
        </div>
      </div>

      {/* --- 3 THẺ CAM KẾT (Overlapping) --- */}
      <div className="max-w-7xl mx-auto px-6 relative z-20 -mt-20 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-[0_10px_40px_rgb(168,85,247,0.05)] border border-purple-100/50 hover:-translate-y-2 transition-transform duration-300 group text-center">
            <div className="w-16 h-16 mx-auto bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 text-3xl mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">⏱️</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Xử lý thần tốc</h3>
            <p className="text-gray-500 text-sm leading-relaxed">Bộ phận CSKH sẽ tiếp nhận và phản hồi bước đầu trong vòng <strong className="text-blue-600">24 giờ làm việc</strong>.</p>
          </div>

          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-[0_10px_40px_rgb(168,85,247,0.05)] border border-purple-100/50 hover:-translate-y-2 transition-transform duration-300 group text-center">
            <div className="w-16 h-16 mx-auto bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 text-3xl mb-6 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all">🔒</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Bảo mật tuyệt đối</h3>
            <p className="text-gray-500 text-sm leading-relaxed">Thông tin cá nhân và nội dung khiếu nại của bạn được bảo vệ nghiêm ngặt, không tiết lộ ra bên ngoài.</p>
          </div>

          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-[0_10px_40px_rgb(168,85,247,0.05)] border border-purple-100/50 hover:-translate-y-2 transition-transform duration-300 group text-center">
            <div className="w-16 h-16 mx-auto bg-pink-50 rounded-2xl flex items-center justify-center text-pink-600 text-3xl mb-6 group-hover:scale-110 group-hover:bg-pink-600 group-hover:text-white transition-all">⚖️</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Giải quyết công bằng</h3>
            <p className="text-gray-500 text-sm leading-relaxed">Cam kết đối soát minh bạch dựa trên dữ liệu hệ thống để đảm bảo quyền lợi tối đa cho học viên.</p>
          </div>

        </div>
      </div>

      {/* --- KHU VỰC FORM KHIẾU NẠI --- */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-[2rem] shadow-[0_10px_40px_rgb(168,85,247,0.04)] border border-purple-100 p-8 md:p-14 relative overflow-hidden">
          
          <div className="text-center mb-10 relative z-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Phiếu ghi nhận thông tin</h2>
            <p className="text-gray-500">Vui lòng cung cấp thông tin chính xác để chúng tôi hỗ trợ bạn nhanh nhất.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Họ và tên <span className="text-red-500">*</span></label>
                <input required type="text" placeholder="" className="w-full bg-[#f8f7ff] border border-purple-100/50 rounded-2xl px-5 py-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 focus:bg-white transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Số điện thoại / ID Tài khoản</label>
                <input type="text" placeholder="09xx... hoặc ID: 12345" className="w-full bg-[#f8f7ff] border border-purple-100/50 rounded-2xl px-5 py-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 focus:bg-white transition-all" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Danh mục khiếu nại <span className="text-red-500">*</span></label>
              <select className="w-full bg-[#f8f7ff] border border-purple-100/50 rounded-2xl px-5 py-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 focus:bg-white transition-all appearance-none cursor-pointer">
                <option>Sai sót trong đáp án / Đề thi lỗi</option>
                <option>Lỗi hệ thống (Không nộp được bài, lag...)</option>
                <option>Vấn đề về thanh toán / Nâng cấp tài khoản</option>
                <option>Phản ánh thái độ CSKH</option>
                <option>Khác</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Mô tả chi tiết sự việc <span className="text-red-500">*</span></label>
              <textarea required rows={5} placeholder="Ví dụ: Vào lúc 14h ngày hôm nay, khi mình làm đề Hưng Yên đến câu 30 thì hệ thống báo lỗi..." className="w-full bg-[#f8f7ff] border border-purple-100/50 rounded-2xl px-5 py-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 focus:bg-white transition-all resize-none"></textarea>
            </div>

            {/* Tính năng upload bằng chứng (Giao diện UI) */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Đính kèm hình ảnh/Video (Nếu có)</label>
              <div className="w-full border-2 border-dashed border-purple-200 rounded-2xl bg-[#f8f7ff] p-8 text-center hover:bg-purple-50/50 transition-colors cursor-pointer">
                <div className="text-4xl mb-3">📁</div>
                <p className="text-gray-600 font-medium text-sm">Kéo thả file vào đây hoặc <span className="text-purple-600 underline">chọn file</span></p>
                <p className="text-xs text-gray-400 mt-2">Hỗ trợ JPG, PNG, MP4 (Tối đa 10MB)</p>
              </div>
            </div>

            <div className="pt-6 text-center">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full md:w-auto px-12 bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 text-white py-4 rounded-full font-bold text-lg shadow-[0_10px_20px_rgba(236,72,153,0.3)] hover:shadow-[0_10px_30px_rgba(236,72,153,0.5)] hover:-translate-y-1 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? "ĐANG XỬ LÝ..." : "GỬI KHIẾU NẠI"}
              </button>
            </div>

          </form>
        </div>
      </div>

    </div>
  );
}