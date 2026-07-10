import type { Metadata } from 'next';
import { getAbsoluteUrl, SITE_NAME } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Liên hệ hỗ trợ học tập',
  description: 'Liên hệ Englic. để được hỗ trợ về luyện thi Tiếng Anh THPT Quốc Gia, thanh toán, tài khoản và tài liệu học tập.',
  alternates: { canonical: '/lien-he' },
  openGraph: {
    title: `Liên hệ hỗ trợ | ${SITE_NAME}`,
    description: 'Kênh liên hệ chính thức của Englic. cho học viên luyện thi Tiếng Anh.',
    url: getAbsoluteUrl('/lien-he'),
  },
};

export default function ContactLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
