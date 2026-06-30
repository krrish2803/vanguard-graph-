"use client";
import { useState } from "react";

export default function NewMerchantPage() {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="p-8 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Onboard New Merchant</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="border p-2 w-full rounded"
          placeholder="Merchant name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" className="px-4 py-2 bg-black text-white rounded">
          Submit
        </button>
      </form>
      {submitted && (
        <p className="mt-4 text-green-600">
          Investigation started for "{name}"...
        </p>
      )}
    </main>
  );
}