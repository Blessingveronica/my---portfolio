"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const CONTACT = {
  email: "scolasticaclaire@gmail.com",
  phone: "09036318306",
  whatsapp: "https://wa.me/2349036318306",
  linkedin: "https://www.linkedin.com/in/blessing-veronica",
};

const FEATURED_SKILLS = [
  {
    title: "AI Prompting",
    desc: "Crafting effective prompts for AI tools to boost productivity and creative output.",
    icon: "✦",
  },
  {
    title: "Project Management",
    desc: "Planning, coordinating, and delivering projects on time with clear communication.",
    icon: "◈",
  },
  {
    title: "Web Development",
    desc: "Building responsive, accessible, and performant websites with modern frameworks.",
    icon: "⟨/⟩",
  },
  {
    title: "SEO Optimization",
    desc: "Improving visibility through technical SEO, content structure, and performance.",
    icon: "◎",
  },
];

function ArrowRightIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  );
}

function DownloadIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  );
}

function SunIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}

function MoonIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  );
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      setProgress((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[100] bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-emerald-400 via-mint to-teal-300 transition-all duration-75"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function Typewriter({ texts }: { texts: string[] }) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = texts[index];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % texts.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, index, texts]);
  return (
    <span>
      {displayed}
      <span className="animate-pulse text-mint">|</span>
    </span>
  );
}

function SkillBar({ name, level, color }: { name: string; level: number; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between mb-1 text-sm font-medium text-[var(--muted)]">
        <span>{name}</span>
        <span>{level}%</span>
      </div>
      <div className="h-2 rounded-full bg-emerald-500/10 dark:bg-white/10 overflow-hidden">
        <div
          className={`h-full rounded-full ${color} transition-all duration-1000 ease-out`}
          style={{ width: animated ? `${level}%` : "0%" }}
        />
      </div>
    </div>
  );
}

function FloatingBlobs() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-emerald-400/15 dark:bg-emerald-600/20 blur-[120px] animate-blob" />
      <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-teal-400/15 dark:bg-teal-500/20 blur-[120px] animate-blob animation-delay-2000" />
      <div className="absolute -bottom-40 left-1/3 w-[400px] h-[400px] rounded-full bg-mint/20 blur-[120px] animate-blob animation-delay-4000" />
    </div>
  );
}

