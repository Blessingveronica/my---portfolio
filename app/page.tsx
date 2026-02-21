"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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
      <div className="h-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 transition-all duration-75" style={{ width: `${progress}%` }} />
    </div>
  );
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string; }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)", transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms` }}>
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
    <span>{displayed}<span className="animate-pulse text-fuchsia-400">|</span></span>
  );
}

function SkillBar({ name, level, color }: { name: string; level: number; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setAnimated(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between mb-1 text-sm font-medium text-gray-300">
        <span>{name}</span><span>{level}%</span>
      </div>
      <div className="h-2 rounded-full bg-white/10 overflow-hidden">
        <div className={`h-full rounded-full ${color} transition-all duration-1000 ease-out`} style={{ width: animated ? `${level}%` : "0%" }} />
      </div>
    </div>
  );
}

function FloatingBlobs() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-violet-700/20 blur-[120px] animate-blob" />
      <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-fuchsia-600/20 blur-[120px] animate-blob animation-delay-2000" />
      <div className="absolute -bottom-40 left-1/3 w-[400px] h-[400px] rounded-full bg-cyan-500/20 blur-[120px] animate-blob animation-delay-4000" />
    </div>
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

  const skills = [
    { name: "HTML & CSS", level: 90, color: "bg-gradient-to-r from-orange-400 to-pink-500" },
    { name: "JavaScript", level: 75, color: "bg-gradient-to-r from-yellow-400 to-orange-400" },
    { name: "React", level: 70, color: "bg-gradient-to-r from-cyan-400 to-blue-500" },
    { name: "Next.js", level: 65, color: "bg-gradient-to-r from-violet-500 to-fuchsia-500" },
    { name: "Tailwind CSS", level: 80, color: "bg-gradient-to-r from-teal-400 to-cyan-500" },
  ];

  const projects = [
    {
      title: "Personal Landing Page",
      desc: "A responsive single-page site built with HTML, CSS, and JavaScript.",
      tags: ["HTML", "CSS", "JavaScript"],
      gradient: "from-violet-500 to-fuchsia-500",
      demo: "#",
      github: "#",
    },
    {
      title: "Coming Soon",
      desc: "More exciting projects are on the way. Stay tuned!",
      tags: ["React", "Next.js"],
      gradient: "from-cyan-500 to-blue-500",
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
        ::-webkit-scrollbar-track { background: #0f0f1a; }
        ::-webkit-scrollbar-thumb { background: #7c3aed; border-radius: 3px; }
      `}</style>

      <div className="min-h-screen bg-[#0a0a14] text-white font-sans">
        <FloatingBlobs />
        <ScrollProgress />

        {/* NAV */}
        <nav className="fixed top-[3px] left-0 right-0 z-50 bg-[#0a0a14]/80 backdrop-blur-xl border-b border-white/5">
          <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="text-lg font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400 uppercase">BV</div>
            <div className="hidden md:flex gap-8 text-sm text-gray-400">
              {["about", "skills", "projects", "contact"].map((s) => (
                <a key={s} href={`#${s}`} className="hover:text-fuchsia-400 capitalize transition-colors duration-200">{s}</a>
              ))}
            </div>
            <button className="md:hidden text-gray-400 hover:text-white" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
          {menuOpen && (
            <div className="md:hidden bg-[#0f0f1e] border-t border-white/5 px-6 py-4 flex flex-col gap-4 text-gray-300">
              {["about", "skills", "projects", "contact"].map((s) => (
                <a key={s} href={`#${s}`} className="capitalize hover:text-fuchsia-400" onClick={() => setMenuOpen(false)}>{s}</a>
              ))}
            </div>
          )}
        </nav>

        {/* HERO */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 text-center relative">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "50px 50px" }} />
          <div className="relative w-36 h-36 md:w-44 md:h-44 mb-8 rounded-full overflow-hidden border-2 border-fuchsia-500/50 shadow-[0_0_60px_rgba(192,38,211,0.4)]" style={{ animation: "float 4s ease-in-out infinite" }}>
            <Image src="/blessingv.jpeg" alt="Blessing Veronica" fill className="object-cover" priority />
          </div>
          <div className="mb-4 text-xs uppercase tracking-[0.3em] text-fuchsia-400 font-medium">Front-End Developer · Lagos, Nigeria</div>
          <h1 className="text-5xl md:text-7xl font-black mb-4 leading-tight">
            <span className="text-white">Hi, I'm </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400">Blessing Veronica</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-10 h-8">
            <Typewriter texts={["Building beautiful UIs", "React & Next.js developer", "Turning ideas into reality", "Open to opportunities"]} />
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#projects" className="px-8 py-3 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold shadow-lg shadow-violet-500/30 hover:shadow-violet-500/60 hover:scale-105 transition-all duration-300">View Projects</a>
            <a href="mailto:scolasticaclaire@gmail.com" className="px-8 py-3 rounded-full border border-white/20 text-gray-300 font-semibold hover:bg-white/5 hover:border-fuchsia-500/50 hover:text-white hover:scale-105 transition-all duration-300">Get in Touch</a>
          </div>
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-600 text-xs">
            <span>scroll</span>
            <div className="w-[1px] h-8 bg-gradient-to-b from-gray-600 to-transparent animate-pulse" />
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-6">

          {/* ABOUT */}
          <section id="about" className="py-24">
            <FadeIn>
              <div className="text-center mb-12">
                <p className="text-xs uppercase tracking-[0.3em] text-fuchsia-400 mb-3">Get to know me</p>
                <h2 className="text-4xl md:text-5xl font-black text-white">About Me</h2>
              </div>
            </FadeIn>
            <FadeIn delay={150}>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10 backdrop-blur-sm hover:border-fuchsia-500/30 transition-colors duration-500">
                <p className="text-lg leading-relaxed text-gray-300 mb-6">I'm <span className="text-white font-semibold">Blessing Veronica</span>, a passionate front-end developer from Lagos, Nigeria. I started with HTML, CSS, and JavaScript, and fell in love with building beautiful, interactive websites.</p>
                <p className="text-lg leading-relaxed text-gray-300">I'm currently deepening my skills with <span className="text-fuchsia-400 font-medium">React</span>, <span className="text-cyan-400 font-medium">Next.js</span>, and <span className="text-violet-400 font-medium">Tailwind CSS</span>. My goal is to craft clean, fast, responsive, and memorable web experiences.</p>
              </div>
            </FadeIn>
          </section>

          {/* SKILLS */}
          <section id="skills" className="py-24">
            <FadeIn>
              <div className="text-center mb-12">
                <p className="text-xs uppercase tracking-[0.3em] text-fuchsia-400 mb-3">What I work with</p>
                <h2 className="text-4xl md:text-5xl font-black text-white">Skills</h2>
              </div>
            </FadeIn>
            <FadeIn delay={150}>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10 backdrop-blur-sm">
                {skills.map((skill) => (<SkillBar key={skill.name} {...skill} />))}
              </div>
            </FadeIn>
          </section>

          {/* PROJECTS */}
          <section id="projects" className="py-24">
            <FadeIn>
              <div className="text-center mb-12">
                <p className="text-xs uppercase tracking-[0.3em] text-fuchsia-400 mb-3">Things I've built</p>
                <h2 className="text-4xl md:text-5xl font-black text-white">Projects</h2>
              </div>
            </FadeIn>
            <div className="grid md:grid-cols-2 gap-6">
              {projects.map((p, i) => (
                <FadeIn key={p.title} delay={i * 150}>
                  <div className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-fuchsia-500/40 hover:-translate-y-2 transition-all duration-300 h-full">
                    <div className={`h-44 bg-gradient-to-br ${p.gradient} opacity-80 group-hover:opacity-100 transition-opacity duration-300 relative`}>
                      <div className="absolute inset-0 bg-black/20" />
                      <div className="absolute bottom-4 left-4 text-white/60 text-xs uppercase tracking-widest font-medium">Project</div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-white mb-2">{p.title}</h3>
                      <p className="text-gray-400 text-sm mb-4">{p.desc}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {p.tags.map((tag) => (<span key={tag} className="px-3 py-1 rounded-full bg-white/10 text-gray-300 text-xs font-medium">{tag}</span>))}
                      </div>
                      <div className="flex gap-4 text-sm">
                        <a href={p.demo} className="text-fuchsia-400 hover:text-fuchsia-300 transition-colors">Live Demo ↗</a>
                        <a href={p.github} className="text-gray-400 hover:text-white transition-colors">GitHub ↗</a>
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
                <p className="text-xs uppercase tracking-[0.3em] text-fuchsia-400 mb-3">Let's work together</p>
                <h2 className="text-4xl md:text-5xl font-black text-white">Get in Touch</h2>
              </div>
            </FadeIn>
            <FadeIn delay={150}>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10 backdrop-blur-sm max-w-lg mx-auto">
                <form onSubmit={handleSubmit} className="https://formspree.io/f/mzdajeqo">
                  <input type="text" placeholder="Your Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-fuchsia-500/50 transition-all duration-200" />
                  <input type="email" placeholder="Your Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-fuchsia-500/50 transition-all duration-200" />
                  <textarea placeholder="Your Message" rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-fuchsia-500/50 transition-all duration-200 resize-none" />
                  <button type="submit" disabled={status === "sending"} className="w-full py-3 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold hover:shadow-lg hover:shadow-violet-500/30 hover:scale-[1.02] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed">
                    {status === "sending" ? "Sending..." : status === "sent" ? "Message Sent! ✓" : "Send Message"}
                  </button>
                  {status === "error" && <p className="text-red-400 text-sm text-center">Something went wrong. Please try again!</p>}
                </form>
              </div>
            </FadeIn>
          </section>

        </div>

        {/* FOOTER */}
        <footer className="border-t border-white/5 py-8 text-center text-gray-500 text-sm">
          <p>Built with ❤️ by <span className="text-fuchsia-400">Blessing Veronica</span> · Next.js & Tailwind CSS</p>
        </footer>
      </div>
    </>
  );
}