
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot,
  User,
  Sparkles,
  Minimize2
} from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your NyayaSetu assistant. How can I help you with legal services today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user' as const,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: "I understand you need assistance. For specific legal matters, I recommend consulting with our legal experts. You can file a complaint or request legal help through our platform.",
        sender: 'bot' as const,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const chatVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 20
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      y: 20,
      transition: { duration: 0.2 }
    }
  };

  const iconVariants = {
    idle: { rotate: 0, scale: 1 },
    hover: { rotate: 10, scale: 1.1 },
    tap: { scale: 0.9 }
  };

  return (
    <>
      {/* Chat Icon */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial="idle"
        whileHover="hover"
        whileTap="tap"
        variants={iconVariants}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-2xl shadow-blue-500/25 border-0 overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400"
            initial={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1, opacity: 0.2 }}
            transition={{ duration: 0.3 }}
          />
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 180, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6 text-white relative z-10" />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ rotate: 180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -180, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative z-10"
              >
                <MessageCircle className="w-6 h-6 text-white" />
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={chatVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`fixed bottom-24 right-6 z-40 bg-black/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl ${
              isMinimized ? 'w-80 h-16' : 'w-96 h-[500px]'
            } transition-all duration-300`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700/50">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">NyayaSetu Assistant</h3>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs text-gray-400">Online</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-gray-400 hover:text-white"
                >
                  <Minimize2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 h-80">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-xs px-4 py-2 rounded-2xl ${
                        message.sender === 'user' 
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white ml-4' 
                          : 'bg-gray-800 text-gray-100 mr-4'
                      }`}>
                        <div className="flex items-start space-x-2">
                          {message.sender === 'bot' && (
                            <Bot className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                          )}
                          {message.sender === 'user' && (
                            <User className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                          )}
                          <p className="text-sm">{message.text}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-gray-700/50">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type your message..."
                      className="flex-1 bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Button
                      onClick={handleSendMessage}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
