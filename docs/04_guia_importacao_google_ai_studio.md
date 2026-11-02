# 04. Guia Completo de Importação e Uso no Google AI Studio

Este guia apresenta o passo a passo para carregar e demonstrar o projeto utilizando a sua conta Google com o plano **Google AI Pro** (ou qualquer conta Google gratuita).

Você possui **três opções de execução**, todas 100% alinhadas às regras do desafio:

---

## OPÇÃO 1 (Principal): Google AI Studio — Modo Build (Aplicação Web Completa)

O modo **Build** do Google AI Studio (`aistudio.google.com`) permite carregar aplicações web completas com visualização em tempo real e console interativo.

### Método A: Importar via Repositório GitHub (Sincronização Direta)
1. Crie um repositório no seu GitHub (público ou privado) com o nome `sos-nu-ai-builder`.
2. No terminal, envie os arquivos desta pasta para o seu repositório:
   ```bash
   cd /Users/viniciusrosa/Desktop/salesforce
   git init
   git add .
   git commit -m "feat: SOS Nu v3.0 para Google AI Studio Build"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/sos-nu-ai-builder.git
   git push -u origin main
   ```
3. Acesse **[aistudio.google.com](https://aistudio.google.com/)** e clique no menu **Build** (ou no botão `+` na barra de criação).
4. Selecione **Import from GitHub** e escolha o repositório `sos-nu-ai-builder`.
5. O Google AI Studio Build lerá o `metadata.json`, instalará as dependências e abrirá a aplicação em tela dividida com o chat ao lado do console de prompt.

### Método B: Importar via Arquivo ZIP
1. O arquivo limpo já está gerado na pasta:
   `entregaveis/sos_nu_aistudio_build.zip`
2. No Google AI Studio Build, crie um novo projeto e faça o upload do arquivo `.zip` ou arraste os arquivos de código.

---

## OPÇÃO 2 (Rápida / Sem Código): Google AI Studio — Modo Playground

Se durante a banca você quiser demonstrar a solução de forma minimalista sem abrir código, o modo **Chat Playground** nativo do Google AI Studio é perfeito e atende todos os requisitos do edital:

1. Acesse **[aistudio.google.com](https://aistudio.google.com/)** e clique em **Create Prompt > Chat Prompt**.
2. Na coluna esquerda, localize o campo **System Instructions**.
3. Abra o arquivo:
   `entregaveis/playground_backup/SYSTEM_INSTRUCTIONS_PLAYGROUND.md`
4. Copie todo o texto e cole dentro do campo **System Instructions**.
5. No painel de parâmetros à direita:
   * **Model:** Selecione `Gemini 2.5 Flash` (ou `Gemini 2.5 Pro`).
   * **Temperature:** Ajuste para `0.3`.
6. No campo de chat à direita, envie a mensagem da Marina:
   > *"Por favor me ajuda! Acabei de fazer um Pix de 380 reais numa loja falsa no Instagram e acho que caí em um golpe, o perfil sumiu da internet!"*
7. O assistente responderá imediatamente mantendo o contexto multi-turno e as diretrizes do MED.

---

## OPÇÃO 3 (Plano B Offline): Executar Localmente no Navegador

Para garantir que **nenhum problema de internet ou instabilidade de nuvem atrapalhe sua apresentação**, você pode deixar a aplicação rodando no seu próprio computador:

1. Abra o terminal na pasta do projeto:
   ```bash
   cd /Users/viniciusrosa/Desktop/salesforce
   npm run dev
   ```
2. O terminal exibirá:
   `➜  Local:   http://localhost:3000/`
3. Abra `http://localhost:3000/` no Google Chrome.
4. Você terá a interface completa em tela cheia pronta para compartilhamento no Google Meet / Zoom!

> [!TIP]
> **Dica para a banca:** Tenha `http://localhost:3000/` já aberto em uma aba do navegador antes de a chamada começar. Se a internet oscilar, você já estará com a tela pronta sem precisar esperar nada carregar.
