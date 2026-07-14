"use client"

import { useState } from "react"
import Link from "next/link"
import { PopularCard } from "./popular-card"
import { HotCard } from "./hot-card"
import { Article } from "./types"
import { CaretLeft, CaretRight, ArrowRight } from "@phosphor-icons/react"

interface HomeNewsFeedProps {
  initialArticles: Article[]
}

export function HomeNewsFeed({ initialArticles }: HomeNewsFeedProps) {
  const [popularIndex, setPopularIndex] = useState<number>(0)
  const [hotIndex, setHotIndex] = useState<number>(0)

  const hotArticles = initialArticles.slice(0, 50)
  const popularArticles = initialArticles.slice(5)
  const totalPopularPages = Math.ceil(popularArticles.length / 3)

  const handleNextPopular = () => {
    setPopularIndex((prev) => (prev < totalPopularPages - 1 ? prev + 1 : 0))
  }

  const handlePrevPopular = () => {
    setPopularIndex((prev) => (prev > 0 ? prev - 1 : totalPopularPages - 1))
  }

  return (
    <main className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
      <section className="flex flex-col gap-6">
        <div className="border-b-4 border-black pb-2">
          <h2 className="text-2xl font-black uppercase tracking-tight">Popular News</h2>
        </div>

        {popularArticles.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] border-2 border-dashed border-neutral-400 bg-white/20 select-none">
            <p className="text-sm font-black tracking-wider uppercase text-neutral-400">No popular articles found.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-8 min-h-[460px]">
            {popularArticles
              .slice(popularIndex * 3, (popularIndex + 1) * 3)
              .map((article, idx) => (
                <PopularCard 
                  key={article.url + idx} 
                  article={article} 
                  isReversed={idx % 2 === 1}
                />
              ))
            }
          </div>
        )}

        {popularArticles.length > 0 && (
          <div className="flex items-center justify-between border-t-4 border-black pt-4 mt-6">
            <div className="flex items-center gap-3">
              <button 
                onClick={handlePrevPopular}
                className="w-9 h-9 border-2 border-black flex items-center justify-center font-bold brutal-btn"
              >
                <CaretLeft size={16} weight="bold" />
              </button>
              <button 
                onClick={handleNextPopular}
                className="w-9 h-9 border-2 border-black flex items-center justify-center font-bold brutal-btn"
              >
                <CaretRight size={16} weight="bold" />
              </button>
            </div>
            <div className="flex-1 mx-6 border-b-2 border-dashed border-black/40"></div>
            <Link href="/sports" className="text-xs font-black tracking-widest uppercase hover:underline flex items-center gap-1">
              See All <ArrowRight size={12} weight="bold" />
            </Link>
          </div>
        )}
      </section>

      <section className="flex flex-col gap-6">
        <div className="border-b-4 border-black pb-2">
          <h2 className="text-2xl font-black uppercase tracking-tight">Hot News</h2>
        </div>

        {hotArticles.length === 0 ? (
          <div className="border-[3px] border-black bg-white/30 backdrop-blur-xs p-5 brutal-shadow-lg flex flex-col items-center justify-center min-h-[350px] select-none">
            <p className="text-sm font-black tracking-wider uppercase text-neutral-400">No Featured Article found.</p>
          </div>
        ) : (
          <HotCard 
            article={hotArticles[hotIndex]} 
            pageIndex={String(hotIndex + 1).padStart(2, "0")}
            onPrev={() => setHotIndex(prev => (prev > 0 ? prev - 1 : hotArticles.length - 1))}
            onNext={() => setHotIndex(prev => (prev < hotArticles.length - 1 ? prev + 1 : 0))}
          />
        )}
      </section>
    </main>
  )
}
