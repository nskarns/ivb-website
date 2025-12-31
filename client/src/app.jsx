import { useState } from 'react'
import { Container } from 'react-bootstrap';
import Header from './components/header';
import Carousel from './components/carousel'
import Home from './components/home/home';
import Schedule from './components/schedule/schedule';
import Structure from './components/structure/structure';
import Gallery from './components/gallery/gallery';

function App() {
  const [page, setPage] = useState('home')


  return (
    <Container fluid className='p-0 m-0'>
      <Header page={page} setPage={setPage} />
      <Carousel />
      { page == 'home' ?
          <Home />
        :
        page == 'schedule' ?
          <Schedule />
        :
        page == 'structure' ?
          <Structure />
        :
          <Gallery />
      }
      
    </Container>
  )
}

export default App
