import { Calendar, Clock, Heart, MapPin, Navigation } from 'lucide-react';

const iconMap = { Heart, Calendar };

export default function EventCard({ event }) {
  const Icon = iconMap[event.icon] ?? Heart;
  const schedule = event.schedule ?? [{
    label: event.title, time: event.time, venue: event.venue, address: event.address, city: event.city
  }];

  return (
    <div className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#F6F1E5_100%)] p-6 md:p-10 rounded-[32px] shadow-[0_12px_40px_rgba(92,80,70,0.08)] border border-[#FCD8B9]">
      {/* Linea Senape */}
      <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#DDA15E] to-transparent opacity-80" />

      <div className="flex justify-center mb-8">
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-[#FCD8B9] bg-white shadow-[0_6px_18px_rgba(221,161,94,0.15)] text-[10px] uppercase tracking-[0.32em] text-[#7B6659]">
          {/* Icona Senape */}
          <Icon className="w-4 h-4 text-[#DDA15E]" />
          {event.title}
        </div>
      </div>

      <div className="mb-8">
        {schedule.map((item) => (
          <div key={`${item.label}-${item.time}`} className="rounded-[22px] border border-[#FCD8B9] bg-white/80 p-5 text-left shadow-[0_8px_20px_rgba(122,102,84,0.04)] backdrop-blur-sm mb-4 last:mb-0">
            <div className="flex items-center justify-between gap-3 mb-3">
              <span className="font-semibold text-[#5C5046] tracking-[0.18em] uppercase text-[10px]">{item.label}</span>
              <div className="flex items-center text-[#8C7A6B] text-sm">
                <Clock className="w-4 h-4 mr-2" />
                {item.time}
              </div>
            </div>
            <p className="text-[#6D6257] leading-relaxed text-[15px]">
              <span className="font-medium text-[#5C5046]">{item.venue}</span><br />
              {item.address}<br />
              {item.city}
            </p>
          </div>
        ))}
      </div>

      <div className="w-full rounded-[28px] border border-[#FCD8B9] bg-[linear-gradient(135deg,#F6F1E5_0%,#ffffff_100%)] p-4 md:p-5 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
        <div className="relative h-44 md:h-52 rounded-[22px] overflow-hidden border border-[#FCD8B9] shadow-[inset_0_2px_10px_rgba(0,0,0,0.05)]">
          <iframe src="https://www.google.com/maps?q=Poggio%20Mulara%20Sicilia&output=embed" className="absolute inset-0 w-full h-full" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Mappa"></iframe>
        </div>

        <div className="mt-5 rounded-[20px] border border-[#FCD8B9] bg-white/60 p-4">
          <div className="flex items-center text-[#5C5046] mb-2">
            {/* Icona Senape */}
            <Navigation className="w-4 h-4 mr-2 text-[#DDA15E]" />
            <span className="text-[10px] uppercase tracking-[0.22em]">Indicazioni</span>
          </div>
          <p className="text-[#6D6257] leading-relaxed text-sm italic">
            {event.directions || 'Una volta arrivati a Poggio Mulara, Contrada Mulara, 93030, Mazzarino (CL), seguire le indicazioni del venue e dell’ingresso principale.'}
          </p>
        </div>

        <div className="mt-5 flex justify-center">
          {/* Bottone Corallo con hover Senape */}
          <a
            href={event.mapUrl || "https://www.google.com/maps"}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center px-5 py-3 rounded-full bg-[#E58C7F] text-white text-[11px] uppercase tracking-[0.22em] shadow-[0_10px_25px_rgba(229,140,127,0.3)] transition-all hover:bg-[#DDA15E] hover:shadow-[0_12px_30px_rgba(221,161,94,0.3)]"
          >
            <MapPin className="w-4 h-4 mr-2" /> Apri Mappa
          </a>
        </div>
      </div>
    </div>
  );
}