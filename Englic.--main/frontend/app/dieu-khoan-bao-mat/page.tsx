import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Điều khoản bảo mật',
  description: 'Chính sách bảo mật và xử lý dữ liệu người dùng của Englic.',
  alternates: { canonical: '/dieu-khoan-bao-mat' },
};



export default function PrivacyPolicyPage() {
  return (
    <div className={`min-h-screen bg-gray-50/50 text-gray-800 selection:bg-purple-200 py-12 font-sans`}>
      
      {/* Nút Quay lại */}
      <div className="max-w-4xl mx-auto px-6 mb-8">
        <Link href="/" className="inline-flex items-center text-gray-500 hover:text-purple-600 font-medium transition-colors">
          <span className="mr-2">←</span> Về trang chủ
        </Link>
      </div>

      <main className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12 relative overflow-hidden">
          
          {/* Background Hologram nhẹ ở góc */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-purple-200/40 via-blue-200/40 to-transparent rounded-bl-full pointer-events-none"></div>

          {/* Tiêu đề trang */}
          <div className="relative z-10 mb-10 border-b border-gray-100 pb-8">
            <h1 className="text-3xl md:text-4xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Điều khoản bảo mật
            </h1>
            <p className="text-gray-500">Cập nhật lần cuối: 11/04/2026</p>
          </div>

          {/* Nội dung văn bản (Prose) */}
          <div className="relative z-10 space-y-8 text-gray-600 leading-relaxed text-[16px]">
            
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">1. Mục đích thu thập thông tin</h2>
              <p>
                Englic thu thập thông tin cá nhân của người dùng nhằm mục đích cung cấp trải nghiệm học tập cá nhân hóa, duy trì tài khoản, xử lý thanh toán và gửi các thông báo quan trọng liên quan đến quá trình ôn thi THPT Quốc Gia của bạn.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">2. Phạm vi thu thập</h2>
              <p className="mb-2">Chúng tôi chỉ thu thập các thông tin cần thiết bao gồm:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Họ và tên, Email, Số điện thoại (khi đăng ký tài khoản).</li>
                <li>Lịch sử làm bài thi, điểm số và thời gian truy cập để phân tích lộ trình học tập.</li>
                <li>Lịch sử giao dịch (nếu có mua khóa học/tài liệu). Chúng tôi KHÔNG lưu trữ trực tiếp thông tin thẻ tín dụng của bạn.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">3. Cam kết bảo mật</h2>
              <p>
                Toàn bộ dữ liệu của bạn được mã hóa và lưu trữ an toàn trên máy chủ của chúng tôi. Englic cam kết không bán, trao đổi hay chia sẻ thông tin cá nhân của bạn cho bất kỳ bên thứ ba nào vì mục đích thương mại mà không có sự đồng ý trước bằng văn bản.
              </p>
            </section>

            {/* Thêm các section khác tương tự... */}

          </div>
        </div>
      </main>
    </div>
  );
}
