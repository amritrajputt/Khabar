import { fetchNews } from "@/lib/news"
import { HomeNewsFeed } from "@/components/news/home-news-feed"

export const revalidate = 300; 

export default async function Home() {
  let articles = []
  try {
    const data = await fetchNews({ category: "general", country: "in", pageSize: 60 })
    articles = data.articles || []
  } catch (error) {
    console.error("Failed to fetch news on homepage server:", error)
  }

  return (
    <>
      <div className="text-center my-8 select-none">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase relative inline-block text-black">
          Today News
          <span className="absolute bottom-1 left-0 right-0 h-3 bg-[#e5c158]/50 -z-10 transform -rotate-1"></span>
        </h1>
      </div>

      <HomeNewsFeed initialArticles={articles} />
    </>
  )
}
