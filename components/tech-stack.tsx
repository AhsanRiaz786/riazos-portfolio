"use client"

import { useState } from "react"

const techStack = {
  languages: [
    {
      name: "python.py",
      size: "2.3 MB (of experience)",
      modified: "Daily",
      description:
        "My swiss army knife for data wrangling and automation. From scraping auction sites to building AI integrations, Python helps me turn complex problems into elegant solutions.",
      commits: [
        "Built multi-threaded scraper handling 10k+ records/day",
        "Integrated Gemini AI for automated data insights",
        "Optimized database queries reducing load time by 60%",
      ],
      proficiency: 85,
    },
    {
      name: "javascript.js",
      size: "1.8 MB (of experience)",
      modified: "Daily",
      description:
        "The language of the web. From React frontends to Node.js backends, JavaScript powers the interactive experiences users love.",
      commits: [
        "Built responsive React applications with TypeScript",
        "Created RESTful APIs with Express.js",
        "Implemented real-time features with WebSockets",
      ],
      proficiency: 80,
    },
    {
      name: "typescript.ts",
      size: "1.5 MB (of experience)",
      modified: "Daily",
      description: "JavaScript with superpowers. Type safety that catches bugs before they reach production.",
      commits: [
        "Migrated legacy JavaScript codebases to TypeScript",
        "Built type-safe APIs with strict mode enabled",
        "Created reusable component libraries",
      ],
      proficiency: 75,
    },
  ],
  frontend: [
    {
      name: "react.jsx",
      size: "2.1 MB (of experience)",
      modified: "Daily",
      description: "The heart of modern web development. Building component-based UIs that scale.",
      proficiency: 85,
    },
    {
      name: "nextjs.js",
      size: "1.7 MB (of experience)",
      modified: "Weekly",
      description: "React framework for production. SSR, SSG, and everything in between.",
      proficiency: 80,
    },
    {
      name: "tailwind.css",
      size: "1.2 MB (of experience)",
      modified: "Daily",
      description: "Utility-first CSS framework. Rapid prototyping meets production-ready design.",
      proficiency: 90,
    },
  ],
  backend: [
    {
      name: "nodejs.js",
      size: "1.9 MB (of experience)",
      modified: "Daily",
      description: "JavaScript on the server. Building scalable APIs and microservices.",
      proficiency: 80,
    },
    {
      name: "django.py",
      size: "1.6 MB (of experience)",
      modified: "Weekly",
      description: "Python web framework for perfectionists. Rapid development with clean architecture.",
      proficiency: 75,
    },
    {
      name: "express.js",
      size: "1.4 MB (of experience)",
      modified: "Weekly",
      description: "Minimal Node.js framework. Fast, unopinionated, and flexible.",
      proficiency: 78,
    },
  ],
  automation: [
    {
      name: "scrapy.py",
      size: "2.0 MB (of experience)",
      modified: "Daily",
      description: "Industrial-strength web scraping. Handling complex sites with ease.",
      proficiency: 88,
    },
    {
      name: "selenium.py",
      size: "1.5 MB (of experience)",
      modified: "Weekly",
      description: "Browser automation for dynamic content. When static scraping isn't enough.",
      proficiency: 82,
    },
    {
      name: "pandas.py",
      size: "1.8 MB (of experience)",
      modified: "Daily",
      description: "Data manipulation and analysis. Turning raw data into insights.",
      proficiency: 85,
    },
  ],
  cloud: [
    {
      name: "aws.yaml",
      size: "1.3 MB (of experience)",
      modified: "Weekly",
      description: "Cloud infrastructure as code. EC2, S3, and serverless deployments.",
      proficiency: 70,
    },
    {
      name: "docker.dockerfile",
      size: "1.1 MB (of experience)",
      modified: "Weekly",
      description: "Containerization for consistent deployments across environments.",
      proficiency: 75,
    },
  ],
}

export default function TechStack() {
  const [selectedFolder, setSelectedFolder] = useState<string>("languages")
  const [selectedFile, setSelectedFile] = useState<any>(null)

  const renderProgressBar = (percentage: number) => {
    return (
      <div className="flex items-center space-x-2">
        <div className="w-32 bg-gray-700 rounded-full h-2">
          <div
            className="bg-[#00FF41] h-2 rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="text-xs text-[#E5E5E5] w-8">{percentage}%</span>
      </div>
    )
  }

  return (
    <div className="text-[#E5E5E5] font-mono h-full flex">
      {/* Sidebar */}
      <div className="w-1/3 border-r border-[#333] pr-4">
        <h2 className="text-[#00FF41] text-lg font-semibold mb-4">/tech_stack/</h2>
        <div className="space-y-2">
          {Object.keys(techStack).map((folder) => (
            <div
              key={folder}
              className={`cursor-pointer p-2 rounded transition-colors ${
                selectedFolder === folder ? "bg-[#00FF41] text-black" : "hover:bg-[#1a1a1a] text-[#E5E5E5]"
              }`}
              onClick={() => {
                setSelectedFolder(folder)
                setSelectedFile(null)
              }}
            >
              📁 /{folder}/
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 pl-4">
        {!selectedFile ? (
          <div>
            <h3 className="text-[#FF00F7] text-lg font-semibold mb-4">/{selectedFolder}/</h3>
            <div className="space-y-2">
              {techStack[selectedFolder as keyof typeof techStack]?.map((file: any, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 hover:bg-[#1a1a1a] rounded cursor-pointer transition-colors"
                  onClick={() => setSelectedFile(file)}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-[#00FF41]">📄</span>
                    <span>{file.name}</span>
                  </div>
                  <div className="text-xs text-gray-400">{file.size}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#FF00F7] text-lg font-semibold">FILE: {selectedFile.name}</h3>
              <button
                onClick={() => setSelectedFile(null)}
                className="text-[#00FF41] hover:text-[#FF00F7] transition-colors"
              >
                ← Back
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-[#FF00F7]">SIZE:</span> {selectedFile.size}
                </div>
                <div>
                  <span className="text-[#FF00F7]">MODIFIED:</span> {selectedFile.modified}
                </div>
              </div>

              <div>
                <div className="text-[#FF00F7] font-semibold mb-2">DESCRIPTION:</div>
                <p className="text-[#E5E5E5] leading-relaxed">{selectedFile.description}</p>
              </div>

              {selectedFile.commits && (
                <div>
                  <div className="text-[#FF00F7] font-semibold mb-2">RECENT COMMITS:</div>
                  <ul className="space-y-1">
                    {selectedFile.commits.map((commit: string, index: number) => (
                      <li key={index} className="text-[#E5E5E5] text-sm">
                        - {commit}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <div className="text-[#FF00F7] font-semibold mb-2">PROFICIENCY:</div>
                {renderProgressBar(selectedFile.proficiency)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
