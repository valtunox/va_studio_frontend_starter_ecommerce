function App() {
  const projects = [
    { title: "E-Commerce Platform", desc: "Full-stack shopping experience with React & Node.js", tags: ["React", "Node.js", "MongoDB"] },
    { title: "Task Management App", desc: "Collaborative project management tool", tags: ["React", "Firebase", "Tailwind"] },
    { title: "Weather Dashboard", desc: "Real-time weather data visualization", tags: ["React", "API", "Charts"] },
  ]

  const skills = ["JavaScript", "React", "TypeScript", "Node.js", "Python", "Tailwind CSS", "Git", "AWS"]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-slate-900/80 backdrop-blur-md z-50 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Portfolio</span>
          <div className="flex gap-8">
            {["About", "Skills", "Projects", "Contact"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-gray-300 hover:text-white transition-colors">{item}</a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-5xl font-bold">JD</div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            Hi, I'm <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">John Doe</span>
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">Full-Stack Developer passionate about creating beautiful, functional web experiences</p>
          <div className="flex gap-4 justify-center">
            <a href="#projects" className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full font-semibold hover:opacity-90 transition-opacity">View Work</a>
            <a href="#contact" className="px-8 py-3 border border-white/30 rounded-full font-semibold hover:bg-white/10 transition-colors">Contact Me</a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center">About Me</h2>
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <p className="text-gray-300 text-lg leading-relaxed">
              I'm a passionate developer with 5+ years of experience building web applications.
              I love turning complex problems into simple, beautiful solutions. When I'm not coding,
              you'll find me exploring new technologies, contributing to open source, or enjoying a good cup of coffee.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 bg-black/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Skills</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {skills.map((skill) => (
              <span key={skill} className="px-6 py-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full text-purple-300 hover:border-purple-400 transition-colors">{skill}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Projects</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project.title} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transition-all hover:-translate-y-2">
                <div className="h-40 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-xl mb-4"></div>
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4">{project.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs px-3 py-1 bg-purple-500/20 rounded-full text-purple-300">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-black/20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Get In Touch</h2>
          <p className="text-gray-400 mb-8">I'm currently open to new opportunities. Whether you have a question or just want to say hi, feel free to reach out!</p>
          <a href="mailto:hello@example.com" className="inline-block px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full font-semibold text-lg hover:opacity-90 transition-opacity">Say Hello</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <span className="text-gray-400">&copy; 2024 John Doe</span>
          <div className="flex gap-6">
            {["GitHub", "LinkedIn", "Twitter"].map((social) => (
              <a key={social} href="#" className="text-gray-400 hover:text-white transition-colors">{social}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
