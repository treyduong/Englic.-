'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { fetchExamById } from '@/lib/examFetch';
import { getAdminExamById, saveExamResult } from '@/lib/examLocalStorage';
import { calculateExamResult, Exam, ExamAttemptResult } from '@/lib/examTypes';


const formatTime = (seconds: number) => {
  const safeSeconds = Math.max(seconds, 0);
  const m = Math.floor(safeSeconds / 60).toString().padStart(2, '0');
  const s = (safeSeconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
};

export default function ExamRoomPage() {
  const params = useParams<{ id: string }>();
  const id = decodeURIComponent(String(params.id || ''));

  const [examData, setExamData] = useState<Exam | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [results, setResults] = useState<ExamAttemptResult | null>(null);
  const [startedAt, setStartedAt] = useState(new Date().toISOString());
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadExam = async () => {
      try {
        const localExam = getAdminExamById(id);
        const loadedExam = localExam || (await fetchExamById(id));
        if (!loadedExam || !loadedExam.sections.length) {
          setError('Không tìm thấy đề thi hoặc đề chưa có câu hỏi.');
          return;
        }
        setExamData(loadedExam);
        setTimeLeft(Number(loadedExam.timeLimit || 3600));
        setStartedAt(new Date().toISOString());
      } catch {
        setError('Không tải được đề thi.');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) loadExam();
  }, [id]);

  useEffect(() => {
    if (!examData || isSubmitted) return;

    const timer = window.setInterval(() => {
      setTimeLeft((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [examData, isSubmitted]);

  useEffect(() => {
    if (examData && !isSubmitted && timeLeft === 0) {
      handleSubmit(true);
    }
  }, [timeLeft, examData, isSubmitted]);

  const activeSection = useMemo(() => examData?.sections[activeSectionIdx] || examData?.sections[0], [examData, activeSectionIdx]);

  const explanationsByQuestionId = useMemo(() => {
    const map: Record<string, { correctOption: string; explain: string }> = {};
    results?.details.forEach((detail) => {
      map[detail.questionId] = {
        correctOption: detail.correctAnswer,
        explain: detail.explanation,
      };
    });
    return map;
  }, [results]);

  const handleSelectAnswer = (questionId: string, optionKey: string) => {
    if (isSubmitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: optionKey }));
  };

  const handleSubmit = (autoSubmit = false) => {
    if (!examData || isSubmitted) return;
    if (!autoSubmit && !window.confirm('Bạn có chắc chắn muốn nộp bài?')) return;

    const submittedAt = new Date().toISOString();
    const calculated = calculateExamResult(examData, answers, startedAt, submittedAt);
    setResults(calculated);
    setIsSubmitted(true);
    saveExamResult(calculated);
  };

  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center bg-white font-sans`}>
        <div className="text-center text-gray-500 font-semibold">Đang tải phòng thi...</div>
      </div>
    );
  }

  if (error || !examData || !activeSection) {
    return (
      <div className={`min-h-screen flex items-center justify-center bg-gray-50 px-6 font-sans`}>
        <div className="max-w-lg bg-white p-8 rounded-3xl border border-red-100 shadow-sm text-center">
          <p className="text-3xl mb-3">⚠️</p>
          <h1 className="text-xl font-black text-gray-900 mb-2">Không mở được đề</h1>
          <p className="text-gray-600 mb-6">{error || 'Đề không hợp lệ.'}</p>
          <Link href="/de-thi" className="inline-flex px-5 py-3 rounded-xl bg-purple-600 text-white font-bold">
            Về danh sách đề
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`h-screen flex flex-col bg-white text-gray-800 overflow-hidden selection:bg-purple-200 font-sans`}>
      <header className="bg-white border-b border-gray-100 h-16 flex-shrink-0 flex items-center justify-between px-4 md:px-6 z-10 shadow-sm relative overflow-hidden">
        <div className="absolute top-[-50%] left-[20%] w-[200px] h-[100px] bg-purple-400/20 rounded-full blur-[40px] pointer-events-none" />
        <div className="absolute top-[-50%] right-[10%] w-[150px] h-[100px] bg-blue-400/20 rounded-full blur-[40px] pointer-events-none" />

        <div className="flex items-center gap-4 md:gap-6 relative z-10">
          <Link href={`/de-thi/${encodeURIComponent(id)}`} className="text-gray-500 hover:text-red-500 font-bold transition-colors flex items-center gap-1 bg-gray-50 hover:bg-red-50 px-3 py-1.5 rounded-lg border border-gray-200 hover:border-red-200">
            ✕ <span className="hidden sm:inline">Thoát</span>
          </Link>
          <div className="w-px h-6 bg-gray-200 hidden md:block" />
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`p-2 rounded-xl transition-all duration-200 ${isSidebarOpen ? 'bg-purple-100 text-purple-600 shadow-inner' : 'text-gray-400 hover:text-purple-600 hover:bg-purple-50'}`}
            aria-label="Ẩn hiện danh sách phần thi"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          <h1 className="font-semibold text-gray-700 border-l border-gray-200 pl-4 md:pl-6 hidden lg:block line-clamp-1 max-w-md">
            {examData.title}
          </h1>
        </div>

        <div className="flex items-center gap-3 md:gap-4 relative z-10">
          {isSubmitted && results ? (
            <div className={`text-base md:text-lg font-bold px-4 py-1.5 rounded-lg border shadow-sm ${results.score >= 5 ? 'text-green-600 border-green-200 bg-green-50' : 'text-red-600 border-red-200 bg-red-50'}`}>
              Điểm: {results.score} | Đúng: {results.correctCount}/{results.totalQuestions}
            </div>
          ) : (
            <div className={`text-base md:text-lg font-bold font-mono px-3 py-1.5 md:px-4 rounded-lg border ${timeLeft < 300 ? 'text-red-500 border-red-200 animate-pulse bg-red-50/50' : 'text-purple-600 border-purple-100 bg-purple-50/50 shadow-[0_0_10px_rgba(168,85,247,0.1)]'}`}>
              {formatTime(timeLeft)}
            </div>
          )}
          {!isSubmitted && (
            <button onClick={() => handleSubmit(false)} className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-4 py-2 md:px-6 md:py-2 rounded-xl font-bold shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] hover:scale-105 transition-all">
              NỘP BÀI
            </button>
          )}
          {isSubmitted && (
            <Link href="/dashboard" className="bg-white border border-purple-200 text-purple-700 px-4 py-2 rounded-xl font-bold hover:bg-purple-50 transition-colors">
              Xem dashboard
            </Link>
          )}
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        <aside className={`flex-shrink-0 bg-gray-50/50 border-r border-gray-100 transition-all duration-300 ease-in-out overflow-hidden z-10 ${isSidebarOpen ? 'w-64 opacity-100' : 'w-0 opacity-0 border-none'}`}>
          <div className="w-64 h-full overflow-y-auto">
            <div className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Danh sách phần thi</div>
            <nav className="flex flex-col">
              {examData.sections.map((section, idx) => {
                const sectionName = `Phần ${idx + 1}: ${section.sectionType.replace(/_/g, ' ')}`;
                return (
                  <button
                    key={`${section.sectionType}-${idx}`}
                    onClick={() => setActiveSectionIdx(idx)}
                    className={`text-left px-4 py-4 border-l-4 font-medium transition-all capitalize ${
                      activeSectionIdx === idx ? 'border-purple-500 bg-gradient-to-r from-purple-50 to-transparent text-purple-700' : 'border-transparent text-gray-500 hover:bg-gray-100/50 hover:text-gray-800'
                    }`}
                  >
                    <span className="block text-[14px]">{sectionName}</span>
                    <span className="block text-[11px] text-gray-400 font-normal mt-1 truncate">{section.questions.length} câu hỏi</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        <section className="flex-1 border-r border-gray-100 bg-white overflow-y-auto p-6 md:p-10 leading-relaxed text-gray-800 transition-all duration-300 relative">
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 capitalize">
            {activeSection.sectionType.replace(/_/g, ' ')}
          </h2>

          {activeSection.instruction && (
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 rounded-r-lg text-sm text-blue-800 font-medium italic">
              {activeSection.instruction}
            </div>
          )}

          {activeSection.passageTitle && <h3 className="text-lg font-black text-gray-900 mb-3">{activeSection.passageTitle}</h3>}

          {activeSection.passage ? (
            <div className="text-[15px] md:text-[16px] space-y-4 whitespace-pre-wrap text-gray-700 text-justify">
              {activeSection.passage}
            </div>
          ) : (
            <div className="flex items-center justify-center h-48 text-gray-400 italic">
              Phần này không có đoạn văn chung, vui lòng xem câu hỏi ở cột bên phải.
            </div>
          )}
        </section>

        <aside className="w-full lg:w-[450px] xl:w-[500px] bg-[#fafafa] flex-shrink-0 overflow-y-auto p-4 md:p-8 space-y-6 relative border-l border-gray-100">
          <div className="fixed bottom-0 right-0 w-[300px] h-[300px] bg-pink-300/10 rounded-full blur-[80px] pointer-events-none" />

          {activeSection.questions.map((q) => {
            let cardClass = 'bg-white/80 backdrop-blur-sm p-4 md:p-5 rounded-xl border shadow-sm relative z-10 transition-colors ';
            let statusBadge: React.ReactNode = null;
            const correctOpt = explanationsByQuestionId[q.id]?.correctOption;
            const userOpt = answers[q.id];

            if (isSubmitted && results) {
              if (!userOpt) {
                cardClass += 'border-red-400 bg-red-50/40';
                statusBadge = <span className="text-red-600 text-[11px] font-bold uppercase bg-red-100/80 border border-red-200 px-2 py-0.5 rounded-md flex-shrink-0">❌ Bỏ trống</span>;
              } else if (userOpt !== correctOpt) {
                cardClass += 'border-red-400 bg-red-50/40';
                statusBadge = <span className="text-red-600 text-[11px] font-bold uppercase bg-red-100/80 border border-red-200 px-2 py-0.5 rounded-md flex-shrink-0">❌ Sai</span>;
              } else {
                cardClass += 'border-green-400 bg-green-50/40';
                statusBadge = <span className="text-green-700 text-[11px] font-bold uppercase bg-green-100/80 border border-green-200 px-2 py-0.5 rounded-md flex-shrink-0">✅ Đúng</span>;
              }
            } else {
              cardClass += 'border-gray-100 hover:border-purple-200';
            }

            return (
              <div key={q.id} className={cardClass}>
                <div className="flex justify-between items-start mb-4 gap-3">
                  <h3 className="font-bold text-[15px] text-gray-800 flex-1">
                    <span className="text-purple-600">Câu {q.questionNumber}: </span>
                    {q.questionText || 'Chọn đáp án đúng nhất.'}
                  </h3>
                  {statusBadge}
                </div>

                {q.context && (
                  <div className="mb-4 bg-gray-50 border border-gray-200 p-3 rounded-lg text-sm text-gray-700 whitespace-pre-wrap font-mono">
                    {q.context}
                  </div>
                )}

                <div className="space-y-3">
                  {Object.entries(q.options).map(([optKey, optValue]) => {
                    const isSelected = answers[q.id] === optKey;
                    let btnClass = '';
                    let radioClass = '';

                    if (isSubmitted && results) {
                      const isCorrectOption = correctOpt === optKey;
                      if (isCorrectOption) {
                        btnClass = 'border-green-500 bg-green-50 text-green-800 font-bold shadow-sm';
                        radioClass = 'border-green-500 bg-green-500';
                      } else if (isSelected && !isCorrectOption) {
                        btnClass = 'border-red-400 bg-red-50/50 text-red-600 line-through opacity-80';
                        radioClass = 'border-red-400 bg-red-400';
                      } else {
                        btnClass = 'border-gray-200 bg-white opacity-40';
                        radioClass = 'border-gray-300';
                      }
                    } else {
                      btnClass = isSelected ? 'border-purple-400 bg-purple-50 text-purple-800 shadow-[0_0_15px_rgba(168,85,247,0.15)]' : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50/30 text-gray-600 hover:text-gray-900';
                      radioClass = isSelected ? 'border-purple-500' : 'border-gray-300 group-hover:border-purple-300';
                    }

                    return (
                      <button
                        key={optKey}
                        onClick={() => handleSelectAnswer(q.id, optKey)}
                        disabled={isSubmitted}
                        className={`w-full text-left p-3 rounded-lg border transition-all duration-300 flex items-start gap-3 group ${btnClass}`}
                      >
                        <div className={`mt-0.5 w-4 h-4 flex-shrink-0 rounded-full border-[1.5px] flex items-center justify-center transition-colors ${radioClass}`}>
                          {isSelected && !isSubmitted && <div className="w-2.5 h-2.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full" />}
                          {isSelected && isSubmitted && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
                        </div>
                        <span className="text-[14px] font-medium"><strong className="mr-1">{optKey}.</strong>{optValue}</span>
                      </button>
                    );
                  })}
                </div>

                {isSubmitted && explanationsByQuestionId[q.id] && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-700 bg-purple-50/80 p-3 rounded-lg border border-purple-100">
                      <span className="font-bold text-purple-600">💡 Giải thích: </span>
                      {explanationsByQuestionId[q.id].explain}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </aside>
      </main>
    </div>
  );
}
