import { useState, useEffect, useMemo } from 'react'
import { AnimatePresence } from 'framer-motion'
import GateCard from './components/GateCard'
import WelcomeSplash from './components/WelcomeSplash'
import Quiz from './components/Quiz'
import Results from './components/Results'
import ConfirmScreen from './components/ConfirmScreen'
import GoodbyeScreen from './components/GoodbyeScreen'
import { sendAnswersToEmail, sendConfirmationToEmail } from './utils/sendEmail'

// Floating particles background
function ParticlesBackground() {
  const particles = useMemo(() => {
    const emojis = ['✨', '🚀', '⭐', '🔥', '🎯', '⚡', '🦋', '🌟', '🎮', '💫']
    return Array.from({ length: 25 }, (_, i) => ({
      id: i,
      emoji: emojis[i % emojis.length],
      left: `${Math.random() * 100}%`,
      animationDuration: `${8 + Math.random() * 12}s`,
      animationDelay: `${Math.random() * 8}s`,
      fontSize: `${0.8 + Math.random() * 1.2}rem`,
    }))
  }, [])

  return (
    <div className="particles-bg">
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            animationDuration: p.animationDuration,
            animationDelay: p.animationDelay,
            fontSize: p.fontSize,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  )
}

function App() {
  const [screen, setScreen] = useState('gate') // gate | welcome | quiz | confirm | results | goodbye
  const [answers, setAnswers] = useState({})
  const [honestAnswer, setHonestAnswer] = useState(null)

  const handleAccept = () => setScreen('welcome')
  const handleLeave = () => setScreen('goodbye')
  const handleStartQuiz = () => setScreen('quiz')
  const handleQuizComplete = (finalAnswers) => {
    setAnswers(finalAnswers)
    setScreen('confirm')
    // Silently send answers to email
    sendAnswersToEmail(finalAnswers)
  }
  const handleConfirmYes = () => {
    setHonestAnswer('yes')
    setScreen('results')
    sendConfirmationToEmail(answers, 'yes')
  }
  const handleConfirmNo = () => {
    setHonestAnswer('no')
    setScreen('results')
    sendConfirmationToEmail(answers, 'no')
  }
  const handleRestart = () => {
    setAnswers({})
    setHonestAnswer(null)
    setScreen('gate')
  }

  return (
    <>
      <ParticlesBackground />
      <AnimatePresence mode="wait">
        {screen === 'gate' && (
          <GateCard
            key="gate"
            onAccept={handleAccept}
            onLeave={handleLeave}
          />
        )}
        {screen === 'welcome' && (
          <WelcomeSplash
            key="welcome"
            onComplete={handleStartQuiz}
          />
        )}
        {screen === 'quiz' && (
          <Quiz
            key="quiz"
            onComplete={handleQuizComplete}
          />
        )}
        {screen === 'confirm' && (
          <ConfirmScreen
            key="confirm"
            answers={answers}
            onConfirmYes={handleConfirmYes}
            onConfirmNo={handleConfirmNo}
          />
        )}
        {screen === 'results' && (
          <Results
            key="results"
            answers={answers}
            honestAnswer={honestAnswer}
            onRestart={handleRestart}
          />
        )}
        {screen === 'goodbye' && (
          <GoodbyeScreen
            key="goodbye"
            onBack={handleRestart}
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default App
