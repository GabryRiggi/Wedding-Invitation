export default function HeroSection({ content }) {
  return (
    <header className="relative min-h-[80vh] flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Sfondo sfumato Pesca -> Crema */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FCD8B9] to-[#F6F1E5] -z-10 opacity-30"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-white opacity-40 rounded-full blur-3xl -z-10"></div>

      <p className="text-sm md:text-base tracking-[0.3em] uppercase text-[#8C7A6B] mb-6">{content.couple.label}</p>

      <h1 className="text-6xl md:text-8xl text-center font-light mb-6 text-[#5C5046]">
        {content.couple.groom} <br className="md:hidden" />
        {/* Colore Senape */}
        <span className="text-[#DDA15E] italic mx-4">{content.hero.titleSeparator}</span> <br className="md:hidden" />
        {content.couple.bride}
      </h1>

      {/* Divisore Senape */}
      <div className="w-24 h-px bg-[#DDA15E] my-8"></div>

      <p className="text-xl md:text-2xl tracking-widest text-[#5C5046]">{content.couple.date}</p>

      <a
        href="#location"
        className="scroll-cta mt-10 inline-flex items-center gap-3 rounded-full border border-[#E9DDC8] bg-white/70 px-5 py-3 text-[10px] uppercase tracking-[0.3em] text-[#6D6257] shadow-[0_8px_20px_rgba(92,80,70,0.06)] transition hover:bg-white hover:text-[#DDA15E]"
      >
        Scorri
        <span aria-hidden="true">↓</span>
      </a>
    </header>
  );
}