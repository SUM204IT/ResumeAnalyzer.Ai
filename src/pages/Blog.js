import React from "react";
import { ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar";

const blogs = [
  {
    title: "10 Resume Mistakes That Kill Your Chances",
    desc: "Avoid common resume mistakes that recruiters instantly reject. Learn how to fix them and stand out.",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4",
    category: "Tips",
    date: "Aug 12, 2025",
  },
  {
    title: "How ATS Systems Actually Work",
    desc: "Understand how Applicant Tracking Systems scan your resume and how to optimize for them.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    category: "Guide",
    date: "Sep 2, 2025",
  },
  {
    title: "AI Resume Builders: Are They Worth It?",
    desc: "Explore how AI is changing resume writing and whether it really improves your chances.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    category: "AI",
    date: "Oct 5, 2025",
  },
];

export default function Blog() {
  return (
    <section className="relative py-28 px-6 bg-gradient-to-b from-white to-blue-50 overflow-hidden">
        <Navbar/>

      {/* BACKGROUND GLOW */}
      <div className="absolute top-[-100px] right-0 w-[500px] h-[500px] bg-blue-200 opacity-20 blur-3xl rounded-full"></div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* HEADER */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Latest from our <span className="text-blue-600">Blog</span>
          </h2>

          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Insights, tips, and strategies to help you land your dream job faster.
          </p>
        </div>

        {/* BLOG CARDS */}
        <div className="grid md:grid-cols-3 gap-10">

          {blogs.map((blog, index) => (
            <div
              key={index}
              className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300 hover:-translate-y-2"
            >

              {/* IMAGE */}
              <div className="overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-56 object-cover group-hover:scale-110 transition duration-500"
                />
              </div>

              {/* CONTENT */}
              <div className="p-6">

                {/* CATEGORY + DATE */}
                <div className="flex justify-between text-sm mb-3">
                  <span className="text-blue-600 font-semibold">
                    {blog.category}
                  </span>
                  <span className="text-gray-400">
                    {blog.date}
                  </span>
                </div>

                {/* TITLE */}
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition">
                  {blog.title}
                </h3>

                {/* DESC */}
                <p className="text-gray-600 text-sm mb-5">
                  {blog.desc}
                </p>

                {/* READ MORE */}
                <button className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition">
                  Read More <ArrowRight size={16} />
                </button>
              </div>

            </div>
          ))}

        </div>

        {/* VIEW ALL BUTTON */}
        <div className="text-center mt-16">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold shadow hover:bg-blue-700 transition">
            View All Blogs
          </button>
        </div>

      </div>
    </section>
  );
}