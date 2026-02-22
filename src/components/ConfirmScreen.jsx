import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Lottie from 'lottie-react'

// Dancing celebration character
const DANCE_LOTTIE_URL = 'https://assets3.lottiefiles.com/packages/lf20_UJNc2t.json'
// Sad character
const SAD_LOTTIE_URL = 'https://assets9.lottiefiles.com/packages/lf20_qm8eqzse.json'
// Party popper / confetti
const PARTY_LOTTIE_URL = 'https://assets1.lottiefiles.com/packages/lf20_aEFaHc.json'
// Crying character
const CRY_LOTTIE_URL = 'https://assets4.lottiefiles.com/packages/lf20_gkgqj2yq.json'

// Celebration sound (royalty-free short clip)
const CELEBRATION_SOUND_URL = 'https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3'
// Sad trombone sound
const SAD_SOUND_URL = 'https://assets.mixkit.co/active_storage/sfx/2018/2018-preview.mp3'

export default function ConfirmScreen({ answers, onConfirmYes, onConfirmNo }) {
    const [choice, setChoice] = useState(null) // null | 'yes' | 'no'
    const [danceData, setDanceData] = useState(null)
    const [sadData, setSadData] = useState(null)
    const [partyData, setPartyData] = useState(null)
    const [cryData, setCryData] = useState(null)
    const audioRef = useRef(null)

    useEffect(() => {
        fetch(DANCE_LOTTIE_URL)
            .then((res) => res.json())
            .then(setDanceData)
            .catch(() => { })
        fetch(SAD_LOTTIE_URL)
            .then((res) => res.json())
            .then(setSadData)
            .catch(() => { })
        fetch(PARTY_LOTTIE_URL)
            .then((res) => res.json())
            .then(setPartyData)
            .catch(() => { })
        fetch(CRY_LOTTIE_URL)
            .then((res) => res.json())
            .then(setCryData)
            .catch(() => { })
    }, [])

    const playSound = (url) => {
        try {
            if (audioRef.current) {
                audioRef.current.pause()
            }
            const audio = new Audio(url)
            audio.volume = 0.5
            audioRef.current = audio
            audio.play().catch(() => { })
        } catch (e) {
            // Audio might be blocked by browser autoplay policy
        }
    }

    const handleYes = () => {
        setChoice('yes')
        playSound(CELEBRATION_SOUND_URL)
        setTimeout(() => onConfirmYes(), 7000)
    }

    const handleNo = () => {
        setChoice('no')
        playSound(SAD_SOUND_URL)
        setTimeout(() => onConfirmNo(), 5000)
    }

    // Cleanup audio on unmount
    useEffect(() => {
        return () => {
            if (audioRef.current) {
                audioRef.current.pause()
                audioRef.current = null
            }
        }
    }, [])

    return (
        <motion.div
            className="screen-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="confirm-screen">
                <AnimatePresence mode="wait">
                    {/* Question Phase */}
                    {choice === null && (
                        <motion.div
                            key="question"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.4 }}
                            className="confirm-screen__card"
                        >
                            <motion.div
                                style={{ fontSize: '3.5rem', marginBottom: '15px' }}
                                initial={{ scale: 0, rotate: -20 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                            >
                                🤔
                            </motion.div>

                            <motion.h2
                                className="confirm-screen__title"
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                Wait a second...
                            </motion.h2>

                            <motion.p
                                className="confirm-screen__message"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                            >
                                Did you answer all the questions honestly and correctly? 🧐
                            </motion.p>

                            <motion.div
                                className="confirm-screen__buttons"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                            >
                                <motion.button
                                    className="btn btn--confirm-yes"
                                    onClick={handleYes}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Yes, I did! ✅
                                </motion.button>
                                <motion.button
                                    className="btn btn--confirm-no"
                                    onClick={handleNo}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Hmm, not really 😅
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    )}

                    {/* YES - Dancing celebration with music */}
                    {choice === 'yes' && (
                        <motion.div
                            key="yes"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ type: 'spring', stiffness: 200 }}
                            className="confirm-screen__result"
                        >
                            {/* Party confetti behind */}
                            {partyData && (
                                <div className="confirm-screen__confetti">
                                    <Lottie
                                        animationData={partyData}
                                        loop={false}
                                        style={{ width: '100%', height: '100%' }}
                                    />
                                </div>
                            )}

                            {/* Dancing character */}
                            <div className="confirm-screen__dance-wrapper">
                                {danceData ? (
                                    <Lottie
                                        animationData={danceData}
                                        loop
                                        className="confirm-screen__lottie-dance"
                                    />
                                ) : (
                                    <motion.div
                                        style={{ fontSize: '7rem' }}
                                        animate={{
                                            rotate: [0, -15, 15, -15, 15, 0],
                                            y: [0, -20, 0, -20, 0],
                                        }}
                                        transition={{ duration: 1, repeat: Infinity }}
                                    >
                                        🕺
                                    </motion.div>
                                )}
                            </div>

                            {/* Bouncing music notes */}
                            <div className="confirm-screen__music-notes">
                                {['🎵', '🎶', '🎵', '🎶', '🎵'].map((note, i) => (
                                    <motion.span
                                        key={i}
                                        style={{ fontSize: '1.8rem', display: 'inline-block' }}
                                        animate={{
                                            y: [0, -15, 0],
                                            opacity: [0.5, 1, 0.5],
                                        }}
                                        transition={{
                                            duration: 0.8,
                                            repeat: Infinity,
                                            delay: i * 0.15,
                                        }}
                                    >
                                        {note}
                                    </motion.span>
                                ))}
                            </div>

                            <motion.h2
                                className="confirm-screen__celebration-text"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                Yaaay! Let's gooo! 🎉🔥
                            </motion.h2>

                            {/* Compliment */}
                            <motion.div
                                className="confirm-screen__compliment"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1.5, type: 'spring', stiffness: 150 }}
                            >
                                "You're truly amazing — honest, brave, and one of a kind!
                                The world needs more people like you! 💖✨"
                            </motion.div>

                            <motion.p
                                className="confirm-screen__sub-text"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 2.5 }}
                            >
                                Loading your results...
                            </motion.p>

                            <motion.div
                                className="welcome-splash__dots"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 3.0 }}
                            >
                                <div className="welcome-splash__dot" />
                                <div className="welcome-splash__dot" />
                                <div className="welcome-splash__dot" />
                            </motion.div>
                        </motion.div>
                    )}

                    {/* NO - Sad/disappointed with sound */}
                    {choice === 'no' && (
                        <motion.div
                            key="no"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ type: 'spring', stiffness: 200 }}
                            className="confirm-screen__result"
                        >
                            <div className="confirm-screen__sad-wrapper">
                                {(cryData || sadData) ? (
                                    <Lottie
                                        animationData={cryData || sadData}
                                        loop
                                        className="confirm-screen__lottie-sad"
                                    />
                                ) : (
                                    <motion.div
                                        style={{ fontSize: '7rem' }}
                                        animate={{ y: [0, -10, 0] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        😔
                                    </motion.div>
                                )}
                            </div>

                            <motion.h2
                                className="confirm-screen__sad-text"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                कशीत जा 😊
                            </motion.h2>

                            <motion.p
                                className="confirm-screen__sub-text"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.2 }}
                            >
                                Here are your answers anyway...
                            </motion.p>

                            <motion.div
                                className="welcome-splash__dots"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.8 }}
                            >
                                <div className="welcome-splash__dot" />
                                <div className="welcome-splash__dot" />
                                <div className="welcome-splash__dot" />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    )
}
