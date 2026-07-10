'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { saveAdminExam } from '@/lib/examLocalStorage';
import { normalizeExam } from '@/lib/examTypes';

export default function AdminUploadExamPage() {
  const [rawJson, setRawJson] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [savedIds, setSavedIds] = useState<string[]>([]);

  const saveRawExam = (raw: any) => {
    const exam = saveAdminExam(raw);
    setSavedIds((prev) => [exam.examId, ...prev]);
    return exam.examId;
  };

  const handleTextUpload = () => {
    setError('');
    setMessage('');
    try {
      const parsed = JSON.parse(rawJson);
      const normalized = normalizeExam(parsed);
      if (!normalized.sections.length || normalized.sections.every((section) => section.questions.length === 0)) {
        throw new Error('JSON hợp lệ nhưng chưa có câu hỏi trong sections/questions.');
      }
      const id = saveRawExam(parsed);
      setMessage(`Đã upload đề ${id} vào frontend localStorage.`);
      setRawJson('');
    } catch (err: any) {
      setError(err?.message || 'JSON không hợp lệ.');
    }
  };

  const handleFileUpload = async (files: FileList | null) => {
    setError('');
    setMessage('');
    if (!files?.length) return;

    const imported: string[] = [];
    const failed: string[] = [];

    for (const file of Array.from(files)) {
      try {
        const text = await file.text();
        const parsed = JSON.parse(text);
        const normalized = normalizeExam({ ...parsed, originalFileName: file.name });
        if (!normalized.sections.length || normalized.sections.every((section) => section.questions.length === 0)) {
          throw new Error('không có câu hỏi');
        }
        imported.push(saveRawExam({ ...parsed, originalFileName: file.name }));
      } catch (err) {
        failed.push(file.name);
      }
    }

    if (imported.length) setMessage(`Đã upload ${imported.length} đề: ${imported.join(', ')}`);
    if (failed.length) setError(`Các file chưa import được: ${failed.join(', ')}`);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-gray-800 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap justify-between items-end gap-4 mb-8">
          <div>
            <Link href="/admin/de-thi" className="text-gray-500 hover:text-purple-600 font-medium">← Quản lý đề thi</Link>
            <h1 className="text-4xl font-black mt-4 mb-2">Upload đề JSON</h1>
            <p className="text-gray-500">Hỗ trợ schema JSON v2: examId, title, time, answerKey, sections, questions.</p>
          </div>
          <Link href="/de-thi" className="px-5 py-3 rounded-xl bg-white border border-gray-200 text-gray-700 font-black shadow-sm">
            Xem frontend
          </Link>
        </div>

        {message && <div className="mb-5 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold">{message}</div>}
        {error && <div className="mb-5 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 font-bold">{error}</div>}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <h2 className="text-xl font-black mb-3">Upload file JSON</h2>
            <p className="text-sm text-gray-500 mb-5">Có thể chọn một hoặc nhiều file JSON. Đề sẽ hiện ngay ở /de-thi trên cùng trình duyệt.</p>
            <input
              type="file"
              accept=".json,application/json"
              multiple
              onChange={(event) => handleFileUpload(event.target.files)}
              className="block w-full border border-gray-200 rounded-2xl p-4 bg-gray-50"
            />
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <h2 className="text-xl font-black mb-3">Dán JSON thủ công</h2>
            <textarea
              value={rawJson}
              onChange={(event) => setRawJson(event.target.value)}
              placeholder='{ "examId": "...", "title": "...", "sections": [...] }'
              className="w-full min-h-[260px] border border-gray-200 rounded-2xl p-4 font-mono text-sm outline-none focus:ring-2 focus:ring-purple-300"
            />
            <button onClick={handleTextUpload} className="mt-4 w-full py-3 rounded-xl bg-purple-600 text-white font-black hover:bg-purple-700 transition-colors">
              Lưu đề vào frontend
            </button>
          </div>
        </div>

        {savedIds.length > 0 && (
          <div className="mt-6 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <h2 className="text-xl font-black mb-4">Đề vừa upload</h2>
            <div className="flex flex-wrap gap-3">
              {savedIds.map((id) => (
                <Link key={id} href={`/de-thi/${encodeURIComponent(id)}`} className="px-4 py-2 rounded-xl bg-purple-50 border border-purple-100 text-purple-700 font-bold">
                  {id}
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 p-5 rounded-2xl bg-amber-50 border border-amber-200 text-sm text-amber-800">
          <strong>Quan trọng:</strong> upload bằng frontend admin là lưu localStorage, phù hợp test nhanh hoặc chạy nội bộ. Nếu muốn tất cả user trên Vercel đều thấy đề mới, cần commit file JSON vào <code>frontend/public/exams</code> hoặc dùng database/KV.
        </div>
      </div>
    </div>
  );
}
