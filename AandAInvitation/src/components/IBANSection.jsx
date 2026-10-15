import { useState } from 'react';
import { Check, Copy, Landmark } from 'lucide-react';

export default function IBANSection({ content }) {
  const iban = content?.iban?.value || 'IT60 X054 2811 1010 0000 0000 000';
  const beneficiary = content?.iban?.beneficiary || 'Andrea e Alessandra';
  const label = content?.iban?.label || 'Regalo di nozze';
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(iban.replace(/\s+/g, ''));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error('Unable to copy IBAN', error);
    }
  };

  return (
    <section className="py-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-6">
          <p className="text-[11px] uppercase tracking-[0.28em] text-[#8C7A6B]">{label}</p>
        </div>

        <div className="relative overflow-hidden rounded-[30px] border border-[#FCD8B9] bg-[linear-gradient(135deg,#ffffff_0%,#F6F1E5_100%)] p-6 md:p-8 shadow-[0_12px_40px_rgba(92,80,70,0.06)]">
          <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#DDA15E] to-transparent" />

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="inline-flex items-center gap-3 rounded-full border border-[#FCD8B9] bg-white px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-[#7B6659]">
              <Landmark className="w-4 h-4 text-[#DDA15E]" />
              IBAN
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center justify-center rounded-full border border-[#FCD8B9] bg-white px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-[#5C5046] transition-all hover:border-[#DDA15E] hover:text-[#DDA15E]"
            >
              {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
              {copied ? 'Copiato' : 'Copia'}
            </button>
          </div>

          <div className="mt-6 rounded-[22px] border border-[#FCD8B9] bg-white/80 p-5 text-left">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#8C7A6B] mb-2">Intestato a</p>
            <p className="text-xl text-[#5C5046] font-medium">{beneficiary}</p>
            <p className="mt-5 text-[11px] uppercase tracking-[0.25em] text-[#8C7A6B] mb-2">IBAN</p>
            <p className="text-base md:text-lg tracking-[0.18em] text-[#3E352F] font-medium break-all">{iban}</p>
          </div>

          <p className="mt-5 text-center text-sm text-[#6D6257] leading-relaxed italic">
            Un gesto d’amore che ci accompagnerà nel nostro nuovo inizio.
          </p>
        </div>
      </div>
    </section>
  );
}