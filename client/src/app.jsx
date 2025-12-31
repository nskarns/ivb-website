import { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap';
import Header from './components/header';
import Carousel from './components/carousel'
import Home from './components/home/home';
import Schedule from './components/schedule/schedule';
import Structure from './components/structure/structure';
import Gallery from './components/gallery/gallery';

function App() {
  const [page, setPage] = useState('home')

  const [members, setMembers] = useState([]);
  const [membersLoaded, setMembersLoaded] = useState(false);

    useEffect(() => {
      const initMembers = async () => {
        try {
          await fetch("/api/run_discord_bot", {
            method: "POST",
          });

          await new Promise((r) => setTimeout(r, 1000));

          const res = await fetch("/api/get_members");
          const data = await res.json();

          setMembers(data.members || []);
          setMembersLoaded(true);
        } catch (err) {
          console.error("Failed to load members", err);
        }
      };

      if (!membersLoaded) {
        initMembers();
      }

    }, [membersLoaded]);

  return (
    <Container fluid className='p-0 m-0'>
      <Header page={page} setPage={setPage} />
      <Carousel />
      { page == 'home' ?
          <Home />
        :
        page == 'schedule' ?
          <Schedule />
        :
        page == 'structure' ?
          <Structure  members={members} />
        :
          <Gallery />
      }
      
    </Container>
  )
}

export default App
