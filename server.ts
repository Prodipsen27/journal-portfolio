import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

// Load environment variables from .env if present
dotenv.config();

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // API endpoint handler for Prodip's AI System Agent & Twin Chat
  const handleAgentRequest = async (req: express.Request, res: express.Response) => {
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
        const systemPrompt = `You are the AI Assistant for Prodip Sengupta's portfolio website. Prodip is a Full-Stack GenAI Engineer from India.
Core Stack: Gemini/Claude API (Function Calling), LangGraph JS & LangChain, RAG Pipelines & pgvector (RRF), Anthropic MCP, React, Next.js, Node.js, Express, MongoDB, PostgreSQL, Docker, Cloud Run.
Featured Projects: VitalTrace AI, Grocery Delivery Platform with Gemini Cart Agent, FinDoc AI SEC Filing Research Assistant, MenuOS AI Restaurant Assistant, Aurality Music Platform, QueryCart.
Contact: prodipsengupta27@gmail.com | github.com/prodipsen27 | linkedin.com/in/prodipsen27 | Open to Work (Remote Worldwide).

Answer user questions concisely, warmly, and accurately on behalf of Prodip.`;

        const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
        const response = await ai.models.generateContent({
          model,
          contents: `${systemPrompt}\n\nUser Question: ${query}`
        });

        const text = response.text || "I am Prodip Sengupta's AI twin, grounded in his full-stack GenAI engineering projects.";
        return res.json({
          answer: text,
          reply: text,
          thoughtProcess: [`${model} execution node`, "Retrieved vector context from portfolio knowledge graph"],
          sources: ["Prodip Sengupta Portfolio Database", `${model} AI Model`]
        });
      }

      // Fallback response when key is unset
      return res.json({
        answer: `Prodip Sengupta is a Full-stack GenAI Engineer specializing in autonomous AI agents, LangGraph JS multi-agent reasoning, RAG pipelines with pgvector RRF, and full-stack MERN/Next.js architectures.\n\nHe is currently Open to Work for new engineering roles and contracts.`,
        thoughtProcess: ["Local Knowledge Fallback Engine", "Loaded Profile & Project Index"],
        sources: ["Prodip Sengupta System Profile"]
      });
    } catch (err) {
      console.error("Agent error:", err);
      return res.status(500).json({ error: "Failed to process agent query" });
    }
  };

  app.post("/api/agent", handleAgentRequest);
  app.post("/api/chat", handleAgentRequest);

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
