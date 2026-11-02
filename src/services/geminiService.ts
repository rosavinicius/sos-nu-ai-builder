import { GoogleGenAI } from '@google/genai';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model' | 'system';
  content: string;
  timestamp: Date;
  isSimulatedProtocol?: boolean;
  securityTriggered?: boolean;
}

export interface SendMessageOptions {
  message: string;
  history: ChatMessage[];
  systemInstruction: string;
  modelName?: string;
  temperature?: number;
  customApiKey?: string;
}

/**
 * Obtém a chave de API do Gemini em ordem de prioridade:
 * 1. Chave customizada informada no console da UI
 * 2. process.env.GEMINI_API_KEY (Vite / AI Studio)
 * 3. process.env.API_KEY (Google AI Studio Build)
 * 4. LocalStorage salvo
 */
export function getActiveApiKey(customKey?: string): string {
  if (customKey && customKey.trim().length > 0) {
    return customKey.trim();
  }
  const envKey =
    (typeof process !== 'undefined' && (process.env.GEMINI_API_KEY || process.env.API_KEY)) ||
    '';
  if (envKey && envKey.trim().length > 0) {
    return envKey.trim();
  }
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('SOS_NU_GEMINI_API_KEY');
    if (saved) return saved;
  }
  return '';
}

/**
 * Envia mensagem para o Gemini usando a SDK oficial @google/genai.
 * Se nenhuma chave estiver configurada no momento do teste, ativa um
 * fallback simulado com respostas determinísticas do playbook para
 * garantir que a demonstração da banca NUNCA trave por erro de rede.
 */
export async function sendChatMessage(options: SendMessageOptions): Promise<{
  text: string;
  securityTriggered: boolean;
  isSimulatedProtocol: boolean;
  isMockFallback: boolean;
}> {
  const { message, history, systemInstruction, modelName = 'gemini-2.5-flash', temperature = 0.3, customApiKey } =
    options;

  const apiKey = getActiveApiKey(customApiKey);

  // Verificação de Guardrail de Senha local prévia (defesa em profundidade)
  const passwordPattern = /\b(\d{4}|\d{6}|\d{8})\b/;
  const hasPasswordKeywords = /senha|código|token|cvv|cvc|chave de 4|senha de 4/i.test(message);
  const potentialPasswordLeak = hasPasswordKeywords && passwordPattern.test(message);

  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });

      // Converte o histórico para o formato esperado pelo @google/genai
      const contents = history
        .filter((msg) => msg.role === 'user' || msg.role === 'model')
        .map((msg) => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }],
        }));

      // Adiciona a mensagem atual do usuário
      contents.push({
        role: 'user',
        parts: [{ text: message }],
      });

      const response = await ai.models.generateContent({
        model: modelName,
        contents,
        config: {
          systemInstruction,
          temperature,
        },
      });

      const responseText = response.text || 'Entendi seu relato. Como posso te apoiar agora?';
      const isProtocol = /protocolo/i.test(responseText) && /sos-2026/i.test(responseText);

      return {
        text: responseText,
        securityTriggered: potentialPasswordLeak || /nunca compartilhe sua senha/i.test(responseText),
        isSimulatedProtocol: isProtocol,
        isMockFallback: false,
      };
    } catch (err: unknown) {
      console.warn('Aviso: Falha na chamada da API Gemini, acionando fallback guiado:', err);
      // Cai no fallback gracioso abaixo caso a internet ou cota falhe
    }
  }

  // FALLBACK DETERMINÍSTICO (Garante apresentação mesmo sem chave de API ativa)
  await new Promise((r) => setTimeout(r, 600)); // Simula latência natural
  const fallback = generateDeterministicFallback(message, potentialPasswordLeak);

  return {
    text: fallback.text,
    securityTriggered: potentialPasswordLeak || fallback.securityTriggered,
    isSimulatedProtocol: fallback.isSimulatedProtocol,
    isMockFallback: true,
  };
}

