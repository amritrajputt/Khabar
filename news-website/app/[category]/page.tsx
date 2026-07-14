import { notFound } from "next/navigation"
import ArticlesList from "@/components/news/articles-list"
import { fetchNews } from "@/lib/news"
export const revalidate = 300;

const ALLOWED_CATEGORIES = [
  "academic",
  "human-environment",
  "sports",
  "political",
  "entertainment",
  "music",
  "health",
  "science",
  "financial-market",
  "technology",
  "other"
]

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ category: string }>
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params

  if (!ALLOWED_CATEGORIES.includes(category)) {
    notFound()
  }

  let articles = []
  try {
    const data = await fetchNews({ category, country: "in", page: 1, pageSize: 24 })
    articles = data.articles || []
  } catch (error: any) {
    console.error(`Failed to fetch category ${category}:`, error.message)
  }

  return (
    <div className="py-6">
      <div className="text-center my-8 select-none">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight uppercase relative inline-block text-black">
          {category.replace("-", " ")} News
          <span className="absolute bottom-1 left-0 right-0 h-2.5 bg-[#e5c158]/50 -z-10 transform -rotate-1"></span>
        </h1>
      </div>

      <ArticlesList initialArticles={articles} category={category} />
    </div>
  )
}
