import { createContext, PropsWithChildren, useRef, useState } from 'react'

type Handler = () => Promise<boolean> | boolean

export interface StepperContextType<DataT = unknown> {
  activeStep: number
  data: DataT
  goToNextStep: () => Promise<void>
  goToPreviousStep: () => Promise<void>
  handleSubmit: (hanler: Handler) => void
  isFirstStep: boolean
  isLastStep: boolean
  isLoading: boolean
  setActiveStep: (step: number) => Promise<void>
  setData: React.Dispatch<DataT>
  totalSteps: number
}

export const StepperContext = createContext<StepperContextType>({
  activeStep: 0,
  data: null,
  goToNextStep: async () => {},
  goToPreviousStep: async () => {},
  handleSubmit: () => true,
  isFirstStep: true,
  isLastStep: false,
  isLoading: false,
  setActiveStep: async () => {},
  setData: () => {},
  totalSteps: 0,
})

interface ProviderProps extends PropsWithChildren {
  onComplete?: () => void
  totalSteps: number
}

export const StepperProvider: React.FC<ProviderProps> = ({
  onComplete,
  totalSteps,
  children,
}) => {
  const [activeStep, setActiveStepInner] = useState(0)
  const [data, setData] = useState<unknown>(null)
  const [isLoading, setLoading] = useState(false)
  const handler = useRef<Handler | null>(null)

  const isLastStep = activeStep === totalSteps - 1

  const setActiveStep = async (step: number, skipSubmit: boolean = false) => {
    if (step < 0 || step > totalSteps) {
      throw new Error(
        `Invalid step ${step}, it should be between 0 and ${totalSteps}`
      )
    }

    if (!skipSubmit && handler.current) {
      try {
        setLoading(true)
        const result = await handler.current()
        setLoading(false)

        if (!result) {
          return
        }
      } catch {
        return
      }
    }

    if (!skipSubmit && isLastStep && onComplete) {
      onComplete()
      return
    }

    resetHandlers()
    setActiveStepInner(step)
  }

  const goToPreviousStep = () => setActiveStep(activeStep - 1, true)

  const goToNextStep = () => setActiveStep(activeStep + 1)

  const handleSubmit = (nextHandler: Handler) => {
    handler.current = nextHandler
  }

  const resetHandlers = () => {
    handler.current = null
  }

  const value = {
    activeStep,
    data,
    goToNextStep,
    goToPreviousStep,
    handleSubmit,
    isFirstStep: activeStep === 0,
    isLastStep,
    isLoading,
    setActiveStep,
    setData,
    setLoading,
    totalSteps,
  }

  return (
    <StepperContext.Provider value={value}>{children}</StepperContext.Provider>
  )
}
