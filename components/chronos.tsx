"use client"

import { useState } from "react"

const timelineEvents = [
  {
    timestamp: "2006-02-04 00:00",
    type: "INIT",
    event: "Spwaned in Faisalabad",
    details: "It was a good day.",
    expandable: false,
  },
  {
    timestamp: "2021-09-01 09:00",
    type: "INIT",
    event: "Started BSCS journey at NUST",
    details: "Beginning of the academic adventure in Computer Science",
    expandable: false,
  },
  {
    timestamp: "2021-09-15 10:30",
    type: "EVENT",
    event: 'First Python script - "Hello, automation!"',
    details: "The moment I realized code could do the boring stuff for me",
    expandable: false,
  },
  {
    timestamp: "2022-03-12 14:20",
    type: "MILESTONE",
    event: "Built first web scraper",
    details: "Scraped university course data to help classmates find available slots",
    expandable: false,
  },
  {
    timestamp: "2022-08-05 16:45",
    type: "LEVEL_UP",
    event: "Discovered React, fell in love with frontend",
    details: "Component-based thinking changed how I approach problem-solving",
    expandable: false,
  },
  {
    timestamp: "2023-01-20 11:00",
    type: "ACHIEVEMENT",
    event: "First Upwork client, nervous but excited",
    details: "Built a data extraction tool for a small business. $200 project that taught me more than any textbook.",
    expandable: false,
  },
  {
    timestamp: "2023-06-15 09:30",
    type: "PROCESS_START",
    event: "Freelance career officially launched",
    details: "Decided to turn coding skills into real income while studying",
    expandable: false,
  },
  {
    timestamp: "2023-07-08 15:20",
    type: "SUCCESS",
    event: "100% project success rate maintained",
    details: "Every client happy, every deadline met. Quality over quantity approach paying off.",
    expandable: false,
  },
  {
    timestamp: "2024-06-10 10:15",
    type: "INTERNSHIP",
    event: "Joined Arbisoft team, learned collaboration",
    details: {
      company: "Arbisoft, Faisalabad",
      role: "Software Developer Intern",
      learning: "How great teams build great products",
      impact: "Enhanced React app performance, contributed to data dashboard",
      takeaway: "Code reviews are gold, collaboration beats solo coding",
    },
    expandable: true,
  },
  {
    timestamp: "2024-06-25 14:30",
    type: "IMPACT",
    event: "Improved app performance by 15%",
    details: "Optimized React components and database queries during internship",
    expandable: false,
  },
  {
    timestamp: "2024-07-15 12:00",
    type: "RETURN",
    event: "Back to freelancing with new perspectives",
    details: "Internship experience elevated my approach to client projects",
    expandable: false,
  },
  {
    timestamp: "2024-12-01 16:45",
    type: "STATUS",
    event: "Top Rated on Upwork, 15+ projects completed",
    details: "Consistent 5-star ratings, $4000+ revenue, 100% success rate maintained",
    expandable: false,
  },
  {
    timestamp: "2024-12-15 10:00",
    type: "CURRENT",
    event: "Building systems that solve real problems",
    details: "Focus shifted from just coding to understanding business needs and creating lasting solutions",
    expandable: false,
  },
]

export default function Chronos() {
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null)

  const getEventColor = (type: string) => {
    switch (type) {
      case "INIT":
        return "text-blue-400"
      case "EVENT":
        return "text-[#E5E5E5]"
      case "MILESTONE":
        return "text-yellow-400"
      case "LEVEL_UP":
        return "text-purple-400"
      case "ACHIEVEMENT":
        return "text-green-400"
      case "PROCESS_START":
        return "text-[#00FF41]"
      case "SUCCESS":
        return "text-green-300"
      case "INTERNSHIP":
        return "text-[#FF00F7]"
      case "IMPACT":
        return "text-orange-400"
      case "RETURN":
        return "text-cyan-400"
      case "STATUS":
        return "text-[#00FF41]"
      case "CURRENT":
        return "text-[#FF00F7]"
      default:
        return "text-[#E5E5E5]"
    }
  }

  return (
    <div className="text-[#E5E5E5] font-mono h-full overflow-auto">
      <div className="mb-6">
        <h2 className="text-[#00FF41] text-lg font-semibold mb-2">CHRONOS.log - Professional Timeline</h2>
        <p className="text-sm text-[#E5E5E5] opacity-80">System log of professional development and milestones</p>
      </div>

      <div className="space-y-2">
        {timelineEvents.map((event, index) => (
          <div key={index} className="group">
            <div
              className={`flex items-start space-x-4 p-2 rounded hover:bg-[#1a1a1a] transition-colors ${
                event.expandable ? "cursor-pointer" : ""
              }`}
              onClick={() => (event.expandable ? setExpandedEvent(expandedEvent === index ? null : index) : null)}
            >
              <div className="text-[#00FF41] text-sm font-mono whitespace-nowrap">[{event.timestamp}]</div>
              <div className={`text-sm font-semibold ${getEventColor(event.type)}`}>{event.type}:</div>
              <div className="text-[#E5E5E5] text-sm flex-1">
                {event.event}
                {event.expandable && (
                  <span className="ml-2 text-[#FF00F7] text-xs">{expandedEvent === index ? "▼" : "▶"}</span>
                )}
              </div>
            </div>

            {expandedEvent === index && event.expandable && typeof event.details === "object" && (
              <div className="ml-8 mt-2 p-4 bg-[#1a1a1a] rounded border-l-2 border-[#FF00F7]">
                <div className="text-[#FF00F7] font-semibold mb-2">INTERNSHIP_DETAILS:</div>
                <div className="space-y-1 text-sm">
                  <div>
                    <span className="text-[#00FF41]">{">"}</span> Company: {event.details.company}
                  </div>
                  <div>
                    <span className="text-[#00FF41]">{">"}</span> Role: {event.details.role}
                  </div>
                  <div>
                    <span className="text-[#00FF41]">{">"}</span> Learning: {event.details.learning}
                  </div>
                  <div>
                    <span className="text-[#00FF41]">{">"}</span> Impact: {event.details.impact}
                  </div>
                  <div>
                    <span className="text-[#00FF41]">{">"}</span> Takeaway: {event.details.takeaway}
                  </div>
                </div>
              </div>
            )}

            {!event.expandable && typeof event.details === "string" && (
              <div className="ml-8 text-xs text-gray-400 italic">{event.details}</div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-[#1a1a1a] rounded border border-[#333]">
        <h3 className="text-[#FF00F7] font-semibold mb-2">System Statistics</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex justify-between">
            <span>Total Events Logged:</span>
            <span className="text-[#00FF41]">{timelineEvents.length}</span>
          </div>
          <div className="flex justify-between">
            <span>Years Active:</span>
            <span className="text-[#00FF41]">3.3</span>
          </div>
          <div className="flex justify-between">
            <span>Major Milestones:</span>
            <span className="text-[#00FF41]">8</span>
          </div>
          <div className="flex justify-between">
            <span>Current Status:</span>
            <span className="text-[#00FF41]">ACTIVE</span>
          </div>
        </div>
      </div>
    </div>
  )
}
