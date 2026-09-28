"use client";

import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({
    artistName: "",
    artistEmail: "",
    dealType: "",
    fileName: "",
    fileBase64: "",
  });

  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setForm({
        ...form,
        fileName: file.name,
        fileBase64: reader.result as string,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setStatus("Submitting...");

    const res = await fetch("/api/submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      setStatus("Error: " + data.details);
      return;
    }

    setStatus("Submitted!");
  };

  return (
    <main style={{ maxWidth: 600, margin: "2rem auto" }}>
      <h1>Submit Deal</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Artist Name*
          <input name="artistName" required value={form.artistName} onChange={handleChange} />
        </label>

        <label>
          Artist Email*
          <input type="email" name="artistEmail" required value={form.artistEmail} onChange={handleChange} />
        </label>

        <label>
          Deal Type*
          <input name="dealType" required value={form.dealType} onChange={handleChange} />
        </label>

        <label>
          Upload File
          <input type="file" onChange={handleFile} />
        </label>

        <button type="submit">Submit</button>
      </form>

      {status && <p>{status}</p>}
    </main>
  );
}
