import type { Metadata } from 'next';
import ExamsListClient from './ExamsListClient';
import { getAbsoluteUrl, SITE_NAME } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Kho đề thi Tiếng Anh THPT Quốc Gia online',
  description:
    'Kho đề thi Tiếng Anh THPT Quốc Gia online của Englic. Luyện đề, xem chi tiết từng đề, chấm điểm tự động và theo dõi kết quả học tập.',
  alternates: {
    canonical: '/de-thi',
  },
  openGraph: {
    title: `Kho đề thi Tiếng Anh THPT Quốc Gia online | ${SITE_NAME}`,
    description: 'Luyện đề Tiếng Anh THPT Quốc Gia online với kho đề cập nhật và chấm điểm tự động.',
    url: getAbsoluteUrl('/de-thi'),
    type: 'website',
  },
};

export default function ExamsListPage() {
  return <ExamsListClient />;
}
