import { useRef } from 'react'

import { Stepper, useStepper, type Step } from '../lib'
import './index.css'
import StepperFooter from './StepperFooter'

interface StepsDataType {
  name: string
  newProject?: 'on'
  projectName: string
}

const Welcome = () => (
  <div>
    <h2>Welcome to stepper-hook</h2>
    <p>React hook for creating custom stepper components</p>
  </div>
)

const CreateFirstUser = () => {
  const { data, goToNextStep, handleStepValidation, setData } =
    useStepper<StepsDataType>()
  const formRef = useRef<HTMLFormElement>(null)

  handleStepValidation(async () => {
    const form = formRef.current
    if (!form) return false

    const validForm = form.reportValidity()
    if (!validForm) {
      return false
    }

    const data = Object.fromEntries(
      new FormData(form).entries()
    ) as unknown as StepsDataType

    setData(data)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    return true
  })

  return (
    <div>
      <h2>What's your name?</h2>
      <p>Psst... This step will take a bit to submit</p>

      <form
        ref={formRef}
        onSubmit={(event) => {
          event.preventDefault()
          goToNextStep()
        }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          marginTop: 24,
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          defaultValue={data.name}
        />

        <div>
          <input
            type="checkbox"
            name="newProject"
            id="new-project"
            defaultChecked={data.newProject === 'on'}
          />
          <label htmlFor="new-project" style={{ marginLeft: 8 }}>
            Create a new project?
          </label>
        </div>
      </form>
    </div>
  )
}

const CreateFirstProject = () => {
  const { data, goToNextStep } = useStepper<StepsDataType>()
  const formRef = useRef<HTMLFormElement>(null)

  return (
    <div>
      <h2>Hey {data.name}</h2>
      <p>
        Did you see the loading animation? You can use async functions to handle
        the steps progression.
      </p>

      <form
        ref={formRef}
        onSubmit={(event) => {
          event.preventDefault()
          goToNextStep()
        }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          marginTop: 24,
        }}
      >
        <input
          type="text"
          name="project-name"
          placeholder="Project name"
          required
        />
      </form>
    </div>
  )
}

const Completed = () => (
  <div>
    <h2>Completed!</h2>
    <div
      style={{
        fontSize: 96,
        lineHeight: '1em',
        marginTop: 48,
        marginBottom: 24,
      }}
    >
      🦩
    </div>
    <div style={{ color: 'gray' }}>
      PS: Check the docs down below to see how to use the library
    </div>
  </div>
)

const steps: Step<StepsDataType>[] = [
  Welcome,
  CreateFirstUser,
  {
    metadata: { title: 'Create a new project' },
    component: CreateFirstProject,
    showIf(data) {
      return data.newProject === 'on'
    },
  },
  Completed,
]

export default function App() {
  return (
    <main style={{ paddingBottom: 48 }}>
      <section className="container">
        <h1
          style={{
            fontFamily: 'monospace',
            background: '#3e3e3e',
            padding: '.15em .5em',
            borderRadius: '0.2em',
            border: '1px solid #000000',
          }}
        >
          useStepper()
        </h1>

        <div style={{ width: 550, textAlign: 'center' }}>
          <Stepper
            steps={steps}
            onComplete={() => {
              alert('Completed!')
            }}
          >
            {({ step }) => (
              <div
                style={{
                  padding: 32,
                  backgroundColor: '#1a1a1a',
                  borderRadius: 16,
                }}
              >
                <header>Hey what's up?</header>
                {step}
                <StepperFooter />
              </div>
            )}
          </Stepper>
        </div>

        <h1>Get Started 👇</h1>
      </section>
    </main>
  )
}
