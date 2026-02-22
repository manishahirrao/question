import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const QUESTIONS = [
    // Text input questions
    {
        id: 1,
        type: 'text',
        emoji: '🤝',
        question: "What's the most valuable thing you've learned from your friend?",
    },
    {
        id: 2,
        type: 'text',
        emoji: '😊',
        question: "What's something that always brings a smile to your face?",
    },
    {
        id: 3,
        type: 'text',
        emoji: '🌌',
        question: 'What do you think happens after we die?',
    },
    {
        id: 4,
        type: 'text',
        emoji: '🌱',
        question: 'How do you want to grow as a person?',
    },
    {
        id: 5,
        type: 'text',
        emoji: '💪',
        question: 'When do you feel most confident?',
    },
    // Multiple choice questions
    {
        id: 6,
        type: 'mcq',
        emoji: '1️⃣',
        question: 'How do you describe your love story?',
        options: [
            'Unexpected but beautiful',
            'Slow burn that turned magical',
            'Chaotic but meant to be',
            'Still being written',
        ],
    },
    {
        id: 7,
        type: 'mcq',
        emoji: '2️⃣',
        question: 'What makes you feel most loved?',
        options: [
            'Thoughtful surprises',
            'Deep conversations',
            'Quality time together',
            'Small daily gestures',
        ],
    },
    {
        id: 8,
        type: 'mcq',
        emoji: '3️⃣',
        question: 'When did you know you were in love with your partner?',
        options: [
            'When I missed them even in a crowd',
            'When their happiness mattered more than mine',
            'When they felt like home',
            "When I couldn't imagine my future without them",
        ],
    },
    {
        id: 9,
        type: 'mcq',
        emoji: '4️⃣',
        question: 'What do you hate most about humanity?',
        options: [
            'Dishonesty',
            'Selfishness',
            'Lack of empathy',
            'Judging others too quickly',
        ],
    },
    {
        id: 10,
        type: 'mcq',
        emoji: '5️⃣',
        question: 'Does your favorite person ever surprise you with an unexpected call?',
        options: [
            'Yes, and I love it',
            'Sometimes, and it makes my day',
            'Rarely, but it feels special',
            'No, but I wish they would',
        ],
    },
    {
        id: 11,
        type: 'mcq',
        emoji: '6️⃣',
        question: 'Have you ever been in love?',
        options: [
            'Yes, deeply',
            "Yes, but it didn't last",
            "Maybe, I'm not sure",
            'Not yet',
        ],
    },
    {
        id: 12,
        type: 'mcq',
        emoji: '7️⃣',
        question: 'Have you ever been caught lying?',
        options: [
            'Yes, and it was embarrassing',
            'Yes, but it was a small lie',
            'Almost, but I managed it',
            'No, I try to stay honest',
        ],
    },
    {
        id: 13,
        type: 'mcq',
        emoji: '8️⃣',
        question: 'Do you still think about your ex?',
        options: [
            'Sometimes',
            'Rarely',
            'Only when reminded',
            'Not anymore',
        ],
    },
]

const OPTION_LABELS = ['A', 'B', 'C', 'D']

export default function Quiz({ onComplete }) {
    const [currentQ, setCurrentQ] = useState(0)
    const [answers, setAnswers] = useState({})
    const [textInput, setTextInput] = useState('')
    const [selected, setSelected] = useState(null)
    const [animating, setAnimating] = useState(false)

    const question = QUESTIONS[currentQ]
    const progress = (currentQ / QUESTIONS.length) * 100
    const canSubmitText = textInput.trim().length > 0

    const goNext = useCallback(
        (newAnswers) => {
            if (currentQ < QUESTIONS.length - 1) {
                setCurrentQ((prev) => prev + 1)
                setSelected(null)
                setTextInput('')
                setAnimating(false)
            } else {
                onComplete(newAnswers)
            }
        },
        [currentQ, onComplete]
    )

    // MCQ selection handler
    const handleMCQSelect = useCallback(
        (optionIndex) => {
            if (selected !== null || animating) return
            setSelected(optionIndex)
            setAnimating(true)

            const newAnswers = {
                ...answers,
                [question.id]: {
                    question: question.question,
                    type: 'mcq',
                    answer: question.options[optionIndex],
                },
            }
            setAnswers(newAnswers)

            setTimeout(() => goNext(newAnswers), 800)
        },
        [selected, animating, answers, question, goNext]
    )

    // Text submit handler
    const handleTextSubmit = useCallback(() => {
        if (!canSubmitText) return

        const newAnswers = {
            ...answers,
            [question.id]: {
                question: question.question,
                type: 'text',
                answer: textInput.trim(),
            },
        }
        setAnswers(newAnswers)
        goNext(newAnswers)
    }, [canSubmitText, answers, question, textInput, goNext])

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey && canSubmitText) {
            e.preventDefault()
            handleTextSubmit()
        }
    }

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
                </div>

                {/* Question Card */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={question.id}
                        className="quiz-question-card"
                        initial={{ opacity: 0, x: 80, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -80, scale: 0.95 }}
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                    >
                        <motion.h2
                            className="quiz-question__text"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            {question.emoji} {question.question}
                        </motion.h2>

                        {/* MCQ Options */}
                        {question.type === 'mcq' && (
                            <div className="quiz-options">
                                {question.options.map((option, index) => {
                                    let optionClass = 'quiz-option'
                                    if (selected !== null) {
                                        if (index === selected) {
                                            optionClass += ' quiz-option--selected'
                                        } else {
                                            optionClass += ' quiz-option--faded'
                                        }
                                    }

                                    return (
                                        <motion.button
                                            key={index}
                                            className={optionClass}
                                            onClick={() => handleMCQSelect(index)}
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
                        )}

                        {/* Text Input */}
                        {question.type === 'text' && (
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <textarea
                                    className="quiz-textarea"
                                    value={textInput}
                                    onChange={(e) => setTextInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Type your answer here..."
                                    rows={4}
                                    autoFocus
                                />
                                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                                    <motion.button
                                        className={`btn btn--primary ${!canSubmitText ? 'btn--disabled' : ''}`}
                                        onClick={handleTextSubmit}
                                        disabled={!canSubmitText}
                                        whileHover={canSubmitText ? { scale: 1.05 } : {}}
                                        whileTap={canSubmitText ? { scale: 0.95 } : {}}
                                    >
                                        {currentQ < QUESTIONS.length - 1 ? 'Next →' : 'Finish ✨'}
                                    </motion.button>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </motion.div>
    )
}
