import { motion } from 'framer-motion'
import Lottie from 'lottie-react'
import { useState, useEffect } from 'react'

const BROKEN_HEART_LOTTIE_URL = 'https://assets3.lottiefiles.com/packages/lf20_RnVOnb.json'

export default function GoodbyeScreen({ onBack }) {
    const [lottieData, setLottieData] = useState(null)

    useEffect(() => {
        fetch(BROKEN_HEART_LOTTIE_URL)
            .then((res) => res.json())
            .then(setLottieData)
            .catch(() => { })
    }, [])

    return (
        <motion.div
            className="screen-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="goodbye">
                {/* Lottie Broken Heart */}
                {lottieData && (
                    <motion.div
                        initial={{ scale: 0, rotate: -10 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 150, delay: 0.2 }}
                    >
                        <Lottie
                            animationData={lottieData}
                            loop
                            className="lottie-sad"
                        />
                    </motion.div>
                )}

                {!lottieData && (
                    <motion.div
                        style={{ fontSize: '5rem', marginBottom: '15px' }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', delay: 0.2 }}
                    >
                        💔
                    </motion.div>
                )}

                <motion.h1
                    className="goodbye__title"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    Oh no... You left 😢
                </motion.h1>

                <motion.p
                    className="goodbye__message"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    That's okay... but just know that someone out there<br />
                    really wanted to tell you something special. 💌<br /><br />
                    Maybe someday you'll come back? 🥺
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 }}
                >
                    <motion.button
                        className="btn btn--primary"
                        onClick={onBack}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Wait, Take Me Back! 💕
                    </motion.button>
                </motion.div>
            </div>
        </motion.div>
    )
}
