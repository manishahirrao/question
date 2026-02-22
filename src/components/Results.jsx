import { motion } from 'framer-motion'
import Lottie from 'lottie-react'
import { useState, useEffect } from 'react'

const CONFETTI_LOTTIE_URL = 'https://assets1.lottiefiles.com/packages/lf20_aEFaHc.json'
const SAD_LOTTIE_URL = 'https://assets9.lottiefiles.com/packages/lf20_qm8eqzse.json'

export default function Results({ score, totalQuestions, onRestart }) {
    const [confettiData, setConfettiData] = useState(null)
    const [sadData, setSadData] = useState(null)
    const isPerfect = score === totalQuestions

    useEffect(() => {
        if (isPerfect) {
            fetch(CONFETTI_LOTTIE_URL)
                .then((res) => res.json())
                .then(setConfettiData)
                .catch(() => { })
        } else {
            fetch(SAD_LOTTIE_URL)
                .then((res) => res.json())
                .then(setSadData)
                .catch(() => { })
        }
    }, [isPerfect])

    return (
        <motion.div
            className="screen-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="results">
                {/* Lottie Animation */}
                {isPerfect && confettiData && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200 }}
                    >
                        <Lottie
                            animationData={confettiData}
                            loop
                            className="lottie-result"
                        />
                    </motion.div>
                )}

                {!isPerfect && sadData && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200 }}
                    >
                        <Lottie
                            animationData={sadData}
                            loop
                            className="lottie-result"
                        />
                    </motion.div>
                )}

                {/* Fallback emoji */}
                {isPerfect && !confettiData && (
                    <motion.div
                        style={{ fontSize: '5rem', marginBottom: '15px' }}
                        initial={{ scale: 0, rotate: -20 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring' }}
                    >
                        🎉💖
                    </motion.div>
                )}
                {!isPerfect && !sadData && (
                    <motion.div
                        style={{ fontSize: '5rem', marginBottom: '15px' }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring' }}
                    >
                        😢
                    </motion.div>
                )}

                {/* Score Ring */}
                <motion.div
                    className={`results__score-ring ${isPerfect ? 'results__score-ring--perfect' : 'results__score-ring--fail'}`}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3, type: 'spring', stiffness: 150 }}
                >
                    <span className="results__score-text">
                        {score}/{totalQuestions}
                    </span>
                </motion.div>

                {/* Title */}
                <motion.h1
                    className={`results__title ${isPerfect ? 'results__title--perfect' : 'results__title--fail'}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    {isPerfect ? 'You Did It! 💖' : 'Almost There... 💫'}
                </motion.h1>

                {/* Message */}
                <motion.p
                    className="results__message"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                >
                    {isPerfect
                        ? "You truly are amazing! Every answer was perfect, just like you."
                        : `You got ${score} out of ${totalQuestions}. Don't worry, give it another shot!`}
                </motion.p>

                {/* Love Message (only for perfect score) */}
                {isPerfect && (
                    <motion.div
                        className="results__love-message"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.0, type: 'spring' }}
                    >
                        "You are the most beautiful person I know — inside and out.
                        Every moment with you feels like a dream I never want to wake up from.
                        I just wanted you to know... you're incredibly special to me. 💕🌹"
                    </motion.div>
                )}

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: isPerfect ? 1.3 : 0.9 }}
                    style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}
                >
                    <motion.button
                        className="btn btn--primary"
                        onClick={onRestart}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {isPerfect ? 'Play Again 🔄' : 'Try Again 💪'}
                    </motion.button>
                </motion.div>
            </div>
        </motion.div>
    )
}
