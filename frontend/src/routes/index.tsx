import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ ssr: true, component: App })

function App() {
  return (
    <div>
      <h1>hello</h1>
    </div>
  )
}
