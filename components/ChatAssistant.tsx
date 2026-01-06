import React, { useState, useRef, useEffect } from "react";
import { generateAssistantResponse } from "@/services/geminiService";

interface Message {
  role: "user" | "model";
  text: string;
}

const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      text: "Assalamualaikum! Ada yang bisa saya bantu terkait informasi pendaftaran atau kegiatan di Yayasan Sunniyah Salafiyah?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setIsLoading(true);

    const response = await generateAssistantResponse(userMsg, messages);
    setMessages((prev) => [
      ...prev,
      {
        role: "model",
        text: response || "Maaf, saya tidak dapat merespon saat ini.",
      },
    ]);
    setIsLoading(false);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-6 size-14 rounded-full bg-primary text-black shadow-xl flex items-center justify-center z-[60] hover:scale-110 active:scale-95 transition-all animate-bounce-slow"
        style={{ animationDuration: "3s" }}
      >
        <span className="material-symbols-outlined text-[28px]">smart_toy</span>
      </button>

      {/* Chat Drawer/Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-end bg-black/50 backdrop-blur-sm px-4 pb-4">
          <div className="w-full max-w-[440px] h-[70vh] bg-surface-light dark:bg-surface-dark rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-slide-up border border-gray-100 dark:border-gray-800">
            {/* Header */}
            <div className="p-4 bg-primary flex justify-between items-center text-black">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined">smart_toy</span>
                <span className="font-bold">Asisten Sunniyah</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-black/10 p-1 rounded-full"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm ${
                      msg.role === "user"
                        ? "bg-primary text-black rounded-tr-none"
                        : "bg-gray-100 dark:bg-gray-800 text-text-main dark:text-white rounded-tl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-2xl rounded-tl-none">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Tanya info pendaftaran..."
                  className="flex-1 bg-white dark:bg-gray-800 border-none rounded-xl px-4 text-sm focus:ring-2 focus:ring-primary dark:text-white h-12"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading}
                  className="bg-primary text-black size-12 rounded-xl flex items-center justify-center hover:brightness-105 active:scale-95 disabled:opacity-50 transition-all"
                >
                  <span className="material-symbols-outlined">send</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out forwards;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow infinite;
        }
      `}</style>
    </>
  );
};

export default ChatAssistant;
