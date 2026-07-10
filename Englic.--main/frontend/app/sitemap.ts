import type { MetadataRoute } from 'next';
import { getStaticExamSummaries } from '@/lib/examServer';
import { SITE_URL } from '@/lib/site';

const staticRoutes: Array<{ path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }> = [
  { path: '/', priority: 1, changeFrequency: 'daily' },
  { path: '/de-thi', priority: 0.95, changeFrequency: 'daily' },
  { path: '/sach-song-ngu', priority: 0.75, changeFrequency: 'weekly' },
  { path: '/gioi-thieu', priority: 0.65, changeFrequency: 'monthly' },
  { path: '/huong-dan-su-dung', priority: 0.65, changeFrequency: 'monthly' },
  { path: '/huong-dan-thanh-toan', priority: 0.55, changeFrequency: 'monthly' },
  { path: '/lien-he', priority: 0.55, changeFrequency: 'monthly' },
  { path: '/dieu-khoan-su-dung', priority: 0.35, changeFrequency: 'yearly' },
  { path: '/dieu-khoan-bao-mat', priority: 0.35, changeFrequency: 'yearly' },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticEntries = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route.path === '/' ? '' : route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const exams = await getStaticExamSummaries();
  const examEntries = exams.map((exam) => ({
    url: `${SITE_URL}/de-thi/${encodeURIComponent(exam.id)}`,
    lastModified: exam.updatedAt || exam.createdAt ? new Date(exam.updatedAt || exam.createdAt || now) : now,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  return [...staticEntries, ...examEntries];
}
