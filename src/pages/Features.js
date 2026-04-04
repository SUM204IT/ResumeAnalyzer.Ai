import React from "react";
import {
  FileText,
  BarChart3,
  CheckCircle,
  Zap,
  Sparkles,
} from "lucide-react";
import Navbar from "../components/Navbar";

const features = [
  {
    icon: <FileText size={28} />,
    title: "ATS Optimization",
    desc: "Ensure your resume passes ATS filters with optimized keywords and formatting.",
  },
  {
    icon: <BarChart3 size={28} />,
    title: "Keyword Intelligence",
    desc: "Identify missing keywords and improve your chances of getting shortlisted.",
  },
  {
    icon: <CheckCircle size={28} />,
    title: "AI Suggestions",
    desc: "Get smart improvements for content, structure, and clarity.",
  },
  {
    icon: <Zap size={28} />,
    title: "Instant Analysis",
    desc: "Upload and get insights within seconds — no waiting.",
  },
];

export default function Features() {
  return (
    <section className="relative py-28 px-6 bg-gradient-to-b from-white to-blue-50 overflow-hidden">
        <Navbar/>
      
      {/* BACKGROUND GLOW */}
      <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-200 opacity-20 blur-3xl rounded-full"></div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* HEADER */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm mb-4">
            <Sparkles size={16} />
            AI Powered Resume Analysis
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Everything You Need to
            <span className="text-blue-600"> Build a Winning Resume</span>
          </h2>

          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Our platform analyzes your resume using advanced AI and gives
            actionable insights to improve your chances of landing interviews.
          </p>
        </div>

        {/* FEATURE GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">

          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white/70 backdrop-blur-lg border border-gray-200 p-6 rounded-3xl shadow-sm hover:shadow-2xl transition duration-300 hover:-translate-y-2"
            >
              
              {/* ICON */}
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-100 text-blue-600 mb-4 group-hover:scale-110 transition">
                {feature.icon}
              </div>

              {/* TITLE */}
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>

              {/* DESC */}
              <p className="text-gray-500 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}

        </div>

        {/* HIGHLIGHT SECTION */}
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* LEFT CONTENT */}
          <div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Smarter Resume Insights, Faster Decisions
            </h3>

            <p className="text-gray-600 mb-6">
              Stop guessing what recruiters want. Our AI analyzes your resume
              against real-world hiring patterns and gives you precise
              recommendations.
            </p>

            <ul className="space-y-4">
              {[
                "ATS-friendly formatting check",
                "Real-time keyword suggestions",
                "Actionable improvement tips",
                "Instant feedback with score",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-700">
                  <CheckCircle size={18} className="text-green-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT VISUAL CARD */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border">
            <h4 className="text-lg font-semibold text-gray-800 mb-6">
              Resume Score Overview
            </h4>

            <div className="space-y-5">

              <Progress label="ATS Score" value={85} />
              <Progress label="Keyword Match" value={72} />
              <Progress label="Formatting" value={65} />
              <Progress label="Readability" value={90} />

            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-24 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Improve Your Resume?
          </h3>
          <p className="text-gray-500 mb-8">
            Upload your resume and get AI-powered insights instantly.
          </p>

          <button className="bg-blue-600 text-white px-10 py-4 rounded-2xl text-lg shadow-lg hover:bg-blue-700 transition hover:scale-105">
            Get Started Now
          </button>
        </div>

      </div>
    </section>
  );
}

/* PROGRESS BAR */
function Progress({ label, value }) {
  return (
    <div>
      <div className="flex justify-between text-sm text-gray-600 mb-1">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="w-full bg-gray-200 h-2 rounded-full">
        <div
          className="bg-blue-600 h-2 rounded-full"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}