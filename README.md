# AI_Hackathon

# 📚 AI Study Assistant 🤖

Your intelligent companion for learning and understanding — powered by Groq's blazing-fast LLaMA 3-70B model.

![App Screenshot](./screenshot.png)

---

## 🌟 Features

- 🧠 **Summarize:** Get the essence of long paragraphs or documents.
- 🌍 **Translate:** Translate any text to your chosen language (e.g., Hindi, Kannada, Spanish).
- 🧒 **Explain Like I’m 5 (ELI5):** Break down complex ideas into child-friendly explanations.
- 👩‍🏫 **Personalized Learning:** AI tutor-style explanations tailored to learners.
- ⚡ **Instant Explanation:** Quickly understand any term, topic, or line.
- 🎤 **Speech-to-Text (STT):** Input your query using your voice.
- 🔊 **Text-to-Speech (TTS):** Listen to any AI response with speak & stop controls.
- 📁 **File Upload:** Drop `.txt` or `.md` files to summarize content directly.
- 🕶 **Dark Mode + Study Mode:** Toggle focused visual experience for learners.
- 📜 **History View:** Browse past responses for quick reference.

---

## 🚀 Tech Stack

| Layer         | Tech Used                    |
|---------------|------------------------------|
| Frontend      | Next.js (React)              |
| Backend API   | Next.js API Route            |
| LLM Provider  | Groq (LLaMA3-70B-8192)       |
| Voice APIs    | Web Speech API               |
| Hosting       | Vercel                       |
| Styling       | Tailwind CSS / CSS Modules   |

---

## 🔑 Environment Variables

Create a `.env.local` file in the root with:

```env
GROQ_API_KEY=your_actual_groq_key_here
