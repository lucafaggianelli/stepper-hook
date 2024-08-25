import { useRef } from 'react'

import './index.css'
import { Stepper, useStepper } from '../lib'
import StepperFooter from './StepperFooter'

interface StepsDataType {
  name: string
}

const Welcome = () => (
  <div>
    <h2>Welcome to stepper-hook</h2>
    <p>React hook for creating custom stepper components</p>
  </div>
)

const CreateFirstUser = () => {
  const { data, goToNextStep, handleSubmit, setData } =
    useStepper<StepsDataType>()
  const formRef = useRef<HTMLFormElement>(null)

  handleSubmit(async () => {
    const form = formRef.current
    if (!form) return false

    const validForm = form.reportValidity()
    if (!validForm) {
      return false
    }

    const data = Object.fromEntries(
      new FormData(form).entries()
    ) as unknown as StepsDataType
    if (data.name === '') {
      return false
    }

    setData(data)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    return true
  })

  return (
    <div>
      <h2>What's your name?</h2>
      <p>Yes, there's form data support</p>

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
          defaultValue={data?.name}
        />
      </form>
    </div>
  )
}

const CreateFirstProject = () => {
  const { data } = useStepper<StepsDataType>()

  return (
    <div>
      <h2>Hey {data.name}</h2>
      <p>
        Did you see the loading animation? You can use async functions to handle
        the steps progression.
      </p>
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

const steps = [Welcome, CreateFirstUser, CreateFirstProject, Completed]

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
              location.hash = '#get-started'
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

        <h1>Get Started 👇</h1>
      </section>
    </main>
  )
}
