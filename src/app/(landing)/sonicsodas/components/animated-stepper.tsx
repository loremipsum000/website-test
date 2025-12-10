"use client";
import { Button } from "@/components/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

interface Step {
  number: number;
  title: string;
  description?: string;
}

interface AnimatedStepperProps {
  steps: Step[];
  currentStep: number;
}

export const AnimatedStepper: React.FC<AnimatedStepperProps> = ({
  steps,
  currentStep: initialStep,
}) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const activeStepRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      activeStepRef.current &&
      containerRef.current &&
      window.innerWidth <= 640
    ) {
      const containerHeight = containerRef.current.clientHeight;
      const stepHeight = activeStepRef.current.clientHeight;
      const stepTop = activeStepRef.current.offsetTop;
      const scrollPosition = stepTop - containerHeight / 2 + stepHeight / 2;

      containerRef.current.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
    }
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div
      ref={containerRef}
      className="flex flex-col max-sm:container space-y-6 max-h-[80vh] overflow-y-auto sm:max-h-none sm:overflow-y-visible"
    >
      {steps.map((step, index) => (
        <motion.div
          key={index}
          ref={index === currentStep ? activeStepRef : null}
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.3, delay: 0.3 },
          }}
          className="flex items-start space-x-4"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "flex-shrink-0 w-10 h-10 aspect-square rounded-full flex items-center justify-center text-body-lg font-bold",
              {
                "bg-hero-2 text-background": index <= currentStep,
                "bg-shade-2 text-background": currentStep < index,
              }
            )}
          >
            {index + 1}
          </motion.div>
          <div className="flex-grow">
            <h2
              className={cn(`text-h5 sm:text-body-lg font-semibold`, {
                "text-foreground": index === currentStep,
                "text-shade-2": currentStep < index,
              })}
            >
              {step.title}
            </h2>
            {step.description && index === currentStep && (
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-2 text-foreground text-body"
              >
                {step.description}
              </motion.p>
            )}
            {index === currentStep && (
              <div className="flex items-center mt-4 space-x-4">
                {currentStep < steps.length - 1 && (
                  <Button
                    size="sm"
                    onClick={handleNext}
                    disabled={currentStep === steps.length - 1}
                  >
                    Next
                  </Button>
                )}
                {currentStep > 0 && (
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={handleBack}
                    disabled={currentStep === 0}
                  >
                    Back
                  </Button>
                )}
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};
