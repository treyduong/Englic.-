'use client';

import { useRef, useState } from 'react';

// Khai báo khuôn dữ liệu
interface Course {
  id: number;
  title: string;
  price: string;
  image: string;
  students: string;
}

export default function CourseSlider({ courses }: { courses: Course[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Lấy chiều rộng của 1 thẻ để tính toán cuộn
  const getItemWidth = () => {
    if (!scrollRef.current) return 0;
    const item = scrollRef.current.children[0] as HTMLElement;
    return item ? item.offsetWidth + 24 : 0; // 24px là khoảng cách gap-6
  };

  // 1. Hàm cuộn AN TOÀN (Không làm giật/lệch trang web)
  const scrollToItem = (index: number) => {
    if (!scrollRef.current) return;
    const itemWidth = getItemWidth();
    
    scrollRef.current.scrollTo({
      left: index * itemWidth,
      behavior: 'smooth',
    });
    setActiveIndex(index);
  };

  // 2. Logic Vòng lặp: Bấm Next ở cuối thì về 0
  const handleNext = () => {
    const nextIndex = activeIndex >= courses.length - 1 ? 0 : activeIndex + 1;
    scrollToItem(nextIndex);
  };

  // Logic Vòng lặp: Bấm Prev ở đầu thì về cuối
  const handlePrev = () => {
    const prevIndex = activeIndex <= 0 ? courses.length - 1 : activeIndex - 1;
    scrollToItem(prevIndex);
  };

  // 3. Cập nhật nút tròn khi người dùng dùng tay vuốt (trên điện thoại)
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const itemWidth = getItemWidth();
    if (itemWidth === 0) return;

    // Tính toán thẻ nào đang ở giữa màn hình
    const newIndex = Math.round(scrollRef.current.scrollLeft / itemWidth);
    setActiveIndex(newIndex);
  };

  if (!courses || courses.length === 0) return null;

  return (
    <div className="relative group">
      
      {/* Nút Mũi Tên Trái (Ẩn trên mobile, hiện trên Desktop khi di chuột) */}
      <button 
        onClick={handlePrev}
        className="absolute left-0 top-[40%] -translate-y-1/2 -ml-4 md:-ml-6 z-10 w-12 h-12 bg-white border border-gray-200 rounded-full shadow-[0_5px_15px_rgba(0,0,0,0.1)] flex items-center justify-center text-gray-600 hover:text-purple-600 hover:border-purple-400 hover:scale-110 transition-all opacity-0 group-hover:opacity-100 hidden sm:flex"
        aria-label="Previous"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      {/* Container trượt ngang */}
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 custom-scrollbar overscroll-x-contain"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {courses.map((course) => (
          <div key={course.id} className="min-w-[280px] md:min-w-[320px] snap-start bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-purple-500/50 hover:shadow-[0_10px_30px_rgba(168,85,247,0.1)] transition-all duration-300 group/card cursor-pointer flex flex-col shrink-0">
            <div className="h-44 overflow-hidden relative">
              <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover/card:scale-110 transition duration-500 opacity-90 group-hover/card:opacity-100" />
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-gray-700 flex items-center gap-1 border border-gray-200 shadow-sm">
                👤 {course.students}
              </div>
            </div>
            <div className="p-5 flex flex-col flex-grow">
              <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">{course.title}</h3>
              <div className="mt-auto flex justify-between items-center pt-4 border-t border-gray-100">
                <span className={`font-bold text-lg ${course.price === 'Miễn phí' ? 'text-emerald-500' : 'text-purple-600'}`}>
                  {course.price}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Nút Mũi Tên Phải */}
      <button 
        onClick={handleNext}
        className="absolute right-0 top-[40%] -translate-y-1/2 -mr-4 md:-mr-6 z-10 w-12 h-12 bg-white border border-gray-200 rounded-full shadow-[0_5px_15px_rgba(0,0,0,0.1)] flex items-center justify-center text-gray-600 hover:text-purple-600 hover:border-purple-400 hover:scale-110 transition-all opacity-0 group-hover:opacity-100 hidden sm:flex"
        aria-label="Next"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
      
      {/* Nút tròn điều hướng */}
      <div className="flex justify-center gap-2 mt-2">
        {courses.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToItem(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              activeIndex === index 
                ? 'bg-purple-500' 
                : 'bg-gray-300 hover:bg-purple-300'
            }`}
            aria-label={`Cuộn tới khóa học ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}