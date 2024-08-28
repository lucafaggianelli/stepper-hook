import { createContext, PropsWithChildren, useRef, useState } from 'react'

import type { ValidationHandler, StepperContextType, Step } from './types'

export const makeStepperContext = <DataT extends object>(
  data: StepperContextType<DataT>
) => createContext<StepperContextType<DataT>>(data)

// Untyped context
export const StepperContext = makeStepperContext<any>({
  activeStep: 0,
  data: {},
  goToNextStep: async () => {},
  goToPreviousStep: async () => {},
  handleStepValidation: () => true,
  isFirstStep: true,
  isLastStep: false,
  isLoading: false,
  setActiveStep: async () => {},
  setData: () => {},
  setLoading: () => {},
  totalSteps: 0,
})

interface ProviderProps<DataT extends object> extends PropsWithChildren {
  initialData: DataT
  onComplete?: () => void
  steps: Step<DataT>[]
}

export function StepperProvider<DataT extends object>({
  initialData,
  onComplete,
  steps,
  children,
}: ProviderProps<DataT>) {
  const [activeStep, setActiveStepInner] = useState(0)
  const data = useRef(initialData)
  const [isLoading, setLoading] = useState(false)
  const handler = useRef<ValidationHandler | null>(null)

  const totalSteps = steps.length
  const isFirstStep = activeStep === 0
  const isLastStep = activeStep === totalSteps - 1

  const validateStep = async (): Promise<boolean> => {
    if (!handler.current) {
      return true
    }

    try {
      setLoading(true)
      const result = await handler.current()
      setLoading(false)

      if (!result) {
        return false
      }
    } catch {
      return false
    }

    return true
  }

  const setActiveStep = async (
    step: number,
    skipValidation: boolean = false
  ) => {
    if (step < 0 || step > totalSteps) {
      throw new Error(
        `Invalid step ${step}, it should be between 0 and ${totalSteps}`
      )
    }

    if (!skipValidation) {
      if (!(await validateStep())) {
        return
      }
    }

    if (
      isLastStep &&
      // This check basically means that we are in the last step and
      // we are trying to go to the next step, which means completing the stepper
      step === totalSteps &&
      onComplete
    ) {
      onComplete()
      return
    }

    resetHandlers()
    setActiveStepInner(step)
  }

  const calculateNextStep = (direction: number = 1): number => {
    if (direction < 0 && isFirstStep) {
      throw new Error('You are already in the first step')
    }

    let i: number

    for (
      i = activeStep + 1 * direction;
      direction > 0 ? i < totalSteps : i >= 0;
      i = i + direction
    ) {
      const potentialNextStep = steps[i]

      if ('showIf' in potentialNextStep && potentialNextStep.showIf) {
        // If there's a showIf function, we need to check if the step should be shown
        // If it should, we return the index
        if (potentialNextStep.showIf(data.current)) {
          return i
        }
      } else {
        // If there's no showIf function, the step is always shown
        return i
      }
    }

    // If we reach this point, the step is the first or the last
    return i
  }

  const goToPreviousStep = () => setActiveStep(calculateNextStep(-1), true)

  const goToNextStep = async () => {
    if (!(await validateStep())) {
      return
    }

    const nextStep = calculateNextStep()
    setActiveStep(nextStep, true)
  }

  const handleStepValidation = (nextHandler: ValidationHandler) => {
    handler.current = nextHandler
  }

  const resetHandlers = () => {
    handler.current = null
  }

  const value: StepperContextType<DataT> = {
    activeStep,
    data: data.current,
    goToNextStep,
    goToPreviousStep,
    handleStepValidation,
    isFirstStep,
    isLastStep,
    isLoading,
    setActiveStep,
    setData: (setStateAction) => {
      if (typeof setStateAction === 'function') {
        data.current = setStateAction(data.current)
        return
      }

      data.current = setStateAction
    },
    setLoading,
    totalSteps,
  }

  return (
    <StepperContext.Provider value={value}>{children}</StepperContext.Provider>
  )
}
