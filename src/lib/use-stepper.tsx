import { useContext } from 'react'

import { StepperContext } from './StepperContext'
import type { StepperContextType } from './types'

export function useStepper<DataT extends object, MetadataT = any>() {
  return useContext(StepperContext) as StepperContextType<DataT, MetadataT>
}
