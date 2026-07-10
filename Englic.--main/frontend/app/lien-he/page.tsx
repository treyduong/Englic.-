"use client";

import React, { useState } from 'react';
import Link from 'next/link';


export default function ContactPageModern() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      alert("Tuyệt vời! Lời nhắn của bạn đã được gửi đến Englic.");
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className={`min-h-screen bg-[#f8f7ff] text-gray-800 selection:bg-purple-200 pb-20 font-sans`}>
      
      {/* Nút Quay lại - Đặt floating góc trên */}
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
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 drop-shadow-md tracking-tight">
            Hãy kết nối với chúng tôi
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed font-medium">
            Mọi thắc mắc, góp ý hay mong muốn hợp tác của bạn đều là mảnh ghép quan trọng giúp Englic hoàn thiện mỗi ngày.
          </p>
        </div>
      </div>

      {/* --- 3 THẺ THÔNG TIN --- */}
      <div className="max-w-7xl mx-auto px-6 relative z-20 -mt-20 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-[0_10px_40px_rgb(168,85,247,0.05)] border border-purple-100/50 hover:-translate-y-2 transition-transform duration-300 group text-center">
            <div className="w-16 h-16 mx-auto bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 text-3xl mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">📍</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Trụ sở chính</h3>
            <p className="text-gray-500 text-sm leading-relaxed">Chưa có gì để có thể đặt cạ</p>
          </div>

          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-[0_10px_40px_rgb(168,85,247,0.05)] border border-purple-100/50 hover:-translate-y-2 transition-transform duration-300 group text-center">
            <div className="w-16 h-16 mx-auto bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 text-3xl mb-6 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all">📧</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Email hỗ trợ</h3>
            <p className="text-gray-500 text-sm leading-relaxed">Gửi email cho chúng tôi bất cứ lúc nào<br/><span className="font-semibold text-purple-600">support@englic.io.vn</span></p>
          </div>

          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-[0_10px_40px_rgb(168,85,247,0.05)] border border-purple-100/50 hover:-translate-y-2 transition-transform duration-300 group text-center">
            <div className="w-16 h-16 mx-auto bg-pink-50 rounded-2xl flex items-center justify-center text-pink-600 text-3xl mb-6 group-hover:scale-110 group-hover:bg-pink-600 group-hover:text-white transition-all">📞</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Đường dây nóng</h3>
            <p className="text-gray-500 text-sm leading-relaxed">Hỗ trợ trực tiếp từ 8h00 - 18h00<br/><span className="font-semibold text-pink-600">0123.456.789</span></p>
          </div>

        </div>
      </div>

      {/* --- KHU VỰC FORM --- */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-[2rem] shadow-[0_10px_40px_rgb(168,85,247,0.04)] border border-purple-100 p-8 md:p-14">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Gửi lời nhắn cho chúng tôi</h2>
            <p className="text-gray-500">Chúng tôi thường phản hồi trong vòng 24 giờ làm việc.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Họ và tên <span className="text-red-500">*</span></label>
                <input required type="text" placeholder="" className="w-full bg-[#f8f7ff] border border-purple-100/50 rounded-2xl px-5 py-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 focus:bg-white transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Email <span className="text-red-500">*</span></label>
                <input required type="email" placeholder="email@cuaban.com" className="w-full bg-[#f8f7ff] border border-purple-100/50 rounded-2xl px-5 py-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 focus:bg-white transition-all" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Bạn cần hỗ trợ về vấn đề gì?</label>
              <select className="w-full bg-[#f8f7ff] border border-purple-100/50 rounded-2xl px-5 py-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 focus:bg-white transition-all appearance-none cursor-pointer">
                <option>Báo cáo lỗi website / hệ thống</option>
                <option>Thắc mắc về đáp án đề thi</option>
                <option>Hợp tác nội dung / Kinh doanh</option>
                <option>Vấn đề khác</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Nội dung chi tiết <span className="text-red-500">*</span></label>
              <textarea required rows={5} placeholder="Xin chào Englic, mình muốn hỏi về..." className="w-full bg-[#f8f7ff] border border-purple-100/50 rounded-2xl px-5 py-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 focus:bg-white transition-all resize-none"></textarea>
            </div>

            <div className="pt-4 text-center">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full md:w-auto px-12 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white py-4 rounded-full font-bold text-lg shadow-[0_10px_20px_rgba(168,85,247,0.3)] hover:shadow-[0_10px_30px_rgba(168,85,247,0.5)] hover:-translate-y-1 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? "ĐANG GỬI..." : "GỬI YÊU CẦU NGAY"}
              </button>
            </div>

          </form>
        </div>
      </div>

    </div>
  );
}