import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Giới thiệu Englic.',
  description: 'Tìm hiểu về Englic., nền tảng luyện thi Tiếng Anh THPT Quốc Gia online với kho đề và tài liệu học tập.',
  alternates: { canonical: '/gioi-thieu' },
};



export default function AboutPage() {
  return (
    <div className={`min-h-screen bg-white text-gray-800 selection:bg-purple-200 py-12 font-sans`}>
      
      {/* Nút Quay lại */}
      <div className="max-w-4xl mx-auto px-6 mb-8">
        <Link href="/" className="inline-flex items-center text-gray-500 hover:text-purple-600 font-medium transition-colors">
          <span className="mr-2">←</span> Về trang chủ
        </Link>
      </div>

      <main className="max-w-4xl mx-auto px-6">
        {/* Đã gỡ bỏ border, shadow và bg-white của khối này để nó hòa vào nền tổng */}
        <div className="p-4 md:p-8 relative">

          {/* Tiêu đề trang */}
          <div className="relative z-10 mb-10 border-b border-gray-100 pb-8">
            <h1 className="text-3xl md:text-5xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
              Giới thiệu về Englic.
            </h1>
            <p className="text-gray-500 text-lg">Nền tảng luyện thi THPT Quốc Gia Thế Hệ Mới</p>
          </div>

          {/* Nội dung giới thiệu */}
          <div className="relative z-10 space-y-8 text-gray-600 leading-relaxed text-[16px]">
            
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-blue-500">🎯</span> Sứ mệnh của chúng tôi
              </h2>
              <p>
                Được thành lập với mục tiêu mang lại sự công bằng trong giáo dục, <strong>Englic</strong> ra đời để giúp hàng triệu học sinh trên toàn quốc được tiếp cận với nguồn tài liệu ôn thi THPT Quốc Gia chất lượng cao hoàn toàn miễn phí. Chúng tôi tin rằng, mọi học sinh dù ở bất kỳ đâu đều xứng đáng có cơ hội bước chân vào ngôi trường Đại học mơ ước.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-purple-500">✨</span> Điểm khác biệt
              </h2>
              <ul className="list-disc pl-5 space-y-3">
                <li><strong>Cập nhật liên tục:</strong> Đề thi thử từ các Sở GD&ĐT, trường Chuyên trên cả nước được cập nhật nhanh nhất.</li>
                <li><strong>Phân tích chi tiết:</strong> Hệ thống chấm điểm tự động, cung cấp lời giải thích cặn kẽ cho từng câu hỏi giúp bạn hiểu rõ bản chất vấn đề.</li>
                <li><strong>Lộ trình cá nhân hóa:</strong> Englic theo dõi lịch sử làm bài để đưa ra thống kê điểm mạnh, điểm yếu và gợi ý bài tập phù hợp với trình độ của bạn.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-pink-500">🤝</span> Đội ngũ đồng hành
              </h2>
              <p>
                Đứng sau Englic là đội ngũ các thầy cô giáo, chuyên gia giáo dục và các anh chị cựu học sinh, những người có nhiều năm kinh nghiệm luyện thi và từng đạt kết quả xuất sắc trong các kỳ thi THPT Quốc Gia.
              </p>
            </section>

          </div>
        </div>
      </main>
    </div>
  );
}
