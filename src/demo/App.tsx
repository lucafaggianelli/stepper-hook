import { useRef } from 'react'

import './index.css'
import { Stepper } from '../lib/Stepper'
import { useStepper } from '../lib/use-stepper'
import StepperFooter from './StepperFooter'

interface StepsDataType {
  name: string
  newProject: string
}

const Welcome = () => <div>Welcome to react-use-stepper</div>

const CreateFirstUser = () => {
  const { goToNextStep, handleSubmit, setData } = useStepper()
  const formRef = useRef<HTMLFormElement>(null)

  handleSubmit(async () => {
    const form = formRef.current
    if (!form) return false

    const data = Object.fromEntries(new FormData(form).entries())
    setData(data)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    return data.name !== ''
  })

  return (
    <div>
      <div style={{ marginBottom: 24 }}>What's your name?</div>

      <form
        ref={formRef}
        onSubmit={(event) => {
          event.preventDefault()
          goToNextStep()
        }}
        style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
      >
        <input type="text" name="name" placeholder="Name" required />
        <div>
          <input type="checkbox" value="true" name="newProject" /> Create a new
          project next?
        </div>
      </form>
    </div>
  )
}

const CreateFirstProject = () => {
  const { data } = useStepper<StepsDataType>()

  return (
    <div>
      <div>Hey {data.name} What's your project name?</div>
    </div>
  )
}

const Completed = () => <div>Completed!</div>

const steps = [Welcome, CreateFirstUser, CreateFirstProject, Completed]

export default function App() {
  return (
    <div className="container">
      <div style={{ width: 550, textAlign: 'center' }}>
        <Stepper
          steps={steps}
          onComplete={() => {
            alert('Completed!')
          }}
          stepComponentWrapper={({ children }) => (
            <div
              style={{
                padding: 32,
                backgroundColor: '#1a1a1a',
                borderRadius: 16,
              }}
            >
              {children}
            </div>
          )}
        >
          <StepperFooter />
        </Stepper>
      </div>
    </div>
  )
}