function generateDeterministicFallback(
  userMessage: string,
  passwordDetected: boolean
): { text: string; securityTriggered: boolean; isSimulatedProtocol: boolean } {
  const lower = userMessage.toLowerCase();

  if (passwordDetected || lower.includes('senha') || lower.includes('8291') || lower.includes('8831')) {
    return {
      text: `⚠️ **ALERTA DE SEGURANÇA IMEDIATO: NUNCA compartilhe sua senha ou código com ninguém, nem mesmo aqui no chat oficial do Nubank!**\n\nPor favor, **não repita nem registre senhas aqui**. Recomendo que você altere sua senha do aplicativo imediatamente em **Perfil > Segurança > Alterar senha de acesso**.\n\nFique tranquilo, suas informações anteriores foram recebidas. Vamos continuar cuidando da proteção da sua conta sem necessidade de informar senhas.`,
      securityTriggered: true,
      isSimulatedProtocol: false,
    };
  }

  if (lower.includes('desacordo') || lower.includes('tênis') || lower.includes('jaqueta') || lower.includes('defeito') || lower.includes('loja física')) {
    return {
      text: `Entendo a sua frustração com a compra do produto. Contudo, preciso ser muito transparente com você:\n\nPor **norma oficial do Banco Central do Brasil (Resolução BCB nº 103/2021)**, o **Mecanismo Especial de Devolução (MED) não se aplica a desacordos comerciais** (quando a compra foi feita voluntariamente em uma loja real, mas houve atraso, defeito ou insatisfação com a mercadoria).\n\nO MED é exclusivo para fraudes, golpes de engenharia social ou coação.\n\nPara o seu caso, o caminho correto é:\n1. Acionar diretamente o SAC ou ouvidoria da loja com o comprovante de pagamento.\n2. Se não houver acordo, registrar uma reclamação formal no **Procon** ou pelo portal **Consumidor.gov.br** anexando as conversas e a nota fiscal.\n\nPosso te ajudar com mais alguma dúvida sobre a segurança da sua conta?`,
      securityTriggered: false,
      isSimulatedProtocol: false,
    };
  }

  if (lower.includes('falsa central') || lower.includes('lucas') || lower.includes('conta cofre') || lower.includes('transferir') || lower.includes('ligou')) {
    return {
      text: `🚨 **ATENÇÃO: ISSO É UMA TENTATIVA DE GOLPE! NÃO FAÇA NENHUMA TRANSFERÊNCIA!**\n\nO Nubank **NUNCA liga para clientes solicitando transferências para "contas de segurança", "contas cofre" ou para cancelar transações suspeitas**.\n\nPor favor, tome as seguintes medidas agora mesmo:\n1. **Desligue a chamada imediatamente.**\n2. Abra seu app do Nu e use a ferramenta **Chamada Verificada** na tela inicial para confirmar que essa ligação não partiu de nós.\n3. Vá em **Perfil > Segurança > Aparelhos Autorizados** e desconecte qualquer dispositivo que você não reconheça.\n\nVocê chegou a passar alguma informação ou digitar senhas para essa pessoa?`,
      securityTriggered: true,
      isSimulatedProtocol: false,
    };
  }

  if (lower.includes('resumo') || lower.includes('protocolo') || lower.includes('humano') || lower.includes('especialista')) {
    return {
      text: `Entendido! Estou registrando o seu atendimento e preparando o encaminhamento imediato para nossa equipe especializada de segurança.\n\n📋 **RESUMO DE ENCAMINHAMENTO — SUPORTE ESPECIALIZADO NU**\n- **Protocolo de Simulação:** SOS-2026-7731 (Simulado)\n- **Incidente:** Notificação Preliminar de Suspeita de Fraude Pix (MED)\n- **Status da Notificação:** Análise Cautelar Interbancária Iniciada\n- **Prazo Regulatório (BCB):** Até 7 dias corridos para validação entre as instituições\n- **Medidas Imediatas Aplicadas:** Alerta preventivo emitido e dispositivos checados\n- **Próxima Etapa:** Transferindo o atendimento para o especialista humano com todo o histórico preservado.\n\nUm de nossos especialistas continuará o suporte com você a seguir.`,
      securityTriggered: false,
      isSimulatedProtocol: true,
    };
  }

  // Padrão de acolhimento de golpe recente (Marina)
  return {
    text: `Sinto muito por esse susto. Sei o quanto essa situação é angustiante, mas você está no lugar certo e vamos tomar todas as medidas de proteção agora mesmo.\n\nPara iniciarmos a notificação pelo **Mecanismo Especial de Devolução (MED do Banco Central)**, o Nubank comunicará imediatamente o banco para onde o valor foi enviado para tentar o bloqueio cautelar do saldo.\n\nPara darmos os passos certos:\n1. **Há quanto tempo exatamente você realizou esse Pix?** (O prazo regulatório do Bacen é de até 80 dias).\n2. Você ainda tem o comprovante da transferência com o nome ou chave de quem recebeu?`,
    securityTriggered: false,
    isSimulatedProtocol: false,
  };
}
