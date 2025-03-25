import { ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import Breadcrumb from './Breadcrumb'

interface LayoutProps {
  title: string
  onLogout: () => void
  children: ReactNode
}

function Layout({ title, onLogout, children }: LayoutProps) {
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-6xl mx-auto">
        <Navbar title={title} onLogout={onLogout} />
        <Breadcrumb />
        {children}
        <Footer />
      </div>
    </div>
  )
}

export default Layout