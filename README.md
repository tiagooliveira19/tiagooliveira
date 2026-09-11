# Tiago Oliveira — Currículo (GitHub Pages)

Site estático de apresentação do currículo, com **português/inglês**, **tema claro/escuro** e downloads de PDFs por cargo.

Stack: **Vite + HTML/CSS/JS**.

## Desenvolvimento local

```bash
npm install
npm run dev
```

Outros scripts:

```bash
npm run lint      # ESLint + Stylelint
npm run build     # gera dist/
npm run preview   # preview do build
```

## Contato

- LinkedIn: https://www.linkedin.com/in/otiagooliveira/
- GitHub: https://github.com/tiagooliveira19
- E-mail: tiagooliveira.work@hotmail.com

## Currículos (PDFs)

Adicione os arquivos em [`public/cvs/`](public/cvs/) com os nomes listados em [`public/cvs/README.md`](public/cvs/README.md). Os links da seção de downloads apontam para esses arquivos.

## Deploy no GitHub Pages

1. Faça push da branch `main`.
2. Em **Settings → Pages**, selecione a fonte **GitHub Actions**.
3. O workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) faz lint, build e publish.

URL esperada (repo `tiagooliveira`):

`https://<seu-usuario>.github.io/tiagooliveira/`

O `base` do Vite está em [`vite.config.js`](vite.config.js) como `/tiagooliveira/`. Se o repositório tiver outro nome (ou for site de usuário `username.github.io`), ajuste o `base` conforme necessário.

## Idioma e tema

- Idioma padrão: português (`?lang=pt` ou `?lang=en`).
- Preferência de idioma e tema ficam em `localStorage`.
- Na primeira visita, o tema respeita `prefers-color-scheme`.
