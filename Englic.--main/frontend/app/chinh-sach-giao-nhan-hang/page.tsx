import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chính sách giao nhận',
  description: 'Chính sách giao nhận tài khoản, tài liệu số và sản phẩm học tập của Englic.',
  alternates: { canonical: '/chinh-sach-giao-nhan-hang' },
};

// 1. Import font Inter từ next/font


export default function ShippingPolicyPage() {
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
            Chính sách giao & nhận hàng
          </h1>
          <p className="text-gray-400 text-sm tracking-wide uppercase font-semibold">
            Nhanh chóng - Tiện lợi - An toàn
          </p>
        </div>

        {/* Nội dung Tối giản */}
        <div className="space-y-16 text-gray-600 leading-relaxed text-[16px]">
          
          <section>
            <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 inline-block py-1">
              1. Đối với Sản phẩm kỹ thuật số
            </h2>
            <p className="mb-4">
              Áp dụng cho Khóa học Online, Gói hội viên VIP, và Tài liệu định dạng PDF:
            </p>
            <ul className="list-none space-y-3 pl-0 border-l-2 border-purple-100 ml-2 pl-6">
              <li><strong className="text-purple-600">Hình thức giao hàng:</strong> Giao hàng tự động qua Internet.</li>
              <li><strong className="text-purple-600">Thời gian nhận:</strong> Ngay lập tức sau khi hệ thống xác nhận thanh toán thành công.</li>
              <li><strong className="text-purple-600">Cách thức nhận:</strong> Tài khoản học tập của bạn sẽ tự động được mở khóa quyền truy cập. Đồng thời, một email xác nhận kèm hướng dẫn sẽ được gửi đến hòm thư của bạn.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 inline-block py-1">
              2. Đối với Sản phẩm vật lý
            </h2>
            <p className="mb-4">
              Áp dụng cho Sách giấy, Bộ Flashcard và các ấn phẩm in ấn khác:
            </p>
            <ul className="list-disc pl-5 space-y-3 marker:text-pink-500">
              <li><strong>Hình thức giao:</strong> Chuyển phát nhanh qua các đơn vị vận chuyển đối tác (Viettel Post, GHTK, J&T).</li>
              <li><strong>Khu vực nội thành Hà Nội:</strong> Nhận hàng trong vòng 1-2 ngày làm việc.</li>
              <li><strong>Các tỉnh/thành phố khác:</strong> Nhận hàng trong vòng 3-5 ngày làm việc.</li>
              <li><strong>Phí vận chuyển:</strong> Áp dụng đồng giá hoặc miễn phí vận chuyển (Freeship) tùy theo giá trị đơn hàng và các chương trình khuyến mãi hiện hành. Phí này sẽ hiển thị chi tiết khi bạn chốt đơn.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 inline-block py-1">
              3. Tra cứu tình trạng đơn hàng
            </h2>
            <p>
              Đối với đơn hàng vật lý, ngay sau khi bàn giao cho đơn vị vận chuyển, hệ thống sẽ cung cấp cho bạn một <strong>Mã vận đơn</strong> qua email. Bạn có thể sử dụng mã này để theo dõi tiến trình giao hàng trực tiếp trên website của đối tác vận chuyển.
            </p>
          </section>

        </div>
      </main>
    </div>
  );
}
