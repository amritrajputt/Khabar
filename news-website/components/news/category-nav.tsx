"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const CATEGORIES = [
  { name: "ACADEMIC", path: "/academic" },
  { name: "HUMAN & ENVIRONMENT", path: "/human-environment" },
  { name: "SPORTS", path: "/sports" },
  { name: "POLITICAL", path: "/political" },
  { name: "ENTERTAINMENT", path: "/entertainment" },
  { name: "MUSIC", path: "/music" },
  { name: "HEALTH", path: "/health" },
  { name: "SCIENCE", path: "/science" },
  { name: "FINANCIAL MARKET", path: "/financial-market" },
  { name: "TECHNOLOGY", path: "/technology" },
  { name: "OTHER", path: "/other" }
]

export function CategoryNav() {
  const pathname = usePathname()

  return (
    <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0 no-scrollbar select-none flex-nowrap w-full md:w-auto md:max-w-3xl">
      {CATEGORIES.map((cat) => {
        const isActive = pathname === cat.path

        return (
          <Link
            key={cat.path}
            href={cat.path}
            className={`text-[10px] md:text-xs font-black tracking-wider px-3 py-1.5 whitespace-nowrap transition-all duration-150 uppercase border-2 ${
              isActive
                ? "bg-[#e5c158] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-black"
                : "border-transparent hover:border-black text-neutral-600 hover:text-black"
            }`}
          >
            {cat.name}
          </Link>
        )
      })}
    </div>
  )
}
