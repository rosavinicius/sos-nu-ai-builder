import React, { useState, useEffect } from 'react';
import { PromptInspector } from './src/components/PromptInspector';
import { ChatSimulator } from './src/components/ChatSimulator';
import { INITIAL_PROMPT_BLOCKS, PromptBlock, buildSystemInstruction } from './src/config/promptBlocks';
import { SimulatedPersona } from './src/config/simulatedData';
import { ChatMessage, sendChatMessage, getActiveApiKey } from './src/services/geminiService';

export default function App() {
  const [blocks, setBlocks] = useState<PromptBlock[]>(INITIAL_PROMPT_BLOCKS);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modelName, setModelName] = useState<string>('gemini-2.5-flash');
  const [temperature, setTemperature] = useState<number>(0.3);
  const [customApiKey, setCustomApiKey] = useState<string>('');
  const [selectedPersona, setSelectedPersona] = useState<SimulatedPersona | null>(null);

  // Carrega chave salva no LocalStorage se houver
  useEffect(() => {
    const savedKey = getActiveApiKey();
    if (savedKey) setCustomApiKey(savedKey);
  }, []);

  const handleUpdateApiKey = (newKey: string) => {
    setCustomApiKey(newKey);
    if (typeof window !== 'undefined') {
      localStorage.setItem('SOS_NU_GEMINI_API_KEY', newKey);
    }
  };

  const handleSelectPersona = (persona: SimulatedPersona | null) => {
    setSelectedPersona(persona);
    if (persona && messages.length === 0) {
      // Inicia a conversa automaticamente com a fala da persona escolhida
      handleSendMessage(persona.initialMessage);
    }
  };

  const handleSendMessage = async (userText: string) => {
    const userMessage: ChatMessage = {
      id: `usr_${Date.now()}`,
      role: 'user',
      content: userText,
      timestamp: new Date(),
    };

    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    setIsLoading(true);

    try {
      const systemInstruction = buildSystemInstruction(blocks);
      const result = await sendChatMessage({
        message: userText,
        history: messages, // histórico anterior
        systemInstruction,
        modelName,
        temperature,
        customApiKey,
      });

      const modelMessage: ChatMessage = {
        id: `mod_${Date.now()}`,
        role: 'model',
        content: result.text,
        timestamp: new Date(),
        isSimulatedProtocol: result.isSimulatedProtocol,
        securityTriggered: result.securityTriggered,
      };

      setMessages([...newHistory, modelMessage]);
    } catch (error) {
      console.error('Erro no envio de mensagem:', error);
      const errorMessage: ChatMessage = {
        id: `err_${Date.now()}`,
        role: 'model',
        content:
          '⚠️ Houve uma instabilidade momentânea na conexão. Por favor, tente enviar novamente sua mensagem ou confira sua chave no console.',
        timestamp: new Date(),
      };
      setMessages([...newHistory, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    setSelectedPersona(null);
  };

  const handleResetToDefault = () => {
    setBlocks(INITIAL_PROMPT_BLOCKS);
    setTemperature(0.3);
    setModelName('gemini-2.5-flash');
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-950">
      {/* Coluna Esquerda: Console de Prompt e Governança (48%) */}
      <div className="w-[48%] h-full">
        <PromptInspector
          blocks={blocks}
          onUpdateBlocks={setBlocks}
          onResetToDefault={handleResetToDefault}
          modelName={modelName}
          onChangeModel={setModelName}
          temperature={temperature}
          onChangeTemperature={setTemperature}
          customApiKey={customApiKey}
          onChangeApiKey={handleUpdateApiKey}
        />
      </div>

      {/* Coluna Direita: Simulador Conversacional Nubank (52%) */}
      <div className="w-[52%] h-full border-l border-slate-800">
        <ChatSimulator
          messages={messages}
          onSendMessage={handleSendMessage}
          onClearChat={handleClearChat}
          isLoading={isLoading}
          selectedPersona={selectedPersona}
          onSelectPersona={handleSelectPersona}
        />
      </div>
    </div>
  );
}
