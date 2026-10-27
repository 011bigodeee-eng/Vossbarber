# VOSS Barber Lounge

Prévia institucional responsiva em português: Next.js 15, TypeScript, Tailwind CSS 4, Framer Motion e Lucide.

## Desenvolvimento

Requer Node.js 22+ e npm. No checkout existente (não é necessário criar worktree):

```sh
cd /workspace/Vossbarber
npm ci --cache /tmp/voss-npm-cache
npm run dev
```

## Validação e produção

```sh
npm run typecheck
npm run build
npm start
```

O servidor usa a porta 3000. Confira a página e os arquivos `/images/lounge.jpg`, `/images/cut.jpg`, `/images/beard.jpg` e `/images/groom.jpg`. Os botões de agendamento abrem WhatsApp com mensagem contextual; o mapa abre a busca pelo endereço informado. Galeria: clique para ampliar, Escape para fechar. O menu mobile oferece navegação por seções. Animações respeitam a preferência de movimento reduzido.

## Conteúdo editável

Dados comerciais, serviços, navegação, imagens e destinos estão em `src/lib/site.ts`. Estilos em `src/app/globals.css`; componentes em `src/components/voss-website.tsx`.

As imagens em `public/images` são conceituais, geradas por IA, e **não retratam a VOSS, sua equipe ou suas instalações**. Substitua por fotografias reais autorizadas antes da publicação comercial. Os originais foram preservados em `/workspace/generated_images`. Não foram incluídos preços, depoimentos ou benefícios não confirmados.

A prévia está configurada com `noindex, nofollow`. Antes de publicar: revisar o conteúdo e as imagens, trocar `robots` em `src/app/layout.tsx` para permitir indexação e definir `NEXT_PUBLIC_SITE_URL` com a URL pública HTTPS real para resolver imagens Open Graph. A URL não é obrigatória no desenvolvimento; nenhuma credencial é necessária. Não há backend, reservas persistentes ou envio automático: o visitante conclui o contato no WhatsApp.

## Testes no navegador

Execute `npm run test:e2e`. A suíte cobre desktop 1440px, mobile 390px e 360px, navegação interna, menu, Escape e foco na galeria, destinos do WhatsApp, arquivos de imagem e movimento reduzido. Usa Chromium de sistema quando disponível; em outra máquina, instale com `npx playwright install chromium` ou defina `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`.
