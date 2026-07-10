import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Điều khoản và điều kiện giao dịch',
  description: 'Điều khoản giao dịch, thanh toán và kích hoạt dịch vụ học tập trên Englic.',
  alternates: { canonical: '/dieu-khoan-va-dieu-kien-giao-dich' },
};



export default function TransactionTermsPage() {
  return (
    <div className={`min-h-screen bg-white text-gray-800 selection:bg-purple-200 py-16 font-sans`}>
      
      {/* Nút Quay lại tối giản */}
      <div className="max-w-3xl mx-auto px-6 mb-16">
        <Link href="/" className="inline-flex items-center text-gray-400 hover:text-purple-600 font-medium transition-colors">
          <span className="mr-2">←</span> Về trang chủ
        </Link>
      </div>

      <main className="max-w-3xl mx-auto px-6">
        
        {/* H1: Chữ Hologram chuẩn dải màu Logo mới */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 leading-normal py-2">
            Điều kiện giao dịch
          </h1>
          <p className="text-gray-400 text-sm tracking-wide uppercase font-semibold">
            Cập nhật lần cuối: 12/04/2026
          </p>
        </div>

        {/* Nội dung Tối giản */}
        <div className="space-y-12 text-gray-600 leading-relaxed text-[16px]">
          
          <section>
            {/* H2: Áp dụng dải màu đồng nhất */}
            <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 inline-block py-1">
              1. Nguyên tắc chung
            </h2>
            <p className="mb-3">
              Bản Điều kiện giao dịch này áp dụng cho tất cả các khách hàng đăng ký mua các sản phẩm số (Khóa học online, Tài liệu VIP, Đề thi độc quyền) và sản phẩm vật lý trên nền tảng <strong>Englic.</strong>
            </p>
            <p>
              Bằng việc xác nhận thanh toán, khách hàng được hiểu là đã đọc, hiểu rõ và đồng ý tuân thủ toàn bộ các quy định được nêu trong văn bản này.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 inline-block py-1">
              2. Quy trình giao dịch
            </h2>
            <ul className="list-none space-y-3 pl-0 border-l-2 border-purple-100 ml-2 pl-6">
              <li><strong className="text-purple-600">Bước 1:</strong> Khách hàng lựa chọn khóa học/tài liệu cần mua và thêm vào giỏ hàng.</li>
              <li><strong className="text-purple-600">Bước 2:</strong> Kiểm tra lại thông tin đơn hàng và chọn phương thức thanh toán.</li>
              <li><strong className="text-purple-600">Bước 3:</strong> Tiến hành thanh toán và nhận biên lai điện tử qua Email.</li>
              <li><strong className="text-purple-600">Bước 4:</strong> Hệ thống tự động kích hoạt khóa học vào tài khoản.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 inline-block py-1">
              3. Hình thức thanh toán
            </h2>
            <p className="mb-3">
              Englic hiện đang hỗ trợ các phương thức thanh toán an toàn và tiện lợi sau:
            </p>
            <ul className="list-disc pl-5 space-y-2 marker:text-purple-500">
              <li><strong>Chuyển khoản ngân hàng trực tiếp:</strong> Hỗ trợ mã QR tự động xác nhận qua hệ thống VietQR.</li>
              <li><strong>Ví điện tử:</strong> Hỗ trợ thanh toán qua MoMo, ZaloPay, VNPay.</li>
              <li><strong>Thẻ thanh toán:</strong> Visa, MasterCard, JCB và các thẻ ATM nội địa.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 inline-block py-1">
              4. Quyền và Nghĩa vụ
            </h2>
            
            <h3 className="font-bold text-gray-800 mt-6 mb-2">Đối với Englic:</h3>
            <ul className="list-disc pl-5 space-y-2 mb-6 marker:text-purple-400">
              <li>Cam kết cung cấp nội dung khóa học đúng như mô tả.</li>
              <li>Bảo mật tuyệt đối thông tin thanh toán của khách hàng.</li>
            </ul>

            <h3 className="font-bold text-gray-800 mb-2">Đối với Học viên:</h3>
            <ul className="list-disc pl-5 space-y-2 marker:text-purple-400">
              <li>Cung cấp thông tin đăng ký chính xác để nhận mã kích hoạt.</li>
              <li>Tuyệt đối <strong>không chia sẻ, mua bán, hoặc phát tán</strong> tài khoản dưới mọi hình thức.</li>
            </ul>
          </section>

        </div>

        {/* Chân trang văn bản */}
        <div className="mt-24 pt-8 border-t border-gray-100">
          <p className="text-sm text-gray-400 italic text-center md:text-left">
            Mọi thắc mắc, vui lòng liên hệ <Link href="/lien-he" className="text-purple-600 hover:text-pink-500 transition-colors underline font-medium">Bộ phận hỗ trợ khách hàng</Link>.
          </p>
        </div>

      </main>
    </div>
  );
}
