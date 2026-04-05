import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FeedbackAccordion from "../components/Feedback";
import { useSelector } from "react-redux";
import { apiConnector } from "../services/apiConnector";
import { apiurl } from "../services/api";

export default function ResumeAnalysis() {
  const { token } = useSelector((state) => state.auth);

  const [data, setData] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const fetchResumes = async () => {
    try {
      const res = await apiConnector(
        "GET",
        apiurl.GETUSERRESUME_API,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      setData(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  if (!data) {
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">

      {/* SIDEBAR */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white/80 backdrop-blur-lg shadow-xl transform transition duration-300 z-50
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-6">
          <Link to="/">
            <h2 className="text-2xl font-bold text-blue-600">ResumeAI</h2>
          </Link>
        </div>

        <nav className="px-6 space-y-4 text-gray-600 flex flex-col gap-2">
          <Link to="/analysis">
            <p className="text-blue-600 font-semibold">Dashboard</p>
          </Link>
          <Link to="/uploads"><p>Uploads</p></Link>
          <Link to="/history"><p>History</p></Link>
          <Link to="/settings"><p>Settings</p></Link>
        </nav>
      </div>

      {/* OVERLAY */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* MAIN */}
      <div className="flex-1 flex flex-col">

        {/* HEADER */}
        <header className="bg-white/70 backdrop-blur shadow px-6 py-4 flex items-center justify-between">
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

          <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg shadow hover:scale-105 transition">
            Upload
          </button>
        </header>

        {/* CONTENT */}
        <main className="p-6 space-y-8">

          {/* SCORE + METRICS */}
          <div className="grid lg:grid-cols-3 gap-6">

            {/* SCORE */}
            <div className="bg-white/80 backdrop-blur rounded-2xl shadow-xl p-6 flex flex-col items-center">
              <div
                className="w-40 h-40 rounded-full flex items-center justify-center text-3xl font-bold text-blue-600"
                style={{
                  background: `conic-gradient(#3b82f6 ${(data?.score || 0) * 3.6}deg, #e5e7eb 0deg)`,
                }}
              >
                <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center">
                  {data?.score || 0}
                </div>
              </div>
              <p className="mt-4 text-gray-500">Overall Score</p>
            </div>

            {/* METRICS */}
            <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
              <Metric title="Job Match" value={data?.jobMatch || 0} />
              <Metric title="ATS Score" value={data?.atsScore || 0} />
              <Metric title="Grammar Issues" value={data?.grammarIssues?.length || 0} />
              <Metric title="Missing Keywords" value={data?.missingKeywords?.length || 0} />
            </div>
          </div>

          {/* PROGRESS */}
          <div className="bg-white/80 backdrop-blur rounded-2xl shadow-xl p-6">
            <h2 className="font-semibold mb-4 text-gray-700">
              Detailed Breakdown
            </h2>

            <Progress label="Overall Score" value={data?.score || 0} />
            <Progress label="Job Match" value={data?.jobMatch || 0} />
            <Progress label="ATS Score" value={data?.atsScore || 0} />
          </div>

          {/* INSIGHTS */}
          <div className="grid md:grid-cols-2 gap-6">

            <InsightCard
              title="Strengths"
              items={data?.strengths?.length ? data.strengths : ["No strengths detected"]}
              good
            />

            <InsightCard
              title="Suggestions"
              items={data?.suggestions || []}
            />

            <InsightCard
              title="Weaknesses"
              items={data?.weaknesses || []}
            />
          </div>

          {/* FEEDBACK */}
          <FeedbackAccordion data={data?.sectionFeedback || {}} />

        </main>
      </div>
    </div>
  );
}

/* METRIC */
function Metric({ title, value }) {
  return (
    <div className="bg-white/80 backdrop-blur p-4 rounded-xl shadow hover:shadow-lg transition text-center">
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-lg font-bold text-blue-600">{value}%</p>
    </div>
  );
}

/* PROGRESS */
function Progress({ label, value }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1 text-gray-600">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="w-full bg-gray-200 h-2 rounded-full">
        <div
          className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

/* INSIGHT CARD */
function InsightCard({ title, items = [], good }) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">

      {/* HEADER */}
      <div className="flex items-center gap-2 mb-3">
        <span className={good ? "text-blue-500" : "text-red-400"}>
          {good ? "✦" : "✖"}
        </span>
        <h2 className="text-sm font-semibold text-gray-700">
          {title}
        </h2>
      </div>

      {/* LIST */}
      <ul className="space-y-2 text-xs text-gray-600 leading-relaxed">
        {items.length > 0 ? (
          items.map((item, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-gray-400 mt-[2px]">•</span>
              <span>{item}</span>
            </li>
          ))
        ) : (
          <p className="text-gray-400">No data available</p>
        )}
      </ul>

    </div>
  );
}