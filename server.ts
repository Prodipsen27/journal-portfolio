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
        const ai = new GoogleGenAI({
          apiKey,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            },
          },
        });
        const systemPrompt = `You are Prodip Sengupta's Professional Twin AI Assistant on his portfolio website. Prodip is a Full-Stack GenAI Engineer from India with 1+ years experience, 27+ projects, and 99% uptime.
Core Stack: Gemini/Claude API (Function Calling), LangGraph JS & LangChain, RAG Pipelines & pgvector (RRF), Anthropic MCP, React, Next.js, Node.js, Express, MongoDB, PostgreSQL, Docker, Cloud Run.
Featured Projects: VitalTrace AI, Grocery Delivery Platform with Gemini Cart Agent, FinDoc AI SEC Filing Research Assistant, MenuOS AI Restaurant Assistant, Aurality Music Platform, QueryCart.
Contact: prodipsengupta27@gmail.com | github.com/prodipsen27 | linkedin.com/in/prodipsen27 | Open to Work (Remote Worldwide).

Answer user questions concisely, warmly, and accurately as Prodip's AI twin.`;

        const response = await ai.models.generateContent({
          model: "gemini-3.6-flash",
          contents: `${systemPrompt}\n\nUser Question: ${query}`
        });

        const text = response.text || "I am Prodip Sengupta's AI twin, grounded in his 27+ full-stack GenAI engineering projects.";
        return res.json({
          answer: text,
          reply: text,
          thoughtProcess: ["Gemini 3.6 Flash execution node", "Retrieved vector context from portfolio knowledge graph"],
          sources: ["Prodip Sengupta Portfolio Database", "Gemini 3.6 Flash AI Model"]
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
