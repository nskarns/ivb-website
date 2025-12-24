import { useState, useEffect } from 'react'
import { Carousel as BsCarousel } from 'bootstrap'
import { Container, Col, Row, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import imageOne from '../assets/images/scroll-one.png'
import imageTwo from '../assets/images/scroll-two.png'
import imageThree from '../assets/images/scroll-three.png'
import imageFour from '../assets/images/scroll-four.png'
import imageFive from '../assets/images/scroll-five.png'
import imageSix from '../assets/images/scroll-six.png'

function Carousel() {
  const [page, setPage] = useState('home')

  useEffect(() => {
    const element = document.querySelector('#demo')
    new BsCarousel(element, {
        interval: 5000,
        ride: 'carousel',
    })
    }, [])

  return (
    <Container fluid className='carousel border-top border-bottom border-dark border-4 mt-2 p-0'>
      <div id='demo' className='carousel slide' data-bs-ride='carousel' data-bs-interval='5000' >
        <Col
          className="carousel-container position-absolute top-50 start-50 translate-middle
                    w-75 d-flex flex-column justify-content-center text-center z-3 rounded-3 p-3"
        >
          <h2 className='fw-bold carousel-header carousel-text'>
            Welcome to the Irish Volunteer Brigade
          </h2>
          <p className='carousel-description carousel-text m-0'>
            The Irish Volunteer Brigade is a regiment in the Civil War FPS <b>War of Rights</b>.
            Formed in 2019, the regiment consists of a healthy mix of old veterans and new recruits.
            Although we're the Irish Volunteers, you don't have to be Irish to join!
          </p>
        </Col>
        <div className='carousel-inner'>
          <div className='carousel-item active'>
            <Image src={imageOne} alt='Image One' className='d-block  scroll-image' fluid />
          </div>
          <div className='carousel-item'>
            <Image src={imageTwo} alt='Image Two' className='d-block  scroll-image' fluid />
          </div>
          <div className='carousel-item'>
            <Image src={imageThree} alt='Image Three' className='d-block  scroll-image' fluid />
          </div>
          <div className='carousel-item'>
            <Image src={imageFour} alt='Image Four' className='d-block scroll-image' fluid />
          </div>
          <div className='carousel-item'>
            <Image src={imageFive} alt='Image Five' className='d-block  scroll-image' fluid />
          </div>
          <div className='carousel-item'>
            <Image src={imageSix} alt='Image Six' className='d-block  scroll-image' fluid />
          </div>
        </div>
        <Link className='position-absolute start-50 translate-middle z-3' to="https://discord.com/invite/ivb">
          <Button className='btn btn-success fs-3 px-3 py-0'>Join The IVB</Button>
        </Link>
      </div>
    </Container>
  )
}

export default Carousel