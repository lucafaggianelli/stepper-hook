import { useContext } from 'react'

import { StepperContext, StepperContextType } from './StepperContext'

export function useStepper<DataT = unknown>() {
  return useContext(StepperContext) as StepperContextType<DataT>
}
