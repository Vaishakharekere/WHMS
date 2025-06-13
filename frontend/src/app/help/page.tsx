"use client"
import React, { useState } from "react";

export default function SupportForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // You can add form submission logic here (e.g., API call)
    alert("Query submitted! Our support team will get back to you promptly.");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="max-w-xl mx-auto p-6 border rounded-md shadow-md font-sans">
      <h2 className="text-2xl font-semibold mb-4">We're here to assist you.</h2>
      <p className="mb-6">Please fill out the form below, and our support team will get back to you promptly.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="font-medium">📝 Submit Your Query</span>
        </label>

        <label className="block">
          Name:
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Your Full Name"
            className="w-full mt-1 p-2 border rounded"
          />
        </label>

        <label className="block">
          Email:
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="Your Email Address"
            className="w-full mt-1 p-2 border rounded"
          />
        </label>

        <label className="block">
          Subject:
          <input
            type="text"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            required
            placeholder="Subject of Your Inquiry"
            className="w-full mt-1 p-2 border rounded"
          />
        </label>

        <label className="block">
          Message:
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            placeholder="Detailed Description of Your Issue or Question"
            rows={5}
            className="w-full mt-1 p-2 border rounded resize-y"
          />
        </label>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>

      
    </div>
  );
}
