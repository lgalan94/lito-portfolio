import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { getSkills } from "./skillApi";
import { getAllProjects } from "./projectApi";
import { getAllEmployment } from "./employmentApi";

const API_KEY = import.meta.env.VITE_API_KEY;

if (!API_KEY) {
  console.warn("Gemini API key missing. Chatbot disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });
let chat: Chat | null = null;

/* ----------------------------------------------------
   LOAD SKILLS, PROJECTS, EXPERIENCE FROM BACKEND
---------------------------------------------------- */
async function loadPortfolioData() {
  try {
    const [skills, projects, experience] = await Promise.all([
      getSkills(),
      getAllProjects(),
      getAllEmployment(),
    ]);

    return { skills, projects, experience };
  } catch (err) {
    console.error("Error loading portfolio data:", err);
    return null;
  }
}

/* ----------------------------------------------------
   FORMATTERS
---------------------------------------------------- */
function formatSkills(skills: Record<string, any[]>) {
  return Object.entries(skills)
    .map(([category, items]) => {
      const names = items.map((s) => s.name).join(", ");
      return `- ${category}: ${names}`;
    })
    .join("\n");
}

function formatProjects(projects: any[]) {
  return projects
    .map(
      (p) =>
        `- ${p.title}: ${p.description} (Tech: ${p.tags?.join(", ") || "N/A"})`
    )
    .join("\n");
}

function formatExperience(experience: any[]) {
  return experience
    .map(
      (e) =>
        `- ${e.role} at ${e.company} (${e.period}): ${
          Array.isArray(e.description)
            ? e.description.join(" ")
            : e.description
        }`
    )
    .join("\n");
}

/* ----------------------------------------------------
   INITIALIZE CHAT WITH LIVE DATA
---------------------------------------------------- */
export const startChat = async () => {
  if (!API_KEY) {
    return {
      isAvailable: false,
      async *sendMessageStream() {
        yield { text: "AI assistant unavailable — API key missing." };
      },
    };
  }

  const data = await loadPortfolioData();

  if (!data) {
    return {
      isAvailable: false,
      async *sendMessageStream() {
        yield { text: "Failed to load portfolio data. Try again later." };
      },
    };
  }

  const { skills, projects, experience } = data;

  /* ---------------------------------------------
     CONTACT INFO - HARD CODED HERE
  --------------------------------------------- */
  const CONTACT_EMAIL = "litojrgalan@gmail.com";
  const CONTACT_PHONE = "09079563771";

  const systemInstruction = `
You are PortfoBot — the AI assistant for Lito Galan Jr's portfolio.

RULES:
- Answer ONLY using the portfolio data and the contact info provided.
- Keep answers short, friendly, and helpful.
- If a question is off-topic or not covered by the data, say you don’t have that information.
- If the user asks for contact info, ALWAYS use this:
  Email: ${CONTACT_EMAIL}
  Phone: ${CONTACT_PHONE}

CONTACT INFO:
Email: ${CONTACT_EMAIL}
Phone: ${CONTACT_PHONE}

SKILLS:
${formatSkills(skills)}

PROJECTS:
${formatProjects(projects)}

EXPERIENCE:
${formatExperience(experience)}
`;

  chat = ai.chats.create({
    model: "gemini-2.5-flash",
    config: {
      systemInstruction,
    },
  });

  return {
    isAvailable: true,

    async *sendMessageStream(params: { message: string }): AsyncGenerator<GenerateContentResponse> {
      if (!chat) throw new Error("Chat not initialized.");

      const stream = await chat.sendMessageStream(params);

      for await (const chunk of stream) {
        yield chunk;
      }
    },
  };
};
