import { PropsWithChildren } from 'react'

import { StepperProvider } from './StepperContext'
import { useStepper } from './use-stepper'

interface Props extends PropsWithChildren {
  onComplete?: () => void
  stepComponentWrapper?: React.FC<PropsWithChildren>
  steps: React.FC[]
}

const Inner = ({
  steps,
  stepComponentWrapper: StepComponentWrapper,
}: Pick<Props, 'stepComponentWrapper' | 'steps'>) => {
  const { activeStep } = useStepper()

  const StepComponent = steps[activeStep]

  if (StepComponentWrapper) {
    return (
      <StepComponentWrapper>
        {/*
        It's important to instantiate the step compoment inside the wrapper
        as sometimes the wrapper may create a new context
        */}
        <StepComponent key={`step-${activeStep}`} />
      </StepComponentWrapper>
    )
  }

  return <StepComponent key={`step-${activeStep}`} />
}

export function Stepper({
  onComplete,
  steps,
  stepComponentWrapper,
  children,
}: Props) {
  return (
    <StepperProvider totalSteps={steps.length} onComplete={onComplete}>
      <Inner steps={steps} stepComponentWrapper={stepComponentWrapper} />
      {children}
    </StepperProvider>
  )
}
