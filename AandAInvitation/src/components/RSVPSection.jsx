import { useState } from 'react';
import { CheckCircle2, ChefHat, Send } from 'lucide-react';

// SVG colorati e simpatici per adulti e bambini
const AdultIcon = ({ className }) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
    <circle cx="32" cy="18" r="11" fill="#F9D8B7" />
    <path d="M20 21c1-8 7-13 12-13s11 5 12 13c-1-4-4-7-8-8-4-1-8 0-12 3-3 3-4 6-4 8Z" fill="#6B4E3D" />
    <path d="M18 58c2-12 10-18 14-18s12 6 14 18H18Z" fill="#E39A65" />
    <path d="M22 34h20c5 0 9 4 9 9v15H13V43c0-5 4-9 9-9Z" fill="#F5B563" />
    <path d="M28 30h8v8h-8z" fill="#F9D8B7" opacity="0.9" />
    <circle cx="27" cy="18" r="1.8" fill="#3A2A22" />
    <circle cx="37" cy="18" r="1.8" fill="#3A2A22" />
    <path d="M28 23c2 2 6 2 8 0" stroke="#3A2A22" strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M10 58c4-6 8-9 14-11" stroke="#D6884B" strokeWidth="3" strokeLinecap="round" />
    <path d="M54 58c-4-6-8-9-14-11" stroke="#D6884B" strokeWidth="3" strokeLinecap="round" />
    <circle cx="48" cy="12" r="4" fill="#F28C8C" opacity="0.9" />
  </svg>
);

const ChildIcon = ({ className }) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
    <circle cx="32" cy="18" r="10" fill="#F9D8B7" />
    <path d="M18 19c2-9 8-13 14-13 7 0 12 5 14 13-4-2-8-3-14-3s-10 1-14 3Z" fill="#5B8BFF" />
    <path d="M18 57c2-12 9-17 14-17s12 5 14 17H18Z" fill="#F7C75C" />
    <path d="M22 34h20c6 0 10 4 10 10v13H12V44c0-6 4-10 10-10Z" fill="#8ED6B9" />
    <path d="M16 34c4-2 8-3 16-3s12 1 16 3" stroke="#5E9F7A" strokeWidth="3" strokeLinecap="round" fill="none" />
    <circle cx="27" cy="18" r="1.7" fill="#3A2A22" />
    <circle cx="37" cy="18" r="1.7" fill="#3A2A22" />
    <path d="M27 24c2 2 8 2 10 0" stroke="#3A2A22" strokeWidth="2" strokeLinecap="round" fill="none" />
    <circle cx="49" cy="10" r="4" fill="#FFB0C9" />
    <path d="M49 6v-3M46 9l-3-3M52 9l3-3" stroke="#FF7AA2" strokeWidth="2" strokeLinecap="round" />
    <path d="M11 12c2 0 4 2 4 4" stroke="#FFB0C9" strokeWidth="2" strokeLinecap="round" fill="none" />
  </svg>
);

