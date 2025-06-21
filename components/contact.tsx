"use client"

import { useState } from "react"

export default function Contact() {
  const [connectionStatus, setConnectionStatus] = useState<"connecting" | "connected" | "idle">("idle")
  const [selectedProtocol, setSelectedProtocol] = useState<string | null>(null)

  const initiateConnection = () => {
    setConnectionStatus("connecting")
    setTimeout(() => {
      setConnectionStatus("connected")
    }, 2000)
  }

  const contactMethods = [
    {
      id: "email",
      name: "EMAIL_DIRECT",
      address: "ahsanriaz8000@gmail.com",
      protocol: "SMTP (Secure)",
      responseTime: "< 24 hours",
      icon: "📧",
      action: () => window.open("mailto:ahsanriaz8000@gmail.com?subject=Project Inquiry from RiazOS"),
    },
    {
      id: "linkedin",
      name: "LINKEDIN_NETWORK",
      address: "/in/ahsan-riaz-dev",
      protocol: "Professional Network",
      responseTime: "Always Open",
      icon: "💼",
      action: () => window.open("https://linkedin.com/in/ahsan-riaz-dev", "_blank"),
    },
    {
      id: "github",
      name: "GITHUB_REPOSITORY",
      address: "@ahsanriaz8000",
      protocol: "Git/HTTPS",
      responseTime: "Daily",
      icon: "🐙",
      action: () => window.open("https://github.com/ahsanriaz8000", "_blank"),
    },
    {
      id: "upwork",
      name: "UPWORK_PLATFORM",
      address: "Top Rated Freelancer",
      protocol: "100% Success Rate",
      responseTime: "Open for Projects",
      icon: "💚",
      action: () => window.open("https://upwork.com", "_blank"),
    },
    {
      id: "phone",
      name: "EMERGENCY_HOTLINE",
      address: "+92 304 094 9380",
      protocol: "Voice/SMS",
      responseTime: "Urgent Projects Only",
      icon: "📱",
      action: () => window.open("tel:+923040949380"),
    },
  ]

  return (
    <div className="text-[#E5E5E5] font-mono h-full">
      {connectionStatus === "idle" && (
        <div className="text-center py-8">
          <h2 className="text-[#00FF41] text-xl font-semibold mb-4">SECURE_CONNECTION</h2>
          <p className="text-sm mb-6 opacity-80">Establish encrypted communication channel</p>
          <button
            onClick={initiateConnection}
            className="px-6 py-3 bg-[#00FF41] text-black font-semibold rounded hover:bg-[#FF00F7] hover:text-white transition-colors"
          >
            INITIALIZE CONNECTION
          </button>
        </div>
      )}

      {connectionStatus === "connecting" && (
        <div className="text-center py-8">
          <div className="space-y-2 text-sm">
            <div className="animate-pulse">INITIALIZING SECURE CONNECTION...</div>
            <div className="animate-pulse" style={{ animationDelay: "0.5s" }}>
              ESTABLISHING ENCRYPTED CHANNEL...
            </div>
            <div className="animate-pulse" style={{ animationDelay: "1s" }}>
              VERIFYING IDENTITY...
            </div>
            <div className="animate-pulse text-[#00FF41]" style={{ animationDelay: "1.5s" }}>
              CONNECTION SECURED.
            </div>
          </div>
        </div>
      )}

      {connectionStatus === "connected" && (
        <div>
          <div className="mb-6">
            <h2 className="text-[#00FF41] text-lg font-semibold mb-2">CONNECTION ESTABLISHED</h2>
            <p className="text-sm text-[#E5E5E5] opacity-80">Secure communication protocols available:</p>
          </div>

          <div className="space-y-4">
            {contactMethods.map((method, index) => (
              <div
                key={method.id}
                className={`p-4 border rounded transition-all cursor-pointer ${
                  selectedProtocol === method.id
                    ? "border-[#FF00F7] bg-[#1a1a1a]"
                    : "border-[#333] hover:border-[#00FF41] hover:bg-[#1a1a1a]"
                }`}
                onClick={() => setSelectedProtocol(selectedProtocol === method.id ? null : method.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{method.icon}</span>
                    <div>
                      <div className="text-[#00FF41] font-semibold">
                        [{index + 1}] {method.name}
                      </div>
                      <div className="text-sm text-[#E5E5E5]">{method.address}</div>
                    </div>
                  </div>
                  <div className="text-right text-xs">
                    <div className="text-[#FF00F7]">{method.protocol}</div>
                    <div className="text-[#E5E5E5] opacity-60">{method.responseTime}</div>
                  </div>
                </div>

                {selectedProtocol === method.id && (
                  <div className="mt-4 pt-4 border-t border-[#333]">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        method.action()
                      }}
                      className="w-full py-2 bg-[#00FF41] text-black font-semibold rounded hover:bg-[#FF00F7] hover:text-white transition-colors"
                    >
                      ESTABLISH CONNECTION
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-[#1a1a1a] rounded border border-[#333]">
            <h3 className="text-[#FF00F7] font-semibold mb-2">Connection Security</h3>
            <div className="text-xs space-y-1">
              <div className="flex justify-between">
                <span>Encryption:</span>
                <span className="text-[#00FF41]">AES-256 ✓</span>
              </div>
              <div className="flex justify-between">
                <span>Identity Verified:</span>
                <span className="text-[#00FF41]">TRUE ✓</span>
              </div>
              <div className="flex justify-between">
                <span>Response Rate:</span>
                <span className="text-[#00FF41]">100% ✓</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
