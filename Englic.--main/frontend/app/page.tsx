import Link from "next/link";
import Header from "@/components/Header";
import { promises as fs } from "fs";
import path from "path";
import { ExamSummary } from "@/lib/examTypes";
import { DEFAULT_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

// ISR: trang chủ tự làm mới dữ liệu mỗi 1 giờ khi deploy production.
export const revalidate = 3600;

async function getLatestExams(): Promise<ExamSummary[]> {
  try {
    const raw = await fs.readFile(
      path.join(process.cwd(), "public", "exams", "index.json"),
      "utf8",
    );
    const parsed = JSON.parse(raw);
    const exams: ExamSummary[] = Array.isArray(parsed)
      ? parsed
      : parsed.exams || [];

    return exams
      .filter((exam) => exam?.id && exam?.title)
      .sort((a, b) => {
        const dateA = new Date(a.updatedAt || a.createdAt || 0).getTime();
        const dateB = new Date(b.updatedAt || b.createdAt || 0).getTime();
        return dateB - dateA;
      })
      .slice(0, 8);
  } catch {
    // Không dùng dữ liệu giả lập. Nếu chưa có index đề thi, giao diện sẽ hiển thị trạng thái trống.
    return [];
  }
}

export default async function Home() {
  const latestExams = await getLatestExams();

  return (
    <div className="min-h-screen bg-white text-gray-800 selection:bg-purple-500/40 relative overflow-hidden">
      {/* Nền Hologram */}
      <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-50%] right-[-20%] w-[600px] h-[800px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none" />

      {/* JSON-LD cho Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: SITE_NAME,
            url: SITE_URL,
            description: DEFAULT_DESCRIPTION,
            potentialAction: {
              "@type": "SearchAction",
              target: `${SITE_URL}/de-thi?q={search_term_string}`,
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />

      <Header />

      <main className="relative z-10">
        {/* 1. HERO SECTION */}
        <section className="py-24 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-5xl md:text-6xl md:leading-[1.2] font-extrabold text-gray-900 mb-6">
              Nền tảng luyện thi <br />
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text drop-shadow-[0_0_10px_rgba(168,85,247,0.2)]">
                Miễn phí
              </span>{" "}
              số 1 Việt Nam
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Hàng ngàn đề thi thật THPT Quốc Gia được cập nhật liên tục. Chấm
              điểm tự động, giải thích chi tiết từng câu hoàn toàn miễn phí.
            </p>

            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Link href="/de-thi" className="block">
                <button className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                  Bắt đầu thi thử ngay
                </button>
              </Link>

              <Link href="/sach-song-ngu" className="block">
                <button className="w-full bg-white text-gray-700 border border-gray-300 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-colors">
                  Khám phá bộ tài liệu
                </button>
              </Link>
            </div>
          </div>

          {/* Cột phải: Hình ảnh chuyên gia */}
          <div className="flex-1 relative w-full h-[400px] hidden md:flex justify-center items-center">
            <div className="w-64 h-64 rounded-full border-4 border-white shadow-[0_10px_30px_rgba(0,0,0,0.1)] overflow-hidden z-20 hover:scale-105 transition-transform translate-x-4">
              <img
                src="https://app.gak.vn/storage/uploads/wcCMNszgaqC1BMN7bezVIfdF4iqrFBx62hBncPpp.jpg"
                alt="Chuyên gia luyện thi tiếng Anh"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="w-64 h-64 rounded-full border-4 border-white shadow-[0_10px_30px_rgba(0,0,0,0.1)] overflow-hidden z-30 hover:scale-105 transition-transform -translate-x-4">
              <img
                src="https://cdn.pico.vn/2026/01/15/176847124416252639803.jpeg"
                alt="Giảng viên đồng hành cùng học viên"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* 2. ĐỀ THI MỚI NHẤT */}
        <section id="de-thi" className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Đề thi mới nhất
            </h2>
          </div>

          {latestExams.length === 0 ? (
            <div className="p-8 bg-white border border-gray-100 rounded-3xl text-center text-gray-500">
              Chưa có đề thi được cập nhật.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {latestExams.map((exam) => {
                const visibleStats = [
                  exam.time ? `⏱️ ${exam.time}` : "",
                  exam.questions ? `📄 ${exam.questions} câu hỏi` : "",
                ].filter(Boolean);

                return (
                  <div
                    key={exam.id}
                    className="bg-white border border-gray-200 rounded-xl p-5 hover:border-blue-500/50 hover:shadow-md transition-all flex flex-col h-full group"
                  >
                    <h3 className="font-bold text-gray-900 text-[16px] mb-3 leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {exam.title}
                    </h3>

                    {visibleStats.length > 0 && (
                      <div className="text-sm text-gray-500 mb-4 flex flex-wrap items-center gap-3">
                        {visibleStats.map((item) => (
                          <span key={item} className="flex items-center gap-1">
                            {item}
                          </span>
                        ))}
                      </div>
                    )}

                    {exam.tags && exam.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {exam.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="bg-blue-50 text-blue-600 border border-blue-100 text-xs px-2.5 py-1 rounded-md font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-auto pt-2">
                      <Link
                        href={`/de-thi/${encodeURIComponent(exam.id)}`}
                        className="block w-full"
                      >
                        <button className="w-full py-2.5 border border-blue-500/40 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 hover:border-blue-500 transition-all">
                          Chi tiết
                        </button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
