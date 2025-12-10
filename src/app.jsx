import { useState } from 'react'
import { Container } from 'react-bootstrap';
import Header from './components/header';
import Home from './components/home/home';

function App() {
  const [page, setPage] = useState('home')

  return (
    <Container>
      <Header />
      <Home />
    </Container>
  )
}

export default App
