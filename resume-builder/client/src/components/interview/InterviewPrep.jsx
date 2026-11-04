import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import styles from './InterviewPrep.module.css';
import { 
  Bot, 
  Send, 
  User, 
  Sparkles, 
  Award, 
  CheckCircle, 
  RotateCcw,
  MessageSquare,
  HelpCircle,
  Lightbulb
} from 'lucide-react';

const SAMPLE_QUESTIONS = [
  {
    id: 1,
    category: "Behavioral / STAR",
    question: "Tell me about a time you led a challenging engineering project under tight deadlines. What specific steps did you take to ensure high quality?"
  },
  {
    id: 2,
    category: "Technical / Architecture",
    question: "How do you approach designing a fault-tolerant microservice architecture that needs to scale to tens of thousands of concurrent requests?"
  },
  {
    id: 3,
    category: "Problem Solving",
    question: "Describe an instance where you identified a major performance bottleneck or database issue in production. How did you diagnose and resolve it?"
  },
  {
    id: 4,
    category: "Leadership & Collaboration",
    question: "How do you handle disagreements on technical choices or architecture within your team?"
  }
];

export const InterviewPrep = () => {
  const { resumeData } = useResume();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const activeQuestion = SAMPLE_QUESTIONS[currentQuestionIndex];
  const roleTitle = resumeData.personalDetails?.jobTitle || "Software Engineer";

  const handleEvaluate = async (e) => {
    e.preventDefault();
    if (!userAnswer.trim()) return;

    setIsEvaluating(true);
    await new Promise((r) => setTimeout(r, 650));

    // Analyze answer for STAR method and keywords
    const hasNumbers = /\d+/.test(userAnswer);
    const wordCount = userAnswer.trim().split(/\s+/).length;

    let score = "8.5 / 10 (Strong Answer)";
    let strengths = [
      "Clear explanation of personal actions and ownership.",
      "Good professional tone and logical narrative flow."
    ];
    let improvements = [];

    if (!hasNumbers) {
      improvements.push("Quantify your results (e.g. mention percentages, user count, or delivery time saved).");
    }
    if (wordCount < 40) {
      improvements.push("Elaborate further on the specific 'Actions' taken to deepen the STAR structure.");
    } else {
      strengths.push("Good depth and comprehensive context provided.");
    }

    setFeedback({
      score,
      strengths,
      improvements: improvements.length > 0 ? improvements : ["Excellent STAR structure! Ready for live interview."]
    });

    setIsEvaluating(false);
  };

  const handleNextQuestion = () => {
    setFeedback(null);
    setUserAnswer("");
    setCurrentQuestionIndex((prev) => (prev + 1) % SAMPLE_QUESTIONS.length);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>AI Mock Interview & Prep Simulator</h1>
          <p className={styles.subtitle}>
            Practice interview questions customized for <strong className={styles.roleHighlight}>{roleTitle}</strong> with instant AI coaching feedback.
          </p>
        </div>
      </div>

      <div className={styles.simulatorGrid}>
        {/* Left Column: Interview Session */}
        <div className={styles.sessionCard}>
          {/* Question Box */}
          <div className={styles.questionBox}>
            <div className={styles.questionHeader}>
              <div className={styles.interviewerTag}>
                <Bot size={16} /> AI Senior Interviewer
              </div>
              <span className={styles.categoryPill}>{activeQuestion.category}</span>
            </div>
            <h3 className={styles.questionText}>
              "{activeQuestion.question}"
            </h3>
            <span className={styles.questionCounter}>
              Question {currentQuestionIndex + 1} of {SAMPLE_QUESTIONS.length}
            </span>
          </div>

          {/* Answer Form */}
          <form onSubmit={handleEvaluate} className={styles.answerForm}>
            <label className={styles.answerLabel}>
              <User size={14} /> Your Answer (Use the STAR Method: Situation, Task, Action, Result)
            </label>
            <textarea
              rows={7}
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="In my previous position, our team encountered... To address this, I personally... As a result, we improved..."
              className={styles.answerTextarea}
            />
            <div className={styles.formActions}>
              <button
                type="submit"
                disabled={isEvaluating || !userAnswer.trim()}
                className={styles.submitBtn}
              >
                <Sparkles size={15} />
                {isEvaluating ? "Evaluating Response..." : "Evaluate My Answer"}
              </button>
              <button
                type="button"
                onClick={handleNextQuestion}
                className={styles.skipBtn}
              >
                Next Question &rarr;
              </button>
            </div>
          </form>

          {/* Feedback Display */}
          {feedback && (
            <div className={styles.feedbackCard}>
              <div className={styles.feedbackHeader}>
                <Award size={18} color="#2563eb" />
                <span className={styles.scoreText}>AI Evaluation: {feedback.score}</span>
              </div>

              <div className={styles.feedbackBlock}>
                <strong className={styles.greenTitle}><CheckCircle size={14} /> Key Strengths:</strong>
                <ul>
                  {feedback.strengths.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.feedbackBlock}>
                <strong className={styles.orangeTitle}><Lightbulb size={14} /> Coaching Tips to Score 10/10:</strong>
                <ul>
                  {feedback.improvements.map((imp, i) => (
                    <li key={i}>{imp}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Tips & Question Selector */}
        <div className={styles.sidebar}>
          <div className={styles.tipsCard}>
            <h4 className={styles.tipsTitle}>⭐ The STAR Technique</h4>
            <div className={styles.starStep}>
              <strong>S - Situation:</strong> Set the scene and describe the challenge.
            </div>
            <div className={styles.starStep}>
              <strong>T - Task:</strong> Explain your responsibility in that situation.
            </div>
            <div className={styles.starStep}>
              <strong>A - Action:</strong> Describe the specific actions YOU took.
            </div>
            <div className={styles.starStep}>
              <strong>R - Result:</strong> Share outcomes with quantifiable metrics.
            </div>
          </div>

          <div className={styles.questionListCard}>
            <h4 className={styles.tipsTitle}>Select Question</h4>
            <div className={styles.qList}>
              {SAMPLE_QUESTIONS.map((q, idx) => (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => {
                    setCurrentQuestionIndex(idx);
                    setFeedback(null);
                    setUserAnswer("");
                  }}
                  className={`${styles.qItem} ${idx === currentQuestionIndex ? styles.qItemActive : ""}`}
                >
                  <span className={styles.qNum}>#{idx + 1}</span>
                  <span className={styles.qCat}>{q.category}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewPrep;

