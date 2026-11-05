import { FormEvent, useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { ArrowDown, ArrowRight, Check, ChevronDown, CircleArrowOutUpRight } from 'lucide-react';

type FormData = {
  name: string;
  email: string;
  company: string;
  industry: string;
  teamSize: string;
};

const initialForm: FormData = {
  name: '',
  email: '',
  company: '',
  industry: '',
  teamSize: '',
};

const industries = [
  'Technology',
  'Logistics & Supply Chain',
  'Healthcare',
  'Finance & Accounting',
  'E-commerce & Retail',
  'Professional Services',
  'Manufacturing',
  'Other',
];

const teamSizes = ['1–10', '11–50', '51–200', '200+'];

const fitFor = [
  'You run a business with real operations and a team doing actual work',
  'Your people spend hours on tasks that follow the same pattern every time',
  "You use multiple tools that don't talk to each other",
  'You want to understand what automation could do before committing to anything',
  'You value clarity and process over promises and demos',
];

const notFitFor = [
  "You're looking for a magic button that fixes everything overnight",
  "You're exploring automation as a hobby or side experiment",
  'You expect results without any internal involvement or change',
  'You want a vendor to hand you a solution and disappear',
];

const processSteps = [
  ['01', 'Understand the current system', 'We start by mapping how your business actually operates — the tools, the handoffs, the workarounds your team has built over time.'],
  ['02', 'Identify bottlenecks and waste', "We look for the work that's repetitive, error-prone, or time-consuming. Not everything needs automation — we focus on what actually matters."],
  ['03', 'Design practical automations', 'We outline specific automations that fit your existing workflows. No rip-and-replace. No platform lock-in. Just clear, buildable solutions.'],
  ['04', 'Decide together what makes sense', "You get a full picture of the opportunities, the effort involved, and the expected impact. What happens next is entirely your call."],
];

const testimonials = [
  ['“We finally understood where our time was actually going. The audit alone changed how we thought about our operations — before we’d built a single automation.”', 'Operations Director, Mid-size Logistics Company'],
  ['“No fluff, no overselling. They mapped our entire intake process, showed us exactly what could be automated, and let us decide. That kind of clarity is rare.”', 'Founder, B2B SaaS Company'],
  ['“I came in skeptical. I left with a clear plan and a much better understanding of what AI can and can’t do for a business like ours.”', 'CEO, Regional Healthcare Services'],
];

const nextSteps = [
  ['01', 'We review your submission', 'We look at your industry, team size, and context before we reach out — so the first call is already focused.'],
  ['02', 'Short intro call (30 min)', 'We ask questions about your current operations. You ask us anything you want. No agenda beyond mutual understanding.'],
  ['03', 'You receive clear recommendations', 'Within a few days of the call, you get a written summary of automation opportunities — specific, prioritized, and honest about effort and impact.'],
  ['04', 'You decide what to do next', "There's no follow-up pressure. If you want to move forward, we'll talk about what that looks like. If not, the audit still stands on its own."],
];

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' as const } },
};

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="mb-5 inline-flex items-center gap-2">
      <span className="h-1.5 w-1.5 rounded-full bg-[#D4A853]" />
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#D4A853]">{children}</p>
    </div>
  );
}

function IlluminatedDivider() {
  return (
    <div className="section-divider relative z-20" aria-hidden="true">
      <span className="section-divider-node" />
    </div>
  );
}

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div className={className} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }}>
      {children}
    </motion.div>
  );
}

function StatCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setCount(target);
      return;
    }
    if (!isInView) return;

    let start = 0;
    const duration = 1200;
    const stepTime = 25;
    const totalSteps = duration / stepTime;
    const increment = target / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, target, shouldReduceMotion]);

  return (
    <div ref={ref} className="relative inline-block">
      <div className="metric-spotlight" aria-hidden="true" />
      <span className="font-display relative z-10 text-5xl font-medium tracking-tight text-[#D4A853] sm:text-6xl">
        {count}{suffix}
      </span>
    </div>
  );
}

