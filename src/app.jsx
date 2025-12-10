import { useState } from 'react'
import { Container } from 'react-bootstrap';
import Header from './components/header';

function App() {
  const [page, setPage] = useState('home')

  return (
    <Container>
      <Header />
    </Container>
  )
}

export default App
