export const SITE_NAME = 'Englic.';
export const DEFAULT_SITE_URL = 'https://englic.io.vn';

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL).replace(/\/+$/, '');

export const DEFAULT_TITLE = 'Englic. | Luyện thi Tiếng Anh THPT Quốc Gia online';
export const DEFAULT_DESCRIPTION =
  'Englic. là nền tảng luyện thi Tiếng Anh THPT Quốc Gia online với kho đề cập nhật, chấm điểm tự động, lưu lịch sử làm bài và tủ sách song ngữ.';

export const SEO_KEYWORDS = [
  'luyện thi Tiếng Anh THPT Quốc Gia',
  'đề thi Tiếng Anh THPT Quốc Gia',
  'thi thử Tiếng Anh online',
  'đề thi thử Tiếng Anh 2026',
  'chấm điểm Tiếng Anh tự động',
  'Englic',
  'sách song ngữ',
];

export const getAbsoluteUrl = (pathname = '/') => {
  const safePath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${SITE_URL}${safePath}`;
};
