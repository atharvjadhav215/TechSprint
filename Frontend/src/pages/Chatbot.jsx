import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { api } from '../services/mockApi';
import { Button } from '../components/common/Button';

export const Chatbot = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Namaste! I am AgriBot. 🤖\nAsk me about weather, crop diseases, or market prices.", sender: 'bot', timestamp: new Date().toISOString() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), text: input, sender: 'user', timestamp: new Date().toISOString() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await api.chat.sendMessage(userMsg.text);
      setMessages(prev => [...prev, response]);
    } catch (error) {
      // Handle error
    } finally {
      setIsTyping(false);
    }
  };

  const handleMic = () => {
    // Basic Web Speech API Demo
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = 'en-US';
      recognition.start();
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
      };
    } else {
      alert("Voice input not supported in this browser.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
      {/* Chat Header */}
      <div className="bg-[var(--color-agro-green)] p-4 flex items-center justify-between text-white">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-full">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-bold text-lg">AgriBot Assistant</h2>
            <div className="flex items-center gap-1.5 opacity-90">
              <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
              <span className="text-xs font-medium">Online • Powered by AI</span>
            </div>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="text-white hover:bg-white/10" icon={Sparkles}>
          Clear Chat
        </Button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900/50" ref={scrollRef}>
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-end gap-2 max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.sender === 'user' ? 'bg-gray-200 dark:bg-gray-700' : 'bg-[var(--color-agro-green)] text-white'}`}>
                  {msg.sender === 'user' ? <User className="w-5 h-5 text-gray-500" /> : <Bot className="w-5 h-5" />}
                </div>
                
                <div 
                  className={`p-4 rounded-2xl shadow-sm ${
                    msg.sender === 'user' 
                      ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-br-none' 
                      : 'bg-[var(--color-agro-green)] text-white rounded-bl-none'
                  }`}
                >
                  <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.text}</p>
                  <p className={`text-[10px] mt-2 opacity-60 text-right ${msg.sender === 'bot' ? 'text-green-100' : 'text-gray-400'}`}>
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
             <div className="flex items-center gap-2 max-w-[80%]">
                <div className="w-8 h-8 rounded-full bg-[var(--color-agro-green)] text-white flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl rounded-bl-none shadow-sm flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
             </div>
          </motion.div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
        <form onSubmit={handleSend} className="flex items-center gap-3">
          <Button 
            type="button" 
            variant="secondary" 
            className="rounded-full w-12 h-12 p-0 flex items-center justify-center shrink-0" 
            onClick={handleMic}
          >
            <Mic className="w-5 h-5" />
          </Button>
          
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question here (e.g. 'Wheat disease check')..."
            className="flex-1 bg-gray-100 dark:bg-gray-900 border-0 rounded-full px-6 py-3 focus:ring-2 focus:ring-[var(--color-agro-green)] outline-none transition-all"
          />
          
          <Button 
            type="submit" 
            variant="primary" 
            className="rounded-full w-12 h-12 p-0 flex items-center justify-center shrink-0"
            disabled={!input.trim() || isTyping}
          >
            {isTyping ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </Button>
        </form>
      </div>
    </div>
  );
};
