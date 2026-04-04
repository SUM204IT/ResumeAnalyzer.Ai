import React from "react";
import { CheckCircle, Sparkles } from "lucide-react";
import Navbar from "../components/Navbar";

const plans = [
  {
    name: "Free",
    price: "₹0",
    desc: "Perfect for getting started",
    features: [
      "1 Resume Analysis / day",
      "Basic ATS Score",
      "Limited Suggestions",
      "Community Support",
    ],
    highlight: false,
  },
  {
    name: "Pro",
    price: "₹199",
    desc: "Best for job seekers",
    features: [
      "Unlimited Resume Analysis",
      "Advanced ATS Score",
      "Full AI Suggestions",
      "Keyword Optimization",
      "Priority Support",
    ],
    highlight: true,
  },
  {
    name: "Premium",
    price: "₹399",
    desc: "For serious professionals",
    features: [
      "Everything in Pro",
      "Job Match Insights",
      "Resume Rewrite AI",
      "Detailed Feedback Report",
      "1-on-1 Expert Tips",
    ],
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <section className="relative py-28 px-6 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
        <Navbar/>
      
      {/* Background Glow */}
      <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-200 opacity-20 blur-3xl rounded-full"></div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* HEADER */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm mb-4">
            <Sparkles size={16} />
            Simple & Transparent Pricing
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Choose the Plan that
            <span className="text-blue-600"> Fits You</span>
          </h2>

          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Start for free and upgrade as you grow. No hidden charges.
          </p>
        </div>

        {/* PRICING CARDS */}
        <div className="grid md:grid-cols-3 gap-10">

          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-3xl border shadow-sm transition duration-300 hover:shadow-2xl hover:-translate-y-2
              ${plan.highlight 
                ? "bg-blue-600 text-white scale-105 border-none" 
                : "bg-white border-gray-200"}`}
            >
              
              {/* POPULAR TAG */}
              {plan.highlight && (
                <div className="absolute top-[-12px] left-1/2 -translate-x-1/2 bg-white text-blue-600 text-xs px-4 py-1 rounded-full font-semibold shadow">
                  Most Popular
                </div>
              )}

              {/* PLAN NAME */}
              <h3 className={`text-2xl font-bold mb-2 ${plan.highlight ? "text-white" : "text-gray-800"}`}>
                {plan.name}
              </h3>

              {/* DESC */}
              <p className={`${plan.highlight ? "text-blue-100" : "text-gray-500"} mb-6`}>
                {plan.desc}
              </p>

              {/* PRICE */}
              <div className="mb-6">
                <span className="text-4xl font-bold">
                  {plan.price}
                </span>
                <span className={`ml-2 ${plan.highlight ? "text-blue-200" : "text-gray-500"}`}>
                  /month
                </span>
              </div>

              {/* FEATURES */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle size={18} className={plan.highlight ? "text-white" : "text-green-500"} />
                    <span className={plan.highlight ? "text-white" : "text-gray-600"}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              {/* BUTTON */}
              <button
                className={`w-full py-3 rounded-xl font-semibold transition
                ${plan.highlight
                  ? "bg-white text-blue-600 hover:bg-gray-100"
                  : "bg-blue-600 text-white hover:bg-blue-700"}`}
              >
                Get Started
              </button>
            </div>
          ))}

        </div>

        {/* FOOTER NOTE */}
        <p className="text-center text-gray-500 mt-10">
          No credit card required for free plan. Cancel anytime.
        </p>

      </div>
    </section>
  );
}