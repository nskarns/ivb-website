import { useState } from 'react'
import { Container } from 'react-bootstrap';
import Header from './components/header';
import Carousel from './components/carousel'
import Home from './components/home/home';

function App() {
  const [page, setPage] = useState('home')

  return (
    <Container fluid className='p-0 m-0'>
      <Header />
      <Carousel />
    </Container>
  )
}

export default App