function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setDark(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="p-2 rounded-full border border-emerald-500/30 text-emerald-600 dark:text-mint hover:bg-emerald-500/10 transition-colors duration-200"
    >
      {dark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    const res = await fetch("https://formspree.io/f/mzdajeqo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      setStatus("sent");
      setFormData({ name: "", email: "", message: "" });
    } else {
      setStatus("error");
    }
  };

  const techSkills = [
    { name: "HTML & CSS", level: 90, color: "bg-gradient-to-r from-emerald-400 to-teal-400" },
    { name: "JavaScript", level: 75, color: "bg-gradient-to-r from-teal-400 to-emerald-500" },
    { name: "React", level: 70, color: "bg-gradient-to-r from-mint to-emerald-500" },
    { name: "Next.js", level: 65, color: "bg-gradient-to-r from-emerald-500 to-teal-500" },
    { name: "Tailwind CSS", level: 80, color: "bg-gradient-to-r from-teal-300 to-mint" },
  ];

  const projects = [
    {
      title: "GitHub Profile Finder",
      desc: "Search any GitHub user and explore their repositories, stats, and activity.",
      tags: ["Next.js", "React", "GitHub API", "Tailwind CSS"],
      image: "/github-finder-cover.png",
      gradient: "from-emerald-500 to-teal-500",
      demo: "https://github-finder-seven-silk.vercel.app/",
      github: "https://github.com/Blessingveronica/github-finder",
    },
    {
      title: "Personal Landing Page",
      desc: "A responsive single-page site built with HTML, CSS, and JavaScript.",
      tags: ["HTML", "CSS", "JavaScript"],
      gradient: "from-emerald-500 to-mint",
      demo: "#",
      github: "#",
    },
  ];

  return (
    <>
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(30px,-50px) scale(1.1); }
          66% { transform: translate(-20px,20px) scale(0.9); }
        }
        @keyframes float {
          0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)}
        }
        .animate-blob { animation: blob 10s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: var(--background); }
        ::-webkit-scrollbar-thumb { background: #34d399; border-radius: 3px; }
      `}</style>

      <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] font-sans transition-colors duration-300">
        <FloatingBlobs />
        <ScrollProgress />

        {/* NAV */}
        <nav
          className="fixed top-[3px] left-0 right-0 z-50 backdrop-blur-xl border-b border-[var(--card-border)]"
          style={{ background: "var(--nav-bg)" }}
        >
          <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center gap-4">
            <div className="text-lg font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-mint uppercase">
              BV
            </div>
            <div className="hidden md:flex gap-8 text-sm text-[var(--muted)]">
              {["about", "skills", "projects", "contact"].map((s) => (
                <a
                  key={s}
                  href={`#${s}`}
                  className="hover:text-emerald-500 dark:hover:text-mint capitalize transition-colors duration-200"
                >
                  {s}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <button
                type="button"
                className="md:hidden text-[var(--muted)] hover:text-[var(--foreground)]"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                {menuOpen ? "✕" : "☰"}
              </button>
            </div>
          </div>
          {menuOpen && (
            <div className="md:hidden border-t border-[var(--card-border)] px-6 py-4 flex flex-col gap-4 text-[var(--muted)]">
              {["about", "skills", "projects", "contact"].map((s) => (
                <a
                  key={s}
                  href={`#${s}`}
                  className="capitalize hover:text-emerald-500 dark:hover:text-mint"
                  onClick={() => setMenuOpen(false)}
                >
                  {s}
                </a>
              ))}
            </div>
          )}
        </nav>

        {/* HERO */}
        <section className="relative h-screen min-h-[600px] flex flex-col px-6 pt-20 text-center overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.04] dark:opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(currentColor 1px,transparent 1px),linear-gradient(90deg,currentColor 1px,transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />
          <div className="relative z-10 flex-1 flex flex-col items-center justify-center w-full max-w-3xl mx-auto">
            <div
              className="relative w-40 h-40 md:w-52 md:h-52 mb-6 rounded-full overflow-hidden border-2 border-emerald-400/60 dark:border-mint/50 shadow-[0_0_60px_var(--mint-glow)] bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-emerald-950/40 dark:to-teal-950/40 shrink-0"
              style={{ animation: "float 4s ease-in-out infinite" }}
            >
              <Image
                src="/blessingv.jpeg"
                alt="Blessing Veronica"
                fill
                className="object-contain object-center p-1"
                priority
              />
            </div>
            <div className="mb-3 text-xs uppercase tracking-[0.3em] text-emerald-600 dark:text-mint font-medium">
              Front-End Developer · Lagos, Nigeria
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-3 leading-tight">
              <span>Hi, I&apos;m </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-mint to-teal-400">
                Blessing Veronica
              </span>
            </h1>
            <p className="text-lg md:text-2xl text-[var(--muted)] mb-8 h-8">
              <Typewriter
                texts={[
                  "Building beautiful UIs",
                  "React & Next.js developer",
                  "AI prompting & SEO",
                  "Open to opportunities",
                ]}
              />
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-105 transition-all duration-300"
              >
                Hire Me
                <ArrowRightIcon />
              </a>
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full border border-emerald-500/40 text-emerald-700 dark:text-mint font-semibold hover:bg-emerald-500/10 hover:border-emerald-500/70 hover:scale-105 transition-all duration-300"
              >
                <DownloadIcon />
                Download Resume
              </a>
            </div>
          </div>
          <div className="relative z-10 pb-8 flex flex-col items-center gap-1 text-[var(--muted)] text-xs shrink-0">
            <span>scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-emerald-400/60 to-transparent animate-pulse" />
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-6">
          {/* ABOUT */}
          <section id="about" className="py-24">
            <FadeIn>
              <div className="text-center mb-12">
                <p className="text-xs uppercase tracking-[0.3em] text-emerald-600 dark:text-mint mb-3">
                  Get to know me
                </p>
                <h2 className="text-4xl md:text-5xl font-black">About Me</h2>
              </div>
            </FadeIn>
            <FadeIn delay={150}>
              <div className="rounded-2xl p-8 md:p-10 backdrop-blur-sm border border-[var(--card-border)] bg-[var(--card)] hover:border-emerald-400/40 transition-colors duration-500">
                <p className="text-lg leading-relaxed text-[var(--muted)] mb-6">
                  I&apos;m <span className="font-semibold text-[var(--foreground)]">Blessing Veronica</span>, a
                  front-end developer based in Lagos, Nigeria, focused on building clean, responsive, and
                  user-centered web applications.
                </p>
                <p className="text-lg leading-relaxed text-[var(--muted)] mb-6">
                  I work with modern web technologies including HTML, CSS, JavaScript,{" "}
                  <span className="text-emerald-600 dark:text-mint font-medium">React</span>,{" "}
                  <span className="text-teal-600 dark:text-teal-300 font-medium">Next.js</span>, and{" "}
                  <span className="text-emerald-500 font-medium">Tailwind CSS</span> to create fast, scalable,
                  and visually refined interfaces.
                </p>
                <p className="text-lg leading-relaxed text-[var(--muted)]">
                  I&apos;m passionate about turning ideas into functional digital products, with a strong focus on
                  usability, performance, and attention to detail. I&apos;m continuously improving my skills through
                  hands-on projects and real-world development experience.
                </p>
              </div>
            </FadeIn>
          </section>

          {/* SKILLS */}
          <section id="skills" className="py-24">
            <FadeIn>
              <div className="text-center mb-12">
                <p className="text-xs uppercase tracking-[0.3em] text-emerald-600 dark:text-mint mb-3">
                  What I work with
                </p>
                <h2 className="text-4xl md:text-5xl font-black">Skills</h2>
              </div>
            </FadeIn>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {FEATURED_SKILLS.map((skill, i) => (
                <FadeIn key={skill.title} delay={i * 80}>
                  <div className="h-full rounded-2xl p-6 border border-[var(--card-border)] bg-[var(--card)] hover:border-emerald-400/50 hover:-translate-y-1 transition-all duration-300">
                    <div className="text-2xl text-emerald-500 dark:text-mint mb-3">{skill.icon}</div>
                    <h3 className="text-lg font-bold mb-2">{skill.title}</h3>
                    <p className="text-sm text-[var(--muted)] leading-relaxed">{skill.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={150}>
              <div className="rounded-2xl p-8 md:p-10 backdrop-blur-sm border border-[var(--card-border)] bg-[var(--card)]">
                <p className="text-sm uppercase tracking-widest text-emerald-600 dark:text-mint mb-6 font-medium">
                  Technical proficiency
                </p>
                {techSkills.map((skill) => (
                  <SkillBar key={skill.name} {...skill} />
                ))}
              </div>
            </FadeIn>
          </section>

          {/* PROJECTS */}
          <section id="projects" className="py-24">
            <FadeIn>
              <div className="text-center mb-12">
                <p className="text-xs uppercase tracking-[0.3em] text-emerald-600 dark:text-mint mb-3">
                  Things I&apos;ve built
                </p>
                <h2 className="text-4xl md:text-5xl font-black">Projects</h2>
              </div>
            </FadeIn>
            <div className="grid md:grid-cols-2 gap-6">
              {projects.map((p, i) => (
                <FadeIn key={p.title} delay={i * 150}>
                  <div className="group rounded-2xl overflow-hidden border border-[var(--card-border)] bg-[var(--card)] hover:border-emerald-400/40 hover:-translate-y-2 transition-all duration-300 h-full">
                    <div className="h-44 relative overflow-hidden">
                      {"image" in p && p.image ? (
                        <Image
                          src={p.image}
                          alt={`${p.title} screenshot`}
                          fill
                          className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      ) : (
                        <div
                          className={`h-full bg-gradient-to-br ${p.gradient} opacity-80 group-hover:opacity-100 transition-opacity duration-300`}
                        />
                      )}
                      <div className="absolute inset-0 bg-black/20 pointer-events-none" />
                      <div className="absolute bottom-4 left-4 text-white/60 text-xs uppercase tracking-widest font-medium">
                        Project
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold mb-2">{p.title}</h3>
                      <p className="text-[var(--muted)] text-sm mb-4">{p.desc}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {p.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 rounded-full bg-emerald-500/10 text-[var(--muted)] text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-4 text-sm">
                        {p.demo !== "#" && (
                          <a
                            href={p.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-600 dark:text-mint hover:opacity-80 transition-colors"
                          >
                            Live Demo ↗
                          </a>
                        )}
                        {p.github !== "#" && (
                          <a
                            href={p.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                          >
                            GitHub ↗
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </section>

          {/* CONTACT */}
          <section id="contact" className="py-24">
            <FadeIn>
              <div className="text-center mb-12">
                <p className="text-xs uppercase tracking-[0.3em] text-emerald-600 dark:text-mint mb-3">
                  Let&apos;s work together
                </p>
                <h2 className="text-4xl md:text-5xl font-black">Get in Touch</h2>
              </div>
            </FadeIn>

            <FadeIn delay={100}>
              <div className="flex flex-wrap justify-center gap-4 mb-10">
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[var(--card-border)] bg-[var(--card)] text-sm hover:border-emerald-400/50 transition-colors"
                >
                  <span className="text-emerald-500">✉</span>
                  {CONTACT.email}
                </a>
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[var(--card-border)] bg-[var(--card)] text-sm hover:border-emerald-400/50 transition-colors"
                >
                  <span className="text-emerald-500">💬</span>
                  WhatsApp · {CONTACT.phone}
                </a>
                <a
                  href={CONTACT.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[var(--card-border)] bg-[var(--card)] text-sm hover:border-emerald-400/50 transition-colors"
                >
                  <span className="text-emerald-500">in</span>
                  LinkedIn
                </a>
              </div>
            </FadeIn>

            <FadeIn delay={150}>
              <div className="rounded-2xl p-8 md:p-10 backdrop-blur-sm border border-[var(--card-border)] bg-[var(--card)] max-w-lg mx-auto">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-emerald-500/5 dark:bg-white/5 border border-[var(--card-border)] placeholder-[var(--muted)] focus:outline-none focus:border-emerald-400/50 transition-all duration-200"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-emerald-500/5 dark:bg-white/5 border border-[var(--card-border)] placeholder-[var(--muted)] focus:outline-none focus:border-emerald-400/50 transition-all duration-200"
                  />
                  <textarea
                    placeholder="Your Message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-emerald-500/5 dark:bg-white/5 border border-[var(--card-border)] placeholder-[var(--muted)] focus:outline-none focus:border-emerald-400/50 transition-all duration-200 resize-none"
                  />
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full py-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold hover:shadow-lg hover:shadow-emerald-500/30 hover:scale-[1.02] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === "sending"
                      ? "Sending..."
                      : status === "sent"
                        ? "Message Sent! ✓"
                        : "Send Message"}
                  </button>
                  {status === "error" && (
                    <p className="text-red-500 text-sm text-center">
                      Something went wrong. Please try again!
                    </p>
                  )}
                </form>
              </div>
            </FadeIn>
          </section>
        </div>

        {/* FOOTER */}
        <footer className="border-t border-[var(--card-border)] py-8 text-center text-[var(--muted)] text-sm">
          <p>
            Built with ❤️ by{" "}
            <span className="text-emerald-600 dark:text-mint">Blessing Veronica</span> · Next.js & Tailwind CSS
          </p>
        </footer>
      </div>
    </>
  );
}
