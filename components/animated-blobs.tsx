"use client"

export function AnimatedBlobs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Each blob now has a class 'animated-blob' for JS targeting */}
      <div className="animated-blob absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-green-400/20 to-emerald-600/20 rounded-full blur-xl animate-blob"></div>
      <div className="animated-blob absolute top-1/3 right-1/4 w-72 h-72 bg-gradient-to-br from-pink-400/20 to-rose-600/20 rounded-full blur-xl animate-blob animation-delay-2000"></div>
      <div className="animated-blob absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-br from-amber-400/20 to-orange-600/20 rounded-full blur-xl animate-blob animation-delay-4000"></div>
      <div className="animated-blob absolute top-1/2 right-1/3 w-56 h-56 bg-gradient-to-br from-teal-400/20 to-cyan-600/20 rounded-full blur-xl animate-blob animation-delay-6000"></div>
    </div>
  )
}
