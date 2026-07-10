# 📚 Guide: Sử dụng Mock Data để Test Giao diện Dashboard

## 🎯 Tổng quan

File `mockData.ts` chứa tất cả dữ liệu giả lập cho platform luyện thi THPT Quốc gia & vào 10.

## 📂 Cấu trúc dữ liệu

### 1. **User Data** (`mockUserData`)
Thông tin người dùng cơ bản, mục tiêu học tập, tiến độ:

```typescript
mockUserData = {
  fullName: "Nguyễn Văn A",
  email: "nguyenvana@example.com",
  phone: "+84 123 456 789",
  bio: "Mục tiêu đạt 9+ môn tiếng anh thi THPT Quốc gia",
  targetScore: 9.0,
  currentScore: 7.8,
  totalHours: 42,
  totalExams: 15,
  studyStreak: 18 // days
}
```

**Trường hợp sử dụng:** Profile page, Dashboard header

---

### 2. **Dashboard Data** (`mockDashboardData`)
Dữ liệu hiển thị trên trang dashboard chính:

```typescript
mockDashboardData = {
  currentAvg: 7.8,              // Điểm trung bình hiện tại
  targetScore: 9.0,              // Mục tiêu
  recentExams: [...],            // 4 bài thi gần nhất
  chartData: [6.5, 7.0, ...],   // Dữ liệu biểu đồ 7 đề
  mistakesByType: [              // 5 dạng bài sai nhiều nhất
    { type: "Reading Comprehension", mistakes: 8, total: 40, errorRate: 20.0 }
  ]
}
```

**Trường hợp sử dụng:** Dashboard page

---

### 3. **Courses Data** (`mockCoursesData`)
Danh sách khoá học với tiến độ chi tiết:

```typescript
{
  id: 1,
  name: "Tiếng Anh THPT - Từ vựng & Biểu hiện",
  instructor: "Cô Hoa Anh",
  progress: 75,
  lessons: 40,
  completedLessons: 30,
  status: "in-progress",
  grade: 8.2,
  image: "📖"
}
```

**Trường hợp sử dụng:** Course Management page

---

### 4. **Learning Paths Data** (`mockLearningPathsData`)
Các lộ trình học được thiết kế:

```typescript
{
  id: 1,
  name: "Lộ trình THPT 9+",
  description: "Lộ trình toàn diện để đạt điểm 9+ thi THPT Quốc gia",
  progress: 37.5,
  modules: 8,
  completedModules: 3,
  duration: "14 tuần",
  difficulty: "Trung bình",
  recommended: true,
  status: "in-progress"
}
```

**Trường hợp sử dụng:** Learning Paths page

---

### 5. **Exam History Data** (`mockExamHistoryData`)
Lịch sử chi tiết từng bài thi:

```typescript
{
  id: 1,
  name: "Đề thi thử THPT 2026 - Sở Hà Nội",
  date: "12/04/2026",
  score: 8.4,
  duration: 120,
  listening: 8.2,
  reading: 8.5,
  writing: 8.0,
  questionTypes: [
    { type: "Reading Comprehension", mistakes: 2, total: 25 }
  ]
}
```

**Trường hợp sử dụng:** Exam History & Analysis page

---

### 6. **Còn nhiều nữa**
- `mockSettingsData`: Cài đặt người dùng
- `mockQuestionTypesFrequency`: Thống kê loại câu hỏi
- `mockDailyPractice`: Lịch thực hành hàng ngày
- `mockRecommendedLessons`: Bài học được gợi ý

---

## 🚀 Cách sử dụng trong component

### Cách 1: Import từng phần dữ liệu
```typescript
import { mockUserData, mockDashboardData } from '@/lib/mockData';

export default function DashboardPage() {
  const user = mockUserData;
  const dashboard = mockDashboardData;
  
  return (
    <div>
      <h1>{user.fullName}</h1>
      <p>Điểm trung bình: {dashboard.currentAvg}</p>
    </div>
  );
}
```

### Cách 2: Import toàn bộ bundle
```typescript
import mockDataBundle from '@/lib/mockData';

export default function DashboardPage() {
  return (
    <div>
      <h1>{mockDataBundle.user.fullName}</h1>
      <p>Điểm: {mockDataBundle.dashboard.currentAvg}</p>
    </div>
  );
}
```

---

## 📊 Thay đổi dữ liệu để test

### Kiểm tra score cao
```typescript
const { mockExamHistoryData } = require('@/lib/mockData');
mockExamHistoryData[0].score = 9.5; // Thay đổi điểm đề thứ 1
```

### Test loading diagram
```typescript
mockDashboardData.chartData = [8.0, 8.2, 8.4, 8.6, 8.8, 9.0, 9.2];
```

### Test progress bar
```typescript
mockCoursesData[0].progress = 100; // Hoàn thành khoá học
mockLearningPathsData[0].progress = 50; // Đang giữa lộ trình
```

---

## 🎨 Tương tác dữ liệu

| Page | Data Source | Key Fields |
|------|------------|-----------|
| Dashboard | `mockDashboardData` | chartData, mistakesByType |
| Profile | `mockUserData` | fullName, targetScore, bio |
| Courses | `mockCoursesData` | progress, grade, lessons |
| Learning Paths | `mockLearningPathsData` | progress, modules |
| Exam History | `mockExamHistoryData` | score, questionTypes |
| Settings | `mockSettingsData` | notifications, privacy |

---

## 💡 Mẹo test giao diện

### 1. Test responsive design
- Thay đổi dữ liệu text dài để kiểm tra truncate
- Thêm nhiều items vào array để teste scroll

### 2. Test edge cases
```typescript
// Test khi không có dữ liệu
mockDashboardData.recentExams = [];

// Test khi điểm 0
mockExamHistoryData[0].score = 0;

// Test progress 100%
mockCoursesData[0].progress = 100;
```

### 3. Test thống kê
- Thay đổi `totalExams` để xem số liệu lớn nhỏ
- Điều chỉnh `errorRate` để test biểu đồ

---

## 🔧 Tạo dữ liệu tùy chỉnh

Để tạo biến thể dữ liệu, trước tiên copy cấu trúc:

```typescript
export const mockDataCustom = {
  ...mockDataBundle,
  user: {
    ...mockUserData,
    fullName: "Trần Thị B",
    targetScore: 8.5,
  }
};
```

---

## ✅ Checklist test giao diện

- [ ] Hiển thị dữ liệu đúng theo mock
- [ ] Sidebar navigation hoạt động
- [ ] Biểu đồ render chính xác
- [ ] Progress bar hiển thị đúng %
- [ ] Responsive design ở mobile/tablet
- [ ] Hover effects trên cards
- [ ] Loading states (nếu có)
- [ ] Error states (nếu có)
- [ ] Tính năng edit/save trên Profile
- [ ] Filter/Sort trên Course list

---

## 📝 Ghi chú

- Tất cả dữ liệu là mô phỏng, không thật
- Dates được đặt trong tháng 04/2026
- Scores được thiết kế từ 7.0 - 9.5 (mô phỏng học sinh giỏi)
- Curriculum focus: THPT Quốc gia & Luyện thi vào 10
- Tất cả giáo viên là tên giả để test

---

**Created:** 15/04/2026  
**Last Updated:** 15/04/2026  
**Version:** 1.0
