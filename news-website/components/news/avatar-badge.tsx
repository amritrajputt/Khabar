export function AvatarBadge({ initials, color = "bg-yellow-300" }: { initials: string; color?: string }) {
  return (
    <div className={`w-8 h-8 rounded-full border-2 border-black flex items-center justify-center text-xs font-black shadow-sm ${color} text-black shrink-0`}>
      {initials}
    </div>
  )
}