import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chính sách kiểm hàng',
  description: 'Chính sách kiểm tra thông tin dịch vụ, tài liệu và quyền truy cập sau khi mua hàng trên Englic.',
  alternates: { canonical: '/chinh-sach-kiem-hang' },
};



export default function InspectionPolicyPage() {
  return (
    <div className={`min-h-screen bg-white text-gray-800 selection:bg-purple-200 py-16 font-sans`}>
      
      {/* Nút Quay lại tối giản */}
      <div className="max-w-3xl mx-auto px-6 mb-16">
        <Link href="/" className="inline-flex items-center text-gray-400 hover:text-purple-600 font-medium transition-colors">
          <span className="mr-2">←</span> Về trang chủ
        </Link>
      </div>

      <main className="max-w-3xl mx-auto px-6">
        
        {/* Tiêu đề chính: Hologram chuẩn dải màu mới */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 leading-normal py-2">
            Chính sách kiểm hàng
          </h1>
          <p className="text-gray-400 text-sm tracking-wide uppercase font-semibold">
            Đảm bảo quyền lợi nhận hàng minh bạch
          </p>
        </div>

        {/* Nội dung Tối giản */}
        <div className="space-y-16 text-gray-600 leading-relaxed text-[16px]">
          
          <section>
            <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 inline-block py-1">
              1. Phạm vi áp dụng
            </h2>
            <p className="mb-4">
              Chính sách này áp dụng đối với tất cả các sản phẩm vật lý (Sách song ngữ, Bộ thẻ Flashcard, Quà tặng kèm) được cung cấp bởi <strong>Englic.</strong> và vận chuyển thông qua các đơn vị đối tác.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 inline-block py-1">
              2. Quyền đồng kiểm
            </h2>
            <p className="mb-4">
              Englic khuyến khích học viên thực hiện <strong>"Đồng kiểm"</strong> cùng nhân viên giao hàng tại thời điểm nhận hàng. Bạn có quyền mở gói hàng để kiểm tra các yếu tố sau:
            </p>
            <ul className="list-none space-y-3 pl-0 border-l-2 border-purple-100 ml-2 pl-6">
              <li><strong className="text-purple-600">Sự nguyên vẹn:</strong> Sản phẩm không bị rách, nát, thấm nước hoặc hư hỏng cơ học do vận chuyển.</li>
              <li><strong className="text-purple-600">Số lượng:</strong> Khớp với số lượng đã đặt trên đơn hàng.</li>
              <li><strong className="text-purple-600">Mẫu mã:</strong> Đúng phiên bản sách hoặc tài liệu mà bạn đã chọn.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 inline-block py-1">
              3. Quy trình xử lý sai sót
            </h2>
            <p className="mb-4">
              Trong trường hợp sản phẩm không đúng như cam kết, học viên thực hiện theo các bước:
            </p>
            <ul className="list-disc pl-5 space-y-3 marker:text-pink-500">
              <li>Từ chối nhận hàng và yêu cầu nhân viên giao hàng ký xác nhận tình trạng thực tế.</li>
              <li>Chụp ảnh hoặc quay video bằng chứng về tình trạng lỗi/thiếu hụt.</li>
              <li>Thông báo cho <strong>Englic.</strong> thông qua Hotline hoặc mục Phản hồi trên website trong vòng <strong>24h</strong> kể từ thời điểm phát hiện lỗi.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 inline-block py-1">
              4. Cam kết từ Englic
            </h2>
            <p>
              Đối với mọi trường hợp lỗi do nhà sản xuất hoặc do quá trình vận chuyển, Englic cam kết hỗ trợ <strong>đổi mới hoàn toàn miễn phí</strong> và chịu mọi chi phí vận chuyển phát sinh cho học viên. Sự hài lòng của bạn là ưu tiên hàng đầu của chúng tôi.
            </p>
          </section>

        </div>

        {/* Chân trang tối giản */}
        <div className="mt-24 pt-8 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-400 italic">
            Gặp vấn đề khi nhận hàng? <br />
            <Link href="/lien-he" className="text-purple-600 font-bold hover:text-pink-500 transition-colors underline">Liên hệ hỗ trợ vận chuyển ngay</Link>
          </p>
        </div>

      </main>
    </div>
  );
}
