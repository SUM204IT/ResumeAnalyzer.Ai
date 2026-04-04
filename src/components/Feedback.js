import { useState } from "react";

export default function FeedbackAccordion({ data }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const sections = [
    { title: "Contact Information", content: data.contact || "No issues found" },
    { title: "Summary", content: data.summary || "Looks good" },
    { title: "Skills", content: data.skills || "Skills are relevant" },
    { title: "Experience", content: data.experience || "Experience is well structured" },
    { title: "Education", content: data.education || "Education section is clear" },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow mt-10 flex flex-col" >
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        Detailed Feedback
      </h2>

      <div className="space-y-3">
        {sections.map((sec, index) => (
          <div key={index} className="border rounded-lg overflow-hidden">
            
            {/* HEADER */}
            <button
              onClick={() => toggle(index)}
              className="w-full flex justify-between items-center px-4 py-3 bg-gray-50 hover:bg-gray-100 transition"
            >
              <span className="font-medium text-gray-700">
                {sec.title}
              </span>
              <span className="text-gray-500">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>

            {/* BODY */}
            <div
              className={`px-4 text-sm text-gray-600 transition-all duration-300 ${
                openIndex === index ? "max-h-40 py-3" : "max-h-0"
              } overflow-hidden`}
            >
              {sec.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}