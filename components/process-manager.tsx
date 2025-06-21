"use client"

const processes = [
  {
    name: "giraph_ai_platform.exe",
    cpu: 87,
    memory: 73,
    status: "DEPLOYED",
    impact: "Made data analysis accessible to everyone",
    description: `THE CHALLENGE:
Small businesses drowning in spreadsheets, spending hours trying 
to make sense of their data. They needed insights, not more confusion.

MY APPROACH:
Built a platform that speaks human, not just code. Upload your messy 
Excel file, and AI figures out what story your data wants to tell.

THE OUTCOME:
Turned 2-hour analysis sessions into 2-minute discoveries. 
Now business owners actually look forward to checking their metrics.`,
  },
  {
    name: "auction_scraper_system.exe",
    cpu: 82,
    memory: 65,
    status: "RUNNING",
    impact: "Processing 10,000+ listings daily",
    description: `Multi-threaded scraping system that monitors car auction sites 24/7.
Built with Python, handles rate limiting, proxy rotation, and data validation.`,
  },
  {
    name: "revautosale_backend.exe",
    cpu: 78,
    memory: 85,
    status: "PRODUCTION",
    impact: "Serving 100k+ vehicle records",
    description: `Django-powered API serving vehicle inventory data with sub-100ms response times.
Includes automated data cleaning and real-time sync capabilities.`,
  },
  {
    name: "aws_deployment_suite.exe",
    cpu: 68,
    memory: 55,
    status: "STABLE",
    impact: "Secure, scalable cloud solutions",
    description: `Docker-containerized applications deployed on AWS with CI/CD pipelines.
Auto-scaling, monitoring, and zero-downtime deployments.`,
  },
]

export default function ProcessManager() {
  const renderProgressBar = (percentage: number) => {
    return (
      <div className="flex items-center space-x-2">
        <div className="w-20 bg-gray-700 rounded-full h-2">
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
    <div className="text-[#E5E5E5] font-mono">
      <div className="mb-6">
        <h2 className="text-[#00FF41] text-lg font-semibold mb-2">PROCESS_MANAGER - Active Projects</h2>
        <p className="text-sm text-[#E5E5E5] opacity-80">Real systems, real impact, real problems solved</p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-12 gap-4 text-xs text-[#FF00F7] font-semibold border-b border-[#333] pb-2">
          <div className="col-span-4">PROCESS NAME</div>
          <div className="col-span-2">CPU</div>
          <div className="col-span-2">MEMORY</div>
          <div className="col-span-2">STATUS</div>
          <div className="col-span-2">IMPACT</div>
        </div>

        {processes.map((process, index) => (
          <div
            key={index}
            className="grid grid-cols-12 gap-4 items-center py-3 border-b border-[#333] border-opacity-30 hover:bg-[#1a1a1a] rounded px-2 transition-colors cursor-pointer group"
          >
            <div className="col-span-4 text-sm">{process.name}</div>
            <div className="col-span-2">{renderProgressBar(process.cpu)}</div>
            <div className="col-span-2">{renderProgressBar(process.memory)}</div>
            <div className="col-span-2">
              <span
                className={`px-2 py-1 rounded text-xs ${
                  process.status === "DEPLOYED"
                    ? "bg-green-900 text-green-300"
                    : process.status === "RUNNING"
                      ? "bg-blue-900 text-blue-300"
                      : process.status === "PRODUCTION"
                        ? "bg-purple-900 text-purple-300"
                        : "bg-gray-900 text-gray-300"
                }`}
              >
                {process.status}
              </span>
            </div>
            <div className="col-span-2 text-xs opacity-80">{process.impact}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-[#1a1a1a] rounded border border-[#333]">
        <h3 className="text-[#FF00F7] font-semibold mb-2">System Resources</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Total Projects Active:</span>
            <span className="text-[#00FF41]">{processes.length}</span>
          </div>
          <div className="flex justify-between">
            <span>Average Performance:</span>
            <span className="text-[#00FF41]">78.75%</span>
          </div>
          <div className="flex justify-between">
            <span>Success Rate:</span>
            <span className="text-[#00FF41]">100%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
