import React, { useState } from 'react';
import { PromptBlock, PROMPT_VERSIONS, buildSystemInstruction } from '../config/promptBlocks';
import { REGULATORY_AND_NU_KNOWLEDGE } from '../config/simulatedData';
import {
  ShieldAlert,
  Sliders,
  History,
  BookOpen,
  Layers,
  RotateCcw,
  CheckCircle2,
  Copy,
  Download,
  Key,
  Info,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface PromptInspectorProps {
  blocks: PromptBlock[];
  onUpdateBlocks: (newBlocks: PromptBlock[]) => void;
  onResetToDefault: () => void;
  modelName: string;
  onChangeModel: (model: string) => void;
  temperature: number;
  onChangeTemperature: (temp: number) => void;
  customApiKey: string;
  onChangeApiKey: (key: string) => void;
}

export const PromptInspector: React.FC<PromptInspectorProps> = ({
  blocks,
  onUpdateBlocks,
  onResetToDefault,
  modelName,
  onChangeModel,
  temperature,
  onChangeTemperature,
  customApiKey,
  onChangeApiKey,
}) => {
  const [activeTab, setActiveTab] = useState<'blocks' | 'raw' | 'diff' | 'regulatory' | 'architecture'>('blocks');
  const [expandedBlockId, setExpandedBlockId] = useState<string>('scope_eligibility');
  const [copied, setCopied] = useState(false);
  const [showKeyInput, setShowKeyInput] = useState(false);

  const handleBlockChange = (id: string, newContent: string) => {
    const updated = blocks.map((b) => (b.id === id ? { ...b, content: newContent } : b));
    onUpdateBlocks(updated);
  };

  const fullPromptText = buildSystemInstruction(blocks);

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(fullPromptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPrompt = () => {
    const blob = new Blob([fullPromptText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'SYSTEM_INSTRUCTIONS_SOS_NU_v3.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 border-r border-slate-800 text-slate-200">
      {/* Top Header do Console */}
      <div className="p-4 border-b border-slate-800 bg-slate-950/70">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500 animate-pulse" />
            <h1 className="text-sm font-bold tracking-wide text-white flex items-center gap-1.5">
              <span>CONSOLE DE ENGENHARIA & PROMPT</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-950/80 text-purple-300 border border-purple-800">
                AI Studio Build v3.0
              </span>
            </h1>
          </div>
          <button
            onClick={() => setShowKeyInput(!showKeyInput)}
            className="text-xs flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors border border-slate-700"
            title="Configurar Chave Gemini API"
          >
            <Key className="w-3.5 h-3.5 text-amber-400" />
            <span>{customApiKey ? 'Chave Configurada' : 'Chave API'}</span>
          </button>
        </div>

        {/* Campo Expansível de Chave API */}
        {showKeyInput && (
          <div className="mt-3 p-3 rounded-lg bg-slate-900 border border-slate-700 text-xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-semibold text-slate-300 flex items-center gap-1">
                <Key className="w-3.5 h-3.5 text-purple-400" /> Chave Gemini API (Google AI Studio)
              </span>
              <span className="text-[10px] text-slate-400">Armazenamento local seguro</span>
            </div>
            <input
              type="password"
              placeholder="Cole sua GEMINI_API_KEY aqui (opcional se rodando no AI Studio)"
              value={customApiKey}
              onChange={(e) => onChangeApiKey(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
            <p className="mt-1.5 text-[10px] text-slate-400 leading-relaxed">
              No Google AI Studio Build, o ambiente injeta automaticamente <code className="text-purple-300">process.env.API_KEY</code>.
              Se preferir rodar sem chave, o sistema usa o <strong>Fallback Determinístico do Playbook</strong>.
            </p>
          </div>
        )}

        {/* Navegação por Abas */}
        <div className="flex items-center gap-1 mt-3 overflow-x-auto pb-1 text-xs font-medium">
          <button
            onClick={() => setActiveTab('blocks')}
            className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'blocks'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Blocos Modulares ({blocks.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('raw')}
            className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'raw'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Prompt Completo</span>
          </button>
          <button
            onClick={() => setActiveTab('diff')}
            className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'diff'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Revisão Crítica de IA</span>
          </button>
          <button
            onClick={() => setActiveTab('regulatory')}
            className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'regulatory'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Bacen & Nu</span>
          </button>
          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'architecture'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Info className="w-3.5 h-3.5" />
            <span>Real × Simulado</span>
          </button>
        </div>
      </div>

      {/* Conteúdo Principal da Aba */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* ABA 1: BLOCOS MODULARES */}
        {activeTab === 'blocks' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400 pb-1">
              <span>Instruções em Blocos (Edição Dinâmica para a Banca)</span>
              <button
                onClick={onResetToDefault}
                className="flex items-center gap-1 text-purple-400 hover:text-purple-300 transition-colors"
                title="Restaura a versão de fábrica v3.0"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Restaurar v3.0</span>
              </button>
            </div>

            {blocks.map((block) => {
              const isExpanded = expandedBlockId === block.id;
              return (
                <div
                  key={block.id}
                  className={`rounded-lg border transition-all ${
                    block.isSafetyCritical
                      ? 'border-amber-700/60 bg-amber-950/20'
                      : isExpanded
                      ? 'border-purple-600/60 bg-slate-850 bg-slate-900/90'
                      : 'border-slate-800 bg-slate-950/40 hover:border-slate-700'
                  }`}
                >
                  <button
                    onClick={() => setExpandedBlockId(isExpanded ? '' : block.id)}
                    className="w-full px-3.5 py-2.5 flex items-center justify-between text-left"
                  >
                    <div className="flex items-center gap-2">
                      {block.isSafetyCritical && (
                        <span title="Guardrail Crítico de Segurança">
                          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
                        </span>
                      )}
                      <div>
                        <h3 className="text-xs font-semibold text-white">{block.title}</h3>
                        <p className="text-[11px] text-slate-400 line-clamp-1">{block.description}</p>
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="p-3 border-t border-slate-800 space-y-2">
                      <textarea
                        value={block.content}
                        onChange={(e) => handleBlockChange(block.id, e.target.value)}
                        rows={7}
                        className="w-full bg-slate-950 border border-slate-700 rounded-md p-2.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-purple-500 leading-relaxed resize-y"
                        placeholder="Instruções deste bloco..."
                      />
                      <div className="flex items-center justify-between text-[10px] text-slate-400">
                        <span>
                          {block.content.length} caracteres • Alterações têm efeito imediato no próximo turno do chat.
                        </span>
                        {block.isSafetyCritical && (
                          <span className="text-amber-400 font-medium">⚠️ Guardrail Regulatório / Segurança</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Parâmetros do Modelo */}
            <div className="mt-4 p-3.5 rounded-lg bg-slate-950/60 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-purple-400" />
                Parâmetros do Modelo no AI Studio
              </h4>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Modelo Selecionado</label>
                  <select
                    value={modelName}
                    onChange={(e) => onChangeModel(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="gemini-2.5-flash">Gemini 2.5 Flash (Rápido e Gratuito)</option>
                    <option value="gemini-2.5-pro">Gemini 2.5 Pro (Raciocínio Complexo)</option>
                  </select>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] text-slate-400">Temperatura</label>
                    <span className="font-mono text-purple-400 font-semibold">{temperature}</span>
                  </div>
                  <input
                    type="range"
                    min="0.0"
                    max="1.0"
                    step="0.05"
                    value={temperature}
                    onChange={(e) => onChangeTemperature(parseFloat(e.target.value))}
                    className="w-full accent-purple-500"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">
                    {temperature <= 0.4
                      ? 'Baixa: Alta precisão e adesão às normas do MED.'
                      : 'Alta: Mais flexível, maior risco de alucinação.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ABA 2: PROMPT RAW COMPLETO */}
        {activeTab === 'raw' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span>Texto compilado pronto para copiar no AI Studio Playground</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyPrompt}
                  className="px-2.5 py-1 rounded bg-purple-600 hover:bg-purple-500 text-white flex items-center gap-1 transition-colors"
                >
                  {copied ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copiado!' : 'Copiar'}</span>
                </button>
                <button
                  onClick={handleDownloadPrompt}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1 transition-colors border border-slate-700"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Baixar .txt</span>
                </button>
              </div>
            </div>
            <pre className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-[11px] font-mono text-slate-300 overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-[500px]">
              {fullPromptText}
            </pre>
          </div>
        )}

        {/* ABA 3: REVISÃO CRÍTICA DE IA (OBRIGATÓRIO NO EDITAL) */}
        {activeTab === 'diff' && (
          <div className="space-y-4">
            <div className="p-3 rounded-lg bg-purple-950/30 border border-purple-800/60 text-xs">
              <h4 className="font-bold text-purple-300 flex items-center gap-1.5 mb-1">
                <History className="w-4 h-4 text-purple-400" />
                Decisão que Revisei por Conta Própria (Exigência do PDF)
              </h4>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                O enunciado exige expressamente: <em>"Explique brevemente como você utilizou IA e apresente uma decisão que revisou por conta própria."</em>
                Abaixo está a comparação documental comprovando o veto humano e a evolução técnica:
              </p>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-red-950/30 border border-red-800/60 text-xs">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-red-400">❌ Sugestão Bruta Inicial da IA (v1.0 - VETADA)</span>
                  <span className="text-[10px] bg-red-900/50 text-red-300 px-1.5 py-0.5 rounded">Risco de Churn e Compliance</span>
                </div>
                <p className="text-[11px] text-slate-300 italic mb-2">
                  "Fique tranquilo, o Nubank vai cancelar a transação Pix e estornar todo o seu dinheiro de volta na sua conta em até 24 horas úteis."
                </p>
                <div className="text-[10px] text-red-300/90 space-y-1">
                  <strong>Por que foi vetada:</strong>
                  <ul className="list-disc list-inside space-y-0.5 text-slate-400">
                    <li>Pela Resolução BCB nº 103/2021, o banco de origem <strong>não pode cancelar um Pix unilateralmente</strong>. O MED depende de haver saldo na conta de destino.</li>
                    <li>Prometer estorno garantido em 24h acalma o cliente no minuto 1, mas gera uma quebra catastrófica de confiança no 7º dia se a devolução for negada — criando detratores definitivos no NPS.</li>
                  </ul>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-800/60 text-xs">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-emerald-400">✅ Decisão Humana Implementada (v3.0 - APROVADA)</span>
                  <span className="text-[10px] bg-emerald-900/50 text-emerald-300 px-1.5 py-0.5 rounded">Transparência Radical</span>
                </div>
                <p className="text-[11px] text-slate-200 mb-2 font-mono bg-slate-950/60 p-2 rounded">
                  "O Nubank abre a notificação oficial do MED no Banco Central. As instituições receptoras bloqueiam cautelarmente o saldo que ainda estiver disponível nas contas vinculadas e realizam a análise em até 7 dias corridos."
                </p>
                <p className="text-[10px] text-emerald-300/90">
                  <strong>Benefício real:</strong> O cliente recebe acolhimento empático com expectativas calibradas com a verdade regulatória, preservando a confiança institucional.
                </p>
              </div>
            </div>

            {/* Histórico de Versões */}
            <div className="border-t border-slate-800 pt-3">
              <h5 className="text-xs font-bold text-slate-300 mb-2">Linha do Tempo das Versões do Prompt</h5>
              <div className="space-y-2">
                {PROMPT_VERSIONS.map((pv) => (
                  <div key={pv.version} className="p-2.5 rounded bg-slate-950/60 border border-slate-800 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-purple-300">{pv.label}</span>
                      <span className="text-[10px] text-slate-400">{pv.date}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">{pv.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ABA 4: FONTES REGULATÓRIAS (BACEN E NU) */}
        {activeTab === 'regulatory' && (
          <div className="space-y-4 text-xs">
            <div>
              <h4 className="font-bold text-slate-200 mb-2 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-purple-400" />
                Resoluções Públicas do Banco Central do Brasil
              </h4>
              <div className="space-y-2">
                {REGULATORY_AND_NU_KNOWLEDGE.bcb_resolutions.map((res, i) => (
                  <div key={i} className="p-2.5 rounded bg-slate-950/60 border border-slate-800">
                    <span className="font-bold text-purple-300 block">{res.code} — {res.title}</span>
                    <p className="text-[11px] text-slate-400 mt-1">{res.rule}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-slate-200 mb-2 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-purple-400" />
                Ferramentas Oficiais de Segurança do Nubank Mencionadas
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {REGULATORY_AND_NU_KNOWLEDGE.nu_tools.map((tool, i) => (
                  <div key={i} className="p-2.5 rounded bg-slate-950/60 border border-slate-800">
                    <span className="font-bold text-white block text-[11px]">{tool.name}</span>
                    <p className="text-[10px] text-slate-400 mt-1">{tool.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ABA 5: REAL VS SIMULADO */}
        {activeTab === 'architecture' && (
          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
              <h4 className="font-bold text-slate-200 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-purple-400" />
                Delimitação de Escopo (Transparência com a Banca)
              </h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Conforme exigido pelo desafio, todas as fronteiras da solução estão mapeadas e sinalizadas:
              </p>
            </div>

            <div className="space-y-2">
              <div className="p-2.5 rounded bg-emerald-950/20 border border-emerald-800/40">
                <span className="font-bold text-emerald-400 block text-xs">🟢 O QUE É 100% REAL</span>
                <ul className="list-disc list-inside text-[11px] text-slate-300 mt-1 space-y-0.5">
                  <li>Processamento de linguagem natural via Gemini (@google/genai).</li>
                  <li>Manutenção de contexto multi-turno de mensagens em tempo real.</li>
                  <li>Injeção e modificação instantânea de System Instructions.</li>
                  <li>Filtragem de senhas e bloqueio contra jailbreaks.</li>
                </ul>
              </div>

              <div className="p-2.5 rounded bg-amber-950/20 border border-amber-800/40">
                <span className="font-bold text-amber-400 block text-xs">🟡 O QUE É SIMULADO (MOCK)</span>
                <ul className="list-disc list-inside text-[11px] text-slate-300 mt-1 space-y-0.5">
                  <li>Geração de números de protocolo (ex.: SOS-2026-XXXX).</li>
                  <li>Perfis de clientes fictícios (Marina, Roberto, Helena).</li>
                  <li>Consulta de chaves Pix e status de bloqueio bancário.</li>
                </ul>
              </div>

              <div className="p-2.5 rounded bg-red-950/20 border border-red-800/40">
                <span className="font-bold text-red-400 block text-xs">🔴 FORA DE ESCOPO</span>
                <ul className="list-disc list-inside text-[11px] text-slate-300 mt-1 space-y-0.5">
                  <li>Movimentação real de dinheiro ou cancelamento de Pix em produção.</li>
                  <li>Atendimento de dúvidas sobre empréstimos, investimentos ou faturas.</li>
                  <li>Acesso a dados cadastrais ou financeiros reais de clientes.</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
