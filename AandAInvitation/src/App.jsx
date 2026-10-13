import { useState } from 'react';
import invitationContent from './data/weddingContent.json';
import EnvelopeIntro from './components/EnvelopeIntro';
import HeroSection from './components/HeroSection';
import EventCard from './components/EventCard';
import RSVPSection from './components/RSVPSection';
import IBANSection from './components/IBANSection';
import Footer from './components/Footer';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    presenza: '1',
    note: ''
  });

  const handleOpenEnvelope = () => {
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
    audio.volume = 0.5;
    audio.play().catch(error => console.log('Audio play blocked by browser policy until interaction', error));

    setIsOpen(true);

    setTimeout(() => {
      setIsRevealed(true);
    }, 2000);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData(previous => ({ ...previous, [name]: value }));
  };

  const handleRSVPSubmit = async (apiConfig = null) => {
    setIsSubmitting(true);

    try {
      if (apiConfig?.endpoint) {
        const requestBody = apiConfig.body ?? new URLSearchParams(formData).toString();

        await fetch(apiConfig.endpoint, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: requestBody
        });
      } else {
        console.warn('RSVP endpoint non configurato: invio simulato locale.');
        await new Promise(resolve => setTimeout(resolve, 1500));
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error('RSVP submit failed', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isRevealed) {
    return <EnvelopeIntro content={invitationContent} isOpen={isOpen} onOpen={handleOpenEnvelope} />;
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] font-serif text-[#4A4A4A] selection:bg-[#D4AF37] selection:text-white pb-20">
      <HeroSection content={invitationContent} />

      <main className="max-w-4xl mx-auto px-6">
        <section className="py-16">
          <EventCard event={invitationContent.events[0]} />
        </section>

        <RSVPSection
          content={invitationContent}
          formData={formData}
          isSubmitting={isSubmitting}
          isSubmitted={isSubmitted}
          onChange={handleFormChange}
          onSubmit={handleRSVPSubmit}
        />

        <IBANSection content={invitationContent} />
      </main>

      <Footer content={invitationContent} />
    </div>
  );
}