import './App.css'
import SearchForm from './SearchForm'
import Profile from './Profile'
import Providers from './Providers.tsx'
import { useSearchParams } from 'react-router-dom'
function App() {
  const [searchParams] = useSearchParams()
  const queryName = searchParams.get('queryName')

  return (
    <Providers>
      {queryName ? <Profile queryName={queryName} /> : <SearchForm />}
    </Providers>
  )
}

export default App
