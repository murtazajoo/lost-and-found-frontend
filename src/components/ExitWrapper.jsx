import { motion } from "motion/react";

const blackBox = {
    initial: {
        height: "100vh",
        top: 0,
    },
    animate: {
        height: 0,
        top: "-100vh",
        transition: {
            duration: 1.3,
            ease: [0.87, 0, 0.13, 1],
        },
    },
};

const textContainer = {
    initial: {
        opacity: 1,
    },
    animate: {
        opacity: 0,
        transition: {
            duration: 0.25,
            when: "afterChildren",
        },
    },
};
const text = {
    initial: {
        y: 40,
    },
    animate: {
        y: 80,
        transition: {
            duration: 0.73,
            ease: [0.87, 0, 0.13, 1],
        },
    },
};

const boxVariants = {
    initial: {
        scale: 1.5,
        opacity: 1,
    },
    animate: {
        scale: 0,
        top: "0",
        opacity: 0,
    },
};

const InitialTransition = () => {
    return (
        <motion.div
            style={{
                position: "absolute",
                zIndex: 500,
                inset: 0,
                width: "100%",
                background: "black",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
            initial="initial"
            animate="animate"
            variants={blackBox}
            // onAnimationStart={() => {
            //     document.body.style.overflow = "hidden";
            // }}
            // onAnimationComplete={() => {
            //     document.body.style.overflow = "auto";
            // }}
        >
            <motion.svg variants={textContainer} className="absolute z-50 flex">
                <pattern
                    id="pattern"
                    patternUnits="userSpaceOnUse"
                    width={750}
                    height={800}
                    className="text-white"
                    style={{
                        color: "white",
                    }}
                >
                    <rect
                        style={{
                            width: "100%",
                            height: "100%",
                            fill: "currentColor",
                        }}
                    />
                    <motion.rect
                        variants={text}
                        style={{
                            width: "100%",
                            height: "100%",
                            color: "pink",
                            fill: "currentColor",
                        }}
                    />
                </pattern>
                <text
                    text-anchor="middle"
                    x="50%"
                    y="50%"
                    style={{
                        fill: "url(#pattern)",
                        fontSize: "4rem",
                        fontWeight: "bold",
                    }}
                >
                    Findr
                </text>
            </motion.svg>
        </motion.div>
    );
};

export default function ExitWrapper({ children }) {
    return (
        <motion.div
            exit={{
                opacity: 0,
            }}
        >
            <InitialTransition />
            {children}
        </motion.div>
    );
}
