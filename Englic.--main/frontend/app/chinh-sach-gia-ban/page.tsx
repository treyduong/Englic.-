import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chính sách giá bán',
  description: 'Chính sách giá bán các khóa học, tài liệu và gói học tập của Englic.',
  alternates: { canonical: '/chinh-sach-gia-ban' },
};


export default function PricingPolicyPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 selection:bg-purple-200 py-16">
      
      {/* Nút Quay lại tối giản */}
      <div className="max-w-3xl mx-auto px-6 mb-16">
        <Link href="/" className="inline-flex items-center text-gray-400 hover:text-purple-600 font-medium transition-colors">
          <span className="mr-2">←</span> Về trang chủ
        </Link>
      </div>

      <main className="max-w-3xl mx-auto px-6">
        
        {/* Tiêu đề chính: Sử dụng dải màu Hologram đồng bộ với Logo */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 leading-normal py-2">
            Chính sách giá bán
          </h1>
          <p className="text-gray-400 text-sm tracking-wide uppercase font-semibold">
            Hiệu lực từ ngày: 12/04/2026
          </p>
        </div>

        {/* Nội dung Tối giản & Khoa học */}
        <div className="space-y-16 text-gray-600 leading-relaxed text-[16px]">
          
          <section>
            <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 inline-block py-1">
              1. Nguyên tắc niêm yết giá
            </h2>
            <p className="mb-4">
              Mọi sản phẩm và dịch vụ trên nền tảng <strong>Englic.</strong> đều được niêm yết công khai bằng Việt Nam Đồng (VNĐ). 
            </p>
            <p>
              Giá hiển thị trên website là mức giá cuối cùng mà học viên cần thanh toán. Chúng tôi cam kết không phát sinh thêm bất kỳ chi phí ẩn nào trong suốt quá trình giao dịch.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 inline-block py-1">
              2. Cơ cấu sản phẩm và Dịch vụ
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
              <div className="border-l-2 border-purple-100 pl-6">
                <h3 className="font-bold text-gray-900 mb-2">Sản phẩm kỹ thuật số</h3>
                <p className="text-sm">Bao gồm các gói hội viên VIP (theo tháng/năm), kho tài liệu PDF và các khóa học online. Giá đã bao gồm quyền truy cập không giới hạn trong thời hạn đăng ký.</p>
              </div>
              <div className="border-l-2 border-pink-100 pl-6">
                <h3 className="font-bold text-gray-900 mb-2">Sản phẩm vật lý</h3>
                <p className="text-sm">Bao gồm sách luyện đề song ngữ và bộ Flashcard từ vựng. Giá bán niêm yết chưa bao gồm phí vận chuyển (phí này sẽ hiển thị rõ tại bước thanh toán).</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 inline-block py-1">
              3. Chương trình ưu đãi và Giảm giá
            </h2>
            <p className="mb-4">
              Nhằm hỗ trợ tốt nhất cho các bạn học sinh, Englic duy trì các mức ưu đãi định kỳ:
            </p>
            <ul className="list-disc pl-5 space-y-3 marker:text-purple-500">
              <li><strong>Đăng ký sớm (Early Bird):</strong> Giảm ngay 25% cho các học viên đăng ký khóa học mới trong tuần đầu tiên ra mắt.</li>
              <li><strong>Gói Combo tiết kiệm:</strong> Giảm giá trực tiếp khi mua từ 2 sản phẩm vật lý hoặc đăng ký gói hội viên từ 12 tháng trở lên.</li>
              <li><strong>Ưu đãi học đường:</strong> Áp dụng các mã giảm giá đặc biệt thông qua các chương trình cộng tác với CLB tiếng Anh tại các trường THPT.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 inline-block py-1">
              4. Chính sách điều chỉnh giá
            </h2>
            <p className="mb-4">
              Giá bán có thể thay đổi tùy theo lộ trình cập nhật nội dung và các yếu tố vận hành. Tuy nhiên, Englic cam kết:
            </p>
            <ul className="list-none space-y-3 pl-0 border-l-2 border-blue-100 ml-2 pl-6 italic text-sm">
              <li>Thông báo trước ít nhất <strong>07 ngày</strong> nếu có sự thay đổi về mức phí hội viên.</li>
              <li>Các tài khoản đã thanh toán trước khi tăng giá sẽ không phải nộp thêm bất kỳ chi phí chênh lệch nào.</li>
            </ul>
          </section>

        </div>

        {/* Chân trang tối giản */}
        <div className="mt-24 pt-8 border-t border-gray-100">
          <p className="text-sm text-gray-400 text-center leading-relaxed">
            Bạn cần báo giá cho số lượng lớn hoặc hỗ trợ thanh toán? <br />
            Hãy liên hệ <Link href="/lien-he" className="text-purple-600 font-bold hover:text-pink-500 transition-colors underline">Ban tài vụ Englic</Link> để được hướng dẫn.
          </p>
        </div>

      </main>
    </div>
  );
}
