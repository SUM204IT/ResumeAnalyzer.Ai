import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FeedbackAccordion from "../components/Feedback";
import { useSelector } from "react-redux";

export default function ResumeAnalysis() {
    const {user} = useSelector((state) => state.auth);
    console.log("User::", user);
  const [data, setData] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setData({
      score: 78,
      jobMatch: 65,
      atsScore: 72,
      formatting: 58,
      readability: 86,
      strengths: [
        "Clean structure and readable layout",
        "Relevant skills clearly highlighted",
      ],
      suggestions: [
        "Add quantified achievements",
        "Improve ATS keywords",
      ],
    });
  }, []);

  if (!data) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white shadow-xl transform transition-transform duration-300 z-50
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-6">
          <Link to="/"><h2 className="text-2xl font-bold text-blue-600">ResumeAI</h2></Link>
        </div>

        <nav className="px-6 space-y-4 text-gray-600 flex flex-col gap-2">
          <Link to="/analysis"><p className="text-blue-600 font-semibold">Dashboard</p></Link>
          <Link to="/uploads"><p>Uploads</p></Link>
          <Link to="/history"><p>History</p></Link>
          <Link to="/settings"><p>Settings</p></Link>
        </nav>
      </div>

      {/* OVERLAY */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">

        {/* HEADER */}
        <header className="bg-white shadow px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="text-2xl"
            >
              ☰
            </button>

            <h1 className="text-xl font-bold text-gray-800">
              Analysis Dashboard
            </h1>
          </div>

          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Upload
          </button>
        </header>

        {/* CONTENT */}
        <main className="p-6 space-y-8">

          {/* SCORE + METRICS */}
          <div className="grid lg:grid-cols-3 gap-6">

            {/* SCORE */}
            <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
              <div
                className="w-40 h-40 rounded-full flex items-center justify-center text-3xl font-bold"
                style={{
                  background: `conic-gradient(#3b82f6 ${data.score * 3.6}deg, #e5e7eb 0deg)`,
                }}
              >
                <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center">
                  {data.score}
                </div>
              </div>
              <p className="mt-4 text-gray-500">Overall Score</p>
            </div>

            {/* METRICS */}
            <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
              <Metric title="Job Match" value={data.jobMatch} />
              <Metric title="ATS" value={data.atsScore} />
              <Metric title="Formatting" value={data.formatting} />
              <Metric title="Readability" value={data.readability} />
            </div>
          </div>

          {/* PROGRESS */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="font-semibold mb-4">Detailed Breakdown</h2>
            <Progress label="Job Match" value={data.jobMatch} />
            <Progress label="ATS Score" value={data.atsScore} />
            <Progress label="Formatting" value={data.formatting} />
            <Progress label="Readability" value={data.readability} />
          </div>

          {/* INSIGHTS */}
          <div className="grid md:grid-cols-2 gap-6">
            <InsightCard title="Strengths" items={data.strengths} good />
            <InsightCard title="Improvements" items={data.suggestions} />
          </div>

        </main>
      </div>
      <FeedbackAccordion
  data={{
    contact: "Add LinkedIn profile",
    summary: "Too generic, add impact",
    skills: "Missing React, Node keywords",
    experience: "Add measurable achievements",
    education: "Looks fine",
  }}
/>
    </div>
    
  );
}

/* METRIC */
function Metric({ title, value }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow text-center">
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-lg font-bold text-blue-600">{value}%</p>
    </div>
  );
}



/* PROGRESS */
function Progress({ label, value }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1">
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

/* INSIGHTS */
function InsightCard({ title, items, good }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h2 className={`font-semibold mb-4 ${good ? "text-green-600" : "text-red-500"}`}>
        {title}
      </h2>
      <ul className="space-y-2 text-gray-600">
        {items.map((item, i) => (
          <li key={i}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}