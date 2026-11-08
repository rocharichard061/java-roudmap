# DEVPATH — Java Back-end Roadmap · 180 Days

Aplicação de estudo mobile first, com identidade dark premium preto/branco/vermelho.

## Rodar localmente (sem instalação)

A pasta `dist/` já contém uma versão estática pronta. Abra um servidor HTTP dentro dela:

```bash
cd dist
python3 -m http.server 8000
```

Acesse `http://localhost:8000`.

## Desenvolvimento com Vite

```bash
npm install
npm run dev
npm run test
npm run build
```

O código-fonte encontra-se em `src/`. A pasta `dist/` também pode ser regenerada offline com `python3 build_static.py`, que gera os mesmos conteúdos sem depender de npm.

## Publicar na Vercel

Opção 1 (sem build): importe o repositório na Vercel, escolha framework **Other**, deixe Build Command vazio e configure Output Directory para `dist`. A versão `dist/` já está no ZIP.

Opção 2 (Vite): rode `npm install` localmente. Na Vercel, use Framework Preset **Vite**, Build Command `npm run build` e Output Directory `dist`.

O roteamento utiliza URL hash (`#home`, `#roadmap`, `#study/64`), portanto não exige rewrites de backend.

## Conteúdo

Os 180 títulos, objetivos, exercícios e evidências foram extraídos do PDF `Java_Backend_180_Dias_Editorial_Red_2027.pdf`. Os links do YouTube são **pesquisas temáticas**, e não vídeos específicos selecionados e verificados. As quatro tarefas do checklist foram normalizadas para acompanhamento.

## Privacidade e persistência

Os dados ficam em `localStorage` (`devpath:v1`), no navegador. Não há conta, API, banco de dados ou sincronização entre dispositivos. Use a opção **Exportar JSON** em Configurações e guarde backups regularmente. O tempo é contabilizado apenas quando se registra uma sessão.

## UX e acessibilidade

- Feedback imediato e status visíveis após conclusão, anotação e importação (Heurística 1: visibilidade do status do sistema).
- Linguagem consistente com a jornada de estudos (2: correspondência com o mundo real).
- Possibilidade de desfazer conclusão, navegar sem bloqueios e cancelar importação (3: controle e liberdade).
- Componentes, estados e navegação padronizados (4: consistência).
- Confirmações de ações destrutivas, importação validada e limites numéricos (5: prevenção de erros).
- Módulos expansíveis, rótulos e indicadores visuais sem necessidade de memorização (6: reconhecimento).
- Pesquisa, filtros e navegação por dias (7: flexibilidade e eficiência).
- Dark de alto contraste, tipografia legível e ruído visual reduzido (8: design minimalista).
- Mensagens de erro específicas e retorno contextual (9: reconhecimento e recuperação de erros).
- Instruções de backup, tempo de estudo e fontes no app e README (10: ajuda e documentação).

Outros cuidados: foco por teclado, alvos de toque com pelo menos 44px, `prefers-reduced-motion`, sem barra horizontal, navegação inferior mobile e sidebar desktop.

## Qualidade

`node --test tests/*.test.js` valida integridade do roadmap, cálculo de progresso, registro de horas e backup. `node --check dist/app.js` valida a sintaxe do bundle estático.
