"use client"

import { useState, useEffect, useRef } from "react"
import { Article } from "./types"
import NewsCard from "./news-card"
import axios from "axios"

interface ArticlesListProps {
  initialArticles: Article[]
  category: string
}

export default function ArticlesList({ initialArticles, category }: ArticlesListProps) {
  const [articles, setArticles] = useState<Article[]>(initialArticles)
  const [page, setPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(initialArticles.length >= 24)
  const [error, setError] = useState<string | null>(null)
  
  const observerRef = useRef<HTMLDivElement>(null)

  const loadMore = async () => {
    if (loading || !hasMore) return
    setLoading(true)
    setError(null)
    const nextPage = page + 1

    try {
      const res = await axios.get(`/api`, {
        params: {
          category,
          page: nextPage,
          pageSize: 24,
        },
      })

      const newArticles = res.data.articles || []
      
      if (newArticles.length === 0) {
        setHasMore(false)
      } else {
        setArticles((prev) => {
          const existingUrls = new Set(prev.map((a) => a.url))
          const filteredNew = newArticles.filter((a: Article) => !existingUrls.has(a.url))
          if (filteredNew.length === 0) {
            setHasMore(false)
          }
          return [...prev, ...filteredNew]
        })
        setPage(nextPage)
        
        if (newArticles.length < 24) {
          setHasMore(false)
        }
      }
    } catch (err: any) {
      console.error("Error loading more news:", err)
      setError("Failed to load more news. Please scroll up or try again.")
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    const observerTarget = observerRef.current
    if (!observerTarget || !hasMore || loading) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(observerTarget)

    return () => {
      observer.unobserve(observerTarget)
    }
  }, [hasMore, loading, page])

  return (
    <div className="flex flex-col items-center gap-12 w-full">
      {articles.length === 0 ? (
        <div className="text-center py-12 text-gray-500 font-bold uppercase select-none">No articles found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full justify-items-center">
          {articles.map((article: Article, idx) => (
            <NewsCard key={article.url + idx} article={article} />
          ))}
        </div>
      )}

      {error && (
        <div className="text-red-500 font-bold text-xs uppercase tracking-wider bg-red-100 border-2 border-red-500 px-4 py-2 brutal-shadow-sm">
          {error}
        </div>
      )}
      <div ref={observerRef} className="w-full flex justify-center py-4">
        {loading && (
          <div className="px-8 py-3 text-sm font-black tracking-widest border-[3px] border-black bg-[#e5c158] text-black brutal-shadow uppercase animate-bounce select-none">
            LOADING NEWS...
          </div>
        )}
      </div>

      {!hasMore && articles.length > 0 && (
        <div className="text-xs font-black tracking-widest bg-neutral-100 border-2 border-black px-4 py-2 select-none uppercase">
          YOU'VE REACHED THE END OF THE FEED
        </div>
      )}
    </div>
  )
}
