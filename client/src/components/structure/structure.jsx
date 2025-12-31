import { useState } from 'react'
import { Container, Col, Row, Image, Button } from 'react-bootstrap';
import SpacerBar from '../spacerBar'
import Credit from '../credit'
import OnlineMembers from './onlineMembers';

function Structure() {
  return (
    <Container className='justify-content-center'>
      <SpacerBar />
      <Col>
        <OnlineMembers/>
      </Col>
      <SpacerBar />
      <Credit />
    </Container>
  )
}

export default Structure