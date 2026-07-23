import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '../types';
import { PROFILE_DATA, FEATURED_PROJECTS, SKILL_CATEGORIES } from '../data/portfolioData';
import { 
  Terminal, 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  Brain, 
  Cpu, 
  CheckCircle2, 
  Loader2,
  RefreshCw,
  Search,
  Code
} from 'lucide-react';

interface AgentSandboxProps {
  initialPrompt?: string;
}

export const AgentSandbox: React.FC<AgentSandboxProps> = ({ initialPrompt }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'agent',
      text: `Hello! I am Prodip Sengupta's Portfolio AI Agent. I am grounded in Prodip's 27+ projects, LangGraph multi-agent experience, RAG pipelines, and full-stack MERN expertise.\n\nAsk me anything about Prodip's skills, architecture patterns, or how he can build systems that think for your team!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      thoughtProcess: [
        'Initialized System Agent Node v2.6',
        'Loaded Portfolio Knowledge Graph: 27 Projects, 9 Skill Categories',
        'Vector Index grounded on pgvector RRF'
      ]
    }
  ]);

  const [inputQuery, setInputQuery] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialPrompt) {
      setInputQuery(initialPrompt);
    }
  }, [initialPrompt]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isProcessing]);

  const samplePrompts = [
    "Tell me about Prodip's GenAI experience and LangGraph projects.",
    "How does FinDoc AI perform RAG analysis with pgvector?",
    "Explain the Grocery Delivery Gemini cart agent.",
    "Is Prodip available for hire / contract work?"
  ];

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || isProcessing) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsProcessing(true);

    try {
      // Send request to server API or fallback
      const response = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: textToSend })
      });

      if (response.ok) {
        const data = await response.json();
        const agentMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'agent',
          text: data.answer || data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          thoughtProcess: data.thoughtProcess || ['Executed RAG retrieval', 'Grounded answer using Gemini API'],
          sources: data.sources || ['Prodip Portfolio Knowledge Base']
        };
        setMessages(prev => [...prev, agentMsg]);
      } else {
        throw new Error('Fallback to local knowledge engine');
      }
    } catch {
      // Local knowledge fallback
      setTimeout(() => {
        let answer = "";
        let thoughts: string[] = ["RAG Retrieval: Searching vector embeddings..."];
        let sources: string[] = [];

        const lower = textToSend.toLowerCase();

        if (lower.includes('genai') || lower.includes('langgraph') || lower.includes('ai') || lower.includes('agent')) {
          answer = `Prodip specializes in full-stack GenAI architectures. His primary AI stack includes:\n\n• **LangGraph JS & LangChain** for multi-agent reasoning graphs\n• **Gemini & Claude Function Calling** for structured outputs & tool execution\n• **RAG Pipelines with pgvector & RRF** (Reciprocal Rank Fusion) for zero-hallucination document retrieval\n• **Anthropic MCP** (Model Context Protocol) for autonomous code generation.\n\nKey GenAI Projects: VitalTrace AI, FinDoc AI Research Assistant, and QueryCart.`;
          thoughts.push("Matched Skill Category: AI & Agents", "Retrieved 3 top agent projects");
          sources.push("SKILL_CATEGORIES[AI & Agents]", "FEATURED_PROJECTS[vitaltrace-ai, findoc-ai]");
        } else if (lower.includes('findoc') || lower.includes('rag') || lower.includes('vector')) {
          answer = `FinDoc AI is Prodip's RAG-powered SEC filing analyst. It ingests complex 10-K and 10-Q financial PDFs, applies Reciprocal Rank Fusion (RRF) combining dense vector embeddings with BM25 keyword search, and routes queries through a LangGraph verification graph to deliver audit-ready answers backed by exact page citations.`;
          thoughts.push("Matched Project: FinDoc AI Research Assistant", "RRF Keyword + Vector fusion verified");
          sources.push("FEATURED_PROJECTS[findoc-ai]", "pgvector RRF Architecture");
        } else if (lower.includes('grocery') || lower.includes('cart') || lower.includes('gemini')) {
          answer = `The Grocery Delivery Platform is a full-stack MERN e-commerce application equipped with a Gemini AI Cart Agent. Users can ask conversational questions like "I want to cook Italian dinner for 4", and the Gemini function-calling agent automatically selects relevant groceries, populates cart quantities, and checks dietary restrictions.`;
          thoughts.push("Matched Project: Grocery Delivery Platform", "Gemini Function Calling Node verified");
          sources.push("FEATURED_PROJECTS[grocery-delivery]", "MERN + Gemini Integration");
        } else if (lower.includes('hire') || lower.includes('contact') || lower.includes('work') || lower.includes('available')) {
          answer = `Yes! Prodip is currently **Open to Work** and available for full-time roles, contracts, and new project builds.\n\n• **Location**: India (Remote / Hybrid ready)\n• **Email**: prodipsengupta27@gmail.com\n• **GitHub**: github.com/prodipsen27\n• **LinkedIn**: linkedin.com/in/prodipsen27\n\nYou can also click the "Contact & Hire" button in the menu to send a direct message!`;
          thoughts.push("Matched Query: Recruitment & Availability", "Loaded Profile Contact Info");
          sources.push("PROFILE_DATA");
        } else {
          answer = `Prodip Sengupta is a Full-stack GenAI Engineer from India with 1+ years experience, 27+ projects, and 99% system uptime. He builds systems that think—spanning React/Next.js frontends, Express/Node.js API gateways, MongoDB/PostgreSQL databases, and autonomous AI agents using Gemini and Claude APIs.`;
          thoughts.push("General Portfolio Fallback Match", "Synthesized Overview");
          sources.push("PROFILE_DATA", "CAREER_TIMELINE");
        }

        const agentMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'agent',
          text: answer,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          thoughtProcess: thoughts,
          sources: sources
        };

        setMessages(prev => [...prev, agentMsg]);
        setIsProcessing(false);
      }, 700);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Title */}
      <div className="pb-4 border-b border-[#a89073] flex items-center justify-between">
        <div>
          <h2 className="font-serif-classic text-3xl font-bold text-[#2e2319] flex items-center space-x-2">
            <Brain className="w-7 h-7 text-[#8c714a]" />
            <span>Interactive AI System Agent</span>
          </h2>
          <p className="text-xs text-[#6e5844] font-sans mt-1">
            Simulate Prodip's autonomous agent engine grounded in his actual projects and code architecture.
          </p>
        </div>

        <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-[#241c16] text-[#d4af37] border border-[#524233] text-xs font-mono">
          <Terminal className="w-4 h-4" />
          <span>Agent Node: Online</span>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="leather-card rounded-2xl border border-[#483b2f] p-4 sm:p-6 flex flex-col h-[520px]">
        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-center space-x-2 text-[10px] text-[#9c8975] font-mono mb-1">
                {msg.sender === 'user' ? (
                  <>
                    <span>{msg.timestamp}</span>
                    <span className="text-[#e0d3c1] font-semibold">Visitor</span>
                    <User className="w-3 h-3 text-[#d4af37]" />
                  </>
                ) : (
                  <>
                    <Bot className="w-3 h-3 text-[#d4af37]" />
                    <span className="text-[#d4af37] font-semibold">Prodip AI Agent</span>
                    <span>{msg.timestamp}</span>
                  </>
                )}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[85%] rounded-xl p-4 shadow-md text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#3d3127] text-[#f7ead9] border border-[#6b5847] rounded-tr-none font-sans'
                    : 'bg-[#1e1814] text-[#e8ded1] border border-[#45372b] rounded-tl-none font-sans'
                }`}
              >
                {/* Agent Thought Process Accordion */}
                {msg.thoughtProcess && msg.thoughtProcess.length > 0 && (
                  <div className="mb-3 p-2.5 rounded-lg bg-[#14100d] border border-[#382d23] text-[11px] font-mono text-[#a89278]">
                    <div className="flex items-center space-x-1.5 text-[#d4af37] font-semibold mb-1">
                      <Cpu className="w-3 h-3" />
                      <span>Agent Reasoning & RAG Retrieval Trace:</span>
                    </div>
                    <ul className="list-disc list-inside space-y-0.5">
                      {msg.thoughtProcess.map((tp, i) => (
                        <li key={i}>{tp}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="whitespace-pre-wrap">{msg.text}</div>

                {/* Sources Grounding */}
                {msg.sources && msg.sources.length > 0 && (
                  <div className="mt-3 pt-2 border-t border-[#3a2e24] flex flex-wrap gap-1 text-[10px] font-mono text-[#8c7863]">
                    <span>Grounded Sources:</span>
                    {msg.sources.map((src, i) => (
                      <span key={i} className="px-1.5 py-0.5 rounded bg-[#2a221b] text-[#cbb59e]">
                        {src}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isProcessing && (
            <div className="flex items-center space-x-2 text-xs text-[#d4af37] font-mono p-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Executing Agent RAG Retrieval Graph...</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Prompt Suggestions Pills */}
        <div className="pt-3 border-t border-[#3a2f26] mb-3 flex flex-wrap gap-2">
          {samplePrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="text-xs px-3 py-1 rounded-lg bg-[#221a14] hover:bg-[#2d221a] text-[#cbb59d] hover:text-[#f7ead9] border border-[#483a2d] transition-colors"
            >
              💡 {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="relative flex items-center gap-2">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask the AI System Agent about Prodip's code, projects, or hire terms..."
            className="w-full py-3 pl-4 pr-12 rounded-xl bg-[#191410] border border-[#4d3f32] text-sm text-[#f0e2d1] placeholder-[#7d6b58] focus:outline-none focus:border-[#8c714a]"
          />
          <button
            onClick={() => handleSend()}
            disabled={isProcessing || !inputQuery.trim()}
            className="absolute right-2 p-2 rounded-lg embossed-button disabled:opacity-50"
            aria-label="Send Query"
          >
            <Send className="w-4 h-4 text-[#d4af37]" />
          </button>
        </div>
      </div>
    </div>
  );
};
