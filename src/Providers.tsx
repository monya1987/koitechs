import ThemeProvider from 'react-bootstrap/ThemeProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'

const queryClient = new QueryClient()
type Props = {
  children?: React.ReactNode
}
const Layout: React.FC<Props> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <main className={'container'}>{children}</main>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default Layout
