import { motion } from 'framer-motion'
import Lottie from 'lottie-react'
import { useState, useEffect } from 'react'

// Lottie heart animation data (inline minimal heart)
const HEART_LOTTIE_URL = 'https://assets2.lottiefiles.com/packages/lf20_jR229r.json'

export default function GateCard({ onAccept, onLeave }) {
    const [heartData, setHeartData] = useState(null)

    useEffect(() => {
        fetch(HEART_LOTTIE_URL)
            .then((res) => res.json())
            .then(setHeartData)
            .catch(() => { })
    }, [])

    return (
        <motion.div
            className="screen-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                className="gate-card"
                initial={{ scale: 0.5, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{
                    type: 'spring',
                    stiffness: 200,
                    damping: 20,
                    delay: 0.2,
                }}
            >
                {/* Lottie Heart */}
                {heartData && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: 'spring', stiffness: 300 }}
                    >
                        <Lottie
                            animationData={heartData}
                            loop
                            className="lottie-heart"
                        />
                    </motion.div>
                )}

                {!heartData && (
                    <motion.div
                        className="gate-card__lock-icon"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.4, type: 'spring' }}
                    >
                        🎯
                    </motion.div>
                )}

                <motion.h1
                    className="gate-card__title"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    Hey There...
                </motion.h1>

                <motion.p
                    className="gate-card__message"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                >
                    Someone made this challenge just for you! 🎯<br />
                    Think you're smart enough? Prove it...
                </motion.p>

                <motion.div
                    className="gate-card__warning"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.0 }}
                >
                    ⚠️ You must answer ALL 5 questions correctly to unlock the secret message... or leave! �
                </motion.div>

                <motion.div
                    className="gate-card__buttons"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                >
                    <motion.button
                        className="btn btn--primary"
                        onClick={onAccept}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Yes, I'm Ready! �
                    </motion.button>
                    <motion.button
                        className="btn btn--secondary"
                        onClick={onLeave}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        No, Leave 😢
                    </motion.button>
                </motion.div>
            </motion.div>
        </motion.div>
    )
}
