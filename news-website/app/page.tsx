"use client"

import { 
  MagnifyingGlass, 
  CaretLeft, 
  CaretRight, 
  ArrowRight
} from "@phosphor-icons/react"

export default function Home() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6 md:py-10 text-black">
      <div className="text-center mb-8 select-none">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase relative inline-block text-black">
          Today News
          <span className="absolute bottom-1 left-0 right-0 h-3 bg-[#e5c158]/50 -z-10 transform -rotate-1"></span>
        </h1>
      </div>

      <header className="flex flex-col md:flex-row items-center justify-between border-b-[3px] border-black pb-6 gap-4 md:gap-0">
        <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-start">
          <div className="text-2xl md:text-3xl font-black tracking-tighter flex items-center gap-1">
            <span className="bg-black text-white px-3 py-1 transform -skew-x-6">KHABAR</span>
          </div>
        </div>

        <div className="w-full md:w-auto text-right">
          <button className="w-full md:w-auto px-6 py-2.5 text-xs font-black tracking-widest border-[3px] border-black hover:bg-black hover:text-white transition-colors duration-150 brutal-shadow uppercase bg-white">
            Contact Us
          </button>
        </div>
      </header>

      <section className="border-[3px] border-black p-4 bg-white/40 backdrop-blur-xs brutal-shadow mb-12 flex flex-col md:flex-row gap-4 items-stretch md:items-center">
        <div className="relative flex-1 min-w-[200px] border-2 border-black bg-white flex items-center px-3 py-1.5 focus-within:ring-2 focus-within:ring-black">
          <MagnifyingGlass size={18} className="text-neutral-500 mr-2 shrink-0" weight="bold" />
          <input 
            type="text" 
            placeholder="SEARCH..." 
            className="w-full bg-transparent border-none outline-none text-xs font-black tracking-wider placeholder-neutral-500"
          />
        </div>

        <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0 scrollbar-thin select-none flex-nowrap w-full md:w-auto md:max-w-3xl">
          <button className="text-[10px] md:text-xs font-black tracking-wider px-3 py-1.5 whitespace-nowrap border border-transparent hover:border-black text-neutral-600 hover:text-black uppercase">
            ACADEMIC
          </button>
          
          <button className="text-[10px] md:text-xs font-black tracking-wider px-3 py-1.5 whitespace-nowrap bg-[#e5c158] border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-black uppercase">
            HUMAN & ENVIRONMENT
          </button>

          <button className="text-[10px] md:text-xs font-black tracking-wider px-3 py-1.5 whitespace-nowrap border border-transparent hover:border-black text-neutral-600 hover:text-black uppercase">
            SPORTS
          </button>
          <button className="text-[10px] md:text-xs font-black tracking-wider px-3 py-1.5 whitespace-nowrap border border-transparent hover:border-black text-neutral-600 hover:text-black uppercase">
            POLITICAL
          </button>
          <button className="text-[10px] md:text-xs font-black tracking-wider px-3 py-1.5 whitespace-nowrap border border-transparent hover:border-black text-neutral-600 hover:text-black uppercase">
            MUSIC
          </button>
          <button className="text-[10px] md:text-xs font-black tracking-wider px-3 py-1.5 whitespace-nowrap border border-transparent hover:border-black text-neutral-600 hover:text-black uppercase">
            FINANCIAL MARKET
          </button>
          <button className="text-[10px] md:text-xs font-black tracking-wider px-3 py-1.5 whitespace-nowrap border border-transparent hover:border-black text-neutral-600 hover:text-black uppercase">
            OTHER
          </button>
        </div>
      </section>

      <main className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <section className="flex flex-col gap-6">
          <div className="border-b-4 border-black pb-2">
            <h2 className="text-2xl font-black uppercase tracking-tight">Popular News</h2>
          </div>

          <div className="flex flex-col gap-8 min-h-[460px]">
            <div className="flex flex-col items-center justify-center min-h-[400px] border-2 border-dashed border-neutral-400 bg-white/20 select-none">
              <p className="text-sm font-black tracking-wider uppercase text-neutral-400">Waiting for API feed...</p>
            </div>
          </div>

          <div className="flex items-center justify-between border-t-4 border-black pt-4 mt-6">
            <div className="flex items-center gap-3">
              <button className="w-9 h-9 border-2 border-black flex items-center justify-center font-bold brutal-btn">
                <CaretLeft size={16} weight="bold" />
              </button>
              <button className="w-9 h-9 border-2 border-black flex items-center justify-center font-bold brutal-btn">
                <CaretRight size={16} weight="bold" />
              </button>
            </div>
            <div className="flex-1 mx-6 border-b-2 border-dashed border-black/40"></div>
            <a href="#" className="text-xs font-black tracking-widest uppercase hover:underline flex items-center gap-1">
              See All <ArrowRight size={12} weight="bold" />
            </a>
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <div className="border-b-4 border-black pb-2">
            <h2 className="text-2xl font-black uppercase tracking-tight">Hot News</h2>
          </div>

          <div className="border-[3px] border-black bg-white/30 backdrop-blur-xs p-5 brutal-shadow-lg flex flex-col items-center justify-center min-h-[350px] select-none">
            <p className="text-sm font-black tracking-wider uppercase text-neutral-400">No Featured Article</p>
          </div>
        </section>
      </main>

      <footer className="mt-20 border-t-[3px] border-black pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs font-bold text-neutral-600 uppercase">
          © {new Date().getFullYear()} Daily News. Built in Premium Neo-Brutalist Style.
        </p>
        <div className="text-xs font-black tracking-widest bg-[#e5c158] border-2 border-black px-3 py-1 transform rotate-1 shadow-sm">
          GEOMETRIC & GRID SYSTEM ACTIVE
        </div>
      </footer>
    </div>
  )
}
