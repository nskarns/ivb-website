import { useState } from 'react'
import { Container, Col, Row, Image, Button } from 'react-bootstrap';
import SpacerBar from '../spacerBar'
import Credit from '../credit'
import OnlineMembers from './onlineMembers';

function Structure({ members, membersLoading, membersError }) {
  return (
    <Container className='justify-content-center'>
      <SpacerBar />
      <Col>
        <OnlineMembers members={members} membersLoading={membersLoading} membersError={membersError}/>
      </Col>
      <SpacerBar />
      <Credit />
    </Container>
  )
}

export default Structure