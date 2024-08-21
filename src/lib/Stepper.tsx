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

  let output = <StepComponent key={`step-${activeStep}`} />

  if (StepComponentWrapper) {
    output = <StepComponentWrapper>{output}</StepComponentWrapper>
  }

  return output
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
