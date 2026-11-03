import { FormEvent, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
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
  return <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-[#D4A853]">{children}</p>;
}

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }}>
      {children}
    </motion.div>
  );
}

function App() {
  const [navSolid, setNavSolid] = useState(false);
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

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
      <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${navSolid ? 'border-b border-[#2A2A2A]/80 bg-[#0A0A0A]/85 backdrop-blur-xl' : 'bg-transparent'}`}>
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-6 lg:px-10">
          <a href="#top" className="font-display text-xl font-semibold tracking-[0.18em] text-white">AXIOM<span className="text-[#D4A853]">.</span></a>
          <button onClick={scrollToForm} className="group flex items-center gap-2 rounded-full border border-[#55504a] px-4 py-2 text-sm text-[#D8D5D0] transition hover:border-[#D4A853] hover:text-white">
            Request an Audit <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </nav>

      <main id="top">
        <section className="hero-grid relative flex min-h-screen items-center justify-center px-6 pb-20 pt-32 text-center lg:px-10">
          <div className="hero-orb absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full" />
          <motion.div className="relative z-10 mx-auto max-w-5xl" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.12 } } }}>
            <motion.p variants={reveal} className="mb-7 text-xs font-semibold uppercase tracking-[0.28em] text-[#D4A853]">AI Automation for Operational Teams</motion.p>
            <motion.h1 variants={reveal} className="font-display mx-auto max-w-5xl text-5xl font-medium leading-[1.04] tracking-[-0.045em] text-[#F0F0F0] sm:text-6xl lg:text-[5.2rem]">
              Your team is capable of more. <em className="text-[#D4A853]">Manual work</em> and disconnected tools are getting in the way.
            </motion.h1>
            <motion.p variants={reveal} className="mx-auto mt-8 max-w-2xl text-base leading-8 text-[#9D9A95] sm:text-lg">
              We help businesses replace repetitive processes with reliable systems — not with hype, but with practical automation built around how you actually operate.
            </motion.p>
            <motion.div variants={reveal} className="mt-10 flex flex-col items-center gap-4">
              <button onClick={scrollToForm} className="button-glow group inline-flex items-center gap-3 rounded-full bg-[#D4A853] px-7 py-4 text-sm font-semibold text-[#17130c] transition hover:scale-[1.02] hover:bg-[#e2bb70]">
                Request a Free Automation Audit <CircleArrowOutUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              <span className="text-xs text-[#77736d]">No commitment. No sales pitch. Just a clear look at where automation makes sense for your business.</span>
            </motion.div>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="absolute bottom-9 left-1/2 -translate-x-1/2 text-[#55514b]">
            <ArrowDown size={18} />
          </motion.div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-36">
          <Reveal><SectionLabel>Is This a Fit?</SectionLabel></Reveal>
          <Reveal className="mb-12 max-w-2xl"><h2 className="font-display text-4xl leading-tight tracking-[-0.03em] text-white sm:text-5xl">Good automation starts with an honest read of the situation.</h2></Reveal>
          <div className="grid gap-5 md:grid-cols-2">
            <Reveal className="h-full"><div className="fit-card h-full border-l-2 border-l-[#D4A853] bg-[#141311] p-7 sm:p-9"><h3 className="font-display mb-7 text-2xl text-white">This is for you if<span className="text-[#D4A853]">...</span></h3><ul className="space-y-5">{fitFor.map((item) => <li key={item} className="flex gap-4 text-sm leading-6 text-[#AAA59D]"><span className="text-[#D4A853]">→</span>{item}</li>)}</ul></div></Reveal>
            <Reveal className="h-full"><div className="fit-card h-full bg-[#111111] p-7 opacity-90 sm:p-9"><h3 className="font-display mb-7 text-2xl text-[#D0CDC8]">This probably isn’t a fit if<span className="text-[#77736d]">...</span></h3><ul className="space-y-5">{notFitFor.map((item) => <li key={item} className="flex gap-4 text-sm leading-6 text-[#85817b]"><span className="text-[#595650]">—</span>{item}</li>)}</ul></div></Reveal>
          </div>
        </section>

        <section className="border-y border-[#202020] bg-[#0d0d0d] px-6 py-28 lg:px-10 lg:py-36">
          <div className="mx-auto max-w-7xl"><Reveal><SectionLabel>The Process</SectionLabel><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><h2 className="font-display text-4xl tracking-[-0.03em] text-white sm:text-5xl">Four steps. No jargon.<br />No surprises.</h2><p className="max-w-xs text-sm leading-6 text-[#85817b]">A measured approach to finding the places where better systems can give your team room to do better work.</p></div></Reveal>
            <div className="relative mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">{processSteps.map(([number, title, body], index) => <Reveal key={number} className="relative h-full"><div className="process-card relative h-full overflow-hidden border border-[#292929] bg-[#111111] p-6"><span className="absolute -right-2 -top-7 font-display text-8xl font-semibold text-[#191919]">{number}</span><div className="relative"><span className="mb-10 block text-xs font-semibold tracking-[0.2em] text-[#D4A853]">{number}</span><h3 className="font-display mb-4 text-xl leading-tight text-white">{title}</h3><p className="text-sm leading-6 text-[#89857f]">{body}</p></div></div>{index < processSteps.length - 1 && <div className="absolute -right-5 top-1/2 z-10 hidden w-5 border-t border-[#403d38] lg:block" />}</Reveal>)}</div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-36"><Reveal><SectionLabel>Built on Real Systems Experience</SectionLabel></Reveal><div className="grid gap-10 sm:grid-cols-3">{[['8+', 'Years', 'Working with operational systems and business data'], ['40+', 'Automations', 'Running in production across client businesses'], ['12', 'Industries', 'From logistics and finance to healthcare and e-commerce']].map(([number, title, body]) => <Reveal key={title}><div><div className="font-display text-5xl text-[#D4A853]">{number}</div><div className="mt-2 text-sm font-semibold uppercase tracking-[0.15em] text-[#D3CEC6]">{title}</div><p className="mt-3 max-w-[220px] text-sm leading-6 text-[#77736d]">{body}</p></div></Reveal>)}</div><Reveal className="mt-24"><p className="mb-7 text-xs font-semibold uppercase tracking-[0.22em] text-[#66625c]">Trusted by operators across industries</p><div className="grid grid-cols-3 gap-3 sm:grid-cols-6">{Array.from({ length: 6 }).map((_, index) => <div key={index} className="industry-mark flex h-16 items-center justify-center border border-[#252525] bg-[#111111] text-[10px] uppercase tracking-[0.13em] text-[#56534e]"><span className={`shape-${index + 1}`} /></div>)}</div></Reveal></section>

        <section className="border-y border-[#202020] bg-[#0d0d0d] px-6 py-28 lg:px-10 lg:py-36"><div className="mx-auto max-w-7xl"><Reveal><SectionLabel>What Clients Say</SectionLabel><h2 className="font-display mb-12 max-w-xl text-4xl tracking-[-0.03em] text-white sm:text-5xl">Clarity is often the most valuable first outcome.</h2></Reveal><div className="grid gap-5 lg:grid-cols-3">{testimonials.map(([quote, attribution]) => <Reveal key={attribution} className="h-full"><figure className="testimonial-card flex h-full flex-col justify-between bg-[#141414] p-7 sm:p-9"><blockquote className="font-display text-xl italic leading-8 text-[#D8D4CD]">{quote}</blockquote><figcaption className="mt-10 text-xs font-semibold uppercase leading-5 tracking-[0.16em] text-[#77736d]">— {attribution}</figcaption></figure></Reveal>)}</div></div></section>

        <section className="mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-36"><div className="mx-auto max-w-3xl"><Reveal><SectionLabel>Free Automation Audit</SectionLabel><h2 className="font-display text-4xl leading-tight tracking-[-0.03em] text-white sm:text-5xl">A clear picture of where automation fits in your business.</h2><p className="mt-7 text-base leading-8 text-[#96918a]">The audit is a structured review of your current workflows — how work moves through your team, where time is lost, and where automation could create real leverage. You’ll walk away with specific opportunities identified, prioritized by impact and effort. There’s no obligation to work with us after. The audit is useful on its own.</p></Reveal><Reveal className="mt-10"><div className="grid gap-4 border-t border-[#2A2A2A] pt-7 sm:grid-cols-2">{['Workflow mapping session (60–90 min)', 'Bottleneck and inefficiency analysis', 'Prioritized automation opportunity report', 'Plain-language recommendations with no vendor bias'].map((item) => <div key={item} className="flex gap-3 text-sm text-[#B4AFA7]"><Check size={17} className="mt-0.5 shrink-0 text-[#D4A853]" />{item}</div>)}</div></Reveal></div></section>

        <section id="audit-form" className="scroll-mt-20 border-y border-[#202020] bg-[#0d0d0d] px-6 py-28 lg:px-10 lg:py-36"><Reveal className="mx-auto max-w-xl"><div className="form-card p-7 sm:p-10"><SectionLabel>Start a Conversation</SectionLabel>{submitted ? <div className="py-10"><div className="mb-7 flex h-12 w-12 items-center justify-center rounded-full border border-[#D4A853]/50 text-[#D4A853]"><Check size={22} /></div><h2 className="font-display text-4xl tracking-[-0.03em] text-white">Your request has been received.</h2><p className="mt-5 text-sm leading-7 text-[#96918a]">We’ll be in touch within 2 business days to schedule a short call. In the meantime, feel free to think about where your team spends the most repetitive time — that’s usually where we start.</p></div> : <><h2 className="font-display text-4xl tracking-[-0.03em] text-white">Request Your Audit</h2><p className="mt-4 text-sm leading-6 text-[#85817b]">Tell us a little about your business. We’ll come prepared.</p><form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5" aria-label="Free Automation Audit request form">{[['name', 'Full Name', 'text'], ['email', 'Work Email', 'email'], ['company', 'Company Name', 'text']].map(([field, label, type]) => <label key={field} className="block"><span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-[#AAA59D]">{label}</span><input required type={type} value={form[field as keyof FormData]} onChange={(event) => updateField(field as keyof FormData, event.target.value)} className="form-input" /></label>)}<label className="block"><span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-[#AAA59D]">Industry</span><div className="relative"><select required value={form.industry} onChange={(event) => updateField('industry', event.target.value)} className="form-input appearance-none"><option value="">Select your industry</option>{industries.map((industry) => <option key={industry}>{industry}</option>)}</select><ChevronDown size={17} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#77736d]" /></div></label><label className="block"><span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-[#AAA59D]">Team Size</span><div className="relative"><select required value={form.teamSize} onChange={(event) => updateField('teamSize', event.target.value)} className="form-input appearance-none"><option value="">Select your team size</option>{teamSizes.map((size) => <option key={size}>{size}</option>)}</select><ChevronDown size={17} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#77736d]" /></div></label>{error && <p role="alert" className="text-sm text-[#df9e83]">{error}</p>}<button type="submit" className="button-glow mt-2 flex w-full items-center justify-center gap-3 rounded-full bg-[#D4A853] px-6 py-4 text-sm font-semibold text-[#17130c] transition hover:bg-[#e2bb70]">Submit Audit Request <ArrowRight size={17} /></button><p className="text-center text-xs leading-5 text-[#66625c]">We’ll follow up within 2 business days to schedule a short intro call. No sales deck. No pressure.</p></form></>}</div></Reveal></section>

        <section className="mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-36"><Reveal><SectionLabel>After You Submit</SectionLabel><h2 className="font-display mb-14 text-4xl tracking-[-0.03em] text-white sm:text-5xl">The next steps are straightforward.</h2></Reveal><div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">{nextSteps.map(([number, title, body]) => <Reveal key={number}><div className="relative border-t border-[#3A3833] pt-6"><span className="text-xs font-semibold tracking-[0.2em] text-[#D4A853]">{number}</span><h3 className="font-display mt-7 text-xl text-white">{title}</h3><p className="mt-4 text-sm leading-6 text-[#85817b]">{body}</p></div></Reveal>)}</div></section>

        <section className="final-cta relative overflow-hidden border-t border-[#2A2A2A] px-6 py-28 text-center lg:px-10 lg:py-36"><div className="relative z-10 mx-auto max-w-2xl"><Reveal><SectionLabel>Start with clarity</SectionLabel><h2 className="font-display text-5xl tracking-[-0.04em] text-white sm:text-6xl">Ready to see where automation fits?</h2><p className="mx-auto mt-6 max-w-lg text-base leading-7 text-[#99948b]">The audit is free. The conversation is straightforward. The decision is always yours.</p><button onClick={scrollToForm} className="button-glow group mt-9 inline-flex items-center gap-3 rounded-full bg-[#D4A853] px-7 py-4 text-sm font-semibold text-[#17130c] transition hover:scale-[1.02] hover:bg-[#e2bb70]">Request a Free Automation Audit <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" /></button></Reveal></div></section>
      </main>

      <footer className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-8 text-xs text-[#66625c] sm:flex-row sm:items-center sm:justify-between lg:px-10"><a href="#top" className="font-display text-sm tracking-[0.18em] text-[#B8B3AB]">AXIOM<span className="text-[#D4A853]">.</span></a><p>© 2025 Axiom Automation. All rights reserved.</p><div className="flex gap-5"><a href="#" className="transition hover:text-[#D4A853]">Privacy Policy</a><a href="mailto:hello@axiomautomation.io" className="transition hover:text-[#D4A853]">hello@axiomautomation.io</a></div></footer>
    </div>
  );
}

export default App;
