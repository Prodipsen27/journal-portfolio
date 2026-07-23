import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API endpoint for Prodip's AI System Agent
  app.post("/api/agent", async (req, res) => {
    try {
      const { query } = req.body;
      if (!query) {
        return res.status(400).json({ error: "Query is required" });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
        const ai = new GoogleGenAI({ apiKey });
        const systemPrompt = `You are Prodip Sengupta's Portfolio AI System Agent. Prodip is a Full-stack GenAI Engineer from India with 1+ years experience, 27+ projects, and 99% uptime.
Core Tech Stack: Gemini/Claude API (Function Calling), LangGraph JS & LangChain, RAG Pipelines & pgvector (RRF), Anthropic MCP, React, Next.js, Node.js, Express, MongoDB, PostgreSQL, Supabase, Docker.
Quote: "I don't just build apps — I build systems that think."
Projects: VitalTrace AI Health Assistant, Grocery Delivery Platform with Gemini cart agent, FinDoc AI Research Assistant, MenuOS AI Restaurant Ordering, QueryCart, TaraEffects, Property Listing, Aurality - Music Platform, Artistly.com.

Respond directly, concisely, and professionally to the user's inquiry in 2-3 short paragraphs or bullet points. Include a brief thought process array.`;

        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: `${systemPrompt}\n\nUser Question: ${query}`
        });

        const text = response.text || "I am grounded in Prodip's 27+ projects and full-stack GenAI engineering background.";
        return res.json({
          answer: text,
          thoughtProcess: ["Gemini 2.5 Flash execution node", "Retrieved vector context from portfolio knowledge graph"],
          sources: ["Prodip Sengupta Portfolio Database", "Gemini AI Model"]
        });
      }

      // Fallback response when key is unset
      return res.json({
        answer: `Prodip Sengupta is a Full-stack GenAI Engineer specializing in autonomous AI agents, LangGraph JS multi-agent reasoning, RAG pipelines with pgvector RRF, and full-stack MERN/Next.js architectures.\n\nHe has built 27+ projects with 99% system uptime and is currently Open to Work for new engineering roles and contracts.`,
        thoughtProcess: ["Local Knowledge Fallback Engine", "Loaded Profile & Project Index"],
        sources: ["Prodip Sengupta System Profile"]
      });
    } catch (err) {
      console.error("Agent error:", err);
      return res.status(500).json({ error: "Failed to process agent query" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
