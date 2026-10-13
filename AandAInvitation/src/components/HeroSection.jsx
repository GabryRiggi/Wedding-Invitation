export default function HeroSection({ content }) {
  return (
    <header className="relative min-h-[80vh] flex flex-col items-center justify-center px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#F2EDE4] to-[#FAF8F5] -z-10"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-white opacity-40 rounded-full blur-3xl -z-10"></div>

      <p className="text-sm md:text-base tracking-[0.3em] uppercase text-[#8C7A6B] mb-6">{content.couple.label}</p>

      <h1 className="text-6xl md:text-8xl text-center font-light mb-6 text-[#5C5046]">
        {content.couple.groom} <br className="md:hidden" />
        <span className="text-[#D4AF37] italic mx-4">{content.hero.titleSeparator}</span> <br className="md:hidden" />
        {content.couple.bride}
      </h1>

      <div className="w-24 h-px bg-[#D4AF37] my-8"></div>

      <p className="text-xl md:text-2xl tracking-widest text-[#5C5046]">{content.couple.date}</p>
    </header>
  );
}