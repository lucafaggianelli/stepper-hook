import { StepperProvider } from './StepperContext'
import type { Step } from './types'
import { useStepper } from './use-stepper'

interface Props<DataT extends object> {
  children?: (context: { step: React.ReactNode }) => React.ReactNode
  initialData?: DataT
  onComplete?: () => void
  steps: Step<DataT>[]
}

function Inner<DataT extends object>({
  children,
  steps,
}: Pick<Props<DataT>, 'children' | 'steps'>) {
  const { activeStep } = useStepper()

  const step = steps[activeStep]
  const StepComponent = 'component' in step ? step.component : step

  const stepNode = <StepComponent key={`step-${activeStep}`} />

  if (children) {
    return children({ step: stepNode })
  }

  return stepNode
}

export function Stepper<DataT extends object>({
  initialData,
  onComplete,
  steps,
  children,
}: Props<DataT>) {
  return (
    <StepperProvider
      initialData={initialData ?? ({} as DataT)}
      steps={steps}
      onComplete={onComplete}
    >
      <Inner steps={steps}>{children}</Inner>
    </StepperProvider>
  )
}
