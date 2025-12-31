import { useState } from 'react'
import { Container, Col, Row, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SpacerBar from '../spacerBar'
import Credit from '../credit'

const formatLocalTime = (hour, minute = 0, timeZone = 'America/New_York') => {
  const date = new Date(
    new Date().toLocaleString('en-US', { timeZone })
  );

  date.setHours(hour, minute, 0, 0);

  return new Intl.DateTimeFormat(undefined, {
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  }).format(date);
};


function Schedule() {
  const [page, setPage] = useState('home')

  // Sunday
  const historicalRulesEvent = formatLocalTime(14);
  const regimentalTrainingEvent = formatLocalTime(19);
  const regularSkirmishEvent = formatLocalTime(20);

  // Monday
  const mountaineerCampaignEvent = formatLocalTime(20);
  
  // Wednesday
  const internalCompanyRanEvent = formatLocalTime(20);

  // Friday
  const boyHowdyCampaignEvent = formatLocalTime(20);

  // Saturday
  const asianEvent = formatLocalTime(6, 30);
  const grandCampaignEvent = formatLocalTime(15);
  const houseDividedCampaign = formatLocalTime(20);

  return (
    <Container className='justify-content-center'>
      <SpacerBar />
        <Col className='home-container d-flex flex-column rounded-3 p-3 w-75 mx-auto gap-4'>
          <Row>
            <h2 className='fw-bold home-header home-text mb-3'>
              Sunday
            </h2>
            <p className='home-description home-text d-flex flex-column m-0 gap-2'>
              <span>EU Historical Rules Event - {historicalRulesEvent}</span>
              <span>Specialized Regimental Training - {regimentalTrainingEvent}</span>
              <span>Regular Skirmish Event - {regularSkirmishEvent}</span>
            </p>
          </Row>
          <Row>
            <h2 className='fw-bold home-header home-text mb-3'>
              Monday
            </h2>
            <p className='home-description home-text d-flex flex-column m-0 gap-2'>
              <span>Mountaineer Campaign - {mountaineerCampaignEvent}</span>
            </p>
          </Row>
          <Row>
            <h2 className='fw-bold home-header home-text mb-3'>
              Wednesday
            </h2>
            <p className='home-description home-text d-flex flex-column m-0 gap-2'>
              <span>Internal Company Ran Event - {internalCompanyRanEvent}</span>
            </p>
          </Row>
          <Row>
            <h2 className='fw-bold home-header home-text mb-3'>
              Friday
            </h2>
            <p className='home-description home-text d-flex flex-column m-0 gap-2'>
              <span>Boy Howdy Campaign - {boyHowdyCampaignEvent}</span>
            </p>
          </Row>
          <Row>
            <h2 className='fw-bold home-header home-text mb-3'>
              Saturday
            </h2>
            <p className='home-description home-text d-flex flex-column m-0 gap-2'>
              <span>Asian/Austrailian Timezone - {asianEvent}</span>
              <span>EU Grand Campaign -  {grandCampaignEvent}</span>
              <span>House Divided Campaign - {houseDividedCampaign}</span>
            </p>
          </Row>
        </Col>
      <SpacerBar />
      <Credit />
    </Container>
  )
}

export default Schedule