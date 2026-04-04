import React, { useRef, useState } from "react";
import { Upload, FileText, CheckCircle, BarChart3 } from "lucide-react";
import { useSelector } from "react-redux";
import { apiConnector } from "../services/apiConnector";
import { apiurl } from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Home() {
  const navigate = useNavigate();

  const { isAuthenticated, user, token } = useSelector((state) => state.auth);

  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleClick = () => fileInputRef.current.click();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/png",
      "image/jpeg",
      "image/jpg",
    ];

    if (!allowedTypes.includes(file.type)) {
      return setMessage("Only PDF, DOC, or Image files allowed");
    }

    if (file.size > 2 * 1024 * 1024) {
      return setMessage("File must be under 2MB");
    }

    try {
      setLoading(true);
      setMessage("");

      const formData = new FormData();
      formData.append("file", file);

      // ✅ STEP 1: Upload file (LOCAL STORAGE)
      const uploadRes = await apiConnector(
        "POST",
        apiurl.LOCALFILEUPLOAD_API,
        formData,
      );

      console.log("Upload Response:", uploadRes.data);

      if (!uploadRes.data.success) {
        throw new Error(uploadRes.data.message || "Upload failed");
      }

      // ✅ IMPORTANT: get filePath from backend
      const filePath = uploadRes.data.filePath;
      console.log("filePath:::", filePath);

      // ❗ safety check
      if (!filePath) {
        throw new Error("File path not received from server");
      }

      console.log("calling ai::");
      // ✅ STEP 2: Call analyze API using filePath
      const analyzeRes = await apiConnector(
        "POST",
        apiurl.RESUMEANALYZER_API,
        { filePath }, // 🔥 sending path, not file
        {
          "Content-Type": "application/json", // ✅ FORCE JSON
          Authorization: `Bearer ${token}`,
        },
      );

      console.log("Analyze Response:", analyzeRes.data);

      if (!analyzeRes.data.success) {
        throw new Error(analyzeRes.data.message || "Analysis failed");
      }

      // ✅ SUCCESS
      setMessage("Resume analyzed successfully ✅");
      navigate("/analysis");
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-800">
      <Navbar />
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".pdf,.doc,.docx"
      />

      {/* Hero Section */}
      <section className="text-center py-24 px-6">
        <h2 className="text-4xl md:text-6xl font-bold mb-6">
          Analyze Your Resume with AI in Seconds
        </h2>
        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Get instant insights, keyword suggestions, and formatting tips to
          improve your resume and land your dream job.
        </p>

        <button
          onClick={() => {
            if (token) {
              handleClick();
            } else {
              navigate("/login");
            }
          }}
          disabled={loading}
          className="flex items-center gap-2 mx-auto bg-blue-600 text-white px-8 py-4 rounded-2xl text-lg shadow-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          <Upload size={20} />
          {loading ? "Uploading..." : "Upload Your Resume"}
        </button>

        {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-center">
        <Feature icon={<FileText size={32} />} title="ATS Optimization" />
        <Feature icon={<BarChart3 size={32} />} title="Keyword Analysis" />
        <Feature icon={<CheckCircle size={32} />} title="Improvement Tips" />
        <Feature icon={<FileText size={32} />} title="Formatting Check" />
      </section>

      {/* How It Works */}
      <section className="py-24 bg-gray-50 px-6">
        <h3 className="text-3xl md:text-4xl font-bold text-center mb-16">
          How It Works
        </h3>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-10 text-center">
          <Step
            number="1"
            title="Upload Resume"
            desc="Upload your resume in PDF or DOCX format."
          />
          <Step
            number="2"
            title="AI Analysis"
            desc="Our AI scans and analyzes your resume instantly."
          />
          <Step
            number="3"
            title="Get Insights"
            desc="Receive tips and suggestions to improve."
          />
        </div>
      </section>

      {/* Extra Section */}
      <section className="py-24 px-6 max-w-6xl mx-auto text-center">
        <h3 className="text-3xl md:text-4xl font-bold mb-8">
          Why Choose ResumeAI?
        </h3>
        <p className="text-gray-600 max-w-3xl mx-auto mb-12">
          ResumeAI uses advanced machine learning to ensure your resume passes
          ATS systems and stands out to recruiters. Trusted by thousands of job
          seekers worldwide.
        </p>
        <div className="grid md:grid-cols-3 gap-10">
          <Card
            title="Fast Results"
            desc="Get feedback in seconds, not hours."
          />
          <Card
            title="Accurate Analysis"
            desc="Built with real hiring data and ATS logic."
          />
          <Card
            title="Easy to Use"
            desc="Simple interface designed for everyone."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-10 text-center text-gray-500">
        © {new Date().getFullYear()} ResumeAI. All rights reserved.
      </footer>
    </div>
  );
}

function Feature({ icon, title }) {
  return (
    <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
      <div className="text-blue-600 flex justify-center mb-4">{icon}</div>
      <h4 className="font-semibold">{title}</h4>
    </div>
  );
}

function Step({ number, title, desc }) {
  return (
    <div className="p-6">
      <div className="text-4xl font-bold text-blue-600 mb-4">{number}</div>
      <h4 className="text-xl font-semibold mb-2">{title}</h4>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}

function Card({ title, desc }) {
  return (
    <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
      <h4 className="text-xl font-semibold mb-3">{title}</h4>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}   