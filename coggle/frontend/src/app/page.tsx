import Link from "next/link";
import { fetchApi, buildQueryString } from "@/lib/api";
import HeroSection from "@/components/homepage/HeroSection";
import BlogCard from "@/components/blog/BlogCard";
import TutorialList from "@/components/tutorials/TutorialList";
import CompetitionCard from "@/components/competitions/CompetitionCard";
import type { HomepageResponse, TutorialSummary, PaginatedResponse } from "@/types/content";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let data: HomepageResponse;
  let allTutorials: TutorialSummary[] = [];

  try {
    const [homeData, tutorialData] = await Promise.all([
      fetchApi<HomepageResponse>("/homepage"),
      fetchApi<PaginatedResponse<TutorialSummary>>(
        `/tutorials${buildQueryString({ page: 1, page_size: 100 })}`,
      ),
    ]);
    data = homeData;
    allTutorials = tutorialData.items;
  } catch {
    return (
      <div className="mx-auto max-w-6xl px-4 py-24 text-center sm:px-6">
        <h1 className="mb-4 text-4xl font-bold text-gray-900">Coggle</h1>
        <p className="text-gray-600">
          数据科学与数据竞赛内容分享社区
        </p>
      </div>
    );
  }

  return (
    <>
      <HeroSection />

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        {/* Recent blog posts */}
        <section className="mb-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">最新文章</h2>
            <Link
              href="/blog"
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              查看全部 &rarr;
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.recent_posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </section>

        {/* Featured tutorials */}
        <section className="mb-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">精选教程</h2>
            <Link
              href="/tutorials"
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              查看全部 &rarr;
            </Link>
          </div>
          <TutorialList tutorials={allTutorials} showSeriesProgress={true} />
        </section>

        {/* Recent competitions */}
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">竞赛动态</h2>
            <Link
              href="/competitions"
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              查看全部 &rarr;
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {data.recent_competitions.map((competition) => (
              <CompetitionCard
                key={competition.slug}
                competition={competition}
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
