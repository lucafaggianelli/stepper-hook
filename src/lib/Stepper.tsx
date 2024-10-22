import { type ProviderProps, StepperProvider } from './StepperContext'
import { useStepper } from './use-stepper'

interface Props<DataT extends object>
  extends Omit<ProviderProps<DataT>, 'children' | 'initialData'> {
  children?: (context: { step: React.ReactNode }) => React.ReactNode
  initialData?: DataT
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
  initialStep,
  onComplete,
  onStepChange,
  steps,
  children,
}: Props<DataT>) {
  return (
    <StepperProvider
      initialData={initialData ?? ({} as DataT)}
      initialStep={initialStep}
      onComplete={onComplete}
      onStepChange={onStepChange}
      steps={steps}
    >
      <Inner steps={steps}>{children}</Inner>
    </StepperProvider>
  )
}
