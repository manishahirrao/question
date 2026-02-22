import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const QUESTIONS = [
    {
        id: 1,
        question: "What's the most important thing in a relationship? 💕",
        options: ['Money', 'Trust & Loyalty', 'Looks', 'Fame'],
        correct: 1,
    },
    {
        id: 2,
        question: 'If your partner is sad, what should you do? 🥺',
        options: [
            'Ignore them',
            'Tell them to stop being dramatic',
            'Be there, listen & comfort them',
            'Give them space forever',
        ],
        correct: 2,
    },
    {
        id: 3,
        question: 'What makes someone truly beautiful? ✨',
        options: [
            'Expensive clothes',
            'A kind and loving heart',
            'Social media followers',
            'Being perfect',
        ],
        correct: 1,
    },
    {
        id: 4,
        question: "Love means... 💖",
        options: [
            'Changing someone completely',
            'Accepting someone with their flaws',
            'Only being happy',
            'Never disagreeing',
        ],
        correct: 1,
    },
    {
        id: 5,
        question: 'The person who sent you this link... 🌹',
        options: [
            "Doesn't care about you",
            'Sent it by accident',
            'Really likes you & thinks you\'re special',
            'Is just bored',
        ],
        correct: 2,
    },
]

const OPTION_LABELS = ['A', 'B', 'C', 'D']

export default function Quiz({ onComplete }) {
    const [currentQ, setCurrentQ] = useState(0)
    const [score, setScore] = useState(0)
    const [selected, setSelected] = useState(null)
    const [showFeedback, setShowFeedback] = useState(false)

    const question = QUESTIONS[currentQ]
    const isCorrect = selected === question.correct

    const handleSelect = useCallback(
        (optionIndex) => {
            if (selected !== null) return
            setSelected(optionIndex)
            setShowFeedback(true)

            const correct = optionIndex === question.correct
            const newScore = correct ? score + 1 : score

            if (correct) setScore(newScore)

            // Move to next question after delay
            setTimeout(() => {
                if (currentQ < QUESTIONS.length - 1) {
                    setCurrentQ((prev) => prev + 1)
                    setSelected(null)
                    setShowFeedback(false)
                } else {
                    onComplete(newScore)
                }
            }, 1500)
        },
        [selected, question.correct, score, currentQ, onComplete]
    )

    const progress = ((currentQ) / QUESTIONS.length) * 100

    return (
        <motion.div
            className="screen-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
        >
            <div className="quiz-container">
                {/* Progress Bar */}
                <div className="quiz-progress">
                    <div className="quiz-progress__bar-bg">
                        <motion.div
                            className="quiz-progress__bar-fill"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                        />
                    </div>
                    <div className="quiz-progress__text">
                        <span>Question {currentQ + 1} of {QUESTIONS.length}</span>
                        <span>Score: {score}/{QUESTIONS.length}</span>
                    </div>
                </div>

                {/* Question Card with AnimatePresence for transitions */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={question.id}
                        className="quiz-question-card"
                        initial={{ opacity: 0, x: 80, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -80, scale: 0.95 }}
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                    >
                        <motion.div
                            className="quiz-question__number"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            Question {currentQ + 1}
                        </motion.div>

                        <motion.h2
                            className="quiz-question__text"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            {question.question}
                        </motion.h2>

                        <div className="quiz-options">
                            {question.options.map((option, index) => {
                                let optionClass = 'quiz-option'
                                if (selected !== null) {
                                    optionClass += ' quiz-option--disabled'
                                    if (index === question.correct) {
                                        optionClass += ' quiz-option--correct'
                                    } else if (index === selected && !isCorrect) {
                                        optionClass += ' quiz-option--wrong'
                                    }
                                }

                                return (
                                    <motion.button
                                        key={index}
                                        className={optionClass}
                                        onClick={() => handleSelect(index)}
                                        initial={{ opacity: 0, x: 30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 + index * 0.1 }}
                                        whileHover={selected === null ? { scale: 1.02 } : {}}
                                        whileTap={selected === null ? { scale: 0.98 } : {}}
                                    >
                                        <span className="quiz-option__label">{OPTION_LABELS[index]}</span>
                                        {option}
                                    </motion.button>
                                )
                            })}
                        </div>

                        {/* Feedback */}
                        <AnimatePresence>
                            {showFeedback && (
                                <motion.div
                                    className={`quiz-feedback ${isCorrect ? 'quiz-feedback--correct' : 'quiz-feedback--wrong'}`}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {isCorrect
                                        ? '✨ Perfect! You got it right!'
                                        : '💔 Oops! Not quite right...'}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </AnimatePresence>
            </div>
        </motion.div>
    )
}