function HeroSystemDiagram() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-35" aria-hidden="true">
      <svg className="h-full w-full" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="grad-line-1" x1="120" y1="200" x2="1320" y2="700" gradientUnits="userSpaceOnUse">
            <stop stopColor="#D4A853" stopOpacity="0.02" />
            <stop offset="0.5" stopColor="#D4A853" stopOpacity="0.28" />
            <stop offset="1" stopColor="#D4A853" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="grad-line-2" x1="300" y1="750" x2="1140" y2="180" gradientUnits="userSpaceOnUse">
            <stop stopColor="#D4A853" stopOpacity="0.04" />
            <stop offset="0.5" stopColor="#D4A853" stopOpacity="0.22" />
            <stop offset="1" stopColor="#D4A853" stopOpacity="0.04" />
          </linearGradient>
        </defs>

        {/* Abstract connection lines */}
        <path d="M 160 320 H 420 L 560 460 H 940 L 1080 320 H 1280" stroke="url(#grad-line-1)" strokeWidth="1" strokeDasharray="6 6" />
        <path d="M 240 680 L 460 520 H 980 L 1200 680" stroke="url(#grad-line-2)" strokeWidth="1" />
        <path d="M 720 160 V 780" stroke="#D4A853" strokeOpacity="0.07" strokeWidth="1" strokeDasharray="4 8" />

        {/* System Nodes with subtle pulse */}
        <g transform="translate(420, 320)">
          <circle r="4" fill="#D4A853" fillOpacity="0.6" />
          <circle r="12" stroke="#D4A853" strokeOpacity="0.2" strokeWidth="1" />
          <text x="14" y="4" fill="#999" fontSize="9" fontFamily="DM Mono, monospace" letterSpacing="0.1em" opacity="0.6">INGEST.01</text>
        </g>

        <g transform="translate(560, 460)">
          <circle r="3" fill="#D4A853" fillOpacity="0.8" />
          <circle r="8" stroke="#D4A853" strokeOpacity="0.25" strokeWidth="1" />
          <text x="-70" y="-8" fill="#D4A853" fontSize="8" fontFamily="DM Mono, monospace" letterSpacing="0.15em" opacity="0.7">WORKFLOW::MAP</text>
        </g>

        <g transform="translate(940, 460)">
          <circle r="3.5" fill="#D4A853" fillOpacity="0.7" />
          <circle r="10" stroke="#D4A853" strokeOpacity="0.2" strokeWidth="1" />
          <text x="14" y="-6" fill="#999" fontSize="8" fontFamily="DM Mono, monospace" letterSpacing="0.15em" opacity="0.6">AUTO.EXEC</text>
        </g>

        <g transform="translate(1080, 320)">
          <circle r="4" fill="#D4A853" fillOpacity="0.7" />
          <circle r="14" stroke="#D4A853" strokeOpacity="0.2" strokeWidth="1" />
          <text x="-64" y="18" fill="#999" fontSize="9" fontFamily="DM Mono, monospace" letterSpacing="0.1em" opacity="0.6">SYNC.OUT</text>
        </g>

        {/* Ambient floating node with Framer Motion (disabled when reduced motion active) */}
        {!shouldReduceMotion ? (
          <motion.circle
            cx="720"
            cy="460"
            r="4"
            fill="#D4A853"
            animate={{
              r: [4, 6, 4],
              opacity: [0.4, 0.9, 0.4],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ) : (
          <circle cx="720" cy="460" r="4" fill="#D4A853" opacity="0.6" />
        )}
      </svg>
    </div>
  );
}

