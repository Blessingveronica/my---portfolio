import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-purple-950 dark:to-pink-950 font-sans pt-24">
      <nav className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md z-50 border-b border-purple-200 dark:border-purple-800">
  <div className="max-w-4xl mx-auto px-8 py-4 flex justify-between items-center">
    <div className="text-xl font-bold text-purple-600">
      Blessing Veronica
    </div>
    <div className="flex gap-8">
      <Link href="#about" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 transition">About</Link>
      <Link href="#projects" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 transition">Projects</Link>
      <Link href="#contact" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 transition">Contact</Link>
    </div>
  </div>
</nav>
      <main className="w-full max-w-3xl flex flex-col items-center justify-center py-20 px-8 text-center">
        {/* Hero section – no image, clean as before */}
                {/* Round profile photo */}
        <div className="relative w-48 h-48 md:w-64 md:h-64 mb-10 rounded-full overflow-hidden border-4 border-white/50 shadow-2xl shadow-purple-500/40">
          <Image
            src="/blessingv.jpeg"           // ← Change this to your actual file name (e.g. /profile.png)
            alt="Blessing Veronica"
            fill
            className="object-cover"
            priority
          />
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 bg-clip-text text-transparent tracking-tight">
          Hi, I'm Blessing Veronica
          
        </h1>

        <p className="text-xl md:text-2xl mb-6 text-gray-700 dark:text-gray-300 max-w-2xl">
          A Front-End Developer from Lagos Nigeria • Creating beautiful, fast websites with React, Next.js & Tailwind CSS
        </p>

        <div className="h-1 w-32 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-full mb-10"></div>

        <div className="flex flex-col sm:flex-row gap-6">
          <a
            href="#projects"
            className="flex h-12 items-center justify-center px-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:from-purple-700 hover:to-pink-700 hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/40"
          >
            View My Projects
          </a>

          <a
            href="mailto:your-real-email@gmail.com" // ← change this to your real email
            className="flex h-12 items-center justify-center px-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium hover:from-cyan-600 hover:to-blue-700 hover:scale-105 transition-all duration-300 shadow-lg shadow-cyan-500/40"
          >
            Get in Touch
          </a>
        </div>

        <p className="mt-16 text-sm text-gray-500 dark:text-gray-400">
          • Built with ❤️ and Next.js & Tailwind
        </p>

        {/* About section */}
        <section id="about" className="py-20 px-8 max-w-3xl mx-auto w-full mt-16">
          <h2 className="text-4xl font-bold mb-8 text-center text-purple-700 dark:text-purple-400">
            About Me
          </h2>

          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6">
            I'm Blessing Veronica, a passionate front-end developer from Lagos, Nigeria.
            I started learning HTML, CSS, JavaScript and now React because I love creating beautiful and interactive websites.
          </p>

          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            Right now I'm using this portfolio to deepen my skills in Tailwind CSS and Next.js.
            My goal is to build clean, fast, responsive, and user-friendly web experiences.
          </p>
        </section>
        {/* Projects Section */}
<section id="projects" className="py-20 px-8 max-w-3xl mx-auto w-full">
  <h2 className="text-4xl font-bold mb-12 text-center text-purple-700 dark:text-purple-400">
    My Projects
  </h2>

  <div className="grid md:grid-cols-2 gap-8">
    {/* Project Card Example 1 */}
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
      <div className="h-48 bg-gradient-to-r from-purple-400 to-pink-400"></div> {/* Placeholder – replace with real image later */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
          Project 1 – Personal Landing Page
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          A responsive single-page site built with HTML, CSS, and JavaScript.
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-sm">
            HTML
          </span>
          <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-sm">
            CSS
          </span>
          <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-sm">
            JavaScript
          </span>
        </div>
        <div className="mt-4 flex gap-4">
          <a href="#" className="text-purple-600 dark:text-purple-400 hover:underline">Live Demo</a>
          <a href="#" className="text-purple-600 dark:text-purple-400 hover:underline">GitHub</a>
        </div>
      </div>
    </div>

    {/* Add 1-2 more cards like the above */}
  </div>
</section>
{/* Contact Section */}
<section id="contact" className="py-20 px-8 max-w-3xl mx-auto w-full">
  <h2 className="text-4xl font-bold mb-12 text-center text-purple-700 dark:text-purple-400">
    Get in Touch
  </h2>

  <form className="space-y-6 max-w-md mx-auto">
    <input type="text" placeholder="Your Name" className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800" />
    <input type="email" placeholder="Your Email" className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800" />
    <textarea placeholder="Your Message" rows={5} className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800" />
    <button type="submit" className="w-full py-4 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition">
      Send Message
    </button>
  </form>
</section>
      </main>
    </div>
  );
}