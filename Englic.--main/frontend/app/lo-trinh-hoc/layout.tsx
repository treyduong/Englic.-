import type { Metadata } from 'next';
import { getAbsoluteUrl, SITE_NAME } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Lộ trình học Tiếng Anh THPT Quốc Gia',
  description: 'Tham khảo lộ trình học Tiếng Anh THPT Quốc Gia theo mục tiêu điểm số, năng lực hiện tại và kế hoạch ôn tập.',
  alternates: { canonical: '/lo-trinh-hoc' },
  openGraph: {
    title: `Lộ trình học Tiếng Anh THPT Quốc Gia | ${SITE_NAME}`,
    description: 'Lộ trình ôn tập Tiếng Anh THPT Quốc Gia theo mục tiêu điểm số.',
    url: getAbsoluteUrl('/lo-trinh-hoc'),
  },
};

export default function LearningPathLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
