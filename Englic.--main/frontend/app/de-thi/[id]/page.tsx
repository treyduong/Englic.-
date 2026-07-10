import type { Metadata } from 'next';
import ExamDetailClient from './ExamDetailClient';
import { getStaticExamById, getStaticExamSummaries } from '@/lib/examServer';
import { getAbsoluteUrl, SITE_NAME } from '@/lib/site';
import { getTotalQuestions } from '@/lib/examTypes';

type ExamDetailPageProps = {
  params: Promise<{ id: string }>;
};

const decodeExamId = (id: string) => decodeURIComponent(String(id || ''));

export async function generateStaticParams() {
  const exams = await getStaticExamSummaries();
  return exams.map((exam) => ({ id: exam.id }));
}

export async function generateMetadata({ params }: ExamDetailPageProps): Promise<Metadata> {
  const { id: rawId } = await params;
  const id = decodeExamId(rawId);
  const exam = await getStaticExamById(id);

  if (!exam) {
    return {
      title: 'Không tìm thấy đề thi',
      robots: { index: false, follow: false },
    };
  }

  const totalQuestions = getTotalQuestions(exam);
  const minutes = Math.round((exam.timeLimit || 3600) / 60);
  const description =
    exam.description ||
    `Làm thử ${exam.title} online trên Englic. Đề gồm ${totalQuestions} câu, thời gian ${minutes} phút, có chấm điểm tự động.`;

  return {
    title: exam.title,
    description,
    alternates: {
      canonical: `/de-thi/${encodeURIComponent(id)}`,
    },
    openGraph: {
      title: `${exam.title} | ${SITE_NAME}`,
      description,
      url: getAbsoluteUrl(`/de-thi/${encodeURIComponent(id)}`),
      type: 'article',
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: exam.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: exam.title,
      description,
      images: [getAbsoluteUrl('/og-image.jpg')],
    },
  };
}

export default async function ExamDetailPage({ params }: ExamDetailPageProps) {
  const { id } = await params;
  return <ExamDetailClient id={decodeExamId(id)} />;
}
