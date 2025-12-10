import { useState } from 'react'
import { Container } from 'react-bootstrap';

function Header() {
  const [page, setPage] = useState('home')

  return (
    <Container>
    <h1>hi</h1>
    </Container>
  )
}

export default Header
