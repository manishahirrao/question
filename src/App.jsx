import { useState, useEffect, useMemo } from 'react'
import { AnimatePresence } from 'framer-motion'
import GateCard from './components/GateCard'
import WelcomeSplash from './components/WelcomeSplash'
import Quiz from './components/Quiz'
import Results from './components/Results'
import GoodbyeScreen from './components/GoodbyeScreen'

// Floating hearts/sparkles background
function ParticlesBackground() {
  const particles = useMemo(() => {
    const emojis = ['💕', '✨', '💖', '🌸', '💗', '⭐', '🦋', '💘', '🌹', '💫']
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
  const [screen, setScreen] = useState('gate') // gate | welcome | quiz | results | goodbye
  const [score, setScore] = useState(0)

  const handleAccept = () => setScreen('welcome')
  const handleLeave = () => setScreen('goodbye')
  const handleStartQuiz = () => setScreen('quiz')
  const handleQuizComplete = (finalScore) => {
    setScore(finalScore)
    setScreen('results')
  }
  const handleRestart = () => {
    setScore(0)
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
        {screen === 'results' && (
          <Results
            key="results"
            score={score}
            totalQuestions={5}
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
