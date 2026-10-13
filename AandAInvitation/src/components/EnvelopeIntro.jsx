import { Heart } from 'lucide-react';

export default function EnvelopeIntro({ content, isOpen, onOpen }) {
  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FAF8F5] transition-all duration-1000 ease-in-out font-serif
        ${isOpen ? 'opacity-0 translate-y-20' : 'opacity-100 translate-y-0'}`}
      style={{ transitionDelay: isOpen ? '0.8s' : '0s' }}
    >
      <div className="relative w-80 h-56 cursor-pointer group" onClick={onOpen}>
        <div className="absolute inset-0 bg-[#E8E1D7] shadow-xl rounded-sm"></div>

        <div
          className={`absolute top-2 left-4 right-4 bg-white shadow-sm border border-gray-100 transition-all duration-700 ease-in-out flex flex-col items-center justify-center text-center
            ${isOpen ? '-translate-y-16 h-64 z-10' : 'translate-y-0 h-52 z-10'}`}
        >
          <h2 className="text-2xl font-serif text-[#8C7A6B] mb-2">
            {content.couple.groom} & {content.couple.bride}
          </h2>
          <div className="w-12 h-px bg-[#D4AF37] mb-2"></div>
          <p className="text-xs text-gray-400 tracking-widest uppercase">{content.envelope.invitationLabel}</p>
        </div>

        <div
          className={`absolute top-0 left-0 w-full h-1/2 bg-[#DED6CC] origin-top transition-transform duration-700 ease-in-out
            ${isOpen ? '[transform:rotateX(180deg)] z-0' : 'z-30'}`}
          style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
        ></div>

        <div className="absolute bottom-0 left-0 w-full h-full bg-[#E5DDD3] z-20 pointer-events-none" style={{ clipPath: 'polygon(0 100%, 50% 45%, 100% 100%, 100% 100%, 0 100%)' }}></div>
        <div className="absolute bottom-0 left-0 w-full h-full bg-[#E0D7CC] z-20 pointer-events-none" style={{ clipPath: 'polygon(0 0, 50% 50%, 0 100%)' }}></div>
        <div className="absolute bottom-0 left-0 w-full h-full bg-[#E0D7CC] z-20 pointer-events-none" style={{ clipPath: 'polygon(100% 0, 50% 50%, 100% 100%)' }}></div>

        <div className={`absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-[#8B2323] rounded-full z-40 flex items-center justify-center shadow-md transition-opacity duration-300
          ${isOpen ? 'opacity-0' : 'opacity-100 group-hover:scale-110'}`}>
          <Heart className="text-[#E8D1D1] w-5 h-5 fill-current" aria-label={content.envelope.sealAriaLabel} />
        </div>
      </div>

      <p className={`mt-16 text-[#8C7A6B] tracking-widest uppercase text-sm animate-pulse transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}>
        {content.envelope.instruction}
      </p>
    </div>
  );
}