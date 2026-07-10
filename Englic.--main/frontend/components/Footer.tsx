import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative bg-gray-50 border-t border-gray-200 pt-20 pb-8 text-sm text-gray-600 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
{/* Cột 1: Logo */}
<div className="space-y-6">
  <Link href="/" className="inline-block text-3xl font-black tracking-tighter bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-transparent bg-clip-text">
    Englic.
  </Link>
  <p className="text-gray-500">
    Nền tảng luyện thi THPT Quốc Gia số 1 Việt Nam. Đồng hành cùng bạn trên con đường chinh phục cánh cổng Đại học.
  </p>
</div>

          {/* Cột 2: Về Englic */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-base">Về Englic</h3>
            <ul className="space-y-3">
              {/* LINK ĐÃ ĐƯỢC SỬA CHUẨN XÁC, KHÔNG CÒN /footer-pages/ */}
              <li><Link href="/gioi-thieu" className="hover:text-purple-600 transition-colors">Giới thiệu</Link></li>
              <li><Link href="/lien-he" className="hover:text-purple-600 transition-colors">Liên hệ</Link></li>
              <li><Link href="/huong-dan-su-dung" className="hover:text-purple-600 transition-colors">Hướng dẫn sử dụng</Link></li>
              <li><Link href="/phan-hoi" className="hover:text-purple-600 transition-colors">Phản hồi, khiếu nại</Link></li>
            </ul>
          </div>

          {/* Cột 3: Chính sách */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-base">Chính sách giao dịch</h3>
            <ul className="space-y-3">
              <li><Link href="/dieu-khoan-va-dieu-kien-giao-dich" className="hover:text-purple-600 transition-colors">Điều kiện giao dịch</Link></li>
              <li><Link href="/chinh-sach-gia-ban" className="hover:text-purple-600 transition-colors">Chính sách giá bán</Link></li>
              <li><Link href="/chinh-sach-kiem-hang" className="hover:text-purple-600 transition-colors">Chính sách kiểm hàng</Link></li>
              <li><Link href="/chinh-sach-giao-nhan-hang" className="hover:text-purple-600 transition-colors">Chính sách giao, nhận</Link></li>
              <li><Link href="/chinh-sach-hoan-tra" className="hover:text-purple-600 transition-colors">Chính sách hoàn trả</Link></li>
            </ul>
          </div>

          {/* Cột 4: Pháp lý */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-base">Pháp lý</h3>
            <ul className="space-y-3">
              <li><Link href="/dieu-khoan-bao-mat" className="hover:text-purple-600 transition-colors">Điều khoản bảo mật</Link></li>
              <li><Link href="/dieu-khoan-su-dung" className="hover:text-purple-600 transition-colors">Điều khoản sử dụng</Link></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-gray-200 text-center text-xs text-gray-500 space-y-2 relative z-10">
          <p>ENGLIC.COM © 2026. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
}