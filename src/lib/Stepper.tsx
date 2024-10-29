import { type ProviderProps, StepperProvider } from './StepperContext'
import type { FullStep, Step } from './types'
import { useStepper } from './use-stepper'

type ChildrenFn = (context: { step: React.ReactNode }) => React.ReactNode

interface Props<DataT extends object, MetadataT = any>
  extends Omit<
    ProviderProps<DataT, MetadataT>,
    'children' | 'initialData' | 'steps'
  > {
  children?: ChildrenFn
  initialData?: DataT
  steps: Step<DataT, MetadataT>[]
}

function Inner<DataT extends object, MetadataT>({
  children,
  steps,
}: {
  children?: ChildrenFn
  steps: FullStep<DataT, MetadataT>[]
}) {
  const { activeStep } = useStepper()

  const step = steps[activeStep]

  const stepNode = <step.component key={`step-${activeStep}`} />

  if (children) {
    return children({ step: stepNode })
  }

  return stepNode
}

export function Stepper<DataT extends object, MetadataT = any>({
  initialData,
  initialStep,
  onComplete,
  onStepChange,
  steps,
  children,
}: Props<DataT, MetadataT>) {
  const fullSteps: FullStep[] = steps.map((step) => {
    if ('component' in step) {
      return step
    }

    return { component: step, metadata: {} }
  })

  return (
    <StepperProvider
      initialData={initialData ?? ({} as DataT)}
      initialStep={initialStep}
      onComplete={onComplete}
      onStepChange={onStepChange}
      steps={fullSteps}
    >
      <Inner steps={fullSteps}>{children}</Inner>
    </StepperProvider>
  )
}
