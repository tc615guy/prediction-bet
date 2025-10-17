"use client";
import VisitCounter from "./components/VisitCounter";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mx-auto flex max-w-5xl flex-col items-center justify-center px-6 py-28 text-center"
      >
        <h1 className="text-5xl md:text-7xl font-semibold">
          Own the Future of{" "}
          <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
            Prediction.bet
          </span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg md:text-xl opacity-80">
          The category-defining brand for prediction markets, decentralized betting, and AI forecasting.
        </p>
        <VisitCounter label="Total Visits:" />
        <a
          href="#inquire"
          className="mt-10 rounded-full border px-6 py-3 text-base hover:opacity-80 transition"
        >
          Inquire About Acquisition
        </a>
      </motion.section>

      {/* About */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mx-auto max-w-4xl px-6 py-20 space-y-6"
      >
        <h2 className="text-3xl md:text-4xl font-semibold">What Is Prediction.bet?</h2>
        <p className="opacity-80">
          Prediction.bet is a once-in-a-generation domain positioned at the nexus of prediction markets, blockchain, and AI.
          It's not just a name — it's the headquarters of the Prediction Economy.
        </p>
      </motion.section>

      {/* Market Insight */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mx-auto max-w-5xl px-6 py-16"
      >
        <h2 className="text-3xl md:text-4xl font-semibold mb-8">Why Now</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            "$1.5B+ Prediction Market Volume (2024)",
            "46.8% CAGR through 2035",
            "$95B+ Market Size by 2035",
          ].map((t, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="rounded-2xl border p-6 text-center"
            >
              <div className="text-xl font-semibold">{t}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Why Prediction.bet */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mx-auto max-w-5xl px-6 py-16"
      >
        <h2 className="text-3xl md:text-4xl font-semibold mb-8">A Category-Defining Brand</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            ["Authority", "Exact-match trust & relevance."],
            ["Vision", "Built for Web3, AI, and data-driven markets."],
            ["Scarcity", "One-word .bet domains are almost extinct."],
          ].map(([h, s], i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="rounded-2xl border p-6"
            >
              <div className="text-xl font-semibold">{h}</div>
              <p className="opacity-80 mt-2">{s}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Contact */}
      <motion.section 
        id="inquire"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mx-auto max-w-3xl px-6 py-20"
      >
        <h2 className="text-3xl md:text-4xl font-semibold mb-6">Serious Inquiries Only</h2>
        <form
          className="space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
            const form = e.currentTarget as HTMLFormElement;
            const fd = new FormData(form);
            const payload = Object.fromEntries(fd.entries());
            
            try {
              const response = await fetch("/api/contact", { 
                method: "POST", 
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(payload) 
              });
              
              const result = await response.json();
              console.log("Contact form response:", result);
              
              if (response.ok && result.ok) {
                alert("Thanks — we'll be in touch.");
                form.reset();
              } else {
                console.error("Contact form error:", result);
                alert("Sorry, there was an error sending your message. Please try again.");
              }
            } catch (error) {
              console.error("Contact form error:", error);
              alert("Sorry, there was an error sending your message. Please try again.");
            }
          }}
        >
          <input name="name" placeholder="Name" required className="w-full rounded-xl bg-transparent border p-3" suppressHydrationWarning/>
          <input name="email" type="email" placeholder="Email" required className="w-full rounded-xl bg-transparent border p-3" suppressHydrationWarning/>
          <textarea name="message" placeholder="Message" required className="w-full rounded-xl bg-transparent border p-3 h-32" suppressHydrationWarning/>
          <button className="rounded-xl border px-6 py-3 hover:opacity-80 transition" type="submit" suppressHydrationWarning>Send</button>
        </form>
        <div className="mt-6 opacity-80 space-y-1">
        </div>
      </motion.section>

      <footer className="border-t border-white/10 py-10 text-center opacity-70">
        © 2025 Prediction.bet — Own the Future.
      </footer>
    </main>
  );
}
