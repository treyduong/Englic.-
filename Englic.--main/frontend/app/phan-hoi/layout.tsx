import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Phản hồi và khiếu nại',
  description: 'Gửi phản hồi, góp ý hoặc khiếu nại về quá trình sử dụng nền tảng Englic.',
  alternates: { canonical: '/phan-hoi' },
};

export default function FeedbackLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
