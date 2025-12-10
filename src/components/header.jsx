import { useState } from 'react'
import { Container, Col, Row, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import harpIcon from '../assets/logos/harp-icon.svg'

function Header() {
  const [page, setPage] = useState('home')

  return (
    <Container fluid className='header-container rounded-5 mt-3'>
      <Row className='d-flex flex-lg-row flex-column align-items-center py-3 px-2'>
        <Col className='d-flex col-12 col-lg-7 justify-content-center justify-content-lg-start align-items-center gap-2 m-0 px-0 pb-2 pb-lg-0'>
            <Link to='/'><Image className='harp-icon' src={harpIcon} alt='Irish Volunteer Brigade'></Image></Link>
          <Row className='header-text fs-2 text-center'>Irish Volunteer Brigade</Row>
        </Col>
        <Col className='d-flex col-12 col-lg-5 flex-column flex-sm-row justify-content-center justify-content-lg-end text-center gap-3 gap-sm-5'>
          <div className='d-flex flex-column flex-sm-row justify-content-evenly gap-3 gap-sm-5'>
            <span className='header-text fs-5'>Home</span>
            <span className='header-text fs-5'>Schedule</span>
          </div>
          <div className='d-flex flex-column flex-sm-row justify-content-evenly gap-3 gap-sm-5'>
            <span className='header-text fs-5'>Structure</span>
            <span className='header-text fs-5'>Gallery</span>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Header