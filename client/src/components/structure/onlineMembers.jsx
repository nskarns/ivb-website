import React, { useEffect, useMemo, useState } from "react";
import { Container, Col, Row, Image, Button } from 'react-bootstrap';
import OnlineBar from '../onlineBar';
import SpacerBar from '../spacerBar';
import DiscordLogo from '../../assets/logos/discord.svg';


export default function OnlineMembers({ members }) {
  const [activeCompanyId, setActiveCompanyId] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showOfficers, setShowOfficers] = useState([true]);
  const [showNCOs, setShowNCOs] = useState([true]);
  const transparentPixel =
  "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";

  if (!members.length) {
    return <p>No members online</p>;
  }
  
  // Determine Which Company Is Being Shown
  function filterMembersByCompany(members, activeCompanyId) {
    if (activeCompanyId == null) return members;
  
    if (activeCompanyId === 0) {
      const substrings = [
        "'Col.",
        "'LtCol.",
        "'Maj.",
        "'Major",
        ".Bvt.Cpt.",
        "*Cpt.",
        "Cpt.",
        ".1stLt.",
        ".2ndLt.",
        ".1stLtBvt.",
        ",Chaplain",
        ".BLT",
        "`Sgt.",
      ];
  
      return members.filter((m) => {
        const name = m?.name;
        if (!name) return false;

        if (m?.status === "offline") return false;
  
        return substrings.some((substring) => {
          if (substring === ".Bvt.Cpt.") return false;
  
          if (substring === ".1stLt." || substring === "Cpt.") {
            return (
              name.includes(substring) && (name.includes("69th") || name.includes("S1"))
            );
          }
  
          if (substring === "`Sgt.") {
            return name.includes(substring) && name.includes("1stNY-B");
          }
  
          return name.includes(substring);
        });
      });
    }
  
    // Filtering Out If Not In Company
    if (activeCompanyId === 1) return members.filter((m) => m?.name?.includes("69th-A") && m?.status?.toLowerCase()?.trim() !== "offline");
    if (activeCompanyId === 2) return members.filter((m) => m?.name?.includes("69th-B") && m?.status?.toLowerCase()?.trim() !== "offline");
    if (activeCompanyId === 3) return members.filter((m) => m?.name?.includes("69th-C") && m?.status?.toLowerCase()?.trim() !== "offline");
    if (activeCompanyId === 4) return members.filter((m) => m?.name?.includes("69th-D") && m?.status?.toLowerCase()?.trim() !== "offline");
    if (activeCompanyId === 5) return members.filter((m) => m?.name?.includes("69th-I") && m?.status?.toLowerCase()?.trim() !== "offline");
    if (activeCompanyId === 6) return members.filter((m) => m?.name?.includes("69th-K") && m?.status?.toLowerCase()?.trim() !== "offline");
    if (activeCompanyId === 7) return members.filter((m) => m?.name?.includes("1stNY-B") && m?.status?.toLowerCase()?.trim() !== "offline");
  
    return members;
  }

  // Determine The Officers For A Given Company
  function filterOfficersByCompany(members, activeCompanyId) {
    if (activeCompanyId == null) return members;
  
      const substrings = [
        "'Col.",
        "'LtCol.",
        "'Maj.",
        "'Major",
        ".Bvt.Cpt.",
        "*Cpt.",
        "*Capt.",
        "Cpt.",
        ".1stLt.",
        ".1st Lt.",
        ".2ndLt.",
        ".1stLtBvt.",
      ];
  
  const filtered = members.filter((m) => {
        const name = m?.name;
        if (!name) return false;
  
        return substrings.some((substring) => {
          return name.includes(substring);
        });
      });
  
    // Filtering Out If Not In Company
    if (activeCompanyId === 0) return filtered.filter((m) => m?.name?.includes("69th") || m?.name?.includes("HQ") || m?.name?.includes("Col. Collector"));
    if (activeCompanyId === 1) return filtered.filter((m) => m?.name?.includes("69th-A"));
    if (activeCompanyId === 2) return filtered.filter((m) => m?.name?.includes("69th-B"));
    if (activeCompanyId === 3) return filtered.filter((m) => m?.name?.includes("69th-C"));
    if (activeCompanyId === 4) return filtered.filter((m) => m?.name?.includes("69th-D"));
    if (activeCompanyId === 5) return filtered.filter((m) => m?.name?.includes("69th-I"));
    if (activeCompanyId === 6) return filtered.filter((m) => m?.name?.includes("69th-K") || m?.name?.includes("69th-S1"));
    if (activeCompanyId === 7) return filtered.filter((m) => m?.name?.includes("1stNY-B"));

    return filtered;
  }


  // Determine The Given NCOs For A Company
  function filterNCOsByCompany(members, activeCompanyId) {
    if (activeCompanyId == null) return members;
  
      const substrings = [
        ",Chaplain",
        ".BLT",
        "`Sgt.",
        "`1stSgt.",
        ".SGM.",
        ".SGM",
        ".Sgt.Maj.",
        ".CSGM.",
        ".Ajd.",
        "`L.Sgt.",
        "Cpl.",
      ];
  
  const filtered = members.filter((m) => {
        const name = m?.name;
        if (!name) return false;
  
        return substrings.some((substring) => {
          return name.includes(substring);
        });
      });
  
    // Filtering Out If Not In Company
    if (activeCompanyId === 0) return filtered.filter((m) => m?.name?.includes("69th") || m?.name?.includes("HQ"));
    if (activeCompanyId === 1) return filtered.filter((m) => m?.name?.includes("69th-A"));
    if (activeCompanyId === 2) return filtered.filter((m) => m?.name?.includes("69th-B"));
    if (activeCompanyId === 3) return filtered.filter((m) => m?.name?.includes("69th-C"));
    if (activeCompanyId === 4) return filtered.filter((m) => m?.name?.includes("69th-D"));
    if (activeCompanyId === 5) return filtered.filter((m) => m?.name?.includes("69th-I"));
    if (activeCompanyId === 6) return filtered.filter((m) => m?.name?.includes("69th-K") || m?.name?.includes("69th-S1"));
    if (activeCompanyId === 7) return filtered.filter((m) => m?.name?.includes("1stNY-B"));
  
    return filtered;
  }

  // Sorting Members By Rank
  function sortMembers(members) {
    const specialCharOrder = { "'": 1, "*": 2, ".": 3 };
  
    const getOrder = (name) => {
      const firstChar = (name || "").charAt(0);
      return specialCharOrder[firstChar] || 4;
    };
  
    return [...members].sort((a, b) => {
      const aName = a?.name || "";
      const bName = b?.name || "";
  
      const aOrder = getOrder(aName);
      const bOrder = getOrder(bName);
  
      if (aOrder !== bOrder) return aOrder - bOrder;
      return aName.localeCompare(bName);
    });
  }

  const visibleMembers = useMemo(() => {
    const filtered = filterMembersByCompany(members, activeCompanyId);
    return sortMembers(filtered);
  }, [members, activeCompanyId]);

  const officerMembers = useMemo(() => {
    const filtered = filterOfficersByCompany(members, activeCompanyId);
    return sortMembers(filtered);
  }, [members, activeCompanyId]);

  const ncoMembers = useMemo(() => {
    const filtered = filterNCOsByCompany(members, activeCompanyId);
    return sortMembers(filtered);
  }, [members, activeCompanyId]);

  useEffect(() => {
    setShowOfficers(officerMembers.length > 0);
  }, [officerMembers]);

  useEffect(() => {
    setShowNCOs(activeCompanyId !== 0 && ncoMembers.length > 0);
  }, [activeCompanyId, ncoMembers]);

  // Status Button Color
  const statusDotColor = (status) => {
    switch (status) {
      case "online":
        return "green";
      case "idle":
        return "yellow";
      case "dnd":
        return "red";
      default:
        return "gray";
    }
  };

  // Component Return
  return (
    <Container fluid>
      <Col className='d-flex flex-column flex-lg-row justify-content-center gap-3'>
        <Row className='gap-2 px-3'>
          <Button
              key={0} 
              onClick={() => setActiveCompanyId(0)} 
              className={`btn btn-border-3 btn-success px-3 ${
                activeCompanyId === 0? "fw-bold" : ""
              }`}
            >
              HQ
          </Button>  
          <Button
              key={1} 
              onClick={() => setActiveCompanyId(1)} 
              className={`btn btn-border-3 btn-success px-3 ${
                activeCompanyId === 1? "fw-bold" : ""
              }`}
            >
              Company A
          </Button> 
          <Button
              key={2} 
              onClick={() => setActiveCompanyId(2)} 
              className={`btn btn-border-3 btn-success px-3 ${
                activeCompanyId === 2? "fw-bold" : ""
              }`}
            >
              Company B
          </Button> 
          <Button
              key={3} 
              onClick={() => setActiveCompanyId(3)} 
              className={`btn btn-border-3 btn-success px-3 ${
                activeCompanyId === 3? "fw-bold" : ""
              }`}
            >
              Company C
          </Button> 
        </Row>
        <Row className='gap-2 px-3'>
          <Button
              key={4} 
              onClick={() => setActiveCompanyId(4)} 
              className={`btn btn-border-3 btn-success px-3 ${
                activeCompanyId === 4? "fw-bold" : ""
              }`}
            >
              Company D
          </Button> 
          <Button
              key={5} 
              onClick={() => setActiveCompanyId(5)} 
              className={`btn btn-border-3 btn-success px-3 ${
                activeCompanyId === 5? "fw-bold" : ""
              }`}
            >
              Company I
          </Button> 
          <Button
              key={6} 
              onClick={() => setActiveCompanyId(6)} 
              className={`btn btn-border-3 btn-success px-3 ${
                activeCompanyId === 6? "fw-bold" : ""
              }`}
            >
              Company K
          </Button> 
          <Button
              key={7} 
              onClick={() => setActiveCompanyId(7)} 
              className={`btn btn-border-3 btn-success px-3 ${
                activeCompanyId === 7? "fw-bold" : ""
              }`}
            >
              Artillery
          </Button> 
        </Row>
      </Col>
      <SpacerBar />
      <Container className='d-flex flex-column flex-md-row justify-content-center gap-3 gap-md-5'>
        <Col className='d-flex flex-column col-12 col-md-6 gap-2' >
          {showOfficers && (
            <>
            <Row className='bg-success-dark rounded border border-3 border-success-dark'>
              <Col className='d-flex justify-content-center my-1 fs-1 header-text'>
                Officers
              </Col>
            </Row>
            <Row className='bg-secondary rounded border border-3 border-dark'>
                <div id="discord-bot-output">
                  {officerMembers.length === 0 ? (
                    <div
                      style={{
                        textShadow: "0 4px 4px rgba(0,0,0,0.5)",
                        fontSize: "clamp(12px, 1.0vw, 30px)",
                        color: "#E3E3E3",
                      }}
                    >
                      No Members Online
                    </div>
                  ) : (
                    officerMembers.map((m) => (
                      <div
                        key={m.id}
                        className='d-flex flex-row m-3 justify-content-center align-items-center'
                      >
                        <div className="position-relative">
                          <img
                            src={`${m.avatar}?size=64`}
                            alt=''
                            className="border border-dark border-2"
                            width={50}
                            height={50}
                            loading="lazy"
                            decoding="async"
                            style={{
                              borderRadius: "50%",
                              backgroundColor: "#2c3a2c",
                            }}
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = transparentPixel;
                            }}
                          />
                        </div>
                        <span
                          className='ms-2'
                          style={{
                            textShadow: "0 4px 4px rgba(0,0,0,0.5)",
                            fontSize: "clamp(12px, 0.7vw, 30px)",
                            color: "#E3E3E3",
                            maxWidth: "60%",
                          }}
                        >
                          {" "}
                          {m.name}
                        </span>
                      </div>
                    ))
                  )}
                </div>
            </Row>
            </>
          )}
          {showNCOs && (
            <>
              <Row className='bg-success-dark rounded border border-3 border-success-dark'>
                <Col className='d-flex justify-content-center my-1 fs-1 header-text'>
                  NCOs
                </Col>
              </Row>
              <Row className='bg-secondary rounded border border-3 border-dark'>
                <div id="discord-bot-output">
                  {ncoMembers.length === 0 ? (
                    <div
                      style={{
                        textShadow: "0 4px 4px rgba(0,0,0,0.5)",
                        fontSize: "clamp(12px, 1.0vw, 30px)",
                        color: "#E3E3E3",
                      }}
                    >
                      No Members Online
                    </div>
                  ) : (
                    ncoMembers.map((m) => (
                      <div
                        key={m.id}
                        className='d-flex flex-row m-3 justify-content-center align-items-center'
                      >
                        <div className="position-relative">
                          <img
                            src={`${m.avatar}?size=64`}
                            alt=''
                            className="border border-dark border-2"
                            width={50}
                            height={50}
                            loading="lazy"
                            decoding="async"
                            style={{
                              borderRadius: "50%",
                              backgroundColor: "#2c3a2c",
                            }}
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = transparentPixel;
                            }}                          
                        />
                        </div>
                        <span
                          className='ms-2'
                          style={{
                            textShadow: "0 4px 4px rgba(0,0,0,0.5)",
                            fontSize: "clamp(12px, 0.7vw, 30px)",
                            color: "#E3E3E3",
                            maxWidth: "60%",
                          }}
                        >
                          {" "}
                          {m.name}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </Row>
            </>
          )}
        </Col>
        <Col className="col-12 col-md-6 rounded bg-success-dark border border-3 border-success-dark">
          <Row className='d-flex justify-content-center my-1 fs-1 header-text'>
            Online Members
          </Row>
          <OnlineBar />
            <div id="discord-bot-output">
              {visibleMembers.length === 0 ? (
                <div
                  style={{
                    textShadow: "0 4px 4px rgba(0,0,0,0.5)",
                    fontSize: "clamp(12px, 1.0vw, 30px)",
                    color: "#E3E3E3",
                  }}
                >
                  No Members Online
                </div>
              ) : (
                visibleMembers.map((m) => (
                  <div
                    key={m.id}
                    className="d-flex flex-row align-items-center justify-content-center mb-3"
                  >
                    <div className="position-relative">
                      <img
                        src={`${m.avatar}?size=64`}
                        alt={`${m.name}'s avatar`}
                        className="border border-dark border-2"
                        width={50}
                        height={50}
                        loading="lazy"
                        decoding="async"
                        style={{
                          borderRadius: "50%",
                          backgroundColor: "#2c3a2c",
                        }}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = transparentPixel;
                        }}
                      />
                      <span
                        style={{
                          display: "inline-block",
                          width: 12,
                          height: 12,
                          borderRadius: "50%",
                          border: "2px solid black",
                          marginLeft: "-19%",
                          marginBottom: "-30%",
                          backgroundColor: statusDotColor(m.status),
                        }}
                      />
                    </div>

                    <span
                      style={{
                        textShadow: "0 4px 4px rgba(0,0,0,0.5)",
                        fontSize: "clamp(12px, 0.7vw, 30px)",
                        color: "#E3E3E3",
                        maxWidth: "60%",
                      }}
                    >
                      {" "}
                      {m.name}
                    </span>
                  </div>
                ))
              )}
            </div>
        </Col>
      </Container>
    </Container>
  );
}