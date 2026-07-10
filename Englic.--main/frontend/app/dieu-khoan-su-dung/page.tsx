import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Điều khoản sử dụng',
  description: 'Điều khoản sử dụng nền tảng luyện thi Englic.',
  alternates: { canonical: '/dieu-khoan-su-dung' },
};



export default function TermsOfUsePage() {
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
            Điều khoản sử dụng
          </h1>
          <p className="text-gray-400 text-sm tracking-wide uppercase font-semibold">
            Cập nhật lần cuối: 12/04/2026
          </p>
        </div>

        {/* Nội dung Tối giản */}
        <div className="space-y-16 text-gray-600 leading-relaxed text-[16px]">
          
          <section>
            <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 inline-block py-1">
              1. Chấp nhận điều khoản
            </h2>
            <p className="mb-4">
              Chào mừng bạn đến với <strong>Englic.</strong> - Nền tảng luyện thi THPT Quốc Gia Thế Hệ Mới. Bằng việc truy cập, đăng ký tài khoản và sử dụng các dịch vụ trên website của chúng tôi, bạn đồng ý tuân thủ và chịu sự ràng buộc bởi các Điều khoản sử dụng này.
            </p>
            <p>
              Nếu bạn không đồng ý với bất kỳ phần nào của các điều khoản, vui lòng ngừng sử dụng dịch vụ của chúng tôi ngay lập tức.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 inline-block py-1">
              2. Tài khoản và Bảo mật
            </h2>
            <ul className="list-none space-y-4 pl-0 border-l-2 border-purple-100 ml-2 pl-6">
              <li>
                <strong className="text-purple-600 block mb-1">Đăng ký tài khoản:</strong> 
                Bạn cam kết cung cấp thông tin cá nhân (Họ tên, Email) chính xác và đầy đủ khi tạo tài khoản.
              </li>
              <li>
                <strong className="text-purple-600 block mb-1">Trách nhiệm bảo mật:</strong> 
                Bạn hoàn toàn chịu trách nhiệm bảo vệ mật khẩu của mình. Englic không chịu trách nhiệm cho mọi tổn thất phát sinh do việc bạn để lộ thông tin tài khoản.
              </li>
              <li>
                <strong className="text-red-500 block mb-1">Nghiêm cấm dùng chung:</strong> 
                Mỗi tài khoản chỉ được sử dụng cho <strong>một cá nhân duy nhất</strong>. Mọi hành vi chia sẻ, cho thuê, hoặc bán lại tài khoản đều vi phạm nghiêm trọng điều khoản này.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 inline-block py-1">
              3. Quyền sở hữu trí tuệ
            </h2>
            <p className="mb-4">
              Toàn bộ nội dung trên nền tảng bao gồm nhưng không giới hạn ở: Đề thi, lời giải chi tiết, video bài giảng, mã nguồn website, logo, đồ họa và tài liệu PDF đều là tài sản trí tuệ thuộc bản quyền của <strong>Englic</strong>.
            </p>
            <p className="p-4 bg-purple-50/50 rounded-xl border border-purple-100 text-sm italic">
              Nghiêm cấm mọi hành vi sao chép, tải xuống trái phép, chụp màn hình nhằm mục đích phát tán, chỉnh sửa hoặc sử dụng tài liệu của Englic cho mục đích thương mại khi chưa có sự đồng ý bằng văn bản từ chúng tôi.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 inline-block py-1">
              4. Xử lý vi phạm
            </h2>
            <p className="mb-4">
              Englic có quyền (nhưng không có nghĩa vụ) theo dõi hoạt động của tài khoản thông qua hệ thống AI để phát hiện các hành vi bất thường. Chúng tôi có quyền <strong>đình chỉ hoặc khóa vĩnh viễn</strong> tài khoản của bạn mà không cần hoàn tiền nếu phát hiện các hành vi sau:
            </p>
            <ul className="list-disc pl-5 space-y-2 marker:text-pink-500">
              <li>Đăng nhập cùng một tài khoản trên quá nhiều thiết bị/IP khác nhau trong thời gian ngắn.</li>
              <li>Sử dụng phần mềm can thiệp vào hệ thống chấm điểm tự động.</li>
              <li>Có hành vi spam, xúc phạm, dùng từ ngữ thiếu văn hóa trong phần bình luận/đánh giá.</li>
            </ul>
          </section>

        </div>

        {/* Chân trang tối giản */}
        <div className="mt-24 pt-8 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-400 italic">
            Bằng việc tiếp tục sử dụng, bạn xác nhận đã hiểu rõ các điều khoản của chúng tôi. <br />
            Để tìm hiểu thêm về cách chúng tôi bảo vệ dữ liệu của bạn, vui lòng đọc <Link href="/dieu-khoan-bao-mat" className="text-purple-600 font-bold hover:text-pink-500 transition-colors underline">Điều khoản bảo mật</Link>.
          </p>
        </div>

      </main>
    </div>
  );
}
