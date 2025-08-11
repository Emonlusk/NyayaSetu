import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Mic, MicOff, Volume2, Copy, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useLanguage } from './LanguageProvider';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

const NyayaQA: React.FC = () => {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Namaste! I am your AI legal assistant. I can help you understand Indian laws, rights, and legal procedures. Ask me anything about Constitutional rights, Labour laws, Rent Control Acts, RTI procedures, or any legal query in English or Hindi.',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate typing indicator
    const typingMessage: Message = {
      id: 'typing',
      type: 'bot',
      content: '',
      timestamp: new Date(),
      isTyping: true
    };
    setMessages(prev => [...prev, typingMessage]);

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => prev.filter(msg => msg.id !== 'typing'));
      
      // Generate contextual response based on input
      let botResponse = "I understand your query. ";
      const query = inputMessage.toLowerCase();
      
      if (query.includes('rent') || query.includes('landlord') || query.includes('किराया')) {
        botResponse = "Based on Indian Rent Control Acts, here's what you need to know:\n\n• Rent cannot be increased arbitrarily - it must follow state-specific guidelines\n• Landlords cannot evict tenants without proper legal notice (usually 15-30 days)\n• Security deposits are typically limited to 2-3 months' rent\n• Any harassment by landlords is illegal under various state laws\n\nFor your specific state's rent control laws, I can provide more detailed information. Which state are you located in?";
      } else if (query.includes('salary') || query.includes('labour') || query.includes('pf') || query.includes('वेतन')) {
        botResponse = "Under the Labour Code 2020 and various employment laws:\n\n• PF (Provident Fund) is mandatory for establishments with 20+ employees\n• Minimum wages vary by state - currently ranges from ₹176 to ₹507 per day\n• Overtime payment is 2x regular wage for work beyond 8 hours\n• Maternity leave is 26 weeks with full pay\n• Notice period for termination varies by service length\n\nWhich specific aspect of labour law would you like me to explain in detail?";
      } else if (query.includes('rti') || query.includes('information') || query.includes('सूचना')) {
        botResponse = "RTI (Right to Information Act 2005) guidelines:\n\n• Any citizen can file RTI for government information\n• Application fee is ₹10 (free for BPL cardholders)\n• Response time: 30 days (48 hours for life-threatening matters)\n• First Appellate Authority if no response in 30 days\n• Information Commission for second appeal\n\nI can help you draft an RTI application. What information are you seeking from which government department?";
      } else if (query.includes('fir') || query.includes('police') || query.includes('complaint') || query.includes('शिकायत')) {
        botResponse = "For filing FIR (First Information Report):\n\n• Any person can file FIR for cognizable offenses\n• Police cannot refuse to register FIR\n• You have right to free copy of FIR\n• If police refuses, approach Superintendent of Police\n• For non-cognizable offenses, file complaint under Section 200 CrPC\n\nWhat type of incident do you need to report? I can guide you through the specific process.";
      } else {
        botResponse += "This appears to be a general legal query. Could you provide more specific details? I can help with:\n\n• Constitutional Rights & Fundamental Rights\n• Labour Laws & Employment Issues\n• Rent Control & Landlord-Tenant Disputes\n• RTI Applications & Government Information\n• Criminal Law & FIR Procedures\n• Civil Matters & Legal Notices\n• Consumer Protection\n• Women's Rights & Domestic Violence\n\nPlease specify your concern for detailed guidance.";
      }

      const botMessage: Message = {
        id: Date.now().toString(),
        type: 'bot',
        content: botResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    // Voice recognition would be implemented here
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
      {/* Header */}
      <div className="bg-white p-6 rounded-t-2xl border border-gray-200 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">NyayaQA - AI Legal Assistant</h2>
        <p className="text-gray-600">Ask questions about Indian law, rights, and legal procedures in English or Hindi</p>
      </div>

      {/* Messages */}
      <div className="flex-1 bg-white border-x border-gray-200 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`
              flex max-w-3xl space-x-3
              ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}
            `}>
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                ${message.type === 'user' 
                  ? 'bg-gradient-to-r from-orange-500 to-blue-500' 
                  : 'bg-gradient-to-r from-green-500 to-emerald-600'
                }
              `}>
                {message.type === 'user' ? (
                  <User size={16} className="text-white" />
                ) : (
                  <Bot size={16} className="text-white" />
                )}
              </div>
              
              <div className={`
                p-4 rounded-2xl
                ${message.type === 'user' 
                  ? 'bg-gradient-to-r from-orange-500 to-blue-500 text-white' 
                  : 'bg-gray-50 text-gray-900'
                }
              `}>
                {message.isTyping ? (
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                  </div>
                ) : (
                  <div>
                    <p className="whitespace-pre-line leading-relaxed">{message.content}</p>
                    {message.type === 'bot' && (
                      <div className="flex items-center space-x-2 mt-3 pt-3 border-t border-gray-200">
                        <button 
                          onClick={() => copyMessage(message.content)}
                          className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
                          title="Copy message"
                        >
                          <Copy size={14} />
                        </button>
                        <button className="p-1 text-gray-500 hover:text-gray-700 transition-colors" title="Read aloud">
                          <Volume2 size={14} />
                        </button>
                        <button className="p-1 text-gray-500 hover:text-green-600 transition-colors" title="Helpful">
                          <ThumbsUp size={14} />
                        </button>
                        <button className="p-1 text-gray-500 hover:text-red-600 transition-colors" title="Not helpful">
                          <ThumbsDown size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white p-6 rounded-b-2xl border border-gray-200 shadow-sm">
        <div className="flex items-end space-x-4">
          <div className="flex-1">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask your legal question in English or Hindi..."
              rows={3}
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
            />
          </div>
          
          <div className="flex flex-col space-y-2">
            <button
              onClick={toggleListening}
              className={`
                p-3 rounded-xl transition-all duration-200
                ${isListening 
                  ? 'bg-red-500 text-white hover:bg-red-600' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }
              `}
            >
              {isListening ? <MicOff size={20} /> : <Mic size={20} />}
            </button>
            
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="p-3 bg-gradient-to-r from-orange-500 to-blue-500 text-white rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NyayaQA;