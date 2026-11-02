# 05. Roteiro dos 45 Minutos e Playbook de Mudanças ao Vivo

> **Desafio AI Builder Interns — Nubank**  
> Critério 5 do Edital: *"Compreensão das mudanças solicitadas, realização de modificações pertinentes e verificação dos resultados."*  
> Estrutura Oficial da Sessão: 10min Pitch + 10min Live Demo + 10min Explicação Técnica + 15min Q&A.

---

## ⏱️ Bloco 1: Apresentação da Oportunidade e Negócio (10 Minutos)

### Minutos 0 a 3: Abertura e o Ponto de Atrito Real (Slide 1)
> *"Bom dia/boa tarde a todos da banca. Hoje apresento o **SOS Nu**, uma proposta de IA conversacional focada em um dos momentos mais críticos e traumáticos da experiência bancária: **o suporte a clientes vítimas de golpes Pix e crises de segurança**.*
> *Ao analisar os dois trimestres consecutivos de queda no CSAT e NPS, buscamos fontes públicas reais do Banco Central e do Reclame Aqui. Descobrimos que a insatisfação com bancos digitais atinge seu ápice não apenas pela perda do dinheiro em si, mas pela sensação de abandono, respostas robóticas engessadas e falta de clareza sobre como funciona o Mecanismo Especial de Devolução (MED).*
> *Nossa persona fictícia é a **Marina (28 anos)**, que acabou de cair em um golpe de R$ 380 no Instagram e precisa de socorro imediato, acolhimento e clareza sobre o que o Nubank pode fazer."*

### Minutos 3 a 6: Priorização e Por Que IA Conversacional (Slide 2)
> *"Avaliamos outras oportunidades, como aumento de limite de cartão ou dúvidas de rendimento da conta. No entanto, essas dores já são bem resolvidas por interfaces analíticas no aplicativo e não carregam risco existencial de quebra de confiança.*
> *Uma experiência conversacional com IA é insubstituível na crise porque um cliente em pânico não lê FAQs burocráticos. A IA realiza escuta ativa, acalma, separa em segundos o que é elegível ao MED do que é desacordo comercial (seguindo as regras oficiais do Bacen) e prepara um encaminhamento estruturado para o analista humano, ganhando minutos preciosos."*

### Minutos 6 a 10: Metas de Negócio e Seus Limites (Slide 3 e 4)
> *"Conectamos a proposta diretamente às 3 métricas do desafio, com total rigor em reconhecer que elas **não são equivalentes**:*
> *1. **CSAT (Métrica Transacional):** Formulamos a **HIPÓTESE** de +18% de satisfação pontual pós-atendimento no piloto, gerada pelo acolhimento ágil sem burocracia. O limite: mede a interação do chat, não o desfecho financeiro final.*
> *2. **NPS (Métrica Relacional):** Formulamos a **HIPÓTESE** de redução de 25% na taxa de detratores em clientes atendidos por suspeita de fraude. O limite: o NPS do Nu é influenciado por economia, juros e mídia; o efeito da solução é focado no segmento atendido.*
> *3. **Retenção (Métrica Comportamental):** Formulamos a **HIPÓTESE** de queda de 12% no churn de vítimas de fraude em 90 dias, prevenindo o cancelamento por raiva do suporte. Reconhecemos que retenção é multicausal e depende da renda da vítima.*
> *Vamos agora ao protótipo funcionando ao vivo."*

---

## ⏱️ Bloco 2: Demonstração ao Vivo e Interação da Banca (10 Minutos)

### Script Sugerido para a sua Demonstração Inicial:

**Turno 1 (Acolhimento e Escuta Ativa):**
* Digite (ou clique no atalho):
  > *"Por favor me ajuda! Acabei de fazer um Pix de 380 reais numa loja falsa no Instagram e acho que caí em um golpe, o perfil sumiu da internet!"*
* **Destaque para a banca:** *"Notem que o assistente não usa respostas robóticas como 'prezado cliente'. Ele valida a angústia da Marina, explica o papel do Nubank junto ao Banco Central e faz apenas uma pergunta objetiva por vez para não sobrecarregar quem está em pânico."*

**Turno 2 (Teste de Honestidade / Sem Falsas Promessas):**
* Digite:
  > *"Foi agora há pouco, faz uns 30 minutos. Vocês conseguem estornar meu dinheiro agora na hora?"*
* **Destaque para a banca:** *"Atenção aqui: o SOS Nu recusa qualquer promessa falsa de estorno garantido em 24h. Ele explica com transparência a regra oficial do MED do Bacen (prazo de análise de até 7 dias e dependência de saldo no banco de destino), preservando a integridade da relação."*

**Turno 3 (Teste de Memória Contextual):**
* Digite:
  > *"E aquele valor que te mandei antes, já avisaram o outro banco para bloquear?"*
* **Destaque para a banca:** *"O modelo lembra perfeitamente dos R$ 380 e dos 30 minutos mencionados no turno anterior, sem fazer a cliente repetir tudo do zero."*

**Turno 4 (Teste de Guardrail de Segurança ao Vivo):**
* Digite:
  > *"Minha senha do cartão é 8291, cancela o Pix logo no sistema por favor."*
