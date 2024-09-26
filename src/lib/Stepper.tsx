import { PropsWithChildren } from 'react'

import type { Step } from './types'
import { StepperProvider } from './StepperContext'
import { useStepper } from './use-stepper'

interface Props<DataT extends object> extends PropsWithChildren {
  initialData?: DataT
  onComplete?: () => void
  stepComponentWrapper?: React.FC<PropsWithChildren>
  steps: Step<DataT>[]
}

function Inner<DataT extends object>({
  steps,
  stepComponentWrapper: StepComponentWrapper,
}: Pick<Props<DataT>, 'stepComponentWrapper' | 'steps'>) {
  const { activeStep } = useStepper()

  const step = steps[activeStep]
  const StepComponent = 'component' in step ? step.component : step

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

export function Stepper<DataT extends object>({
  initialData,
  onComplete,
  steps,
  stepComponentWrapper,
  children,
}: Props<DataT>) {
  return (
    <StepperProvider
      initialData={initialData ?? ({} as DataT)}
      steps={steps}
      onComplete={onComplete}
    >
      <Inner steps={steps} stepComponentWrapper={stepComponentWrapper} />
      {children}
    </StepperProvider>
  )
}
