import { useContext } from 'react'

import { StepperContext } from './StepperContext'
import { StepperContextType } from './types'

export function useStepper<DataT extends object>() {
  return useContext(StepperContext) as StepperContextType<DataT>
}
