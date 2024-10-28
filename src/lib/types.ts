export type ValidationHandler = () => Promise<boolean> | boolean

export interface StepperContextType<DataT extends object, MetadataT> {
  activeStep: number
  allSteps: Step<DataT, MetadataT>[]
  data: DataT
  /**
   * Direction of the navigation: 1 for next, -1 for previous and 0
   * at the beginning.
   * This is useful to animate the transition between steps.
   */
  direction: number
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

export type Step<DataT extends object = any, MetadataT = any> =
  | React.FC
  | {
      component: React.FC
      metadata?: MetadataT
      showIf?: (data: DataT) => boolean
    }
