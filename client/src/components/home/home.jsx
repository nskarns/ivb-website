import { useEffect, useState } from "react";
import { Container, Col } from 'react-bootstrap';
import SpacerBar from '../spacerBar';
import Credit from '../credit';

function Home() {

  return (
    <Container className='justify-content-center'>
      <SpacerBar />
      <Col className='home-container w-75 flex-column rounded-3 p-3 mx-auto'>
        <h2 className='fw-bold home-header home-text'>
          Rich History
        </h2>
        <p className='home-description home-text m-0'>
          Meagher's Irish Volunteer Brigade has some of the deepest history of any regiment within the American Civil War.
        </p>
        <h2 className='fw-bold home-header home-text mt-3'>
          Great Community
        </h2>
        <p className='home-description home-text m-0'>
          We have a great, non-toxic, and welcoming community that strikes a great balance between seriousness and fun. 
          We also play many other games outside of War of Rights, such as Hell Let Loose, Hearts of Iron 4, Total War, Minecraft, and more!
        </p>
        <h2 className='fw-bold home-header home-text mt-3'>
          Many Opportunites
        </h2>
        <p className='home-description home-text m-0'>
          We have main line infantry companies along with an artillery battery! 
          We are always looking for people to move up the ranks!
        </p>
      </Col>
      <SpacerBar />
        <h1 className='join-header fw-bold home-text mt-3'>
          Ready To Join The IVB?
        </h1>
        <div className='ratio ratio-16x9 border border-dark border-4 rounded-3 mt-3'>
          <iframe className='rounded-1' src='https://www.youtube.com/embed/3npS62MvtWI?rel=0' title='IVB Video' allowFullScreen></iframe>
        </div>
      <SpacerBar />
      <Credit />
    </Container>
  )
}

export default Home