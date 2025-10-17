"use client";
import { useEffect, useState } from "react";

export default function VisitCounter({ label = "Total Visits:" }: { label?: string }) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/visits", { method: "POST" })
      .then((r) => r.json())
      .then((d) => setCount(d.total ?? 0))
      .catch(async () => {
        const r = await fetch("/api/visits");
        const d = await r.json();
        setCount(d.total ?? 0);
      });
  }, []);

  return (
    <div className="mt-6 inline-flex items-baseline gap-3 rounded-full border px-4 py-2 text-sm opacity-90">
      <span className="uppercase tracking-widest">{label}</span>
      <span className="text-xl font-bold tabular-nums">{count === null ? "—" : count.toLocaleString()}</span>
    </div>
  );
}
