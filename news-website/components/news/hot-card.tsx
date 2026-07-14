import { AvatarBadge } from "./avatar-badge"
import { CaretUp, CaretDown, CaretLeft, CaretRight, Globe, Clock } from "@phosphor-icons/react"
import { Article } from "./types"

interface HotCardProps {
  article: Article
  pageIndex?: string
  onPrev?: () => void
  onNext?: () => void
}

const AUTHOR_COLORS = ["bg-cyan-300", "bg-emerald-300", "bg-yellow-300", "bg-orange-300", "bg-pink-300", "bg-purple-300"];

export function HotCard({
  article,
  pageIndex = "01",
  onPrev,
  onNext
}: HotCardProps) {
  const getInitials = (name: string | null) => {
    if (!name) return "N";
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  const getAuthorColor = (name: string | null) => {
    if (!name) return "bg-yellow-300";
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % AUTHOR_COLORS.length;
    return AUTHOR_COLORS[index];
  };

  const renderTitle = (titleText: string) => {
    const cleanTitle = titleText.split(" | ")[0] || titleText;
    
    if (cleanTitle.includes(":")) {
      const parts = cleanTitle.split(":");
      const prefix = parts[0];
      const suffix = parts.slice(1).join(":");
      return (
        <>
          <span className="bg-[#e5c158] text-black px-1.5 py-0.5 border border-black inline-block font-extrabold mr-1.5 transform -rotate-1 shadow-sm">
            {prefix.toUpperCase()}
          </span>
          : {suffix}
        </>
      );
    }
    
    const words = cleanTitle.split(/\s+/);
    if (words.length > 2) {
      const highlight = words.slice(0, 2).join(" ");
      const remaining = words.slice(2).join(" ");
      return (
        <>
          <span className="bg-[#e5c158] text-black px-1.5 py-0.5 border border-black inline-block font-extrabold mr-1.5 transform -rotate-1 shadow-sm">
            {highlight.toUpperCase()}
          </span>{" "}
          {remaining}
        </>
      );
    }
    
    return cleanTitle;
  }

  const authorName = article.author || article.source.name || "Unknown Author";

  return (
    <div className="border-[3px] border-black bg-white/30 backdrop-blur-xs p-5 brutal-shadow-lg flex flex-col gap-6 relative">
      <div className="flex gap-4 items-stretch">
        <div className="flex-1 border-[3px] border-black bg-neutral-200 aspect-[16/10] overflow-hidden relative shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          {article.urlToImage ? (
            <img 
              src={article.urlToImage} 
              alt={article.title} 
              className="w-full h-full object-cover filter grayscale contrast-125 transition-transform duration-500 hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-neutral-300 flex items-center justify-center font-bold text-xs uppercase text-neutral-500">
              No Image
            </div>
          )}
          <div className="absolute inset-0 bg-[#e5c158]/5 mix-blend-multiply pointer-events-none"></div>
        </div>

        <div className="hidden sm:flex flex-col w-12 justify-between shrink-0">
          <button 
            onClick={onPrev}
            className="flex-1 border-2 border-black bg-white hover:bg-neutral-100 flex items-center justify-center brutal-btn mb-1.5"
          >
            <CaretUp size={16} weight="bold" />
          </button>

          <div className="h-12 border-2 border-black bg-[#e5c158] flex items-center justify-center text-xs font-black select-none brutal-shadow-sm my-1.5">
            {pageIndex}
          </div>

          <button 
            onClick={onNext}
            className="flex-1 border-2 border-black bg-white hover:bg-neutral-100 flex items-center justify-center brutal-btn mt-1.5"
          >
            <CaretDown size={16} weight="bold" />
          </button>
        </div>
      </div>

      {/* Mobile Slider Controls */}
      <div className="flex sm:hidden items-center gap-3 w-full">
        <button 
          onClick={onPrev}
          className="w-12 h-10 border-2 border-black bg-white hover:bg-neutral-100 flex items-center justify-center brutal-btn"
        >
          <CaretLeft size={16} weight="bold" />
        </button>
        <div className="flex-1 h-10 border-2 border-black bg-[#e5c158] flex items-center justify-center text-xs font-black select-none brutal-shadow-sm">
          {pageIndex}
        </div>
        <button 
          onClick={onNext}
          className="w-12 h-10 border-2 border-black bg-white hover:bg-neutral-100 flex items-center justify-center brutal-btn"
        >
          <CaretRight size={16} weight="bold" />
        </button>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-xl md:text-2xl font-black tracking-tight leading-tight uppercase">
          {renderTitle(article.title)}
        </h3>
        
        <p className="text-xs text-neutral-700 font-bold leading-relaxed">
          {article.description || "No description available."}
          <a href="#" className="text-black font-extrabold underline ml-1 hover:text-neutral-600">More</a>
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t-2 border-dashed border-black/30">
        <div className="flex items-center gap-3">
          <AvatarBadge initials={getInitials(authorName)} color={getAuthorColor(authorName)} />
          <div>
            <p className="text-xs font-black tracking-wide leading-tight uppercase">{authorName}</p>
            <p className="text-[10px] text-neutral-500 font-bold uppercase">{article.source.name || "News Source"}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          <div className="w-8 h-8 border-2 border-black rounded-full flex items-center justify-center bg-white brutal-shadow-sm">
            <Globe size={14} weight="bold" />
          </div>
          <div className="w-8 h-8 border-2 border-black rounded-full flex items-center justify-center bg-white brutal-shadow-sm">
            <Clock size={14} weight="bold" />
          </div>
        </div>
      </div>
    </div>
  )
}