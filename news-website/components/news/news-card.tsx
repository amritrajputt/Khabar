import { Article } from "./types"

export default function NewsCard({article}: {article: Article}){
    const formattedDate = article.publishedAt 
        ? new Date(article.publishedAt).toLocaleDateString() 
        : "N/A";

    return (
        <div className="max-w-[280px] w-full border-[3px] border-black p-3 bg-white brutal-shadow flex flex-col gap-3">
            <div className="w-full h-32 border-2 border-black bg-neutral-200 overflow-hidden relative shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                {article.urlToImage ? (
                    <img 
                        src={article.urlToImage} 
                        alt={article.title} 
                        className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-300" 
                    />
                ) : (
                    <div className="w-full h-full bg-neutral-300 flex items-center justify-center font-bold text-[10px] uppercase text-neutral-500 select-none">
                        No Image
                    </div>
                )}
            </div>
            <div className="flex flex-col gap-2 flex-1 justify-between">
                <div>
                    <h2 className="text-sm font-black leading-tight hover:underline cursor-pointer line-clamp-2" title={article.title}>
                        {article.title || "No Title Available"}
                    </h2>
                    {article.description && (
                        <p className="text-neutral-600 text-xs mt-1 line-clamp-2">{article.description}</p>
                    )}
                </div>
                
                <div className="flex flex-col gap-2 mt-2">
                    <div className="flex justify-between items-center pt-2 border-t border-dashed border-black/40 text-[9px] font-bold text-neutral-500 uppercase">
                        <span className="truncate max-w-[120px]">{article.source.name || "Unknown Source"}</span>
                        <span>{formattedDate}</span>
                    </div>
                    {article.url && (
                        <a 
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full text-center text-[10px] font-black tracking-wider uppercase border-2 border-black bg-[#e5c158] hover:bg-black hover:text-[#e5c158] py-1.5 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                        >
                            Read Article
                        </a>
                    )}
                </div>
            </div>
        </div>
    )
}