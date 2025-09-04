import React, { useEffect, useState } from "react";
import quoteService from "../services/quotes";

export default function Quote() {
  const [quote, setQuote] = useState<{ content: string; author: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function loadQuote() {
    setLoading(true);
    setErr(null);
    try {
      const q = await quoteService.getRandom();
      setQuote(q);
    } catch (e: any) {
      setErr(e?.message || "Failed to load quote");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadQuote(); }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50 text-gray-900">
      <div className="max-w-2xl w-full">
        <h1 className="text-3xl font-semibold mb-6">Quote Generator</h1>

        <div className="rounded-2xl shadow p-6 bg-white">
          {loading && <p className="opacity-70">Loading…</p>}
          {!loading && err && <p className="text-red-600">{err}</p>}
          {!loading && !err && quote && (
            <>
              <p className="text-2xl leading-relaxed">“{quote.content}”</p>
              <p className="mt-4 text-right text-gray-600">— {quote.author}</p>
            </>
          )}

          <button
            onClick={loadQuote}
            className="mt-6 px-4 py-2 rounded-xl shadow border hover:bg-gray-100 flex items-center"
            aria-label="Get random quote"
          >
            <span className="material-icons">trending_flat</span>
            <span className="ml-2">New Quote</span>
          </button>
        </div>

        <p className="mt-8 text-sm opacity-60">created by @tassenraihantrima – devChallenges</p>
      </div>
    </div>
  );
}
