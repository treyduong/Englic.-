import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hướng dẫn sử dụng Englic.',
  description: 'Hướng dẫn đăng ký, luyện đề, nộp bài và theo dõi kết quả trên nền tảng Englic.',
  alternates: { canonical: '/huong-dan-su-dung' },
};



export default function UserGuidePage() {
  return (
    <div className={`min-h-screen bg-white text-gray-800 selection:bg-purple-200 py-12 font-sans`}>
      
      {/* Nút Quay lại */}
      <div className="max-w-4xl mx-auto px-6 mb-8">
        <Link href="/" className="inline-flex items-center text-gray-500 hover:text-purple-600 font-medium transition-colors">
          <span className="mr-2">←</span> Về trang chủ
        </Link>
      </div>

      <main className="max-w-4xl mx-auto px-6">
        <div className="p-4 md:p-8 relative">

          {/* Tiêu đề trang */}
          <div className="relative z-10 mb-10 border-b border-gray-100 pb-8">
            <h1 className="text-3xl md:text-5xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
              Hướng dẫn sử dụng
            </h1>
            <p className="text-gray-500 text-lg">Làm chủ nền tảng Englic chỉ với 4 bước cơ bản</p>
          </div>

          {/* Nội dung hướng dẫn */}
          <div className="relative z-10 space-y-10 text-gray-600 leading-relaxed text-[16px]">
            
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-blue-500">1️⃣</span> Đăng ký và Đăng nhập
              </h2>
              <p className="mb-3">
                Để lưu lại lịch sử làm bài và điểm số, bạn cần có một tài khoản cá nhân:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Truy cập trang chủ <strong>Englic.</strong>, nhấp vào nút <strong>Đăng ký</strong> ở góc phải màn hình.</li>
                <li>Điền đầy đủ các thông tin cần thiết hoặc đăng ký nhanh qua Google.</li>
                <li>Sau khi đăng nhập thành công, bạn sẽ được chuyển đến Bảng điều khiển (Dashboard) cá nhân.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-purple-500">2️⃣</span> Chọn đề và Vào phòng chờ
              </h2>
              <p className="mb-3">
                Hệ thống cung cấp hàng trăm đề thi thử được cập nhật liên tục:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Di chuyển đến khu vực <strong>Đề thi mới nhất</strong> trên trang chủ hoặc vào thư viện Đề thi online.</li>
                <li>Bấm nút <strong>Chi tiết</strong> ở đề thi bạn muốn làm.</li>
                <li>Bạn sẽ được đưa vào <strong>Phòng chờ</strong>. Tại đây, bạn có thể xem trước cấu trúc đề, thời gian làm bài, và đặc biệt là đọc các bình luận/review của những bạn đã thi trước đó.</li>
                <li>Khi đã sẵn sàng, bấm nút <strong>Bắt đầu làm bài</strong> ở cột bên phải.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-pink-500">3️⃣</span> Trải nghiệm Phòng thi ảo Hologram
              </h2>
              <p className="mb-3">
                Phòng thi được thiết kế đặc biệt để tối ưu hóa không gian đọc hiểu của bạn:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Giao diện 3 cột:</strong> Màn hình được chia làm Danh sách bài, Khối đọc hiểu, và Khối câu hỏi.</li>
                <li><strong>Mở rộng màn hình:</strong> Bấm vào nút có biểu tượng <strong>3 dấu gạch ngang (Hamburger Menu)</strong> ở trên cùng để thu gọn hoặc mở rộng cột "Danh sách đề thi". Tính năng này đặc biệt hữu ích khi bạn cần không gian lớn để làm bài Reading.</li>
                <li><strong>Theo dõi thời gian:</strong> Đồng hồ đếm ngược sẽ hiển thị ở góc phải. Khi thời gian sắp hết (dưới 5 phút), đồng hồ sẽ nhấp nháy đỏ để cảnh báo.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-emerald-500">4️⃣</span> Nộp bài và Xem giải thích
              </h2>
              <p className="mb-3">
                Sau khi hoàn thành tất cả các câu hỏi:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Bấm nút <strong>Nộp bài</strong>. Hệ thống sẽ tự động chấm điểm và trả kết quả ngay lập tức.</li>
                <li>Bạn có thể xem lại chi tiết từng câu: câu nào đúng (hiển thị màu xanh), câu nào sai (hiển thị màu đỏ).</li>
                <li>Mỗi câu hỏi đều đi kèm phần <strong>Giải thích chi tiết</strong> từ ban chuyên môn, giúp bạn rút kinh nghiệm cho các lần thi sau.</li>
              </ul>
            </section>

            {/* Thông báo hỗ trợ */}
            <div className="mt-12 bg-purple-50/50 border border-purple-100 rounded-2xl p-6 text-center">
              <p className="text-gray-700">
                Bạn vẫn còn thắc mắc trong quá trình sử dụng? Đừng ngần ngại <Link href="/lien-he" className="text-purple-600 font-bold hover:underline">Liên hệ với đội ngũ hỗ trợ</Link> nhé!
              </p>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
