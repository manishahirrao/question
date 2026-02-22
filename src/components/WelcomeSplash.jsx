import { motion } from 'framer-motion'
import Lottie from 'lottie-react'
import { useState, useEffect, useRef } from 'react'

const CELEBRATION_LOTTIE_URL = 'https://assets4.lottiefiles.com/packages/lf20_u4yrau.json'

export default function WelcomeSplash({ onComplete }) {
    const [celebrationData, setCelebrationData] = useState(null)
    const [displayText, setDisplayText] = useState('')
    const fullText = 'Welcome, Challenger! 🔥'
    const timerRef = useRef(null)

    useEffect(() => {
        fetch(CELEBRATION_LOTTIE_URL)
            .then((res) => res.json())
            .then(setCelebrationData)
            .catch(() => { })
    }, [])

    // Typewriter effect
    useEffect(() => {
        let index = 0
        timerRef.current = setInterval(() => {
            if (index < fullText.length) {
                setDisplayText(fullText.slice(0, index + 1))
                index++
            } else {
                clearInterval(timerRef.current)
            }
        }, 80)
        return () => clearInterval(timerRef.current)
    }, [])

    // Auto-advance after 4 seconds
    useEffect(() => {
        const timeout = setTimeout(onComplete, 4500)
        return () => clearTimeout(timeout)
    }, [onComplete])

    return (
        <motion.div
            className="screen-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6 }}
        >
            <div className="welcome-splash">
                {/* Lottie Celebration */}
                {celebrationData && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                    >
                        <Lottie
                            animationData={celebrationData}
                            loop={false}
                            className="lottie-celebration"
                        />
                    </motion.div>
                )}

                {!celebrationData && (
                    <motion.div
                        style={{ fontSize: '5rem', marginBottom: '20px' }}
                        initial={{ scale: 0, rotate: -20 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                    >
                        🎉
                    </motion.div>
                )}

                <motion.h1
                    className="welcome-splash__title"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    {displayText}
                    <span className="typewriter-cursor" />
                </motion.h1>

                <motion.p
                    className="welcome-splash__subtitle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.5 }}
                >
                    Get ready for a fun challenge...<br />
                    Let's see how smart you really are! 💫
                </motion.p>

                {/* Loading dots */}
                <motion.div
                    className="welcome-splash__dots"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 3 }}
                >
                    <div className="welcome-splash__dot" />
                    <div className="welcome-splash__dot" />
                    <div className="welcome-splash__dot" />
                </motion.div>
            </div>
        </motion.div>
    )
}
