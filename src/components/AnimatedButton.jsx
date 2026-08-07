import React from "react";
import { motion } from "framer-motion";
import "./AnimatedButton.css";

/**
 * AnimatedButton
 * - accepts all native button/link props (onClick, className, type, etc.)
 */
const AnimatedButton = ({
  children = "Browse Components",
  className = "",
  as = "button",
  ...rest
}) => {
  const Component = motion[as] || motion.button;

  return (
    <Component
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.97 }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 30,
        mass: 0.5,
      }}
      className={`animated-button ${className}`}
      {...rest}
    >
      {/* Text with shine mask */}
      <motion.span
        className="animated-button-text"
        style={{
          WebkitMaskImage:
            "linear-gradient(-75deg, white calc(var(--mask-x) + 20%), transparent calc(var(--mask-x) + 30%), white calc(var(--mask-x) + 100%))",
          maskImage:
            "linear-gradient(-75deg, white calc(var(--mask-x) + 20%), transparent calc(var(--mask-x) + 30%), white calc(var(--mask-x) + 100%))",
        }}
        initial={{ "--mask-x": "100%" }}
        animate={{ "--mask-x": "-100%" }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: "linear",
          repeatDelay: 1,
        }}
      >
        {children}
      </motion.span>

      {/* Border shine effect uses the --shine variable so it adapts to theme */}
      <motion.span
        className="animated-button-border"
        style={{
          background:
            "linear-gradient(-75deg, transparent 30%, var(--shine) 50%, transparent 70%)",
          backgroundSize: "200% 100%",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
        }}
        initial={{ backgroundPosition: "100% 0", opacity: 0 }}
        animate={{ backgroundPosition: ["100% 0", "0% 0"], opacity: [0, 1, 0] }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 1,
        }}
      />
    </Component>
  );
};

export default AnimatedButton;
