"use client"

export default function ReadMe() {
  return (
    <div className="text-[#E5E5E5] font-roboto-mono h-full overflow-auto">
      <div className="max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#00FF41] mb-2">Ahsan Riaz</h1>
          <p className="text-lg text-[#FF00F7] font-semibold mb-4">
            **Full-Stack Developer & Data Automation Specialist**
          </p>
          <p className="text-sm text-[#E5E5E5] opacity-80">
            Currently studying Computer Science at NUST | Top Rated on Upwork | Building systems that make complex
            things simple
          </p>
        </div>

        {/* About Section */}
        <div className="mb-8">
          <h2 className="text-xl text-[#FF00F7] font-semibold mb-4">## About</h2>
          <div className="space-y-4 text-sm leading-relaxed">
            <p>
              Hey there! I'm Ahsan, a CS student who believes technology should solve real problems, not create new
              ones.
            </p>
            <p>
              I spend my days building full-stack applications and data automation systems. When businesses are drowning
              in data or struggling with manual processes, I create solutions that just work.
            </p>
            <p>
              What drives me? That moment when a client says "This changed everything." Whether it's a small business
              owner finally understanding their metrics or a car dealer automating their inventory research, I love
              building tools that give people their time back.
            </p>
            <p>
              Currently maintaining a 3.26 CGPA at NUST while running a successful freelance practice. Turns out you can
              balance textbooks and real-world projects – it just takes really good time management and lots of coffee.
            </p>
          </div>
        </div>

        {/* Current Status */}
        <div className="mb-8">
          <h2 className="text-xl text-[#FF00F7] font-semibold mb-4">## Current Status</h2>
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <span>🎓</span>
              <span>BSCS Student at NUST (Expected 2027)</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>💻</span>
              <span>Top Rated Freelancer on Upwork (100% Success Rate)</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>🌟</span>
              <span>15+ Projects Delivered ($4,000+ Revenue)</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>📍</span>
              <span>Based in Islamabad, Pakistan</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>☕</span>
              <span>Coffee Consumption: Concerning levels</span>
            </div>
          </div>
        </div>

        {/* Skills Overview */}
        <div className="mb-8">
          <h2 className="text-xl text-[#FF00F7] font-semibold mb-4">## Core Competencies</h2>
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div>
              <h3 className="text-[#00FF41] font-semibold mb-2">Frontend Development</h3>
              <ul className="space-y-1 text-xs">
                <li>• React.js & Next.js Applications</li>
                <li>• TypeScript for Type Safety</li>
                <li>• Responsive Design with Tailwind CSS</li>
                <li>• Component Libraries & Design Systems</li>
              </ul>
            </div>
            <div>
              <h3 className="text-[#00FF41] font-semibold mb-2">Backend Development</h3>
              <ul className="space-y-1 text-xs">
                <li>• Node.js & Express.js APIs</li>
                <li>• Django & Flask Applications</li>
                <li>• Database Design & Optimization</li>
                <li>• RESTful API Architecture</li>
              </ul>
            </div>
            <div>
              <h3 className="text-[#00FF41] font-semibold mb-2">Data Automation</h3>
              <ul className="space-y-1 text-xs">
                <li>• Web Scraping with Scrapy & Selenium</li>
                <li>• Data Processing with Pandas</li>
                <li>• Multi-threaded Processing</li>
                <li>• ETL Pipeline Development</li>
              </ul>
            </div>
            <div>
              <h3 className="text-[#00FF41] font-semibold mb-2">Cloud & DevOps</h3>
              <ul className="space-y-1 text-xs">
                <li>• AWS Deployment (EC2, S3, App Runner)</li>
                <li>• Docker Containerization</li>
                <li>• CI/CD Pipeline Setup</li>
                <li>• Database Management</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Fun Facts */}
        <div className="mb-8">
          <h2 className="text-xl text-[#FF00F7] font-semibold mb-4">## Random Facts</h2>
          <ul className="space-y-2 text-sm">
            <li>- Debug by explaining the problem to my rubber duck (yes, really)</li>
            <li>- Believe the best code is code you don't have to write</li>
            <li>- Can explain complex APIs using food analogies</li>
            <li>- Still get excited when console.log shows the expected output</li>
            <li>- Think dark mode is a human right, not a preference</li>
          </ul>
        </div>

        {/* Contact CTA */}
        <div className="p-4 bg-[#1a1a1a] rounded border border-[#333]">
          <h3 className="text-[#00FF41] font-semibold mb-2">Ready to Build Something Amazing?</h3>
          <p className="text-sm mb-3">
            I'm always interested in challenging projects that solve real problems. Whether you need a full-stack
            application, data automation system, or just want to discuss an idea, let's connect!
          </p>
          <div className="text-xs text-[#FF00F7]">→ Open the SECURE_CONNECTION app to get in touch</div>
        </div>
      </div>
    </div>
  )
}
