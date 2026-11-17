import { FormEvent, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Edit3 } from 'lucide-react';
import { WEDDING_CONFIG, WEDDING_EVENTS } from '../data/weddingData';
import { FloralCornerMotif, MandalaDivider } from './illustrations/IndianMotifs';

interface RsvpRecord {
  guestName: string;
  email: string;
  guestsCount: number;
  attending: 'yes' | 'no';
  eventsAttending: string[];
  blessingNote: string;
  submittedAt: string;
}

const STORAGE_KEY = 'royal_wedding_rsvp_v1';

export function RsvpSection() {
  const [guestName, setGuestName] = useState('');
  const [email, setEmail] = useState('');
  const [guestsCount, setGuestsCount] = useState(2);
  const [attending, setAttending] = useState<'yes' | 'no'>('yes');
  const [eventsAttending, setEventsAttending] = useState<string[]>(
    WEDDING_EVENTS.map((e) => e.id)
  );
  const [blessingNote, setBlessingNote] = useState('');
  const [errors, setErrors] = useState<{ guestName?: string; email?: string; events?: string }>({});
  const [submittedRecord, setSubmittedRecord] = useState<RsvpRecord | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as RsvpRecord;
        setSubmittedRecord(parsed);
        setGuestName(parsed.guestName);
        setEmail(parsed.email);
        setGuestsCount(parsed.guestsCount);
        setAttending(parsed.attending);
        setEventsAttending(parsed.eventsAttending);
        setBlessingNote(parsed.blessingNote);
      }
    } catch {
      // Ignore storage errors cleanly
    }
  }, []);

  const toggleEvent = (id: string) => {
    setEventsAttending((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const nextErrors: typeof errors = {};

    if (guestName.trim().length < 2) {
      nextErrors.guestName = 'Please enter your full name (at least 2 characters).';
    }
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = 'Please provide a valid email address.';
    }
    if (attending === 'yes' && eventsAttending.length === 0) {
      nextErrors.events = 'Please select at least one celebration you plan to attend.';
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const record: RsvpRecord = {
      guestName: guestName.trim(),
      email: email.trim(),
      guestsCount: attending === 'yes' ? guestsCount : 0,
      attending,
      eventsAttending: attending === 'yes' ? eventsAttending : [],
      blessingNote: blessingNote.trim(),
      submittedAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
    } catch {
      // Ignore storage quota issues
    }
    setErrors({});
    setSubmittedRecord(record);
  };

  return (
    <section id="rsvp" className="relative overflow-hidden py-20 sm:py-28 bg-[#FAF5EB] paper-grain">
      <FloralCornerMotif
        position="top-left"
        className="absolute top-6 left-4 hidden lg:block"
      />
      <FloralCornerMotif
        position="bottom-right"
        className="absolute bottom-6 right-4 hidden lg:block"
      />
      <div className="max-w-3xl mx-auto px-5 sm:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <p className="text-xs tracking-[0.28em] uppercase text-[#8F6B24] font-medium">
            Kindly Respond
          </p>
          <h2 className="mt-3 font-serif text-4xl sm:text-5xl font-semibold text-[#4A0E17] tracking-tight">
            Reserve Your Presence
          </h2>
          <MandalaDivider className="mt-5" />
          <p className="mt-4 text-sm sm:text-base text-[#4A252B]">
            Kindly share your confirmation by{' '}
            <strong className="font-semibold text-[#4A0E17]">
              {WEDDING_CONFIG.rsvpDeadline}
            </strong>{' '}
            so our families can prepare your hospitality in Udaipur.
          </p>
        </motion.div>

        <div className="relative mt-12 rounded-2xl border border-[#C59B40]/45 bg-[#FFFDF9] p-6 sm:p-10 shadow-[0_18px_45px_rgba(74,14,23,0.06)]">
          {submittedRecord ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-5 py-4"
            >
              <div className="w-14 h-14 mx-auto rounded-full bg-[#6B1220]/10 text-[#6B1220] flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h3 className="font-serif text-3xl font-semibold text-[#4A0E17]">
                {submittedRecord.attending === 'yes'
                  ? `We Joyfully Await You, ${submittedRecord.guestName}`
                  : `Thank You for Your Warm Wishes, ${submittedRecord.guestName}`}
              </h3>

              <p className="text-sm sm:text-base text-[#4A252B] max-w-lg mx-auto leading-relaxed">
                {submittedRecord.attending === 'yes'
                  ? `Your RSVP for ${submittedRecord.guestsCount} ${
                      submittedRecord.guestsCount === 1 ? 'guest' : 'guests'
                    } across ${submittedRecord.eventsAttending.length} celebration${
                      submittedRecord.eventsAttending.length === 1 ? '' : 's'
                    } has been recorded.`
                  : 'We will miss celebrating with you in person and deeply appreciate your blessings from afar.'}
              </p>

              {submittedRecord.blessingNote && (
                <blockquote className="max-w-md mx-auto py-3 px-5 border-y border-[#C59B40]/30 font-serif italic text-base text-[#6B1220]">
                  “{submittedRecord.blessingNote}”
                </blockquote>
              )}

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setSubmittedRecord(null)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#6B1220]/35 text-[#6B1220] text-xs font-semibold tracking-[0.16em] uppercase hover:bg-[#6B1220]/5 transition-colors cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Update RSVP Details</span>
                </button>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              {/* Guest Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="rsvp-name"
                    className="block text-xs font-semibold tracking-[0.16em] uppercase text-[#4A0E17] mb-2"
                  >
                    Full Name <span className="text-[#9E3B4F]">*</span>
                  </label>
                  <input
                    id="rsvp-name"
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => {
                      setGuestName(e.target.value);
                      if (errors.guestName) setErrors((prev) => ({ ...prev, guestName: undefined }));
                    }}
                    placeholder="e.g., Aarav & Priya Kulkarni"
                    className="w-full px-4 py-3 rounded-xl border border-[#C59B40]/45 bg-[#FAF5EB]/55 text-sm text-[#241416] placeholder:text-[#8A7368] focus:border-[#6B1220] focus:outline-none"
                  />
                  {errors.guestName && (
                    <p role="alert" className="mt-1.5 text-xs text-[#9E1C2E]">
                      {errors.guestName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="rsvp-email"
                    className="block text-xs font-semibold tracking-[0.16em] uppercase text-[#4A0E17] mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    id="rsvp-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-[#C59B40]/45 bg-[#FAF5EB]/55 text-sm text-[#241416] placeholder:text-[#8A7368] focus:border-[#6B1220] focus:outline-none"
                  />
                  {errors.email && (
                    <p role="alert" className="mt-1.5 text-xs text-[#9E1C2E]">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Attendance Confirmation & Guest Count */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <span className="block text-xs font-semibold tracking-[0.16em] uppercase text-[#4A0E17] mb-2">
                    Attendance Confirmation
                  </span>
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setAttending('yes')}
                      className={`py-3 px-3 rounded-xl border text-xs font-semibold tracking-wide transition-colors cursor-pointer ${
                        attending === 'yes'
                          ? 'bg-[#6B1220] text-[#FAF5EB] border-[#6B1220]'
                          : 'bg-[#FAF5EB]/60 text-[#4A252B] border-[#C59B40]/40 hover:border-[#6B1220]'
                      }`}
                    >
                      Joyfully Accepts
                    </button>
                    <button
                      type="button"
                      onClick={() => setAttending('no')}
                      className={`py-3 px-3 rounded-xl border text-xs font-semibold tracking-wide transition-colors cursor-pointer ${
                        attending === 'no'
                          ? 'bg-[#4A0E17] text-[#FAF5EB] border-[#4A0E17]'
                          : 'bg-[#FAF5EB]/60 text-[#4A252B] border-[#C59B40]/40 hover:border-[#6B1220]'
                      }`}
                    >
                      Regretfully Declines
                    </button>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="rsvp-guests"
                    className="block text-xs font-semibold tracking-[0.16em] uppercase text-[#4A0E17] mb-2"
                  >
                    Number of Guests
                  </label>
                  <select
                    id="rsvp-guests"
                    disabled={attending === 'no'}
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl border border-[#C59B40]/45 bg-[#FAF5EB]/55 text-sm text-[#241416] focus:border-[#6B1220] focus:outline-none disabled:opacity-50"
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Events Selection */}
              {attending === 'yes' && (
                <div>
                  <span className="block text-xs font-semibold tracking-[0.16em] uppercase text-[#4A0E17] mb-2.5">
                    Celebrations Attending
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {WEDDING_EVENTS.map((ev) => {
                      const checked = eventsAttending.includes(ev.id);
                      return (
                        <label
                          key={ev.id}
                          className={`flex items-center gap-3 p-3 rounded-xl border text-xs sm:text-sm cursor-pointer transition-colors ${
                            checked
                              ? 'bg-[#F3EAD8] border-[#6B1220]/50 text-[#4A0E17] font-medium'
                              : 'bg-[#FAF5EB]/40 border-[#C59B40]/30 text-[#4A252B]'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => {
                              toggleEvent(ev.id);
                              if (errors.events) setErrors((prev) => ({ ...prev, events: undefined }));
                            }}
                            className="accent-[#6B1220] w-4 h-4 rounded"
                          />
                          <span className="truncate">
                            {ev.name} ({ev.dayOfWeek})
                          </span>
                        </label>
                      );
                    })}
                  </div>
                  {errors.events && (
                    <p role="alert" className="mt-1.5 text-xs text-[#9E1C2E]">
                      {errors.events}
                    </p>
                  )}
                </div>
              )}

              {/* Note & Blessings */}
              <div>
                <label
                  htmlFor="rsvp-note"
                  className="block text-xs font-semibold tracking-[0.16em] uppercase text-[#4A0E17] mb-2"
                >
                  Blessings or Dietary Preferences (Optional)
                </label>
                <textarea
                  id="rsvp-note"
                  rows={3}
                  value={blessingNote}
                  onChange={(e) => setBlessingNote(e.target.value)}
                  placeholder="Share a warm blessing for the couple or let us know of any dietary notes..."
                  className="w-full px-4 py-3 rounded-xl border border-[#C59B40]/45 bg-[#FAF5EB]/55 text-sm text-[#241416] placeholder:text-[#8A7368] focus:border-[#6B1220] focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-center">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-10 py-3.5 rounded-full bg-[#6B1220] text-[#FAF5EB] text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[#4A0E17] shadow-md transition-colors cursor-pointer"
                >
                  Send RSVP Confirmation
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
