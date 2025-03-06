"use client";

import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult({
      success: true,
      message: "Sending...",
    });

    const body = {
      ...formData,
      access_key: "9c545142-8d1b-40f1-b722-05b42e9ee49a", // Web3Forms Access Key
      replyTo: formData.email,
      from_name: formData.name,
      subject: formData.subject,
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (data.success) {
        setResult({
          success: true,
          message: "Form Submitted Successfully! ✅",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setResult({
          success: false,
          message: data.message,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setResult({
        success: false,
        message: "Something went wrong. Please try again!",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-200 p-6">
      <div className="w-full max-w-lg  shadow-lg rounded-lg p-8 bg-white">
        <h2 className="text-3xl font-bold text-center text-[#205161] mb-4">Contact Us</h2>
        <p className="text-center text-gray-600 mb-6">We'd love to hear from you!</p>
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" id="name" value={formData.name} onChange={handleChange} placeholder="Your Name" className="mt-1 w-full p-2.5 border rounded-lg shadow-sm focus:ring-[#205161] focus:border-[#205161]" required />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="email" value={formData.email} onChange={handleChange} placeholder="Your Email" className="mt-1 w-full p-2.5 border rounded-lg shadow-sm focus:ring-[#205161] focus:border-[#205161]" required />
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
            <input type="text" id="subject" value={formData.subject} onChange={handleChange} placeholder="Subject" className="mt-1 w-full p-2.5 border rounded-lg shadow-sm focus:ring-[#205161] focus:border-[#205161]" required />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
            <textarea id="message" value={formData.message} onChange={handleChange} placeholder="Your Message" rows={4} className="mt-1 w-full p-2.5 border rounded-lg shadow-sm focus:ring-[#205161] focus:border-[#205161]" required />
          </div>
          <button type="submit" className="w-full py-3 text-white font-semibold bg-[#205161] rounded-lg hover:bg-[#1a3f4f] focus:ring-4 focus:ring-[#205161]">
            Submit
          </button>
        </form>
        {result && (
          <div className={`mt-4 p-3 text-center rounded-lg ${result.success ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
            {result.message}
          </div>
        )}
      </div>
    </div>
  );
}
