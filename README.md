# PrepWise – AI Mock Interviews

PrepWise is a Next.js 15 application that helps users practice job interviews with AI. It features authentication, Firestore integration, Vapi AI voice assistant, and Google Gemini for advanced AI responses.

---

## 🚀 Features

- **AI-Powered Mock Interviews** (Vapi, Gemini, OpenAI)
- **User Authentication** (Firebase Auth)
- **Interview Feedback & History** (Firestore)
- **Voice Assistant** (Vapi SDK)
- **Modern UI** (Tailwind CSS, React)
- **Local Development with Firebase Emulators**

---

## 🛠️ Tech Stack

- **Next.js 15 (App Router)**
- **Firebase (Auth, Firestore)**
- **Vapi AI SDK**
- **Google Gemini API**
- **OpenAI API**
- **Tailwind CSS**
- **TypeScript**

---

## ⚡ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Lakshaya1008/prepwise.git
cd prepwise
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

- Copy `.env.example` to `.env.local` and fill in your credentials.
- **Never commit secrets or service account files!**

### 4. Run Firebase emulators (for local dev)

```bash
npm run emulators
```

### 5. Start the development server

```bash
npm run dev
```

---

## 🧑‍💻 Deployment

- Deploy easily on [Vercel](https://vercel.com/).
- Set all environment variables in the Vercel dashboard.
- **Do not use emulator variables in production.**

---

## 📁 Project Structure

```
ai_mock_interviews/
  ├── app/                # Next.js app directory
  ├── components/         # React components
  ├── firebase/           # Firebase config (do NOT commit secrets)
  ├── lib/                # Server actions, utilities
  ├── public/             # Static assets
  ├── types/              # TypeScript types
  ├── .env.example        # Example environment variables
  └── README.md           # This file
```

---

## 🛡️ Security

- **Never commit secrets or service account keys.**
- Use environment variables for all credentials.
- Review and secure your Firebase rules before production.

---

## 🙏 Credits

- [Vapi AI](https://vapi.ai/)
- [Google Gemini](https://ai.google.dev/)
- [OpenAI](https://openai.com/)
- [Firebase](https://firebase.google.com/)
- [Next.js](https://nextjs.org/)

---

## 📄 License

MIT

---

> Built with ❤️ by Lakshaya Jain
