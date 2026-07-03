import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const WhatsAppIcon = ({ className = 'h-4 w-4' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const PHONE = '919599765044';

const projectTypes = ['Interior Design', 'Complete Build', 'Commercial'];
const budgetRanges = [
  'Under ₹10 Lakhs',
  '₹10 – 25 Lakhs',
  '₹25 – 50 Lakhs',
  '₹50 Lakhs – 1 Cr',
  '₹1 Cr +',
];

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    projectType: '',
    budget: '',
    message: '',
  });

  useEffect(() => {
    const apply = (msg: string) => setForm((f) => ({ ...f, message: msg }));
    const stored = sessionStorage.getItem('quizPrefillMessage');
    if (stored) {
      apply(stored);
      sessionStorage.removeItem('quizPrefillMessage');
    }
    const handler = (e: Event) => apply((e as CustomEvent<string>).detail);
    window.addEventListener('quiz:prefill', handler);
    return () => window.removeEventListener('quiz:prefill', handler);
  }, []);

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, projectType, budget, message } = form;
    if (!name.trim() || !projectType || !budget || !message.trim()) {
      toast.error('Please complete all fields before sending.');
      return;
    }
    if (name.length > 100 || message.length > 1200) {
      toast.error('Please shorten your inputs.');
      return;
    }
    const text =
      `Hello Aarav Design Studio! I am looking for a consultation.\n\n` +
      `*Name:* ${name.trim()}\n` +
      `*Project Type:* ${projectType}\n` +
      `*Budget:* ${budget}\n` +
      `*Message:* ${message.trim()}`;
    const url = `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    toast.success('Opening WhatsApp — thank you for reaching out.');
  };

  return (
    <section id="inquire" className="section-padding bg-background text-foreground">
      <div className="container mx-auto grid grid-cols-12 gap-8 md:gap-16">
        {/* Left */}
        <div className="col-span-12 md:col-span-5 flex flex-col justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-[0.4em] text-bronze">
              (Inquire) — 06
            </span>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 font-serif font-light leading-[1.05]"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 4.25rem)' }}
            >
              Begin a <span className="italic text-bronze">quiet</span><br />
              conversation.
            </motion.h2>
            <p className="mt-8 max-w-sm text-sm md:text-base font-light text-muted-foreground leading-relaxed">
              Tell us about your space and intention. Every message reaches Aarav
              directly on WhatsApp — expect a reply within one working day.
            </p>
          </div>
          <div className="mt-16 md:mt-0 space-y-6 text-xs uppercase tracking-[0.25em]">
            <div>
              <div className="text-muted-foreground mb-1">Studio</div>
              <div>Sector 62, Noida — 201309</div>
            </div>
            <div>
              <div className="text-muted-foreground mb-1">Direct</div>
              <a href={`https://wa.me/${PHONE}`} className="hover:text-bronze transition-colors">
                +91 95997 65044
              </a>
            </div>
          </div>
        </div>

        {/* Right — form */}
        <form onSubmit={handleSubmit} className="col-span-12 md:col-span-7 space-y-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <label className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              01 — Full Name
            </label>
            <input
              type="text"
              maxLength={100}
              value={form.name}
              onChange={update('name')}
              required
              placeholder="Your name"
              className="input-line"
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="pt-6"
            >
              <label className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                02 — Project Type
              </label>
              <select
                value={form.projectType}
                onChange={update('projectType')}
                required
                className="input-line appearance-none cursor-pointer"
              >
                <option value="" disabled>Select a discipline</option>
                {projectTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="pt-6"
            >
              <label className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                03 — Budget Range
              </label>
              <select
                value={form.budget}
                onChange={update('budget')}
                required
                className="input-line appearance-none cursor-pointer"
              >
                <option value="" disabled>Select a range</option>
                {budgetRanges.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="pt-6"
          >
            <label className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              04 — Message
            </label>
            <textarea
              rows={4}
              maxLength={1200}
              value={form.message}
              onChange={update('message')}
              required
              placeholder="A few words about your space and vision…"
              className="input-line resize-none"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="pt-10"
          >
            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="btn-magnetic btn-glow bg-charcoal text-cream border border-charcoal hover:bg-transparent hover:text-charcoal"
            >
              <WhatsAppIcon />
              Send Inquiry via WhatsApp
            </motion.button>
          </motion.div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
