import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../services/geminiService';
import { SIMULATED_PERSONAS, QUICK_TEST_PROMPTS, SimulatedPersona } from '../config/simulatedData';
import {
  Send,
  Trash2,
  Download,
  AlertTriangle,
  FileText,
  User,
  Sparkles,
  ShieldCheck,
  Bot,
  ArrowRight,
  RefreshCw,
} from 'lucide-react';

interface ChatSimulatorProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  onClearChat: () => void;
  isLoading: boolean;
  selectedPersona: SimulatedPersona | null;
  onSelectPersona: (persona: SimulatedPersona | null) => void;
}

export const ChatSimulator: React.FC<ChatSimulatorProps> = ({
  messages,
  onSendMessage,
  onClearChat,
  isLoading,
  selectedPersona,
  onSelectPersona,
}) => {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;
    onSendMessage(inputText.trim());
    setInputText('');
  };

  const handleExportTranscript = () => {
    const textLog = messages
      .map(
        (m) =>
          `[${m.timestamp.toLocaleTimeString()}] ${m.role === 'user' ? 'CLIENTE' : 'SOS NU'}:\n${m.content}\n`
      )
      .join('\n----------------------------------------\n\n');

    const blob = new Blob([textLog], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `TRANSCRIPT_DEMO_SOS_NU_${new Date().toISOString().slice(0, 10)}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100">
      {/* Topo do App — Estilo Nubank */}
      <div className="bg-[#820AD1] p-3.5 border-b border-purple-800 text-white shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center font-bold text-sm tracking-tighter">
              nu
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold tracking-tight">SOS Nu — Emergências & Segurança</h2>
                <span className="text-[10px] bg-purple-900/60 text-purple-200 px-1.5 py-0.5 rounded border border-purple-400/30 flex items-center gap-1 font-mono">
                  <ShieldCheck className="w-3 h-3 text-emerald-300" />
                  PROTÓTIPO V3.0
                </span>
              </div>
              <p className="text-[11px] text-purple-200/90">
                Acolhimento Imediato • Triagem MED 2.0 • Handoff Especializado
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleExportTranscript}
              disabled={messages.length === 0}
              className="p-1.5 rounded-md hover:bg-white/10 text-purple-200 hover:text-white transition-colors disabled:opacity-40"
              title="Exportar Registro da Conversa (.txt)"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={onClearChat}
              className="p-1.5 rounded-md hover:bg-white/10 text-purple-200 hover:text-white transition-colors"
              title="Limpar Conversa"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Seletor de Persona de Teste */}
        <div className="mt-2.5 pt-2 border-t border-purple-700/50 flex items-center gap-1.5 overflow-x-auto text-[11px]">
          <span className="text-purple-200 text-[10px] uppercase font-semibold shrink-0">Cenário:</span>
          <button
            onClick={() => onSelectPersona(null)}
            className={`px-2 py-0.5 rounded-full shrink-0 transition-all ${
              selectedPersona === null
                ? 'bg-white text-purple-900 font-bold shadow-sm'
                : 'bg-purple-900/40 text-purple-200 hover:bg-purple-800/60'
            }`}
          >
            Modo Livre (Banca)
          </button>
          {SIMULATED_PERSONAS.map((p) => (
            <button
              key={p.id}
              onClick={() => onSelectPersona(p)}
              className={`px-2 py-0.5 rounded-full shrink-0 transition-all flex items-center gap-1 ${
                selectedPersona?.id === p.id
                  ? 'bg-white text-purple-900 font-bold shadow-sm'
                  : 'bg-purple-900/40 text-purple-200 hover:bg-purple-800/60'
              }`}
            >
              <span>{p.name.split(' ')[0]}</span>
              <span className="text-[9px] opacity-75">
                ({p.eligibleForMED ? 'MED' : 'Comercial'})
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Card da Persona Ativa (Se selecionada) */}
      {selectedPersona && (
        <div className="bg-purple-950/40 border-b border-purple-900/60 px-4 py-2 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="w-3.5 h-3.5 text-purple-400" />
            <span className="font-semibold text-white">{selectedPersona.name}</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                selectedPersona.eligibleForMED
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                  : 'bg-amber-950 text-amber-300 border border-amber-800'
              }`}
            >
              {selectedPersona.tag}
            </span>
          </div>
          <span className="text-[11px] text-purple-300/80 font-mono">
            {selectedPersona.details.value}
          </span>
        </div>
      )}

      {/* Área de Mensagens */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-900/30 border border-purple-800 flex items-center justify-center text-purple-400 shadow-inner">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-200">Pronto para a Demonstração</h3>
              <p className="text-xs text-slate-400 max-w-sm mt-1 leading-relaxed">
                Clique em um teste rápido abaixo ou digite sua mensagem para iniciar a simulação com a banca.
              </p>
            </div>

            {/* Pílulas de Teste Rápido */}
            <div className="w-full max-w-md pt-2 space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Testes Rápidos Recomendados (Playbook do Edital)
              </span>
              <div className="grid grid-cols-2 gap-1.5 text-left">
                {QUICK_TEST_PROMPTS.slice(0, 4).map((qt) => (
                  <button
                    key={qt.id}
                    onClick={() => onSendMessage(qt.prompt)}
                    className="p-2 rounded-lg bg-slate-900 hover:bg-slate-850 hover:border-purple-600 border border-slate-800 text-[11px] text-slate-300 transition-all group flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between text-[10px] text-purple-400 font-semibold mb-1">
                      <span>{qt.category}</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                    <span className="font-medium text-slate-200 line-clamp-1">{qt.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1`}
              >
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 px-1">
                  <span>{isUser ? 'Cliente' : 'SOS Nu'}</span>
                  <span>•</span>
                  <span>{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>

                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed shadow-sm ${
                    isUser
                      ? 'bg-purple-600 text-white rounded-tr-none'
                      : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
                  }`}
                >
                  {/* Alerta de Segurança se ativado */}
                  {msg.securityTriggered && (
                    <div className="mb-2 p-2 rounded bg-amber-950/60 border border-amber-700/60 text-amber-300 flex items-center gap-2 text-[11px] font-semibold">
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>GUARDRAIL DE SEGURANÇA ACIONADO (ZERO SENHAS)</span>
                    </div>
                  )}

                  {/* Conteúdo da Mensagem com suporte a quebras de linha e negrito */}
                  <div className="whitespace-pre-wrap space-y-2">{msg.content}</div>

                  {/* Selo se for protocolo simulado */}
                  {msg.isSimulatedProtocol && (
                    <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-[10px] text-purple-400 font-mono">
                      <span className="flex items-center gap-1 font-semibold">
                        <FileText className="w-3.5 h-3.5" />
                        HANDOFF ESTRUTURADO PARA XPEER
                      </span>
                      <span className="bg-purple-950/80 px-1.5 py-0.5 rounded border border-purple-800 text-purple-300">
                        SIMULAÇÃO
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}

        {/* Indicador de Digitação */}
        {isLoading && (
          <div className="flex items-center gap-2 text-slate-400 text-xs p-2">
            <div className="w-6 h-6 rounded-full bg-purple-900/40 border border-purple-800 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-spin" />
            </div>
            <span className="animate-pulse">SOS Nu analisando diretrizes do Banco Central...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Barra de Testes Rápidos Inline (Aparece quando já há mensagens) */}
      {messages.length > 0 && (
        <div className="px-3 py-1.5 bg-slate-900/60 border-t border-slate-800 flex items-center gap-1.5 overflow-x-auto text-[10px]">
          <span className="text-slate-400 uppercase font-semibold shrink-0">Atalhos:</span>
          {QUICK_TEST_PROMPTS.map((qt) => (
            <button
              key={qt.id}
              onClick={() => onSendMessage(qt.prompt)}
              className="px-2 py-0.5 rounded bg-slate-800 hover:bg-purple-900/50 hover:text-purple-300 text-slate-300 transition-colors shrink-0 border border-slate-700/50"
              title={qt.expectedBehavior}
            >
              {qt.label}
            </button>
          ))}
        </div>
      )}

      {/* Caixa de Entrada de Mensagem */}
      <form onSubmit={handleSubmit} className="p-3 bg-slate-900 border-t border-slate-800">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Digite a mensagem do cliente (ex.: 'Fiz um Pix e caí num golpe')..."
            disabled={isLoading}
            className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="p-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white transition-colors disabled:opacity-40 disabled:hover:bg-purple-600 shadow-md"
            title="Enviar mensagem (Enter)"
          >
            {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </div>
        <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400 px-1">
          <span>
            {messages.length > 0
              ? `${Math.floor(messages.length / 2)} turnos mantidos na memória contextual`
              : 'Pronto para simular'}
          </span>
          <span className="font-mono text-purple-400">Pressione Enter para enviar</span>
        </div>
      </form>
    </div>
  );
};
