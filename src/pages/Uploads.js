import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { apiConnector } from "../services/apiConnector";
import { apiurl } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Uploads() {
  const { token } = useSelector((state) => state.auth);
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchAllResumes = async () => {
    try {
      const res = await apiConnector(
        "GET",
        apiurl.GETALLANALYSIS_API,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      console.log("All resumes:", res.data.data);
      setResumes(res.data.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllResumes();
  }, []);

  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-500">
        Loading your analysis...
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6 md:p-10">

      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-800">
          Your Resume Analysis History
        </h1>
        <p className="text-gray-500 mt-2">
          Track all your previous resume analyses
        </p>
      </div>

      {/* EMPTY STATE */}
      {resumes.length === 0 && (
        <div className="text-center mt-20">
          <p className="text-gray-500 text-lg">
            No resumes analyzed yet 😕
          </p>
        </div>
      )}

      {/* GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {resumes.map((resume) => (
          <div
            key={resume._id}
            onClick={() => navigate("/analysis", { state: resume })}
            className="cursor-pointer bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition border border-gray-100"
          >

            {/* TOP */}
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-gray-500">
                {new Date(resume.createdAt).toLocaleDateString()}
              </p>

              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-full">
                AI Analyzed
              </span>
            </div>

            {/* SCORE */}
            <div className="flex items-center gap-4 mb-4">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold text-white"
                style={{
                  background: `conic-gradient(#3b82f6 ${resume.score * 3.6}deg, #e5e7eb 0deg)`
                }}
              >
                {resume.score}
              </div>

              <div>
                <p className="text-gray-700 font-semibold">Overall Score</p>
                <p className="text-sm text-gray-500">
                  ATS: {resume.atsScore}%
                </p>
              </div>
            </div>

            {/* INFO */}
            <div className="text-sm text-gray-600 space-y-1">
              <p>Job Match: {resume.jobMatch}%</p>
              <p>Grammar Issues: {resume.grammarIssues?.length || 0}</p>
              <p>Missing Keywords: {resume.missingKeywords?.length || 0}</p>
            </div>

            {/* TAGS */}
            <div className="mt-4 flex flex-wrap gap-2">
              {resume.suggestions?.slice(0, 2).map((s, i) => (
                <span
                  key={i}
                  className="text-xs bg-gray-100 px-2 py-1 rounded-full"
                >
                  {s}
                </span>
              ))}
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}