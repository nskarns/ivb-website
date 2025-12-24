import { useState } from 'react'
import { Container, Col, Row, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Bar from '../bar'

function Structure() {
  const [page, setPage] = useState('home')

  return (
    <Container className='justify-content-center'>
      <Bar />
    </Container>
  )
}

export default Structure