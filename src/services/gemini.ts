import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

export const explainConcept = async (concept: string, subject: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `أنت مساعد تعليمي متخصص في الثانوية العامة المصرية. اشرح لي مفهوم "${concept}" في مادة "${subject}" بأسلوب سهل ومبسط للطالب المصري باللغة العربية العامية المثقفة.`,
      config: {
        systemInstruction: "أنت مدرس مصري خبير، تشرح الدروس بأسلوب مشوق ومبسط، وتستخدم أمثلة من الواقع المصري.",
      }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "عذراً، حدث خطأ في معالجة طلبك حالياً.";
  }
};

export const chatWithAI = async (message: string, history: any[]) => {
  try {
    const chat = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: "أنت المساعد الذكي لمنصة Thanaweya Elite. هدفك مساعدة الطالب في فهم الدروس، الإجابة على الأسئلة العلمية، تحفيز الطالب، وتنظيم وقته. تحدث باللغة العربية بأسلوب ودود.",
      }
    });

    // Note: History simplified for now as current SDK might need specific structure
    const response = await chat.sendMessage({
      message: message,
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "عذراً، أنا أواجه بعض الصعوبات التقنية حالياً.";
  }
};
