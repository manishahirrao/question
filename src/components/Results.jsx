import { motion } from 'framer-motion'
import Lottie from 'lottie-react'
import { useState, useEffect } from 'react'

const CONFETTI_LOTTIE_URL = 'https://assets1.lottiefiles.com/packages/lf20_aEFaHc.json'

export default function Results({ answers, onRestart }) {
    const [confettiData, setConfettiData] = useState(null)

    useEffect(() => {
        fetch(CONFETTI_LOTTIE_URL)
            .then((res) => res.json())
            .then(setConfettiData)
            .catch(() => { })
    }, [])

    const answerEntries = Object.values(answers)

    return (
        <motion.div
            className="screen-wrapper screen-wrapper--scrollable"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="results">
                {/* Lottie Confetti */}
                {confettiData && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200 }}
                    >
                        <Lottie
                            animationData={confettiData}
                            loop={false}
                            className="lottie-result"
                        />
                    </motion.div>
                )}

                {!confettiData && (
                    <motion.div
                        style={{ fontSize: '5rem', marginBottom: '15px' }}
                        initial={{ scale: 0, rotate: -20 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring' }}
                    >
                        🎉🏆
                    </motion.div>
                )}

                <motion.h1
                    className="results__title results__title--perfect"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    All Done! 🎉
                </motion.h1>

                <motion.p
                    className="results__message"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    You made it to the end! ✨
                </motion.p>

                {/* Secret Message */}
                <motion.div
                    className="results__love-message"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.0, type: 'spring' }}
                >
                    "You're one of the most awesome people out there!
                    The world is a better place because of you.
                    Never forget how amazing you truly are! 🌟✨"
                </motion.div>


            </div>
        </motion.div>
    )
}
