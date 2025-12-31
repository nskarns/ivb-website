import { useState } from 'react'
import { Container, Col, Row, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Bar from '../bar'
import Credit from '../credit'

function Structure() {
  const [page, setPage] = useState('home')

  return (
    <Container className='justify-content-center'>
      <Bar />
      <Col className='d-flex flex-column flex-lg-row justify-content-center gap-3'>
        <Row className='gap-2 px-3'>
          <Button className='btn btn-border-3 btn-success px-3'>
            HQ
          </Button>
          <Button className='btn btn-border-3 btn-success px-3'>
            Company A
          </Button>
          <Button className='btn btn-border-3 btn-success px-3'>
            Company B
          </Button>
          <Button className='btn btn-border-3 btn-success px-3'>
            Company C
          </Button>
        </Row>
        <Row className='gap-2 px-3'>
          <Button className='btn btn-border-3 btn-success px-3'>
            Company D
          </Button>
          <Button className='btn btn-border-3 btn-success px-3'>
            Company I
          </Button>
          <Button className='btn btn-border-3 btn-success px-3'>
            Company K
          </Button>
          <Button className='btn btn-border-3 btn-success px-3'>
            Artillery
          </Button>
        </Row>
      </Col>
      <Bar />
      <Col>
        <Row>

        </Row>
        <Row>

        </Row>
      </Col>
      <Bar />
      <Credit />
    </Container>
  )
}

export default Structure