import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chính sách hoàn trả',
  description: 'Chính sách hoàn trả và hoàn tiền khi sử dụng dịch vụ học tập của Englic.',
  alternates: { canonical: '/chinh-sach-hoan-tra' },
};



export default function RefundPolicyPage() {
  return (
    <div className={`min-h-screen bg-white text-gray-800 selection:bg-purple-200 py-16 font-sans`}>
      
      {/* Nút Quay lại tối giản */}
      <div className="max-w-3xl mx-auto px-6 mb-16">
        <Link href="/" className="inline-flex items-center text-gray-400 hover:text-purple-600 font-medium transition-colors">
          <span className="mr-2">←</span> Về trang chủ
        </Link>
      </div>

      <main className="max-w-3xl mx-auto px-6">
        
        {/* Tiêu đề chính */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 leading-normal py-2">
            Chính sách hoàn trả
          </h1>
          <p className="text-gray-400 text-sm tracking-wide uppercase font-semibold">
            Cam kết đảm bảo quyền lợi học viên
          </p>
        </div>

        {/* Nội dung Tối giản */}
        <div className="space-y-16 text-gray-600 leading-relaxed text-[16px]">
          
          <section>
            <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 inline-block py-1">
              1. Quy định hoàn tiền cho Sản phẩm số
            </h2>
            <p className="mb-4">
              Do đặc thù của nội dung kỹ thuật số (Khóa học, Tài liệu PDF, Gói luyện đề), Englic áp dụng chính sách hoàn trả linh hoạt như sau:
            </p>
            <ul className="list-none space-y-3 pl-0 border-l-2 border-purple-100 ml-2 pl-6">
              <li><strong className="text-purple-600">Được hoàn 100%:</strong> Nếu giao dịch thanh toán bị lỗi (trừ tiền nhưng không nhận được gói học) hoặc hệ thống Englic gặp sự cố kỹ thuật không thể khắc phục trong vòng 48h.</li>
              <li><strong className="text-pink-600">Từ chối hoàn trả:</strong> Khi tài khoản đã kích hoạt thành công, có lịch sử tải xuống tài liệu hoặc đã bắt đầu làm bài thi trên hệ thống (vượt quá 5% tiến trình).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 inline-block py-1">
              2. Quy định đổi trả Sản phẩm vật lý
            </h2>
            <p className="mb-4">
              Học viên được hỗ trợ đổi trả sách/flashcard trong các trường hợp sau:
            </p>
            <ul className="list-disc pl-5 space-y-3 marker:text-purple-500">
              <li><strong>Sản phẩm lỗi:</strong> Rách trang, in mờ, thiếu trang, hỏng hóc do quá trình vận chuyển.</li>
              <li><strong>Giao sai đơn:</strong> Không đúng tựa sách hoặc phiên bản đã đặt.</li>
              <li><strong>Thời hạn xử lý:</strong> Yêu cầu đổi trả phải được gửi trong vòng <strong>07 ngày</strong> kể từ ngày nhận hàng thành công.</li>
              <li><strong>Điều kiện:</strong> Sản phẩm hoàn trả phải còn nguyên vẹn (nếu lỗi do giao sai) và chưa qua sử dụng (không viết, vẽ bậy lên sách).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 inline-block py-1">
              3. Phương thức và Thời gian hoàn tiền
            </h2>
            <p className="mb-4">
              Nếu yêu cầu hoàn trả hợp lệ, Englic sẽ tiến hành xử lý hoàn tiền thông qua hình thức chuyển khoản ngân hàng.
            </p>
            <p>
              Thời gian tiền nổi về tài khoản của bạn là từ <strong>3 - 5 ngày làm việc</strong> (không tính thứ Bảy, Chủ Nhật và các ngày lễ) kể từ thời điểm Englic xác nhận phê duyệt hoàn tiền qua email.
            </p>
          </section>

        </div>

        {/* Chân trang */}
        <div className="mt-24 pt-8 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-400 italic">
            Để tạo yêu cầu đổi/trả hàng, vui lòng truy cập trang <br />
            <Link href="/phan-hoi" className="text-purple-600 font-bold hover:text-pink-500 transition-colors underline">Phản hồi & Khiếu nại</Link>
          </p>
        </div>

      </main>
    </div>
  );
}
