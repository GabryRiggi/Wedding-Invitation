import { CheckCircle2, ChefHat, Send, User, Users } from 'lucide-react';

export default function RSVPSection({ content, formData, isSubmitting, isSubmitted, onChange, onSubmit }) {
  const rsvpEndpoint = import.meta.env.VITE_SCRIPT_URL || import.meta.env.VITE_API_RSVP_URL;
  const rsvpKey = import.meta.env.VITE_SCRIPT_KEY;

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

  return (
    <section className="py-20">
      <div className="max-w-2xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#F0EBE1]">
        <div className="text-center mb-10">
          <h2 className="text-4xl text-[#5C5046] mb-4">{content.rsvp.title}</h2>
          <p className="text-[#8C7A6B]">{content.rsvp.deadline}</p>
        </div>

        {isSubmitted ? (
          <div className="text-center py-12 animate-fade-in">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h3 className="text-2xl text-[#5C5046] mb-2">{content.rsvp.thanksTitle}</h3>
            <p className="text-[#8C7A6B]">{content.rsvp.thanksMessage}</p>
            <p className="text-[#8C7A6B] mt-2">{content.rsvp.thanksFollowUp}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Griglia per affiancare Nome e Cognome */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="nome" className="flex items-center text-sm uppercase tracking-widest text-[#8C7A6B] mb-2">
                  <User className="w-4 h-4 mr-2" /> Nome
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome" // Adattato per lo script
                  required
                  value={formData.nome}
                  onChange={onChange}
                  className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E8E1D7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all font-sans text-[#4A4A4A]"
                  placeholder="Mario"
                />
              </div>

              <div>
                <label htmlFor="cognome" className="flex items-center text-sm uppercase tracking-widest text-[#8C7A6B] mb-2">
                  <User className="w-4 h-4 mr-2" /> Cognome
                </label>
                <input
                  type="text"
                  id="cognome"
                  name="cognome" // Adattato per lo script
                  required
                  value={formData.cognome}
                  onChange={onChange}
                  className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E8E1D7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all font-sans text-[#4A4A4A]"
                  placeholder="Rossi"
                />
              </div>
            </div>

            <div>
              <label htmlFor="presenza" className="flex items-center text-sm uppercase tracking-widest text-[#8C7A6B] mb-2">
                <Users className="w-4 h-4 mr-2" /> {content.form.guestsLabel}
              </label>
              <select
                id="presenza"
                name="presenza" // Adattato per lo script
                value={formData.presenza}
                onChange={onChange}
                className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E8E1D7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all font-sans text-[#4A4A4A]"
              >
                {content.form.guestOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="note" className="flex items-center text-sm uppercase tracking-widest text-[#8C7A6B] mb-2">
                <ChefHat className="w-4 h-4 mr-2" /> {content.form.dietaryLabel}
              </label>
              <textarea
                id="note"
                name="note" // Adattato per lo script
                rows="3"
                value={formData.note}
                onChange={onChange}
                className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E8E1D7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all font-sans text-[#4A4A4A] resize-none"
                placeholder={content.form.dietaryPlaceholder}
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-8 bg-[#8C7A6B] hover:bg-[#5C5046] text-white py-4 rounded-lg font-sans tracking-widest uppercase text-sm transition-all flex items-center justify-center disabled:opacity-70"
            >
              {isSubmitting ? (
                <span className="animate-pulse">{content.rsvp.submittingLabel}</span>
              ) : (
                <>
                  {content.rsvp.submitLabel} <Send className="w-4 h-4 ml-2" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}