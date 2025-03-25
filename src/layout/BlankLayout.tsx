import { ReactNode } from 'react'

interface BlankLayoutProps {
  children: ReactNode
}

function BlankLayout({ children }: BlankLayoutProps) {
  return (
    <div style={{ minHeight: '100vh' }}>
      {children}
    </div>
  )
}

export default BlankLayout