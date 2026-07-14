import { NextResponse } from "next/server";
import { fetchNews } from "@/lib/news";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)

        const category = searchParams.get("category") || "general"
        const country = searchParams.get("country") || "in"
        const page = searchParams.get("page") || "1"
        const pageSize = searchParams.get("pageSize") || "12"
        const query = searchParams.get("query") || ""

        const data = await fetchNews({ category, country, query, page, pageSize })
        return NextResponse.json(data)
    } catch (error: any) {
        console.error("Error in API route:", error.response?.data || error.message);
        return NextResponse.json(
            {
                status: "error",
                message: error.response?.data?.message || error.message || "Failed to fetch news data",
                articles: []
            },
            { status: error.response?.status || 500 }
        )
    }
}