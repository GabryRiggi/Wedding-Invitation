import { Calendar, Clock, Heart, MapPin } from 'lucide-react';

const iconMap = {
  Heart,
  Calendar
};

export default function EventCard({ event }) {
  const Icon = iconMap[event.icon] ?? Heart;

  return (
    <div className="bg-white p-10 rounded-2xl shadow-sm text-center border border-[#F0EBE1] flex flex-col items-center">
      <div className="w-12 h-12 bg-[#F9F6F0] rounded-full flex items-center justify-center mb-6">
        <Icon className="w-6 h-6 text-[#D4AF37]" />
      </div>
      <h3 className="text-2xl mb-2 text-[#5C5046]">{event.title}</h3>
      <div className="flex items-center justify-center space-x-2 text-[#8C7A6B] mb-4">
        <Clock className="w-4 h-4" />
        <span>{event.time}</span>
      </div>
      <p className="text-[#6D6257] leading-relaxed mb-4">
        {event.venue}<br />
        {event.address}<br />
        {event.city}
      </p>
      <a href={event.mapUrl} className="inline-flex items-center text-sm uppercase tracking-wider text-[#D4AF37] hover:text-[#B8962E] transition-colors mt-auto">
        <MapPin className="w-4 h-4 mr-2" /> Apri Mappa
      </a>
    </div>
  );
}