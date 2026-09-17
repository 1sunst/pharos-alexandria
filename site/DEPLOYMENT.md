# Publicação de Pharos

## Produção e prévia local

O site de produção utiliza Next.js. A prévia do Codex continua utilizando Vinext/Vite, sem alterar os comandos já usados durante o desenvolvimento.

- Prévia local: `npm run dev`
- Compilação da prévia: `npm run build`
- Compilação de produção: `npm run build:production`
- Servidor de produção local: `npm run start:production`

## Vercel

1. Conectar o repositório GitHub escolhido.
2. Se o repositório contiver esta pasta como subdiretório, definir **Root Directory** como `site`. Se o conteúdo de `site` estiver na raiz do repositório, deixar a raiz como diretório do projeto.
3. Selecionar o framework **Next.js** e Node.js 22.x ou superior compatível com as dependências.
4. A configuração `vercel.json` utiliza `npm run build:production` e a saída `.next`.
5. Validar primeiro um deploy de preview antes de disponibilizar a versão pública final.

O fluxo de reserva é demonstrativo e funciona no navegador, sem login, banco de dados, cobrança ou envio de e-mail. Não são necessárias credenciais de pagamento nem variáveis de ambiente para esse fluxo.

Não publicar `.env*`, caches, `node_modules`, `.next`, `dist`, estados locais do Wrangler ou arquivos internos do Codex. A configuração Cloudflare/Sites é exclusiva da prévia local e não faz parte do runtime de produção.