export default function RSVPSection({ content, isSubmitting, isSubmitted, onSubmit }) {
  const rsvpEndpoint = import.meta.env.VITE_SCRIPT_URL || import.meta.env.VITE_API_RSVP_URL;
  const rsvpKey = import.meta.env.VITE_SCRIPT_KEY;
  
  // Stati per adulti e bambini
  const [adultCount, setAdultCount] = useState(2);
  const [childCount, setChildCount] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (typeof onSubmit !== 'function') return;

    const form = event.currentTarget;
    const submittedData = new FormData(form);
    const encodedBody = new URLSearchParams(submittedData);

    if (rsvpKey) {
      encodedBody.set('key', rsvpKey);
    }

    onSubmit(rsvpEndpoint ? { endpoint: rsvpEndpoint, body: encodedBody.toString() } : null);
  };

  const adults = Array.from({ length: adultCount }, (_, i) => i + 1);
  const children = Array.from({ length: childCount }, (_, i) => i + 1);

  return (
    <section className="py-20">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#F0EBE1]">
        <div className="text-center mb-10">
          <h2 className="text-4xl text-[#5C5046] mb-4">{content?.rsvp?.title || "RSVP"}</h2>
          <p className="text-[#8C7A6B]">{content?.rsvp?.deadline}</p>
        </div>

        {isSubmitted ? (
          <div className="text-center py-12 animate-fade-in">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h3 className="text-2xl text-[#5C5046] mb-2">{content?.rsvp?.thanksTitle}</h3>
            <p className="text-[#8C7A6B]">{content?.rsvp?.thanksMessage}</p>
            <p className="text-[#8C7A6B] mt-2">{content?.rsvp?.thanksFollowUp}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Sezione Sliders */}
            <div className="bg-[#FAF8F5] p-8 rounded-2xl border border-[#E8E1D7] mb-10">
              <h3 className="text-center text-sm uppercase tracking-widest text-[#8C7A6B] mb-8">
                Chi sarà presente?
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Slider Adulti */}
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-between w-full mb-4">
                    <div className="flex items-center text-[#5C5046]">
                      <AdultIcon className="w-8 h-8 mr-3 text-[#D4AF37]" />
                      <span className="font-serif text-lg">Adulti</span>
                    </div>
                    <span className="text-2xl font-serif text-[#8C7A6B]">{adultCount}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={adultCount}
                    onChange={(e) => setAdultCount(parseInt(e.target.value))}
                    className="w-full h-2 bg-[#E8E1D7] rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                    name="numero_adulti"
                  />
                </div>

                {/* Slider Bambini */}
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-between w-full mb-4">
                    <div className="flex items-center text-[#5C5046]">
                      <ChildIcon className="w-7 h-7 mr-3 text-[#D4AF37]" />
                      <span className="font-serif text-lg">Bambini</span>
                    </div>
                    <span className="text-2xl font-serif text-[#8C7A6B]">{childCount}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={childCount}
                    onChange={(e) => setChildCount(parseInt(e.target.value))}
                    className="w-full h-2 bg-[#E8E1D7] rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                    name="numero_bambini"
                  />
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-[#F0EBE1] my-8"></div>

            {/* Campi dinamici per ogni ospite (Adulti e Bambini separati) */}
            <div className="space-y-10">
              
              {/* Form Adulti */}
              {adults.map((num) => (
                <div key={`adult_${num}`} className="relative p-6 bg-white border border-[#E8E1D7] shadow-sm rounded-2xl">
                  <div className="absolute -top-3.5 left-6 bg-white px-3 py-1 border border-[#E8E1D7] rounded-full text-xs font-bold tracking-widest text-[#D4AF37] uppercase flex items-center">
                    <AdultIcon className="w-3 h-3 mr-1" /> Adulto {num}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2 mb-6">
                    <div>
                      <label htmlFor={`nome_adulto_${num}`} className="flex items-center text-xs uppercase tracking-widest text-[#8C7A6B] mb-2">
                        Nome
                      </label>
                      <input
                        type="text"
                        id={`nome_adulto_${num}`}
                        name={`nome_adulto_${num}`}
                        required
                        className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E8E1D7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all font-sans text-[#4A4A4A]"
                        placeholder="Nome"
                      />
                    </div>
                    <div>
                      <label htmlFor={`cognome_adulto_${num}`} className="flex items-center text-xs uppercase tracking-widest text-[#8C7A6B] mb-2">
                        Cognome
                      </label>
                      <input
                        type="text"
                        id={`cognome_adulto_${num}`}
                        name={`cognome_adulto_${num}`}
                        required
                        className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E8E1D7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all font-sans text-[#4A4A4A]"
                        placeholder="Cognome"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor={`note_adulto_${num}`} className="flex items-center text-xs uppercase tracking-widest text-[#8C7A6B] mb-2">
                      <ChefHat className="w-4 h-4 mr-2" /> Intolleranze / Note
                    </label>
                    <textarea
                      id={`note_adulto_${num}`}
                      name={`note_adulto_${num}`}
                      rows="1"
                      className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E8E1D7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all font-sans text-[#4A4A4A] resize-none"
                      placeholder="Eventuali allergie..."
                    ></textarea>
                  </div>
                </div>
              ))}

              {/* Form Bambini */}
              {children.map((num) => (
                <div key={`child_${num}`} className="relative p-6 bg-[#FAF8F5] border border-[#E8E1D7] rounded-2xl">
                  <div className="absolute -top-3.5 left-6 bg-[#FAF8F5] px-3 py-1 border border-[#E8E1D7] rounded-full text-xs font-bold tracking-widest text-[#8C7A6B] uppercase flex items-center">
                    <ChildIcon className="w-3 h-3 mr-1" /> Bambino {num}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2 mb-6">
                    <div>
                      <label htmlFor={`nome_bambino_${num}`} className="flex items-center text-xs uppercase tracking-widest text-[#8C7A6B] mb-2">
                        Nome
                      </label>
                      <input
                        type="text"
                        id={`nome_bambino_${num}`}
                        name={`nome_bambino_${num}`}
                        required
                        className="w-full px-4 py-3 bg-white border border-[#E8E1D7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all font-sans text-[#4A4A4A]"
                        placeholder="Nome"
                      />
                    </div>
                    <div>
                      <label htmlFor={`cognome_bambino_${num}`} className="flex items-center text-xs uppercase tracking-widest text-[#8C7A6B] mb-2">
                        Cognome
                      </label>
                      <input
                        type="text"
                        id={`cognome_bambino_${num}`}
                        name={`cognome_bambino_${num}`}
                        required
                        className="w-full px-4 py-3 bg-white border border-[#E8E1D7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all font-sans text-[#4A4A4A]"
                        placeholder="Cognome"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor={`note_bambino_${num}`} className="flex items-center text-xs uppercase tracking-widest text-[#8C7A6B] mb-2">
                      <ChefHat className="w-4 h-4 mr-2" /> Intolleranze / Menù Bambini
                    </label>
                    <textarea
                      id={`note_bambino_${num}`}
                      name={`note_bambino_${num}`}
                      rows="1"
                      className="w-full px-4 py-3 bg-white border border-[#E8E1D7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all font-sans text-[#4A4A4A] resize-none"
                      placeholder="Note, allergie o richiesta menù baby..."
                    ></textarea>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-10 bg-[#8C7A6B] hover:bg-[#5C5046] text-white py-4 rounded-lg font-sans tracking-widest uppercase text-sm transition-all flex items-center justify-center disabled:opacity-70 shadow-md hover:shadow-lg"
            >
              {isSubmitting ? (
                <span className="animate-pulse">{content?.rsvp?.submittingLabel || 'Invio in corso...'}</span>
              ) : (
                <>
                  {content?.rsvp?.submitLabel || 'Conferma Presenza'} <Send className="w-4 h-4 ml-2" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}