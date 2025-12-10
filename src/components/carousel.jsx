import { useState, useEffect } from 'react'
import { Carousel as BsCarousel } from 'bootstrap'
import { Container, Col, Row, Image, Button } from 'react-bootstrap';
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
    <Container fluid className='border p-0'>
      <div id='demo' className='carousel slide' data-bs-ride='carousel' data-bs-interval='5000' >
        <div className='carousel-inner'>
          <div className='carousel-item active'>
            <Image src={imageOne} alt='Image One' className='d-block w-100' fluid />
          </div>
          <div className='carousel-item'>
            <Image src={imageTwo} alt='Image Two' className='d-block w-100' fluid />
          </div>
          <div className='carousel-item'>
            <Image src={imageThree} alt='Image Three' className='d-block w-100' fluid />
          </div>
          <div className='carousel-item'>
            <Image src={imageFour} alt='Image Four' className='d-block w-100' fluid />
          </div>
          <div className='carousel-item'>
            <Image src={imageFive} alt='Image Five' className='d-block w-100' fluid />
          </div>
          <div className='carousel-item'>
            <Image src={imageSix} alt='Image Six' className='d-block w-100' fluid />
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Carousel