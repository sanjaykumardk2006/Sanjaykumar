import { useEffect, useState, useMemo, useCallback, memo } from "react"
import { motion, AnimatePresence } from "framer-motion"

const defaultWords = ["LOADING", "COMPUTING", "SEARCHING", "RETRIEVING", "ASSEMBLING"]

// Memoized Letter component for performance
const Letter = memo(function Letter({
    char,
    letterDuration
}) {
    return (
        <motion.span
            style={{ transformStyle: "preserve-3d", display: 'inline-block', whiteSpace: 'pre', willChange: 'transform, filter, opacity' }}
            variants={{
                initial: {
                    rotateX: 90,
                    y: 20,
                    opacity: 0,
                    filter: "blur(8px)",
                },
                animate: {
                    rotateX: 0,
                    y: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                    transition: {
                        duration: letterDuration,
                        ease: [0.2, 0.65, 0.3, 0.9],
                    },
                },
                exit: {
                    rotateX: -90,
                    y: -20,
                    opacity: 0,
                    filter: "blur(8px)",
                    transition: {
                        duration: letterDuration * 0.67,
                        ease: "easeIn",
                    },
                },
            }}
        >
            {char}
        </motion.span>
    )
})

// Memoized Word component for performance
const Word = memo(function Word({
    text,
    staggerDelay,
    exitStaggerDelay,
    letterDuration,
    textClassName
}) {
    const letters = useMemo(() => text.split(""), [text])

    return (
        <motion.div
            className={textClassName}
            style={{ display: 'flex', gap: '0.02em', flexWrap: 'wrap' }}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={{
                initial: { opacity: 1 },
                animate: {
                    opacity: 1,
                    transition: {
                        staggerChildren: staggerDelay,
                    },
                },
                exit: {
                    opacity: 1,
                    transition: {
                        staggerChildren: exitStaggerDelay,
                    },
                },
            }}
        >
            {letters.map((char, i) => (
                <Letter
                    key={`${char}-${i}`}
                    char={char}
                    letterDuration={letterDuration}
                />
            ))}
        </motion.div>
    )
})

export function FlipFadeText({
    words = defaultWords,
    interval = 2500,
    className = "",
    textClassName = "",
    letterDuration = 0.6,
    staggerDelay = 0.1,
    exitStaggerDelay = 0.05,
}) {
    const [index, setIndex] = useState(0)

    // Memoize the interval callback
    const updateIndex = useCallback(() => {
        if (words.length > 1) {
            setIndex((prev) => (prev + 1) % words.length)
        }
    }, [words.length])

    useEffect(() => {
        if (words.length > 1) {
            const timer = setInterval(updateIndex, interval)
            return () => clearInterval(timer)
        }
    }, [updateIndex, interval, words.length])

    // Memoize the current word
    const currentWord = useMemo(() => words[index], [words, index])

    return (
        <div className={className} style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <div style={{ perspective: "1000px", position: 'relative', display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'inherit' }}>
                <AnimatePresence mode="wait">
                    <Word
                        key={currentWord}
                        text={currentWord}
                        staggerDelay={staggerDelay}
                        exitStaggerDelay={exitStaggerDelay}
                        letterDuration={letterDuration}
                        textClassName={textClassName}
                    />
                </AnimatePresence>
            </div>
        </div>
    )
}

export default FlipFadeText
