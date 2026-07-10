import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hướng dẫn thanh toán',
  description: 'Hướng dẫn thanh toán và kích hoạt tài khoản học tập trên Englic.',
  alternates: { canonical: '/huong-dan-thanh-toan' },
};


export default function PaymentGuidePage() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 relative overflow-hidden selection:bg-purple-500/40">
      
      {/* Hiệu ứng nền */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <main className="max-w-4xl mx-auto px-6 py-16 relative z-10">
        
        {/* Nút quay lại trang chủ */}
        <Link href="/" className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 transition-colors mb-8 font-semibold group">
          <span className="group-hover:-translate-x-1 transition-transform">&larr;</span> 
          Quay lại trang chủ
        </Link>

        {/* Khối nội dung chính */}
        <div className="bg-white border border-gray-200 p-8 md:p-12 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Hướng dẫn thanh toán</h1>
          
          <div className="space-y-6 text-gray-600 leading-relaxed text-base md:text-lg mb-10">
            <p>Bạn vui lòng chuyển khoản cho chúng tôi theo một trong các hình thức sau đây.</p>
            
            <p className="bg-blue-50 border border-blue-200 p-4 rounded-xl text-blue-800 text-sm md:text-base">
              ✨ Sau khi xác nhận thông tin chuyển khoản, chúng tôi sẽ gửi cho bạn mã kích hoạt phần mềm qua tin nhắn, zalo theo số điện thoại hoặc email đặt hàng. Bạn có thể email, nhắn tin hoặc gọi điện trực tiếp cho chúng tôi nếu không nhận được mã kích hoạt.
            </p>

            <p className="flex flex-col sm:flex-row gap-2 sm:items-center text-gray-700">
              <span>Liên hệ <Link href="#" className="text-emerald-600 hover:underline font-semibold">CSKH qua Zalo</Link>.</span>
              <span className="hidden sm:inline">|</span>
              <span>Hotline hỗ trợ kích hoạt: <strong className="text-gray-900 bg-gray-100 px-3 py-1 rounded-full">0327535154</strong></span>
            </p>
          </div>

          {/* Phân tách */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent my-10"></div>

          {/* THÔNG TIN CHUYỂN KHOẢN & QR */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-sm">📍</span>
              Dành cho học viên ở trong nước
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-gray-50 border border-gray-200 p-6 md:p-8 rounded-2xl">
              
              {/* Cột trái: Chữ */}
              <div className="space-y-5">
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Ngân hàng</p>
                  <p className="font-bold text-gray-900">Ngân hàng MB</p>
                  <p className="text-sm text-gray-600">Ngân hàng thương mại cổ phần Quân đội</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Chủ tài khoản</p>
                  <p className="font-bold text-gray-900 text-lg">Bui Thi Thuy Nga</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Số tài khoản</p>
                  <div className="flex items-center gap-3">
                    <p className="font-sans text-3xl font-bold text-emerald-600 tracking-widest">0327535154</p>
                    {/* Nút Copy */}
                    <button className="text-xs bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 py-1 rounded transition-colors font-medium">Copy</button>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">Nội dung chuyển khoản</p>
                  <p className="bg-purple-50 text-purple-700 font-sans font-bold px-4 py-2 rounded-lg inline-block border border-purple-200">
                    Tên + SĐT đặt hàng + mã giới thiệu (nếu có)
                  </p>
                </div>
              </div>

              {/* Cột phải: Mã QR */}
              <div className="flex flex-col items-center justify-center space-y-4 md:border-l border-gray-200 md:pl-8">
                <div className="p-4 bg-white rounded-2xl shadow-md border border-gray-100">
                  {/* ẢNH MÃ QR */}
                  <img 
                    src="https://img.vietqr.io/image/MB-0913889741-qr_only.png" 
                    alt="Mã QR Thanh toán MB Bank" 
                    className="w-48 h-48 md:w-56 md:h-56 object-contain rounded-lg"
                  />
                </div>
                <p className="text-gray-600 font-semibold text-center flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 2V5h1v1H5zM3 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zm2 2v-1h1v1H5zM13 3a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1V4a1 1 0 00-1-1h-3zm1 2v1h1V5h-1z" clipRule="evenodd" />
                    <path d="M11 4a1 1 0 10-2 0v1a1 1 0 002 0V4zM10 7a1 1 0 011 1v1h2a1 1 0 110 2h-3a1 1 0 01-1-1V8a1 1 0 011-1zM16 9a1 1 0 100 2 1 1 0 000-2zM9 13a1 1 0 011-1h1a1 1 0 110 2v2a1 1 0 11-2 0v-3zM7 11a1 1 0 100-2H4a1 1 0 100 2h3zM17 13a1 1 0 01-1 1h-2a1 1 0 110-2h2a1 1 0 011 1zM16 17a1 1 0 100-2h-3a1 1 0 100 2h3z" />
                  </svg>
                  Quét mã QR bằng ứng dụng ngân hàng
                </p>
              </div>

            </div>
          </div>

          {/* Footer Điều khoản */}
          <p className="mt-12 text-center text-sm text-gray-500">
            Khi đăng ký học, bạn xác nhận đã đọc và đồng ý với{' '}
            <Link href="#" className="text-purple-600 hover:text-purple-700 hover:underline">Điều khoản và điều kiện giao dịch</Link>
            {' '}của Englic.
          </p>

        </div>
      </main>
    </div>
  );
}
