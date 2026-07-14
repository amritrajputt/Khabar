import axios from "axios"
import fs from "fs"
import path from "path"

const CACHE_DIR = path.join(process.cwd(), "lib", "news-cache")

function getCache(key: string): any | null {
  try {
    const filePath = path.join(CACHE_DIR, `${key}.json`)
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8")
      return JSON.parse(content)
    }
  } catch (error) {
    console.error("Cache read failed:", error)
  }
  return null
}

function setCache(key: string, data: any) {
  try {
    if (!fs.existsSync(CACHE_DIR)) {
      fs.mkdirSync(CACHE_DIR, { recursive: true })
    }
    const filePath = path.join(CACHE_DIR, `${key}.json`)
    fs.writeFileSync(filePath, JSON.stringify(data), "utf-8")
  } catch (error) {
    console.error("Cache write failed:", error)
  }
}

const NEWSDATA_CATEGORY_MAP: Record<string, string> = {
  general: "top",
  "top-headlines": "top",
  academic: "science",
  "human-environment": "environment",
  sports: "sports",
  political: "politics",
  music: "entertainment",
  entertainment: "entertainment",
  health: "health",
  science: "science",
  "financial-market": "business",
  technology: "technology",
  other: "world"
}

function mapNewsDataToArticles(results: any[]): any[] {
  if (!results) return []
  return results.map((item: any) => ({
    source: {
      id: item.source_id || null,
      name: item.source_id ? item.source_id.toUpperCase() : "NewsData"
    },
    author: item.creator ? item.creator.join(", ") : null,
    title: item.title || "No Title Available",
    description: item.description || null,
    url: item.link || "#",
    urlToImage: item.image_url || null,
    publishedAt: item.pubDate || new Date().toISOString(),
    content: item.content || null
  }))
}

export interface FetchNewsOptions {
  category?: string
  country?: string
  query?: string
  page?: string | number
  pageSize?: string | number
}

export async function fetchNews({
  category = "general",
  country = "in",
  query = "",
  page = "1",
  pageSize = "24"
}: FetchNewsOptions) {
  const newsdataApiKey = process.env.NEXT_PUBLIC_NEWSDATA_IO
  
  if (!newsdataApiKey) {
    console.warn("NewsData.io API key is not configured in environment variables.")
    return {
      status: "ok",
      totalResults: 0,
      articles: []
    }
  }

  const cacheKey = `${category.toLowerCase()}_${country}`

  try {
    const newsdataParams: any = {
      apikey: newsdataApiKey,
      country: country === "in" ? "in" : country,
      language: "en",
      size: String(Math.min(10, Number(pageSize)))
    }

    if (query) {
      newsdataParams.q = query
    }

    const newsdataCat = NEWSDATA_CATEGORY_MAP[category.toLowerCase()] || "top"
    newsdataParams.category = newsdataCat

    const res = await axios.get("https://newsdata.io/api/1/news", { params: newsdataParams })
    if (res.data && res.data.results && res.data.results.length > 0) {
      const mapped = mapNewsDataToArticles(res.data.results)
      const successResponse = {
        status: "ok",
        totalResults: res.data.totalResults || mapped.length,
        articles: mapped
      }
      // Save successful request to cache
      setCache(cacheKey, successResponse)
      return successResponse
    }
  } catch (error: any) {
    console.error(`NewsData.io request failed for category "${category}":`, error.response?.data?.message || error.message)
  }

  // Load from local filesystem cache on rate limits or API failure
  const cachedData = getCache(cacheKey)
  if (cachedData) {
    console.log(`Serving cached real news articles for category: ${category}`)
    return cachedData
  }

  return {
    status: "ok",
    totalResults: 0,
    articles: []
  }
}
