import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  APIProvider,
  APILoadingStatus,
  AdvancedMarker,
  InfoWindow,
  Map as GoogleMap,
  useAdvancedMarkerRef,
  useApiLoadingStatus,
  useMap,
} from '@vis.gl/react-google-maps';
import {
  Calendar,
  Clock,
  Expand,
  ExternalLink,
  MapPin,
  Navigation,
  Shirt,
  X,
} from 'lucide-react';
import { MANDAP_SHOWCASE, WEDDING_EVENTS, WeddingEvent } from '../data/weddingData';
import { FloatingFloral, FloralCornerMotif, MandalaDivider } from './illustrations/IndianMotifs';

const UDAIPUR_CENTER = { lat: 24.5782, lng: 73.6806 };

function getDirectionsUrl(ev: WeddingEvent) {
  const destination = encodeURIComponent(`${ev.venueName}, ${ev.venueAddress}`);
  return `https://www.google.com/maps/dir/?api=1&destination=${destination}&travelmode=driving`;
}

interface EventMarkerProps {
  event: WeddingEvent;
  isSelected: boolean;
  onSelect: (id: WeddingEvent['id']) => void;
  onClose: () => void;
}

function EventMarker({ event, isSelected, onSelect, onClose }: EventMarkerProps) {
  const [markerRef, marker] = useAdvancedMarkerRef();

  const handleMarkerClick = useCallback(() => {
    onSelect(event.id);
  }, [event.id, onSelect]);

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={event.coordinates}
        onClick={handleMarkerClick}
        title={`${event.name} — ${event.venueName}`}
        zIndex={isSelected ? 20 : 1}
      >
        <div
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full shadow-lg border-2 transition-transform cursor-pointer ${
            isSelected ? 'scale-110 ring-2 ring-[#E2C578]' : 'hover:scale-105'
          }`}
          style={{
            backgroundColor: event.theme.markerBg,
            borderColor: event.theme.markerBorder,
            color: '#FAF5EB',
          }}
        >
          <span className="w-2 h-2 rounded-full bg-[#F6E4AD]" />
          <span className="text-[11px] font-semibold tracking-wide whitespace-nowrap">
            {event.name.replace(' Ceremony', '').replace('Soiree', '')}
          </span>
        </div>
      </AdvancedMarker>

      {isSelected && marker && (
        <InfoWindow anchor={marker} onCloseClick={onClose} maxWidth={290}>
          <div className="p-1 text-[#241416] font-sans max-w-[260px]">
            <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#8F6B24]">
              {event.dayOfWeek} · {event.date}
            </p>
            <h3 className="mt-0.5 font-serif text-xl font-bold text-[#4A0E17] leading-snug">
              {event.name}
            </h3>
            <p className="mt-1 text-xs font-medium text-[#6B1220] flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 shrink-0" />
              <span>{event.time}</span>
            </p>
            <p className="mt-1.5 text-xs text-[#4A252B] leading-relaxed">
              <strong className="font-semibold text-[#241416]">{event.venueName}</strong>
              <br />
              {event.venueAddress}
            </p>
            <a
              href={getDirectionsUrl(event)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#6B1220] text-[#FAF5EB] text-[11px] font-semibold tracking-[0.14em] uppercase hover:bg-[#4A0E17] transition-colors whitespace-nowrap"
            >
              <Navigation className="w-3 h-3" />
              <span>Get Directions</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </InfoWindow>
      )}
    </>
  );
}

function MapCameraSync({ selectedEvent }: { selectedEvent: WeddingEvent | null }) {
  const map = useMap();

  useEffect(() => {
    if (map && selectedEvent) {
      map.panTo(selectedEvent.coordinates);
    }
  }, [map, selectedEvent]);

  return null;
}

function InteractiveMapCanvas({
  selectedEventId,
  onSelectEventId,
}: {
  selectedEventId: WeddingEvent['id'];
  onSelectEventId: (id: WeddingEvent['id']) => void;
}) {
  const status = useApiLoadingStatus();
  const [infoOpen, setInfoOpen] = useState(true);
  const selectedEvent =
    WEDDING_EVENTS.find((ev) => ev.id === selectedEventId) ?? WEDDING_EVENTS[0];

  if (status === APILoadingStatus.FAILED || status === APILoadingStatus.AUTH_FAILURE) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-[#F3EAD8] text-[#4A252B]">
        <MapPin className="w-8 h-8 text-[#6B1220] mb-3" />
        <h3 className="font-serif text-2xl font-semibold text-[#4A0E17]">
          Interactive Map Currently Unavailable
        </h3>
        <p className="mt-2 text-sm max-w-md">
          Use the venue list or open direct Google Maps navigation for {selectedEvent.venueName}.
        </p>
        <a
          href={getDirectionsUrl(selectedEvent)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#6B1220] text-[#FAF5EB] text-xs font-semibold tracking-[0.16em] uppercase"
        >
          <Navigation className="w-3.5 h-3.5" />
          <span>Get Directions to {selectedEvent.name}</span>
        </a>
      </div>
    );
  }

  return (
    <GoogleMap
      mapId="DEMO_MAP_ID"
      defaultCenter={UDAIPUR_CENTER}
      defaultZoom={14}
      gestureHandling="cooperative"
      internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
      style={{ width: '100%', height: '100%' }}
    >
      <MapCameraSync selectedEvent={infoOpen ? selectedEvent : null} />
      {WEDDING_EVENTS.map((ev) => (
        <EventMarker
          key={ev.id}
          event={ev}
          isSelected={infoOpen && selectedEventId === ev.id}
          onSelect={(id) => {
            onSelectEventId(id);
            setInfoOpen(true);
          }}
          onClose={() => setInfoOpen(false)}
        />
      ))}
    </GoogleMap>
  );
}

export function CelebrationsAndMapSection() {
  const [selectedEventId, setSelectedEventId] = useState<WeddingEvent['id']>('ceremony');
  const [lightboxImage, setLightboxImage] = useState<{
    src: string;
    title: string;
    subtitle: string;
  } | null>(null);

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';
  const visibleEventCards = WEDDING_EVENTS.filter((ev) => ev.showInCards);
  const activeEvent =
    WEDDING_EVENTS.find((ev) => ev.id === selectedEventId) ?? WEDDING_EVENTS[0];

  useEffect(() => {
    if (!lightboxImage) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxImage(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxImage]);

  const handleLocateEvent = (eventId: WeddingEvent['id']) => {
    setSelectedEventId(eventId);
    const el = document.getElementById('venue-map');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="celebrations"
      className="relative overflow-hidden py-16 sm:py-24 bg-[#FAF5EB] paper-grain"
    >
      <FloralCornerMotif
        position="top-left"
        className="absolute top-6 left-4 hidden lg:block"
      />
      <FloralCornerMotif
        position="top-right"
        className="absolute top-6 right-4 hidden lg:block"
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="text-xs tracking-[0.28em] uppercase text-[#8F6B24] font-medium">
            Mandap, Memories &amp; Celebrations
          </p>
          <h2 className="mt-2 font-serif text-4xl sm:text-5xl font-semibold text-[#4A0E17] tracking-tight">
            The Sacred Mandap &amp; Ceremonies
          </h2>
          <MandalaDivider className="mt-4" />
        </motion.div>

        {/* Featured Mandap Storybook Card */}
        <motion.article
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 rounded-2xl overflow-hidden border border-[#C59B40]/50 bg-[#2C0910] text-[#FAF5EB] shadow-xl grid grid-cols-1 lg:grid-cols-12 items-stretch"
        >
          <div className="lg:col-span-6 relative min-h-[280px] sm:min-h-[340px] overflow-hidden group">
            <button
              type="button"
              onClick={() =>
                setLightboxImage({
                  src: MANDAP_SHOWCASE.image,
                  title: MANDAP_SHOWCASE.title,
                  subtitle: MANDAP_SHOWCASE.subtitle,
                })
              }
              aria-label="View Sacred Mandap illustration full screen"
              className="w-full h-full block cursor-pointer"
            >
              <img
                src={MANDAP_SHOWCASE.image}
                alt={MANDAP_SHOWCASE.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute top-3 right-3 w-9 h-9 rounded-full bg-[#24050A]/70 text-[#FAF5EB] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Expand className="w-4 h-4" />
              </span>
            </button>
          </div>

          <div className="lg:col-span-6 p-7 sm:p-10 flex flex-col justify-center space-y-4">
            <FloatingFloral amplitude={3} rotateDeg={0.8} duration={5.2} className="inline-block self-start">
              <p className="text-xs tracking-[0.26em] uppercase text-[#E2C578]">
                {MANDAP_SHOWCASE.subtitle}
              </p>
            </FloatingFloral>
            <h3 className="font-serif text-3xl sm:text-4xl font-semibold text-[#FAF5EB]">
              {MANDAP_SHOWCASE.title}
            </h3>
            <p className="text-sm sm:text-base text-[#F2D5D9]/90 leading-relaxed">
              {MANDAP_SHOWCASE.description}
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => handleLocateEvent('ceremony')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#C59B40] to-[#E2C578] text-[#2A080D] text-xs font-semibold tracking-[0.16em] uppercase hover:brightness-105 transition-all cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Locate Mandap Venue</span>
              </button>
            </div>
          </div>
        </motion.article>

        {/* 4 Event Cards with Actual Client Pictures */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-7">
          {visibleEventCards.map((ev, idx) => {
            const isDarkCard = ev.id === 'sangeet';
            return (
              <motion.article
                key={ev.id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.7,
                  delay: idx * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`group rounded-2xl overflow-hidden border flex flex-col sm:flex-row items-stretch transition-transform duration-300 hover:-translate-y-1 ${
                  ev.theme.surface
                } ${ev.theme.border} ${
                  isDarkCard ? 'text-[#FAF5EB]' : 'text-[#241416]'
                }`}
              >
                {/* Pasted Actual Client Wedding Image */}
                <button
                  type="button"
                  onClick={() =>
                    ev.image &&
                    setLightboxImage({
                      src: ev.image,
                      title: ev.name,
                      subtitle: `${ev.dayOfWeek}, ${ev.date} · ${ev.venueName}`,
                    })
                  }
                  aria-label={`Expand ${ev.name} image`}
                  className="relative sm:w-5/12 min-h-[240px] overflow-hidden bg-[#24050A] shrink-0 cursor-pointer"
                >
                  {ev.image && (
                    <img
                      src={ev.image}
                      alt={ev.name}
                      referrerPolicy="no-referrer"
                      className={`w-full h-full object-cover ${
                        ev.imageFocus || 'object-center'
                      } transition-transform duration-700 group-hover:scale-105`}
                    />
                  )}
                  <span className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#24050A]/65 text-[#FAF5EB] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Expand className="w-3.5 h-3.5" />
                  </span>
                </button>

                {/* Ceremony Details */}
                <div className="p-6 flex-1 flex flex-col justify-between gap-4">
                  <div>
                    <p
                      className={`text-[11px] tracking-[0.2em] uppercase font-medium ${ev.theme.accentText}`}
                    >
                      0{idx + 1}. {ev.sanskritTitle}
                    </p>
                    <h3
                      className={`mt-1 font-serif text-2xl sm:text-3xl font-semibold ${
                        isDarkCard ? 'text-[#F6E4AD]' : 'text-[#4A0E17]'
                      }`}
                    >
                      {ev.name}
                    </h3>
                    <p
                      className={`mt-2 text-xs sm:text-sm leading-relaxed ${
                        isDarkCard ? 'text-[#FAF5EB]/85' : 'text-[#4A252B]/90'
                      }`}
                    >
                      {ev.description}
                    </p>
                  </div>

                  <div
                    className={`pt-3 border-t ${
                      isDarkCard ? 'border-[#C59B40]/25' : 'border-[#C59B40]/30'
                    } space-y-1.5 text-xs`}
                  >
                    <div className="flex items-center gap-2">
                      <Calendar className={`w-3.5 h-3.5 shrink-0 ${ev.theme.accentText}`} />
                      <span>
                        {ev.dayOfWeek}, {ev.date} · {ev.time}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${ev.theme.accentText}`} />
                      <span>{ev.venueName}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Shirt className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${ev.theme.accentText}`} />
                      <span>{ev.dressCode}</span>
                    </div>
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={() => handleLocateEvent(ev.id)}
                      className={`inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] uppercase cursor-pointer hover:opacity-80 ${
                        isDarkCard ? 'text-[#E2C578]' : 'text-[#6B1220]'
                      }`}
                    >
                      <span>Locate on Map</span>
                      <span aria-hidden="true">→</span>
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Integrated Venue & Location Map right inside the same Memories/Ceremonies section */}
        <div
          id="venue-map"
          className="mt-16 pt-12 border-t border-[#C59B40]/35 scroll-mt-20"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs tracking-[0.26em] uppercase text-[#8F6B24] font-medium">
                Venue &amp; Location
              </p>
              <h3 className="mt-1 font-serif text-3xl sm:text-4xl font-semibold text-[#4A0E17]">
                Locate Every Ceremony in Udaipur
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#4A252B] max-w-md">
              Tap any marker on the map or select an event card to view timings and open Google
              Maps directions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Compact 5-Event Venue Selector */}
            <div className="lg:col-span-5 flex flex-col gap-2.5">
              {WEDDING_EVENTS.map((ev) => {
                const isSelected = ev.id === selectedEventId;
                return (
                  <button
                    key={ev.id}
                    type="button"
                    onClick={() => setSelectedEventId(ev.id)}
                    className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#4A0E17] text-[#FAF5EB] border-[#C59B40] shadow-md'
                        : 'bg-[#FFFDF8] text-[#241416] border-[#C59B40]/30 hover:border-[#C59B40]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`text-[11px] tracking-[0.18em] uppercase font-medium ${
                          isSelected ? 'text-[#E2C578]' : 'text-[#8F6B24]'
                        }`}
                      >
                        {ev.dayOfWeek} · {ev.date} · {ev.time}
                      </span>
                      <span
                        className="w-3 h-3 rounded-full shrink-0 border"
                        style={{
                          backgroundColor: ev.theme.markerBg,
                          borderColor: ev.theme.markerBorder,
                        }}
                      />
                    </div>
                    <h4
                      className={`mt-0.5 font-serif text-xl font-semibold ${
                        isSelected ? 'text-[#FAF5EB]' : 'text-[#4A0E17]'
                      }`}
                    >
                      {ev.name}
                    </h4>
                    <p
                      className={`mt-0.5 text-xs ${
                        isSelected ? 'text-[#FAF5EB]/80' : 'text-[#6B4A35]'
                      }`}
                    >
                      {ev.venueName}
                    </p>
                  </button>
                );
              })}

              <div className="mt-1 pt-3 flex items-center justify-between gap-3">
                <span className="text-xs text-[#4A252B] truncate">
                  <strong className="text-[#4A0E17]">Selected:</strong> {activeEvent.venueName}
                </span>
                <a
                  href={getDirectionsUrl(activeEvent)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#6B1220] text-[#FAF5EB] text-xs font-semibold tracking-[0.14em] uppercase hover:bg-[#4A0E17] transition-colors whitespace-nowrap shrink-0"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>

            {/* Interactive Google Map */}
            <div className="lg:col-span-7">
              <div className="h-[440px] lg:h-full min-h-[440px] w-full rounded-2xl overflow-hidden border-2 border-[#C59B40]/45 shadow-lg bg-[#F3EAD8]">
                {apiKey ? (
                  <APIProvider
                    apiKey={apiKey}
                    language="en"
                    region="IN"
                    libraries={['marker']}
                  >
                    <InteractiveMapCanvas
                      selectedEventId={selectedEventId}
                      onSelectEventId={setSelectedEventId}
                    />
                  </APIProvider>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center text-[#4A252B]">
                    <MapPin className="w-9 h-9 text-[#6B1220] mb-3" />
                    <h4 className="font-serif text-2xl font-semibold text-[#4A0E17]">
                      {activeEvent.venueName}
                    </h4>
                    <p className="mt-1 text-sm max-w-md">{activeEvent.venueAddress}</p>
                    <a
                      href={getDirectionsUrl(activeEvent)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#6B1220] text-[#FAF5EB] text-xs font-semibold tracking-[0.16em] uppercase"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Get Directions</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Image Viewer */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-50 bg-[#180408]/94 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={lightboxImage.title}
          >
            <button
              type="button"
              onClick={() => setLightboxImage(null)}
              aria-label="Close image preview"
              className="absolute top-5 right-5 w-11 h-11 rounded-full bg-[#FAF5EB]/10 text-[#FAF5EB] hover:bg-[#FAF5EB]/20 flex items-center justify-center cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-3xl w-full bg-[#FAF5EB] rounded-2xl overflow-hidden border border-[#C59B40]/50 shadow-2xl"
            >
              <div className="max-h-[75vh] bg-[#24050A] flex items-center justify-center overflow-hidden">
                <img
                  src={lightboxImage.src}
                  alt={lightboxImage.title}
                  referrerPolicy="no-referrer"
                  className="w-full max-h-[75vh] object-contain"
                />
              </div>
              <div className="p-5">
                <p className="text-xs tracking-[0.2em] uppercase text-[#8F6B24]">
                  {lightboxImage.subtitle}
                </p>
                <h3 className="mt-1 font-serif text-2xl font-semibold text-[#4A0E17]">
                  {lightboxImage.title}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
