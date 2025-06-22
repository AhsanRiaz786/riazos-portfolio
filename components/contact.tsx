"use client"

import { useState } from "react"
import { 
  Mail, 
  Briefcase, 
  Github, 
  DollarSign, 
  Phone,
  Shield,
  Check,
  FileDown
} from "lucide-react"

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
      icon: <Mail size={20} strokeWidth={1.5} className="text-[#00FF41]" />,
      action: () => window.open("mailto:ahsanriaz8000@gmail.com?subject=Project Inquiry from RiazOS"),
    },
    {
      id: "linkedin",
      name: "LINKEDIN_NETWORK",
      address: "https://www.linkedin.com/in/ahsan-riaz-1254992a3",
      protocol: "Professional Network",
      responseTime: "Always Open",
      icon: <Briefcase size={20} strokeWidth={1.5} className="text-[#0077B5]" />,
      action: () => window.open("https://www.linkedin.com/in/ahsan-riaz-1254992a3", "_blank"),
    },
    {
      id: "github",
      name: "GITHUB_REPOSITORY",
      address: "@ahsanriaz786",
      protocol: "Git/HTTPS",
      responseTime: "Daily",
      icon: <Github size={20} strokeWidth={1.5} className="text-[#E5E5E5]" />,
      action: () => window.open("https://github.com/ahsanriaz786", "_blank"),
    },
    {
      id: "upwork",
      name: "UPWORK_PLATFORM",
      address: "https://www.upwork.com/freelancers/~01d4988598a9368ee5",
      protocol: "Top Rated Freelancer",
      responseTime: "Open for Projects",
      icon: <DollarSign size={20} strokeWidth={1.5} className="text-[#14A800]" />,
      action: () => window.open("https://www.upwork.com/freelancers/~01d4988598a9368ee5", "_blank"),
    },
    {
      id: "phone",
      name: "EMERGENCY_HOTLINE",
      address: "+92 304 094 9380",
      protocol: "Voice/SMS",
      responseTime: "Urgent Projects Only",
      icon: <Phone size={20} strokeWidth={1.5} className="text-[#FF00F7]" />,
      action: () => window.open("tel:+923040949380"),
    },
    {
      id: "resume",
      name: "DOWNLOAD_RESUME",
      address: "Ahsan_Riaz_Resume.pdf",
      protocol: "PDF Document",
      responseTime: "Instant Download",
      icon: <FileDown size={20} strokeWidth={1.5} className="text-[#FFD700]" />,
      action: () => {
        const link = document.createElement('a')
        link.href = '/Ahsan Riaz - Resume.pdf'
        link.download = 'Ahsan_Riaz_Resume.pdf'
        link.click()
      },
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
                    <div className="w-8 h-8 flex items-center justify-center">{method.icon}</div>
                    <div>
                      <div className="text-[#00FF41] font-semibold">
                        [{index + 1}] {method.name}
                      </div>
                      <div className="text-sm text-[#E5E5E5] break-all">{method.address}</div>
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
                <span className="text-[#00FF41] flex items-center gap-1">
                  AES-256 <Check size={12} strokeWidth={2} />
                </span>
              </div>
              <div className="flex justify-between">
                <span>Identity Verified:</span>
                <span className="text-[#00FF41] flex items-center gap-1">
                  TRUE <Check size={12} strokeWidth={2} />
                </span>
              </div>
              <div className="flex justify-between">
                <span>Response Rate:</span>
                <span className="text-[#00FF41] flex items-center gap-1">
                  100% <Check size={12} strokeWidth={2} />
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
