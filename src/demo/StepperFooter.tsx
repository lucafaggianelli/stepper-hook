import { useStepper } from '../lib/use-stepper'

export default function StepperFooter() {
  const {
    activeStep,
    isFirstStep,
    isLastStep,
    isLoading,
    goToNextStep,
    goToPreviousStep,
    totalSteps,
  } = useStepper()

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '2rem',
        marginTop: '2rem',
      }}
    >
      <button
        disabled={isLoading || isFirstStep}
        onClick={goToPreviousStep}
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'transparent',
        }}
      >
        <span style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }}>
          ←
        </span>
        Back
      </button>

      <div style={{ textAlign: 'center', width: '8rem', fontSize: 0 }}>
        <span style={{ fontSize: '0.75rem', color: 'hsl(220 9% 69% / 1)' }}>
          {activeStep + 1} / {totalSteps}
        </span>

        <div
          style={{
            height: '0.25rem',
            backgroundColor: '#D1D5DB',
            borderRadius: 100,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <div
            className={isLoading ? 'loading' : ''}
            style={{
              height: '100%',
              backgroundColor: '#3B82F6',
              transition: 'width 0.5s linear',
              width: `${((activeStep + 1) / totalSteps) * 100}%`,
            }}
          />
        </div>
      </div>

      <button
        disabled={isLoading}
        onClick={goToNextStep}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        {isLastStep ? 'Done' : 'Next'}
        {!isLastStep && (
          <span style={{ width: '1rem', height: '1rem', marginLeft: '0.5rem' }}>
            →
          </span>
        )}
      </button>
    </div>
  )
}