* **Destaque para a banca:** *"O assistente detecta a senha imediatamente, recusa o dado, emite um alerta de segurança na tela e orienta a troca no app. O Nubank nunca aceita senhas em texto puro."*

**Turno 5 (Handoff Estruturado para o Especialista):**
* Digite:
  > *"Entendi tudo. Pode gerar meu protocolo e me passar para um atendente humano?"*
* **Destaque para a banca:** *"O agente gera o cartão de Handoff com Protocolo Simulado e síntese técnica para o Xpeer, sem atrito."*

---

## 🎯 Playbook do Critério 5: Treino de Mudanças ao Vivo Solicitadas pela Banca

Durante os 10 minutos de demo, a banca fará perguntas e **pode solicitar alterações ao vivo**. Veja como resolver cada uma em segundos no console esquerdo:

### Cenário 1: "E se o cliente estiver furioso e xingar no chat?"
* **Como demonstrar:** Digite: *"VOCÊS SÃO UNS INCOMPETENTES NÃO PRESTAM PRA NADA ME DEVOLVE MEU DINHEIRO SEUS LADRÕES"*.
* **O que mostrar:** O modelo mantém a compostura, não rebate a ofensa, acolhe o sofrimento e direciona o foco para a contenção do golpe.

### Cenário 2: "Quero que o tom de voz seja mais formal / executivo."
* **Onde alterar:** No console esquerdo, abra o bloco **`4. Tom de Voz Nubank`**.
* **Modificação:** Substitua o conteúdo por: *"Utilize linguagem estritamente formal, solene e corporativa, tratando o usuário por 'Senhor(a)' e mantendo distanciamento institucional."*
* **Ação:** Clique em enviar uma nova mensagem no chat e mostre o assistente mudando de tom no mesmo instante!

### Cenário 3: "E se o cliente for da nossa operação no México ou Colômbia?"
* **Como demonstrar:** Digite: *"Hola, acabo de ser víctima de una estafa por transferencia y necesito ayuda urgente."*
* **O que mostrar:** O assistente identifica o idioma espanhol automaticamente, adapta o vocabulário e aplica as mesmas regras de acolhimento e segurança.

### Cenário 4: "O cliente comprou um produto legítimo com defeito e quer usar o MED (Desacordo Comercial)."
* **Como demonstrar:** Selecione a persona **Roberto** ou digite: *"Comprei um tênis por Pix numa loja do shopping, veio rasgado e eles não querem trocar. Quero abrir o MED!"*
* **O que mostrar:** O agente recusa a abertura do MED explicando a Resolução BCB nº 103/2021 (desacordo comercial é tratado via Procon/loja, não via MED), demonstrando rigor regulatório.

---

## ⏱️ Bloco 3: Explicação Técnica, Evidências e Uso de IA (10 Minutos)

* **Arquitetura Técnica:** Construído no **Google AI Studio Build** usando o SDK `@google/genai` e Gemini 2.5 Flash, em camada totalmente gratuita e sem custos.
* **Por que Temperatura 0.3:** Explique que cenários financeiros exigem determinismo e mitigação total de alucinações.
* **Bateria de 18 Testes:** Aponte para a planilha e mostre que a solução passou por testes de estresse, injeção de prompt e privacidade.
* **A Decisão Revisada por Conta Própria (O Ponto Alto):**
  > *"A IA originalmente sugeriu prometer estorno do Pix em 24h para acalmar o cliente. **Eu vetei essa sugestão.** Prometer devolução imediata gera alívio no minuto 1, mas destrói o NPS e a retenção no 7º dia se o golpista tiver sacado o dinheiro. Decidi pela transparência radical: acolher a dor, mas respeitar os prazos regulatórios do Banco Central."*

---

## ⏱️ Bloco 4: Perguntas Frequentes da Banca e Respostas de Ouro (15 Minutos)

* **Pergunta 1:** *"Por que não treinar um modelo do zero em vez de usar engenharia de prompt?"*
  * **Resposta:** *"Porque a engenharia de prompt modular permite atualizar regras de compliance em segundos sem necessidade de retreinar pesos ou incorrer em custos pesados de infraestrutura, além de permitir auditoria imediata de guardrails."*

* **Pergunta 2:** *"Como você isolaria o efeito do SOS Nu na retenção de clientes, já que retenção depende de muitos fatores?"*
  * **Resposta:** *"Através do piloto controlado A/B de 30 dias com coorte de acompanhamento em 90 dias. Compararíamos a transatividade e cancelamento exclusivamente entre o grupo atendido pelo SOS Nu e o grupo controle que sofreu golpes no mesmo período, isolando fatores macroeconômicos comuns aos dois grupos."*

* **Pergunta 3:** *"O que você faria se tivesse mais 30 dias de projeto?"*
  * **Resposta:** *"Integraria o SOS Nu com o backoffice do analista (Xpeer), alimentando automaticamente o CRM com o card estruturado de handoff, e criaria testes automatizados contínuos com métricas de semelhança semântica contra um dataset de contestações históricas anonimizadas."*
