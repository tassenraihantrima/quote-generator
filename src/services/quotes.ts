async function getRandom(): Promise<{ content: string; author: string }> {
  const res = await fetch("https://dummyjson.com/quotes/random", { cache: "no-store" });
  if (!res.ok) throw new Error("HTTP " + res.status);
  const data = await res.json();
  return {
    content: data.quote ?? "",
    author: data.author ?? "Unknown",
  };
}

async function getQuotesFromAuthor(_author: string) {
  return [];
}

export default { getRandom, getQuotesFromAuthor };