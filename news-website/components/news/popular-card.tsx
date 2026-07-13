import { AvatarBadge } from "./avatar-badge"
import { Article } from "./types"

interface PopularCardProps {
  article: Article
  isReversed?: boolean
}

const AUTHOR_COLORS = ["bg-cyan-300", "bg-emerald-300", "bg-yellow-300", "bg-orange-300", "bg-pink-300", "bg-purple-300"];

export function PopularCard({
  article,
  isReversed = false
}: PopularCardProps) {
  const getInitials = (name: string | null) => {
    if (!name) return "N";
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  const getAuthorColor = (name: string | null) => {
    if (!name) return "bg-cyan-300";
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
    <div className={`flex flex-col sm:flex-row gap-6 items-stretch border-b-2 border-neutral-300 pb-8 last:border-none last:pb-0 ${
      isReversed ? "sm:flex-row-reverse" : ""
    }`}>
      <div className="w-full sm:w-[45%] shrink-0">
        <div className="border-[3px] border-black bg-neutral-200 brutal-shadow relative group aspect-[4/3] overflow-hidden">
          {article.urlToImage ? (
            <img 
              src={article.urlToImage} 
              alt={article.title} 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 filter grayscale contrast-125"
            />
          ) : (
            <div className="w-full h-full bg-neutral-300 flex items-center justify-center font-bold text-xs uppercase text-neutral-500">
              No Image
            </div>
          )}
          <div className="absolute inset-0 bg-[#e5c158]/10 mix-blend-multiply pointer-events-none"></div>
        </div>
      </div>

      <div className="flex flex-col justify-between py-1 flex-1">
        <div className="flex flex-col gap-3">
          <h3 className="text-lg md:text-xl font-black tracking-tight leading-tight uppercase hover:text-neutral-700 transition-colors">
            {renderTitle(article.title)}
          </h3>
        </div>

        <div className="flex items-center gap-3 mt-4">
          <AvatarBadge initials={getInitials(authorName)} color={getAuthorColor(authorName)} />
          <div>
            <p className="text-xs font-black tracking-wide leading-tight uppercase">{authorName}</p>
            <p className="text-[10px] text-neutral-500 font-bold uppercase">{article.source.name || "News Source"}</p>
          </div>
        </div>
      </div>
    </div>
  )
}