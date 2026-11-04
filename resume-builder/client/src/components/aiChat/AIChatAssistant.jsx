import React, { useState, useRef, useEffect } from 'react';
import { useResume } from '../../context/ResumeContext';
import styles from './AIChatAssistant.module.css';
import { 
  Bot, 
  X, 
  Send, 
  User, 
  Sparkles, 
  Minimize2, 
  Maximize2,
  HelpCircle,
  Zap
} from 'lucide-react';

const QUICK_PROMPTS = [
  "Suggest 5 strong action verbs for my experience",
  "How to highlight system architecture skills",
  "Write a compelling 3-line executive summary",
  "What keywords should I include for AWS and React?"
];

export const AIChatAssistant = () => {
  const { isAIChatOpen, setIsAIChatOpen, resumeData, updateSummary } = useResume();
  const [messages, setMessages] = useState([
    {
      id: "msg-1",
      sender: "ai",
      text: `Hello ${resumeData.personalDetails?.fullName?.split(" ")[0] || "there"}! I'm your ProResume AI Assistant. I can help optimize your bullet points, rewrite summaries, suggest tech keywords, or advise on interview strategy. How can I help you today?`
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isAIChatOpen) return null;

  const handleSendMessage = async (textToSend) => {
    const query = (textToSend || inputValue).trim();
    if (!query) return;

    const userMsg = { id: `usr-${Date.now()}`, sender: "user", text: query };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    await new Promise(r => setTimeout(r, 600));

    let aiReply = "Here is my advice: Focus on quantifying your business impact. For example: 'Engineered microservices architecture in React & Node.js, slashing response latency by 35% across 2M daily queries.'";
    
    if (query.toLowerCase().includes("verb")) {
      aiReply = "Top action verbs for your resume:\n• Spearheaded\n• Architected\n• Orchestrated\n• Accelerated\n• Streamlined\n• Engineered\nReplace passive phrases like 'was responsible for' with these verbs!";
    } else if (query.toLowerCase().includes("summary")) {
      aiReply = `Recommended Summary:\n\n"Results-oriented ${resumeData.personalDetails?.jobTitle || "Engineer"} with over 5+ years building scalable, high-availability web applications. Proven track record optimizing cloud infrastructure, improving API latency, and mentoring engineering teams to ship reliable software."`;
    } else if (query.toLowerCase().includes("keyword")) {
      aiReply = "Essential keywords for high ATS pass rate:\n• React 18, TypeScript, Node.js\n• CI/CD, Docker, Kubernetes\n• Cloud Architecture (AWS / GCP)\n• RESTful & GraphQL APIs\n• Automated Testing (Jest, Cypress)";
    }

    setMessages(prev => [...prev, { id: `ai-${Date.now()}`, sender: "ai", text: aiReply }]);
    setIsTyping(false);
  };

  return (
    <div className={styles.chatContainer}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.botIcon}>
            <Bot size={18} />
          </div>
          <div>
            <h4 className={styles.title}>ProResume AI Copilot</h4>
            <span className={styles.onlineStatus}>● Online & Ready</span>
          </div>
        </div>
        <button 
          type="button" 
          onClick={() => setIsAIChatOpen(false)} 
          className={styles.closeBtn}
          title="Close chat"
        >
          <X size={16} />
        </button>
      </div>

      {/* Quick Prompts */}
      <div className={styles.quickBar}>
        {QUICK_PROMPTS.map((prompt, i) => (
          <button
            key={i}
            type="button"
            onClick={() => handleSendMessage(prompt)}
            className={styles.quickBtn}
          >
            <Sparkles size={11} /> {prompt}
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div className={styles.messagesList}>
        {messages.map((m) => (
          <div 
            key={m.id} 
            className={`${styles.messageRow} ${m.sender === 'user' ? styles.userRow : styles.aiRow}`}
          >
            <div className={styles.msgAvatar}>
              {m.sender === 'user' ? <User size={13} /> : <Bot size={13} />}
            </div>
            <div className={styles.msgBubble}>
              <p>{m.text}</p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className={`${styles.messageRow} ${styles.aiRow}`}>
            <div className={styles.msgAvatar}><Bot size={13} /></div>
            <div className={styles.typingBubble}>
              <span></span><span></span><span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className={styles.inputArea}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask for bullet points, phrasing, or advice..."
          className={styles.chatInput}
        />
        <button type="submit" disabled={!inputValue.trim()} className={styles.sendBtn}>
          <Send size={15} />
        </button>
      </form>
    </div>
  );
};

export default AIChatAssistant;

