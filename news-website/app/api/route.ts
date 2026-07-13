import { NextResponse } from "next/server";

export async function GET(request: Request){
    const {searchParams} = new URL(request.url)

    const category = searchParams.get("category") || "general"
    const country = searchParams.get("country") || "in"
    const publishedAt = searchParams.get("publishedAt") || new Date().getDate().toString()
    const  query = searchParams.get("query") || ""
    const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY


    const res = await fetch(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&from=${publishedAt}&q=${query}`)

    const data = await res.json()
    return NextResponse.json(data)
}