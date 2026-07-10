import Link from 'next/link';

export default function CourseDetailPlaceholderPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 font-sans">
      <div className="max-w-lg bg-white p-8 rounded-3xl border border-purple-100 text-center shadow-sm">
        <p className="text-4xl mb-4">📚</p>
        <h1 className="text-2xl font-black text-gray-900 mb-3">Chi tiết khóa học đang được cập nhật</h1>
        <p className="text-gray-600 mb-6">Nội dung chi tiết cho khóa học này sẽ được bổ sung trong phiên bản tiếp theo.</p>
        <Link href="/khoa-hoc" className="inline-flex px-5 py-3 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-700 transition-colors">
          Quay lại khóa học
        </Link>
      </div>
    </div>
  );
}
