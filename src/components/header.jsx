import { useState } from 'react'
import { Container, Col, Row, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import harpIcon from '../assets/logos/harp-icon.svg'
import discordIcon from '../assets/logos/discord.svg'
import youtubeIcon from '../assets/logos/youtube.svg'

function Header() {
  const [page, setPage] = useState('home')

    return (
    <Container fluid className="header-container rounded-5 mt-3 w-75">
      <Row className="d-flex flex-lg-row flex-column align-items-center py-3 gx-2">
        <Col className="d-flex col-12 col-lg-5 justify-content-center justify-content-lg-start align-items-center gap-0 m-0">
          <Link to="/">
            <Image className="harp-icon" src={harpIcon} alt="Irish Volunteer Brigade" />
          </Link>
          <div className="header-text fs-3 text-center">Irish Volunteer Brigade</div>
        </Col>
        <Col className="d-flex col-12 col-lg-7 flex-column flex-md-row justify-content-center justify-content-lg-end text-center gap-3 mt-2 mt-md-0">
          <div className="d-flex flex-column flex-md-row justify-content-evenly gap-3 gap-sm-3">
            <span className="align-content-center header-text fs-5">Home</span>
            <span className="align-content-center header-text fs-5">Schedule</span>
          </div>
          <div className="d-flex flex-column flex-md-row justify-content-evenly gap-3 gap-sm-3">
            <span className="align-content-center header-text fs-5">Structure</span>
            <span className="align-content-center header-text fs-5">Gallery</span>
          </div>
          <div className="d-flex flex-column flex-sm-row justify-content-evenly gap-3 gap-sm-3">
            <Link to="https://discord.com/invite/ivb">
              <Image className="link-icon" src={discordIcon} alt="Discord Link" />
            </Link>
            <Link to="https://www.youtube.com/@IrishVolunteerBrigade">
              <Image className="link-icon" src={youtubeIcon} alt="YouTube Link" />
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Header