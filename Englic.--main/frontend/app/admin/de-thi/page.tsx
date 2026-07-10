'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { fetchExamSummaries } from '@/lib/examFetch';
import { deleteAdminExam, loadAdminExamSummaries } from '@/lib/examLocalStorage';
import { ExamSummary } from '@/lib/examTypes';

export default function AdminExamListPage() {
  const [staticExams, setStaticExams] = useState<ExamSummary[]>([]);
  const [localExams, setLocalExams] = useState<ExamSummary[]>([]);
  const [search, setSearch] = useState('');

  const reload = () => {
    fetchExamSummaries().then(setStaticExams).catch(() => setStaticExams([]));
    setLocalExams(loadAdminExamSummaries());
  };

  useEffect(() => {
    reload();
  }, []);

  const exams = useMemo(() => [...localExams, ...staticExams], [localExams, staticExams]);
  const filtered = exams.filter((exam) => `${exam.title} ${exam.id} ${exam.source || ''}`.toLowerCase().includes(search.toLowerCase()));

  const handleDeleteLocal = (examId: string) => {
    if (!window.confirm('Xóa đề admin upload khỏi localStorage?')) return;
    deleteAdminExam(examId);
    reload();
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-gray-800 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-between items-end gap-4 mb-8">
          <div>
            <Link href="/admin" className="text-gray-500 hover:text-purple-600 font-medium">← Admin dashboard</Link>
            <h1 className="text-4xl font-black mt-4 mb-2">Quản lý đề thi</h1>
            <p className="text-gray-500">Static: frontend/public/exams. Admin upload: localStorage trình duyệt.</p>
          </div>
          <Link href="/admin/de-thi/upload" className="px-5 py-3 rounded-xl bg-purple-600 text-white font-black shadow-md">
            + Upload đề
          </Link>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm mb-6">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Tìm theo tên đề, ID, nguồn..."
            className="w-full border border-gray-200 rounded-2xl px-5 py-3 outline-none focus:ring-2 focus:ring-purple-300"
          />
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wider">
              <tr>
                <th className="text-left p-4">Đề thi</th>
                <th className="text-left p-4">Kho lưu</th>
                <th className="text-left p-4">Câu</th>
                <th className="text-left p-4">Thời gian</th>
                <th className="text-left p-4">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((exam) => (
                <tr key={`${exam.storage || 'static'}-${exam.id}`} className="border-t border-gray-100 align-top">
                  <td className="p-4">
                    <p className="font-bold text-gray-900 line-clamp-2">{exam.title}</p>
                    <p className="text-xs text-gray-400 mt-1">ID: {exam.id}</p>
                    {exam.source && <p className="text-xs text-gray-400">Nguồn: {exam.source}</p>}
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-black ${exam.storage === 'admin-local' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-purple-50 text-purple-700 border border-purple-100'}`}>
                      {exam.storage === 'admin-local' ? 'Admin local' : 'Static public'}
                    </span>
                  </td>
                  <td className="p-4 font-bold">{exam.questions}</td>
                  <td className="p-4">{exam.time}</td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-2">
                      <Link href={`/de-thi/${encodeURIComponent(exam.id)}`} className="px-3 py-2 rounded-lg bg-gray-100 text-gray-700 font-bold hover:bg-gray-200">Xem</Link>
                      <Link href={`/de-thi/${encodeURIComponent(exam.id)}/lam-bai`} className="px-3 py-2 rounded-lg bg-purple-600 text-white font-bold hover:bg-purple-700">Làm bài</Link>
                      {exam.storage === 'admin-local' && (
                        <button onClick={() => handleDeleteLocal(exam.id)} className="px-3 py-2 rounded-lg bg-red-50 text-red-700 font-bold hover:bg-red-100">Xóa</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-10 text-center text-gray-500">Không có đề phù hợp.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
