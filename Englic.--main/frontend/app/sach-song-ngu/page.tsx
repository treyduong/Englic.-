import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tủ sách song ngữ luyện đọc Tiếng Anh',
  description: 'Tủ sách song ngữ Englic. giúp học từ vựng qua văn cảnh, hỗ trợ luyện đọc hiểu Tiếng Anh THPT Quốc Gia.',
  alternates: { canonical: '/sach-song-ngu' },
};



export default function BilingualBooksPage() {
  return (
    <div className={`min-h-screen bg-white text-gray-800 selection:bg-purple-200 py-12 md:py-16 overflow-hidden font-sans`}>
      
      {/* Nút Quay lại */}
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <Link href="/" className="inline-flex items-center text-gray-400 hover:text-purple-600 font-medium transition-colors">
          <span className="mr-2">←</span> Về trang chủ
        </Link>
      </div>

      <main className="max-w-6xl mx-auto px-6">
        
        {/* --- HERO SECTION --- */}
        <div className="text-center mb-24 relative">
          {/* Decorative blur in background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-100 rounded-full blur-[100px] pointer-events-none opacity-50"></div>
          
          <div className="inline-flex items-center gap-2 bg-purple-50 px-4 py-1.5 rounded-full text-purple-600 text-sm font-bold mb-6 relative z-10 border border-purple-100">
            <span className="text-xl">📚</span> Englic BookStore
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 leading-normal py-2 relative z-10">
            Tủ Sách Song Ngữ
          </h1>
          <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed relative z-10">
            Phương pháp học từ vựng qua văn cảnh thực tế. Phá bỏ rào cản từ vựng, tự tin "xử đẹp" mọi bài đọc hiểu dài nhằn trong kỳ thi THPT Quốc Gia.
          </p>
        </div>

        {/* --- 3 LỢI ÍCH CỐT LÕI (Minimalism Grid) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 relative z-10">
          <div className="p-8 rounded-3xl bg-gray-50/50 border border-gray-100 hover:bg-white hover:shadow-[0_10px_40px_rgb(168,85,247,0.06)] hover:border-purple-100 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 text-2xl mb-6">🧠</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Hiểu sâu ngữ cảnh</h3>
            <p className="text-gray-500 leading-relaxed text-sm">Học từ mới thông qua các câu chuyện và bài viết thực tế thay vì học vẹt từng từ đơn lẻ, giúp não bộ ghi nhớ lâu hơn.</p>
          </div>
          <div className="p-8 rounded-3xl bg-gray-50/50 border border-gray-100 hover:bg-white hover:shadow-[0_10px_40px_rgb(168,85,247,0.06)] hover:border-purple-100 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 text-2xl mb-6">⚡</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Phản xạ dịch thuật</h3>
            <p className="text-gray-500 leading-relaxed text-sm">Bản dịch tiếng Việt được đặt song song, giúp bạn lập tức tra cứu nghĩa của câu mà không cần phải dừng lại mở từ điển.</p>
          </div>
          <div className="p-8 rounded-3xl bg-gray-50/50 border border-gray-100 hover:bg-white hover:shadow-[0_10px_40px_rgb(168,85,247,0.06)] hover:border-purple-100 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center text-pink-600 text-2xl mb-6">📖</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Chinh phục bài đọc dài</h3>
            <p className="text-gray-500 leading-relaxed text-sm">Xây dựng thói quen và sức bền khi đọc các đoạn văn tiếng Anh dài, kỹ năng tiên quyết để đạt điểm 9+ môn Tiếng Anh.</p>
          </div>
        </div>

        {/* --- DANH SÁCH SẢN PHẨM --- */}
        <div className="space-y-16 relative z-10">
          
          {/* Sản phẩm 1 */}
          <div className="flex flex-col md:flex-row items-center gap-10 p-8 md:p-12 rounded-[2.5rem] bg-white border border-gray-100 shadow-[0_20px_60px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_60px_rgb(168,85,247,0.08)] transition-shadow duration-500 group">
            {/* Ảnh sách mô phỏng */}
            <div className="w-full md:w-2/5 aspect-[3/4] bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-gray-100 flex flex-col items-center justify-center p-6 relative overflow-hidden group-hover:-translate-y-2 transition-transform duration-500">
              <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl z-10">BEST SELLER</div>
              <h4 className="text-2xl font-black text-center text-gray-800 mb-4 leading-tight">Tuyển tập <br/> Đọc Hiểu THPT QG</h4>
              <p className="text-sm text-gray-400 font-medium tracking-widest">BILINGUAL EDITION</p>
              <div className="mt-8 w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
            </div>
            
            {/* Thông tin sách */}
            <div className="w-full md:w-3/5 space-y-6">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">Chiến Thần Đọc Hiểu - Song Ngữ</h3>
                <p className="text-gray-500 leading-relaxed">Cuốn sách tổng hợp 50 bài đọc hiểu thường xuyên xuất hiện trong các đề thi thử và đề thi chính thức. Mỗi bài đọc đều có phần dịch nghĩa tiếng Việt đối chiếu sát sườn, kèm theo bảng phân tích từ vựng nâng cao ở cuối trang.</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">189.000đ</span>
                <span className="text-lg text-gray-400 line-through font-medium">250.000đ</span>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-600"><span className="text-green-500 mr-2">✓</span> Tặng kèm File Audio nghe chuẩn bản xứ</li>
                <li className="flex items-center text-sm text-gray-600"><span className="text-green-500 mr-2">✓</span> Bookmark Englic độc quyền</li>
              </ul>
              <div className="pt-4 flex gap-4">
                <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full hover:shadow-[0_10px_30px_rgba(168,85,247,0.4)] hover:-translate-y-1 transition-all">
                  Thêm vào giỏ
                </button>
                <button className="px-8 py-4 bg-purple-50 text-purple-600 font-bold rounded-full hover:bg-purple-100 transition-colors">
                  Đọc thử PDF
                </button>
              </div>
            </div>
          </div>

          {/* Sản phẩm 2 */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-10 p-8 md:p-12 rounded-[2.5rem] bg-white border border-gray-100 shadow-[0_20px_60px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_60px_rgb(168,85,247,0.08)] transition-shadow duration-500 group">
            {/* Ảnh sách mô phỏng */}
            <div className="w-full md:w-2/5 aspect-[3/4] bg-gradient-to-br from-pink-50 to-orange-50 rounded-2xl border border-gray-100 flex flex-col items-center justify-center p-6 relative overflow-hidden group-hover:-translate-y-2 transition-transform duration-500">
              <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl z-10">MỚI RA MẮT</div>
              <h4 className="text-2xl font-black text-center text-gray-800 mb-4 leading-tight">Từ Vựng Tiếng Anh <br/> Theo Ngữ Cảnh</h4>
              <p className="text-sm text-gray-400 font-medium tracking-widest">BILINGUAL EDITION</p>
              <div className="mt-8 w-24 h-1 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full"></div>
            </div>
            
            {/* Thông tin sách */}
            <div className="w-full md:w-3/5 space-y-6">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">Hack Từ Vựng Qua Truyện Ngắn</h3>
                <p className="text-gray-500 leading-relaxed">Bộ sưu tập 30 mẩu truyện ngắn song ngữ hài hước và cảm động. Toàn bộ từ vựng mức độ B1-C1 được cài cắm khéo léo vào cốt truyện, giúp bạn thẩm thấu từ mới một cách vô thức mà không cần học thuộc lòng khô khan.</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">159.000đ</span>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-600"><span className="text-green-500 mr-2">✓</span> Phù hợp cho những lúc giải trí, đọc trước khi ngủ</li>
                <li className="flex items-center text-sm text-gray-600"><span className="text-green-500 mr-2">✓</span> Trình bày song song trái/phải cực dễ nhìn</li>
              </ul>
              <div className="pt-4 flex gap-4">
                <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold rounded-full hover:shadow-[0_10px_30px_rgba(236,72,153,0.4)] hover:-translate-y-1 transition-all">
                  Thêm vào giỏ
                </button>
              </div>
            </div>
          </div>

        </div>

{/* --- NÚT MUA SẮM TRÊN CÁC SÀN TMĐT --- */}
        <div className="mt-16 mb-8 flex flex-col sm:flex-row justify-center md:justify-end items-center gap-4 relative z-10">
          <span className="text-gray-500 font-medium md:mr-2">Khám phá gian hàng chính hãng tại:</span>
          
          <div className="flex gap-3">
            {/* Nút Shopee */}
            <Link 
              href="https://shopee.vn/kirabooks?categoryId=100643&entryPoint=ShopByPDP&itemId=19790280217&upstream=search"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-2.5 bg-[#ee4d2d] text-white font-bold rounded-xl hover:bg-[#d73211] hover:shadow-[0_8px_20px_rgba(238,77,45,0.3)] hover:-translate-y-1 transition-all duration-300"
            >
              <span className="mr-2 text-lg">🛍️</span> Shopee
            </Link>

            {/* Nút TikTok Shop */}
            <Link 
              href="https://www.tiktok.com/@tiktok_id_cua_ban" /* <-- THAY LINK TIKTOK CỦA BẠN VÀO ĐÂY */
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-2.5 bg-gray-900 text-white font-bold rounded-xl hover:bg-black hover:shadow-[0_8px_20px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-all duration-300"
            >
              <span className="mr-2 text-lg">🎵</span> TikTok Shop
            </Link>
          </div>
        </div>

      </main>
    </div>
  );
}
