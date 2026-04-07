import React, { useRef, useState } from "react";
import { Upload, FileText, CheckCircle, BarChart3 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { apiConnector } from "../services/apiConnector";
import { apiurl } from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { logout } from "../redux/slices/authSlice";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

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

      // 🔹 Upload File
      const uploadRes = await apiConnector(
        "POST",
        apiurl.LOCALFILEUPLOAD_API,
        formData
      );

      if (!uploadRes.data.success) {
        throw new Error(uploadRes.data.message || "Upload failed");
      }

      const filePath = uploadRes.data.filePath;
      if (!filePath) throw new Error("File path missing");

      // 🔹 Analyze Resume
      const analyzeRes = await apiConnector(
        "POST",
        apiurl.RESUMEANALYZER_API,
        { filePath },
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      );

      if (!analyzeRes.data.success) {
        throw new Error(analyzeRes.data.message || "Analysis failed");
      }

      setMessage("✅ Resume analyzed successfully!");
      navigate("/analysis");

    } catch (err) {
      console.log(err);

      if (err?.response?.status === 401) {
        setMessage("Session expired. Please login again.");
        dispatch(logout());
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        setMessage(err.message);
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 text-gray-800">
      
      <Navbar />

      {/* Hidden Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
      />

      {/* HERO */}
      <section className="text-center py-28 px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
          Smart Resume Analysis <br />
          <span className="text-blue-600">Powered by AI</span>
        </h1>

        <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
          Get instant ATS score, keyword insights, and actionable improvements
          to boost your chances of landing your dream job 🚀
        </p>

        <div className="flex flex-col sm:flex-row gap-5 justify-center">

          {/* Upload Button */}
          <button
            onClick={() => (token ? handleClick() : navigate("/login"))}
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-2xl text-lg shadow-xl hover:scale-105 hover:bg-blue-700 transition-all disabled:opacity-50"
          >
            <Upload size={20} />
            {loading ? "Uploading..." : "Upload Resume"}
          </button>

          {/* History */}
          <Link to="/uploads">
            <button className="px-8 py-4 rounded-2xl text-lg border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-md">
              View History
            </button>
          </Link>
        </div>

        {message && (
          <p className="mt-6 text-sm text-gray-700">{message}</p>
        )}
      </section>

      {/* FEATURES */}
      <section className="py-20 px-6 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <Feature icon={<FileText size={28} />} title="ATS Optimization" />
        <Feature icon={<BarChart3 size={28} />} title="Keyword Analysis" />
        <Feature icon={<CheckCircle size={28} />} title="Improvement Tips" />
        <Feature icon={<FileText size={28} />} title="Formatting Check" />
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 bg-white px-6">
        <h2 className="text-4xl font-bold text-center mb-16">
          How It Works
        </h2>

        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-10 text-center">
          <Step number="1" title="Upload Resume" desc="Upload your file securely" />
          <Step number="2" title="AI Analysis" desc="We scan using AI models" />
          <Step number="3" title="Get Insights" desc="Improve instantly" />
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="py-24 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8">
          Why ResumeAI?
        </h2>

        <p className="text-gray-600 max-w-3xl mx-auto mb-12">
          Built with real hiring patterns and ATS logic to maximize your chances.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <Card title="⚡ Fast" desc="Results in seconds" />
          <Card title="🎯 Accurate" desc="Real ATS scoring" />
          <Card title="👌 Simple" desc="Easy UI for everyone" />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t py-8 text-center text-gray-500">
        © {new Date().getFullYear()} ResumeAI
      </footer>
    </div>
  );
}

/* FEATURE CARD */
function Feature({ icon, title }) {
  return (
    <div className="p-6 bg-white rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all text-center">
      <div className="text-blue-600 flex justify-center mb-4">
        {icon}
      </div>
      <h4 className="font-semibold text-lg">{title}</h4>
    </div>
  );
}

/* STEP */
function Step({ number, title, desc }) {
  return (
    <div className="p-6">
      <div className="text-5xl font-bold text-blue-600 mb-4">
        {number}
      </div>
      <h4 className="text-xl font-semibold mb-2">{title}</h4>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}

/* CARD */
function Card({ title, desc }) {
  return (
    <div className="p-6 bg-white rounded-3xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all">
      <h4 className="text-xl font-semibold mb-3">{title}</h4>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}