import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Khóa học của tôi',
  robots: { index: false, follow: false },
};

export default function CoursesLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