function App() {
  const [navSolid, setNavSolid] = useState(false);
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => setNavSolid(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToForm = () => document.getElementById('audit-form')?.scrollIntoView({ behavior: 'smooth' });

  const updateField = (field: keyof FormData, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setError('');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    if (Object.values(form).some((value) => !value.trim())) {
      setError('Please complete every field before submitting.');
      return;
    }
    if (!emailValid) {
      setError('Please enter a valid work email address.');
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#0A0A0A] text-[#F0F0F0]">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-[#B58A38] via-[#D4A853] to-[#F3D389]"
        style={{ scaleX }}
        aria-hidden="true"
      />

      {/* Navigation */}
      <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${navSolid ? 'border-b border-[#2A2A2A]/80 bg-[#0A0A0A]/90 backdrop-blur-xl shadow-lg shadow-black/40' : 'bg-transparent'}`}>
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-6 lg:px-10">
          <a href="#top" className="font-display text-xl font-semibold tracking-[0.18em] text-white focus-amber">
            AXIOM<span className="text-[#D4A853]">.</span>
          </a>
          <button
            onClick={scrollToForm}
            className="button-outline group flex items-center gap-2 rounded-full bg-[#141311]/80 px-4 py-2 text-sm text-[#D8D5D0] focus-amber"
          >
            Request an Audit <ArrowRight size={15} className="text-[#D4A853] transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </nav>

      <main id="top">
        {/* HERO SECTION */}
        <section className="hero-grid relative flex min-h-screen items-center justify-center px-6 pb-20 pt-32 text-center lg:px-10">
          <div className="hero-vignette" aria-hidden="true" />
          <div className="ambient-glow-hero" aria-hidden="true" />
          <HeroSystemDiagram />

          <motion.div className="relative z-10 mx-auto max-w-5xl" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.12 } } }}>
            <motion.div variants={reveal} className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#D4A853]/25 bg-[#17140e]/70 px-4 py-1.5 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D4A853] shadow-[0_0_8px_#D4A853]" />
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#D4A853]">AI Automation for Operational Teams</span>
            </motion.div>

            <motion.h1 variants={reveal} className="font-display mx-auto max-w-5xl text-5xl font-medium leading-[1.04] tracking-[-0.045em] text-[#F0F0F0] sm:text-6xl lg:text-[5.2rem]">
              Your team is capable of more. <em className="text-[#D4A853] not-italic underline decoration-[#D4A853]/40 decoration-wavy decoration-1 underline-offset-8">Manual work</em> and disconnected tools are getting in the way.
            </motion.h1>

            <motion.p variants={reveal} className="mx-auto mt-8 max-w-2xl text-base leading-8 text-[#A6A29C] sm:text-lg">
              We help businesses replace repetitive processes with reliable systems — not with hype, but with practical automation built around how you actually operate.
            </motion.p>

            <motion.div variants={reveal} className="mt-10 flex flex-col items-center gap-4">
              <button
                onClick={scrollToForm}
                className="button-glow group inline-flex items-center gap-3 rounded-full bg-[#D4A853] px-7 py-4 text-sm font-semibold text-[#17130c] focus-amber"
              >
                Request a Free Automation Audit <CircleArrowOutUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              <span className="text-xs text-[#7A756E]">No commitment. No sales pitch. Just a clear look at where automation makes sense for your business.</span>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="absolute bottom-9 left-1/2 -translate-x-1/2 text-[#686259]">
            <ArrowDown size={18} className="animate-bounce" />
          </motion.div>
        </section>

        <IlluminatedDivider />

        {/* FIT SECTION */}
        <section className="relative bg-[#0C0C0B] px-6 py-28 lg:px-10 lg:py-36">
          <div className="pointer-events-none absolute left-1/4 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-radial from-[#D4A853]/[0.05] to-transparent blur-3xl" aria-hidden="true" />
          <div className="relative z-10 mx-auto max-w-7xl">
            <Reveal><SectionLabel>Is This a Fit?</SectionLabel></Reveal>
            <Reveal className="mb-12 max-w-2xl">
              <h2 className="font-display text-4xl leading-tight tracking-[-0.03em] text-white sm:text-5xl">
                Good automation starts with an honest read of the situation.
              </h2>
            </Reveal>

            <div className="grid gap-6 md:grid-cols-2">
              <Reveal className="h-full">
                <div className="surface-card h-full rounded-sm border-l-2 border-l-[#D4A853] p-7 sm:p-9">
                  <span className="card-accent-line" />
                  <h3 className="font-display mb-7 text-2xl text-white">This is for you if<span className="text-[#D4A853]">...</span></h3>
                  <ul className="space-y-5">
                    {fitFor.map((item) => (
                      <li key={item} className="flex gap-4 text-sm leading-6 text-[#BBB6AE]">
                        <span className="font-bold text-[#D4A853]">→</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal className="h-full">
                <div className="surface-card h-full rounded-sm p-7 opacity-90 sm:p-9">
                  <span className="card-accent-line" />
                  <h3 className="font-display mb-7 text-2xl text-[#D0CDC8]">This probably isn’t a fit if<span className="text-[#77736d]">...</span></h3>
                  <ul className="space-y-5">
                    {notFitFor.map((item) => (
                      <li key={item} className="flex gap-4 text-sm leading-6 text-[#8B8680]">
                        <span className="text-[#595650]">—</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <IlluminatedDivider />

        {/* PROCESS SECTION */}
        <section className="relative bg-[#0F0F0E] px-6 py-28 lg:px-10 lg:py-36">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <SectionLabel>The Process</SectionLabel>
              <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
                <h2 className="font-display text-4xl tracking-[-0.03em] text-white sm:text-5xl">Four steps. No jargon.<br />No surprises.</h2>
                <p className="max-w-xs text-sm leading-6 text-[#8E8A83]">A measured approach to finding the places where better systems can give your team room to do better work.</p>
              </div>
            </Reveal>

            <div className="relative mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {processSteps.map(([number, title, body], index) => (
                <Reveal key={number} className="relative h-full">
                  <div className="surface-card relative h-full overflow-hidden rounded-sm p-7">
                    <span className="card-accent-line" />
                    <span className="font-display pointer-events-none absolute -right-2 -top-7 text-8xl font-semibold text-[#181816]/70 select-none">
                      {number}
                    </span>
                    <div className="relative z-10">
                      <div className="mb-10 inline-flex items-center gap-2 rounded-full border border-[#D4A853]/20 bg-[#161513] px-2.5 py-0.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#D4A853]" />
                        <span className="text-[11px] font-semibold tracking-[0.2em] text-[#D4A853]">{number}</span>
                      </div>
                      <h3 className="font-display mb-4 text-xl leading-tight text-white">{title}</h3>
                      <p className="text-sm leading-6 text-[#908C86]">{body}</p>
                    </div>
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="pointer-events-none absolute -right-3 top-1/2 z-20 hidden w-6 border-t border-dashed border-[#D4A853]/30 lg:block" aria-hidden="true" />
                  )}
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <IlluminatedDivider />

        {/* METRICS & CREDIBILITY SECTION */}
        <section className="relative bg-[#0A0A0A] px-6 py-28 lg:px-10 lg:py-36">
          <div className="mx-auto max-w-7xl">
            <Reveal><SectionLabel>Built on Real Systems Experience</SectionLabel></Reveal>

            <div className="grid gap-12 sm:grid-cols-3">
              {[
                { target: 8, suffix: '+', title: 'Years', body: 'Working with operational systems and business data' },
                { target: 40, suffix: '+', title: 'Automations', body: 'Running in production across client businesses' },
                { target: 12, suffix: '', title: 'Industries', body: 'From logistics and finance to healthcare and e-commerce' },
              ].map(({ target, suffix, title, body }) => (
                <Reveal key={title}>
                  <div className="relative">
                    <StatCounter target={target} suffix={suffix} />
                    <div className="mt-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#DCD7D0]">{title}</div>
                    <p className="mt-3 max-w-[240px] text-sm leading-6 text-[#817D77]">{body}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-24">
              <p className="mb-7 text-xs font-semibold uppercase tracking-[0.22em] text-[#726E67]">Trusted by operators across industries</p>
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="industry-mark flex h-16 items-center justify-center rounded-sm border border-[#22211E] bg-[#111110] transition-colors hover:border-[#D4A853]/40"
                  >
                    <span className={`shape-${index + 1}`} />
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <IlluminatedDivider />

        {/* TESTIMONIALS SECTION */}
        <section className="relative bg-[#0E0E0D] px-6 py-28 lg:px-10 lg:py-36">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <SectionLabel>What Clients Say</SectionLabel>
              <h2 className="font-display mb-12 max-w-xl text-4xl tracking-[-0.03em] text-white sm:text-5xl">
                Clarity is often the most valuable first outcome.
              </h2>
            </Reveal>

            <div className="grid gap-6 lg:grid-cols-3">
              {testimonials.map(([quote, attribution]) => (
                <Reveal key={attribution} className="h-full">
                  <figure className="surface-card relative flex h-full flex-col justify-between overflow-hidden rounded-sm p-7 sm:p-9">
                    <span className="card-accent-line" />
                    {/* Decorative watermark quotation mark */}
                    <span className="font-display pointer-events-none absolute right-4 top-2 text-7xl font-bold text-[#D4A853]/[0.08] select-none" aria-hidden="true">
                      “
                    </span>
                    <blockquote className="font-display relative z-10 text-xl italic leading-8 text-[#DDD9D2]">
                      {quote}
                    </blockquote>
                    <figcaption className="relative z-10 mt-10 border-t border-[#2A2825] pt-4 text-xs font-semibold uppercase leading-5 tracking-[0.16em] text-[#86817B]">
                      — {attribution}
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <IlluminatedDivider />

        {/* AUDIT OFFER SECTION */}
        <section className="relative bg-[#11100F] px-6 py-28 lg:px-10 lg:py-36">
          <div className="pointer-events-none absolute right-1/4 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-radial from-[#D4A853]/[0.06] to-transparent blur-3xl" aria-hidden="true" />
          <div className="relative z-10 mx-auto max-w-3xl">
            <Reveal>
              <SectionLabel>Free Automation Audit</SectionLabel>
              <h2 className="font-display text-4xl leading-tight tracking-[-0.03em] text-white sm:text-5xl">
                A clear picture of where automation fits in your business.
              </h2>
              <p className="mt-7 text-base leading-8 text-[#A09B94]">
                The audit is a structured review of your current workflows — how work moves through your team, where time is lost, and where automation could create real leverage. You’ll walk away with specific opportunities identified, prioritized by impact and effort. There’s no obligation to work with us after. The audit is useful on its own.
              </p>
            </Reveal>

            <Reveal className="mt-10">
              <div className="surface-card grid gap-4 rounded-sm border border-[#2D2A26] bg-[#141311] p-7 sm:grid-cols-2">
                <span className="card-accent-line" />
                {[
                  'Workflow mapping session (60–90 min)',
                  'Bottleneck and inefficiency analysis',
                  'Prioritized automation opportunity report',
                  'Plain-language recommendations with no vendor bias',
                ].map((item) => (
                  <div key={item} className="flex gap-3 text-sm text-[#BCB7AF]">
                    <Check size={17} className="mt-0.5 shrink-0 text-[#D4A853]" />
                    {item}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <IlluminatedDivider />

        {/* AUDIT FORM SECTION */}
        <section id="audit-form" className="relative scroll-mt-20 bg-[#131210] px-6 py-28 lg:px-10 lg:py-36">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-radial from-[#D4A853]/[0.05] to-transparent blur-3xl" aria-hidden="true" />
          <div className="relative z-10 mx-auto max-w-xl">
            <Reveal>
              <div className="form-card rounded-sm p-7 sm:p-10">
                <SectionLabel>Start a Conversation</SectionLabel>
                {submitted ? (
                  <div className="py-10 text-center">
                    <div className="mx-auto mb-7 flex h-14 w-14 items-center justify-center rounded-full border border-[#D4A853] bg-[#1C1A16] text-[#D4A853] shadow-[0_0_20px_rgba(212,168,83,0.3)]">
                      <Check size={26} />
                    </div>
                    <h2 className="font-display text-4xl tracking-[-0.03em] text-white">Your request has been received.</h2>
                    <p className="mt-5 text-sm leading-7 text-[#A29D96]">
                      We’ll be in touch within 2 business days to schedule a short call. In the meantime, feel free to think about where your team spends the most repetitive time — that’s usually where we start.
                    </p>
                  </div>
                ) : (
                  <>
                    <h2 className="font-display text-4xl tracking-[-0.03em] text-white">Request Your Audit</h2>
                    <p className="mt-4 text-sm leading-6 text-[#8F8A83]">Tell us a little about your business. We’ll come prepared.</p>

                    <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5" aria-label="Free Automation Audit request form">
                      {[
                        ['name', 'Full Name', 'text'],
                        ['email', 'Work Email', 'email'],
                        ['company', 'Company Name', 'text'],
                      ].map(([field, label, type]) => (
                        <label key={field} className="block">
                          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-[#B0ABA3]">{label}</span>
                          <input
                            required
                            type={type}
                            value={form[field as keyof FormData]}
                            onChange={(event) => updateField(field as keyof FormData, event.target.value)}
                            className="form-input focus-amber"
                          />
                        </label>
                      ))}

                      <label className="block">
                        <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-[#B0ABA3]">Industry</span>
                        <div className="relative">
                          <select
                            required
                            value={form.industry}
                            onChange={(event) => updateField('industry', event.target.value)}
                            className="form-input appearance-none focus-amber"
                          >
                            <option value="">Select your industry</option>
                            {industries.map((industry) => (
                              <option key={industry}>{industry}</option>
                            ))}
                          </select>
                          <ChevronDown size={17} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#7E7972]" />
                        </div>
                      </label>

                      <label className="block">
                        <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-[#B0ABA3]">Team Size</span>
                        <div className="relative">
                          <select
                            required
                            value={form.teamSize}
                            onChange={(event) => updateField('teamSize', event.target.value)}
                            className="form-input appearance-none focus-amber"
                          >
                            <option value="">Select your team size</option>
                            {teamSizes.map((size) => (
                              <option key={size}>{size}</option>
                            ))}
                          </select>
                          <ChevronDown size={17} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#7E7972]" />
                        </div>
                      </label>

                      {error && (
                        <p role="alert" className="text-sm font-medium text-[#E49F85]">
                          {error}
                        </p>
                      )}

                      <button
                        type="submit"
                        className="button-glow mt-2 flex w-full items-center justify-center gap-3 rounded-full bg-[#D4A853] px-6 py-4 text-sm font-semibold text-[#17130c] focus-amber"
                      >
                        Submit Audit Request <ArrowRight size={17} />
                      </button>

                      <p className="text-center text-xs leading-5 text-[#736F68]">
                        We’ll follow up within 2 business days to schedule a short intro call. No sales deck. No pressure.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </Reveal>
          </div>
        </section>

        <IlluminatedDivider />

        {/* AFTER YOU SUBMIT */}
        <section className="relative bg-[#0C0C0B] px-6 py-28 lg:px-10 lg:py-36">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <SectionLabel>After You Submit</SectionLabel>
              <h2 className="font-display mb-14 text-4xl tracking-[-0.03em] text-white sm:text-5xl">
                The next steps are straightforward.
              </h2>
            </Reveal>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {nextSteps.map(([number, title, body]) => (
                <Reveal key={number}>
                  <div className="surface-card relative rounded-sm p-6 pt-7">
                    <span className="card-accent-line" />
                    <span className="text-xs font-semibold tracking-[0.2em] text-[#D4A853]">{number}</span>
                    <h3 className="font-display mt-6 text-xl text-white">{title}</h3>
                    <p className="mt-4 text-sm leading-6 text-[#8F8A83]">{body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <IlluminatedDivider />

        {/* FINAL CTA SECTION */}
        <section className="final-cta relative overflow-hidden bg-[#100F0E] px-6 py-28 text-center lg:px-10 lg:py-36">
          <div className="cta-lightpool" aria-hidden="true" />
          <div className="relative z-10 mx-auto max-w-2xl">
            <Reveal>
              <SectionLabel>Start with clarity</SectionLabel>
              <h2 className="font-display text-5xl tracking-[-0.04em] text-white sm:text-6xl">
                Ready to see where automation fits?
              </h2>
              <p className="mx-auto mt-6 max-w-lg text-base leading-7 text-[#A09C94]">
                The audit is free. The conversation is straightforward. The decision is always yours.
              </p>
              <button
                onClick={scrollToForm}
                className="button-glow group mt-9 inline-flex items-center gap-3 rounded-full bg-[#D4A853] px-7 py-4 text-sm font-semibold text-[#17130c] focus-amber"
              >
                Request a Free Automation Audit <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
              </button>
            </Reveal>
          </div>
        </section>
      </main>

      <IlluminatedDivider />

      {/* FOOTER */}
      <footer className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-8 text-xs text-[#706B64] sm:flex-row sm:items-center sm:justify-between lg:px-10">
        <a href="#top" className="font-display text-sm tracking-[0.18em] text-[#B8B3AB] focus-amber">
          AXIOM<span className="text-[#D4A853]">.</span>
        </a>
        <p>© 2025 Axiom Automation. All rights reserved.</p>
        <div className="flex gap-5">
          <a href="#" className="transition hover:text-[#D4A853] focus-amber">Privacy Policy</a>
          <a href="mailto:hello@axiomautomation.io" className="transition hover:text-[#D4A853] focus-amber">hello@axiomautomation.io</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
