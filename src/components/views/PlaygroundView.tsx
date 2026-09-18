import React, { useState } from 'react';
import { 
  Sparkles, 
  Play, 
  RotateCcw, 
  Sliders, 
  Code2, 
  Copy, 
  Check, 
  Cpu, 
  Maximize2,
  Terminal,
  Zap
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const PlaygroundView: React.FC = () => {
  const { showToast } = useAuth();

  const [model, setModel] = useState<'gemini-3.8-flash' | 'gemini-3-pro' | 'nano-banana-2'>('gemini-3.8-flash');
  const [temperature, setTemperature] = useState<number>(0.7);
  const [topP, setTopP] = useState<number>(0.95);
  const [systemInstruction, setSystemInstruction] = useState('You are an advanced multimodal assistant on DelightyLabs. Provide concise, high-fidelity analytical feedback.');
  const [prompt, setPrompt] = useState('Benchmark the latency and visual fidelity differences between Nano Banana 2 and Gemini 3.8 Flash for real-time mobile graphics.');
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [metrics, setMetrics] = useState<{ latency: number; inputTokens: number; outputTokens: number } | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [viewCodeModal, setViewCodeModal] = useState(false);

  const handleRun = () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    setResponse(null);

    const start = performance.now();
    setTimeout(() => {
      const end = performance.now();
      const latency = Math.round(end - start + (model === 'gemini-3.8-flash' ? 140 : 380));
      
      let simulated = '';
      if (model === 'gemini-3.8-flash') {
        simulated = `### Benchmark Analysis: Gemini 3.8 Flash vs Nano Banana 2\n\n` +
          `1. **Latency Profile**:\n` +
          `   - **Gemini 3.8 Flash**: Mean TTFT (Time to First Token) of ~140ms on edge WebSockets. Ideal for instant chat and rapid multimodal perception.\n` +
          `   - **Nano Banana 2**: Focused on diffusion rasterization (~420ms per 1024x1024 frame). High sustained throughput for procedural 3D terrain.\n\n` +
          `2. **Visual Fidelity**:\n` +
          `   - Gemini 3.8 Flash handles high-frequency spatial reasoning, diagram decomposition, and OCR with 99.1% precision.\n` +
          `   - Nano Banana 2 excels in atmospheric light transport, weather simulation, and photorealistic material shaders.\n\n` +
          `*Recommendation*: Deploy Gemini 3.8 Flash as the primary reasoning orchestrator and pipe coordinate payloads to Nano Banana 2 for visual synthesis.`;
      } else {
        simulated = `Executing deep reasoning pass using ${model}...\nVerification completed across 3 synthetic benchmarks. Output fidelity sustained at high confidence (0.984).`;
      }

      setMetrics({
        latency,
        inputTokens: Math.round(prompt.length / 3.8) + 32,
        outputTokens: 218
      });
      setResponse(simulated);
      setIsLoading(false);
    }, 750);
  };

  const codeSnippet = `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.DELIGHTY_BETA_KEY });

async function runBenchmark() {
  const response = await ai.models.generateContent({
    model: '${model}',
    contents: '${prompt.replace(/'/g, "\\'")}',
    config: {
      temperature: ${temperature},
      topP: ${topP},
      systemInstruction: '${systemInstruction.replace(/'/g, "\\'")}',
    }
  });
  console.log(response.text);
}

runBenchmark();`;

  const copyCode = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopiedCode(true);
    showToast('Code snippet copied to clipboard');
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 pb-16">
      {/* Playground Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white tracking-tight">Playground</h1>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
              Workbench
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Test AI models with custom prompts and export code.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewCodeModal(!viewCodeModal)}
            className="px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium flex items-center gap-1.5 border border-zinc-700/60 transition-all"
          >
            <Code2 className="w-4 h-4 text-zinc-400" />
            <span>Get Code</span>
          </button>

          <button
            onClick={handleRun}
            disabled={isLoading || !prompt.trim()}
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-glow-sm active:scale-95"
          >
            {isLoading ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Running...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Run</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Export Drawer/Box */}
      {viewCodeModal && (
        <div className="p-4 rounded-2xl bg-[#090b0e] border border-zinc-800 space-y-2 animate-in fade-in duration-200">
          <div className="flex items-center justify-between text-xs border-b border-zinc-800 pb-2">
            <span className="font-mono text-zinc-400">TypeScript / Google GenAI SDK</span>
            <button
              onClick={copyCode}
              className="flex items-center gap-1 text-blue-400 hover:text-blue-300 font-medium"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? 'Copied' : 'Copy snippet'}</span>
            </button>
          </div>
          <pre className="text-xs text-zinc-300 font-mono overflow-x-auto p-2 leading-relaxed">
            {codeSnippet}
          </pre>
        </div>
      )}

      {/* Main Grid: Workspace & Parameters */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left 3 Cols: Prompt & Completion */}
        <div className="lg:col-span-3 space-y-4">
          {/* System Instructions */}
          <div className="p-4 rounded-2xl bg-[#14171f] border border-zinc-800 space-y-2">
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider">
              System Instruction
            </label>
            <input
              type="text"
              value={systemInstruction}
              onChange={(e) => setSystemInstruction(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-[#0c0e12] border border-zinc-800 text-zinc-200 focus:outline-none focus:border-blue-500 font-mono"
            />
          </div>

          {/* User Prompt Box */}
          <div className="p-4 rounded-2xl bg-[#14171f] border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                Prompt
              </label>
              <button
                onClick={() => setPrompt('')}
                className="text-xs text-zinc-400 hover:text-zinc-200 flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                Clear
              </button>
            </div>
            <textarea
              rows={5}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter prompt..."
              className="w-full p-3.5 text-sm rounded-xl bg-[#0c0e12] border border-zinc-800 text-zinc-100 focus:outline-none focus:border-blue-500 font-mono resize-none leading-relaxed"
            />
          </div>

          {/* Model Output / Response */}
          <div className="p-5 rounded-2xl bg-[#14171f] border border-zinc-800 min-h-[260px] space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2.5">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-semibold text-zinc-200">Model Output</span>
              </div>

              {metrics && (
                <div className="flex items-center gap-3 text-[11px] font-mono text-zinc-400">
                  <span className="text-emerald-400">Latency: {metrics.latency}ms</span>
                  <span>Tokens: {metrics.inputTokens} in / {metrics.outputTokens} out</span>
                </div>
              )}
            </div>

            {isLoading ? (
              <div className="py-12 flex flex-col items-center justify-center gap-3 text-zinc-400 text-xs">
                <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                <span>Running model inference...</span>
              </div>
            ) : response ? (
              <div className="text-xs sm:text-sm text-zinc-200 whitespace-pre-wrap font-sans leading-relaxed">
                {response}
              </div>
            ) : (
              <div className="py-12 text-center text-xs text-zinc-400 italic">
                Click "Run" to execute model inference.
              </div>
            )}
          </div>
        </div>

        {/* Right 1 Col: Model & Parameter Settings */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-[#14171f] border border-zinc-800 space-y-5">
            <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-blue-400" />
              Settings
            </h3>

            {/* Model Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-medium text-zinc-400">Model</label>
              <div className="space-y-1.5">
                {[
                  { id: 'gemini-3.8-flash', label: 'Gemini 3.8 Flash', desc: 'Fast, low latency multimodal' },
                  { id: 'gemini-3-pro', label: 'Gemini 3 Pro', desc: 'Complex reasoning & code' },
                  { id: 'nano-banana-2', label: 'Nano Banana 2', desc: 'High-res vision generation' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setModel(item.id as any)}
                    className={`w-full text-left p-2.5 rounded-xl border transition-all ${
                      model === item.id
                        ? 'bg-blue-600/20 border-blue-500/60 text-white'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    <div className="text-xs font-semibold">{item.label}</div>
                    <div className="text-[10px] text-zinc-400 mt-0.5">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Temperature Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400">Temperature</span>
                <span className="font-mono text-zinc-200 font-semibold">{temperature}</span>
              </div>
              <input
                type="range"
                min={0}
                max={2}
                step={0.1}
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="w-full accent-blue-500 bg-zinc-800 h-1.5 rounded-lg cursor-pointer"
              />
              <p className="text-[10px] text-zinc-400">Lower values are more deterministic.</p>
            </div>

            {/* Top-P Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400">Top P</span>
                <span className="font-mono text-zinc-200 font-semibold">{topP}</span>
              </div>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={topP}
                onChange={(e) => setTopP(parseFloat(e.target.value))}
                className="w-full accent-blue-500 bg-zinc-800 h-1.5 rounded-lg cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
