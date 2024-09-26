export type ValidationHandler = () => Promise<boolean> | boolean

export interface StepperContextType<DataT extends object> {
  activeStep: number
  data: DataT
  goToNextStep: () => Promise<void>
  goToPreviousStep: () => Promise<void>
  /**
   * Used to register a validation handler for the current step.
   * The validator function is called when the user tries to navigate to the next step.
   * If the validation fails, the navigation is blocked.
   *
   * The handler can be an async or sync function that returns a boolean or throws an error:
   * the validation is considered successful if the function returns true, and failed if it returns false
   * or throws an error.
   *
   * @param hanler
   * @returns
   */
  handleStepValidation: (hanler: ValidationHandler) => void
  isFirstStep: boolean
  isLastStep: boolean
  isLoading: boolean
  setActiveStep: (step: number) => Promise<void>
  setData: React.Dispatch<React.SetStateAction<DataT>>
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  totalSteps: number
}

export type Step<DataT extends object> =
  | React.FC
  | {
      component: React.FC
      showIf?: (data: DataT) => boolean
    }
