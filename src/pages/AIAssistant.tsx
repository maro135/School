import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, User, Bot, Sparkles, MessageSquare, Trash2, Zap, BrainCircuit } from 'lucide-react';
import { chatWithAI } from '../services/gemini';
import { useAuthStore } from '../store/useAuthStore';
import { toast } from 'sonner';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function AIAssistant() {
  const { profile } = useAuthStore();
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: `مرحباً ${profile?.name?.split(' ')[0] || ''}! أنا مساعدك الشخصي. كيف يمكنني مساعدتك في مذاكرتك اليوم؟` }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await chatWithAI(input, messages);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response || 'عذراً، لم أستطع معالجة طلبك.',
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      toast.error('حدث خطأ في الاتصال بالذكاء الاصطناعي');
    } finally {
      setIsTyping(false);
    }
  };

  const clearChat = () => {
    setMessages([{ id: '1', role: 'assistant', content: 'تم مسح المحادثة. كيف أساعدك الآن؟' }]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-purple-200">
            <BrainCircuit size={28} />
          </div>
          <div>
             <h2 className="text-2xl font-black text-slate-800 dark:text-white">المعلم الذكي</h2>
             <span className="text-xs font-bold text-green-500 flex items-center gap-1">
               <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
               متصل بالذكاء الاصطناعي
             </span>
          </div>
        </div>
        
        <button 
          onClick={clearChat}
          className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
        >
          <Trash2 size={20} />
        </button>
      </div>

      {/* Quick Prompts */}
      <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar pb-2">
         {[
           'اشرح لي التضخم',
           'كيف أنظم وقتي؟',
           'اختبرني في الكيمياء',
           'ملخص الفصل الأول فيزياء'
         ].map((prompt, i) => (
           <button 
            key={i}
            onClick={() => setInput(prompt)}
            className="whitespace-nowrap px-4 py-2 bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800 text-purple-700 dark:text-purple-400 rounded-full text-xs font-bold hover:bg-purple-100 transition-all"
           >
             {prompt}
           </button>
         ))}
      </div>

      {/* Chat Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto no-scrollbar space-y-6 p-6 bg-white dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-sm mb-6"
      >
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-3 max-w-[85%] ${message.role === 'user' ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`flex-1 p-5 rounded-[28px] ${
                  message.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tl-none' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tr-none'
                }`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                </div>
                <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center ${
                  message.role === 'user' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'
                }`}>
                  {message.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                </div>
              </div>
            </motion.div>
          ))}
          {isTyping && (
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="flex justify-start"
             >
               <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-3xl rounded-tr-none flex gap-2">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
               </div>
             </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="relative group">
         <div className="absolute inset-0 bg-purple-600/20 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
         <div className="relative bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-3xl p-2 flex items-center gap-2 pr-6">
            <input 
              type="text" 
              placeholder="اكتب سؤالك هنا..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 bg-transparent border-none outline-none text-slate-800 dark:text-white font-medium"
            />
            <button 
              onClick={handleSend}
              disabled={isTyping || !input.trim()}
              className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-100 disabled:opacity-50"
            >
               <Send size={20} className="rotate-180" />
            </button>
         </div>
      </div>
    </div>
  );
}
