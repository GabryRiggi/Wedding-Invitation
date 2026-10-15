import { useEffect, useRef, useState } from 'react';
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
  const storySectionsRef = useRef([]);

  useEffect(() => {
    const elements = document.querySelectorAll('.reveal-section');

    if (!elements.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [isRevealed]);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('[data-story-section]'));
    storySectionsRef.current = sections;

    if (!sections.length) {
      return undefined;
    }

    let isScrolling = false;

    const handleWheel = (event) => {
      const target = event.target;

      if (target instanceof HTMLElement && target.closest('input[type="range"], textarea, input, button')) {
        return;
      }

      if (Math.abs(event.deltaY) < 10 || isScrolling) {
        return;
      }

      const currentIndex = sections.findIndex((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.4;
      });

      if (currentIndex === -1 || currentIndex >= sections.length - 1 && event.deltaY > 0) {
        return;
      }

      if (currentIndex <= 0 && event.deltaY < 0) {
        return;
      }

      event.preventDefault();
      isScrolling = true;

      const targetIndex = event.deltaY > 0 ? currentIndex + 1 : currentIndex - 1;
      const nextSection = sections[targetIndex];

      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      setTimeout(() => {
        isScrolling = false;
      }, 850);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => window.removeEventListener('wheel', handleWheel);
  }, [isRevealed]);

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
      <section id="hero" data-story-section className="reveal-section min-h-screen flex items-center justify-center">
        <HeroSection content={invitationContent} />
      </section>

      <main className="max-w-4xl mx-auto px-6">
        <section id="location" data-story-section className="reveal-section min-h-screen flex items-center justify-center py-16">
          <EventCard event={invitationContent.events[0]} />
        </section>

        <section id="rsvp" className="reveal-section">
          <RSVPSection
            content={invitationContent}
            formData={formData}
            isSubmitting={isSubmitting}
            isSubmitted={isSubmitted}
            onChange={handleFormChange}
            onSubmit={handleRSVPSubmit}
          />
        </section>

        <section id="iban" className="reveal-section">
          <IBANSection content={invitationContent} />
        </section>
      </main>

      <Footer content={invitationContent} />
    </div>
  );
}