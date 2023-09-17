# upload.ai

Integrating advanced machine learning models, **upload.ai** creates a seamless workflow for extracting spoken content
from videos and generating insightful text-based responses using **ChatGPT**.

## 💻 About

The whole application is implemented with Node `streams` to transfer large amounts of data by breaking them into manageable smaller chunks.

Since only spoken content is relevant to the AI models, the mp4 video is first converted to a compressed mp3 file.
This process is done completely **client-side** using `FFmpeg` with `WebAssembly`.

## 🤔 Running

To install the dependencies and run the project, you must have [Node.js](https://nodejs.org/) installed on your machine.
In this project, the LTS version [18.17.1](https://nodejs.org/en/blog/release/v18.17.1/) was used.

To clone this repository via terminal, use [Git](https://git-scm.com/).

<table>
<tr>
<td width="830px" align="center">Git Clone</td>
</tr>
<tr>
<td width="830px">

```bash
# HTTPS
git clone https://github.com/bonizario/upload-ai.git

# SSH
git clone git@github.com:bonizario/upload-ai.git

cd upload-ai
```

</td>
</table>

<table>
<tr>
<td width="830px" align="center">pnpm</td>
</tr>
<tr>
<td width="830px">

```bash
npm install -g pnpm

pnpm -v
```

</td>
</table>

<table>
<tr>
<td width="830px" align="center">API</td>
</tr>
<tr>
<td width="830px">

```bash
# API Dependencies
cd api && pnpm install

# Running the backend
pnpm run start:dev
```

</td>
</table>

<table>
<tr>
<td width="830px" align="center">Web</td>
</tr>
<tr>
<td width="830px">

```bash
# Web Dependencies
cd web && pnpm install

# Running the frontend
pnpm run dev
```

</td>
</table>

## 👋🏻 Get In Touch

I'd be happy to share some thoughts with you!

**LinkedIn**: https://www.linkedin.com/in/gabriel-bonizario/
