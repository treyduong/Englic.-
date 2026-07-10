import { Controller, Get } from '@nestjs/common';

@Controller('api/courses') // Đường dẫn API sẽ là: http://localhost:3001/api/courses
export class AppController {
  
  @Get()
  getCourses() {
    // Trả về mảng dữ liệu có đầy đủ các trường mà Frontend Next.js
    return [
      { 
        id: 1, 
        title: 'Đề thi THPT Quốc gia năm 2025', 
        price: 'Miễn phí',
        image: 'https://static-assets.prepcdn.com/content-management-system/de_minh_hoa_tieng_anh_thpt_quoc_gia_2025_min_3bad531a2b.jpg',
        students: '12.5K'
      },
      { 
        id: 2, 
        title: 'Lộ trình học 4000 từ vựng trong 30 ngày"', 
        price: '299.000đ',
        image: 'https://nativex.edu.vn/wp-content/uploads/2021/01/cach-cach-hoc-tu-moi-tieng-anh-1.png',
        students: '8.2K'
      },
      { 
        id: 3, 
        title: 'Phương pháp luyện thi THPTQG 9đ+ môn Tiếng Anh', 
        price: '199.000đ',
        image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=500',
        students: '25.1K'
      },
      { 
        id: 4, 
        title: 'Sách song ngữ Vì bạn là cậu nhỏ của tớ', 
        price: '99.000đ',
        image: 'https://bizweb.dktcdn.net/thumb/grande/100/465/223/products/v-c-u-l-b-n-nh-c-a-t.jpg?v=1710311790143',
        students: '3.4K'
      }
    ];
  }
}