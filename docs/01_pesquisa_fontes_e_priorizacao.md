# 01. Pesquisa de Fontes Públicas e Matriz de Priorização

> **Desafio AI Builder Interns — Nubank**  
> Critério 1 do Edital: *"Definição clara do problema e do usuário, priorização fundamentada e relação plausível com CSAT, NPS e retenção."*

---

## 1. Contexto e Diagnóstico de Negócio

Durante dois trimestres consecutivos, a equipe executiva do Nubank identificou uma queda simultânea e estatisticamente significativa nos indicadores de satisfação (**CSAT**) e recomendação (**NPS**). A liderança levantou o alerta de que essa deterioração, se não contida, impactará a retenção e o churn de clientes.

No entanto, métricas agregadas apontam sintomas, não causas. Para descobrir a raiz do problema sem suposições infundadas, investigamos **fontes públicas reais e oficiais** sobre os atritos do Nubank e do setor financeiro digital no Brasil.

---

## 2. Levantamento em Fontes Públicas Reais

### A. Ranking de Reclamações do Banco Central do Brasil (BCB) — 2025/2026
* **Metodologia do BCB:** Calcula o índice de queixas procedentes por milhão de clientes. O Nubank possui mais de 100 milhões de clientes, mantendo um índice proporcional saudável (entre 9 e 13 pontos/milhão), mas com volume absoluto expressivo de ocorrências devido ao tamanho da base.
* **Principal motivo de atrito no setor:** Queixas relacionadas à **integridade, confiabilidade e segurança de operações de pagamento (Pix e Cartão)** lideram o topo das reclamações no Banco Central.
* **Fator crítico observado:** Procedimentos regulatórios de segurança — como o **Mecanismo Especial de Devolução (MED)** (Resoluções BCB nº 103/2021 e nº 493/2025) e **Bloqueios Cautelares de 72h** — geram alta insatisfação quando o cliente não entende os prazos ou quando a contestação é recusada sem explicação transparente.

### B. Plataformas de Defesa do Consumidor (Reclame Aqui e Consumidor.gov.br)
* **Padrão de queixas (outubro/2026):**
  1. *O cliente não reclama apenas do golpe sofrido*: A revolta e a nota 1 surgem quando, após ser vítima de fraude (falsa loja virtual, golpe do Pix ou engenharia social telefônica), o usuário recorre ao chat e cai em um looping de menus padronizados ou respostas genéricas de robôs ("aguarde análise").
  2. *Confusão sobre o papel do banco*: Clientes acreditam que o Nubank pode simplesmente "cancelar o Pix" unilateralmente, sem compreender que a devolução depende da existência de saldo remanescente na conta de destino do fraudador.
  3. *Uso indevido do MED*: Casos de mero *desacordo comercial* (produto com defeito ou atraso na entrega) tentam acionar o MED, que é negado pelas regras do Bacen, frustrando ainda mais o consumidor.

### C. Blog Oficial e Central de Ajuda do Nubank
* O próprio Nubank reconhece a gravidade do tema e já desenvolveu ferramentas proprietárias:
  * **Chamada Verificada:** Consulta em tempo real no app para checar se a ligação recebida é do Nu.
  * **Alô Protegido:** Bloqueio de chamadas fraudulentas com spoofing do 0800 do Nu.
  * **Me Roubaram:** Plataforma web emergencial para desconexão remota de aparelhos e cartões.
  * **Modo Rua:** Limites diferenciados fora de redes Wi-Fi confiáveis.
* **O elo faltante:** Essas ferramentas existem, mas no calor do susto o cliente não sabe qual usar ou onde encontrá-las. A IA conversacional atua como o maestro acolhedor que conecta a dor à ferramenta certa em segundos.

---

## 3. Matriz de Priorização de Oportunidades

Para justificar formalmente à banca por que priorizamos o **Apoio a Vítimas de Fraude Pix / MED (SOS Nu)** em detrimento de outros problemas do banco, estruturamos uma matriz multicritério com notas de 1 a 5:

| Oportunidade Analisada | Carga Emocional (Peso 3) | Frequência / Volume (Peso 2) | Impacto em Confiança/NPS (Peso 3) | Adequação a IA Conversacional (Peso 2) | Viabilidade Prototipagem (Peso 1) | **Score Ponderado** | Decisão |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **1. Apoio a Fraudes Pix / MED (SOS Nu)** | **5** (15) | **4** (8) | **5** (15) | **5** (10) | **5** (5) | **53 / 55** | 🏆 **PRIORIZADA** |
| 2. Contestação de Compras no Cartão | 3 (9) | 4 (8) | 3 (9) | 3 (6) | 4 (4) | 36 / 55 | Descartada (Fluxo já maduro no app) |
| 3. Bloqueio Preventivo Cautelar | 5 (15) | 3 (6) | 4 (12) | 4 (8) | 3 (3) | 44 / 55 | Incorporada como sub-fluxo do SOS Nu |
| 4. Dúvidas sobre Aumento de Limite | 2 (6) | 5 (10) | 2 (6) | 2 (4) | 4 (4) | 30 / 55 | Descartada (Resolvível via UX analítica) |
| 5. Rendimento da Conta e Caixinhas | 1 (3) | 4 (8) | 2 (6) | 2 (4) | 5 (5) | 26 / 55 | Descartada (Sem impacto crítico em churn) |

### Racional de Decisão para a Banca:
> *"Aumento de limite tem alto volume, mas baixo risco existencial. Já a fraude financeira possui carga emocional destrutiva máxima: o cliente sente medo, vergonha e urgência. É exatamente onde a interface estática do app falha e onde a IA conversacional agrega valor insubstituível: ouvindo ativamente, tranquilizando, filtrando a elegibilidade regulatória do MED e agilizando a ação das equipes especializadas."*

---

## 4. Definição da Persona e Cenário Fictício

* **Persona:** Marina Silva, 28 anos, analista de marketing, cliente Nubank há 4 anos.
* **Momento da Jornada:** Acabou de transferir R$ 380,00 via Pix para uma suposta loja no Instagram em promoção de eletrônicos. Cinco minutos depois, o perfil foi excluído da rede social e o código de rastreio informado era inválido.
* **Estado Emocional:** Taquicardia, raiva e sensação de desamparo imediato.
* **A Necessidade Real:** Marina não quer um artigo de 20 parágrafos sobre a Resolução 103 do Banco Central. Ela quer:
  1. Acolhimento humano que valide que ela está no lugar certo.
  2. Saber se há chance real de recuperar o dinheiro pelo MED.
  3. Saber exatamente quais os passos práticos que deve tomar agora (sem promessas falsas de estorno em 24h).
