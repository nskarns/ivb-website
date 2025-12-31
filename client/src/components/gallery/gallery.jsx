import { useEffect, useMemo, useState } from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import SpacerBar from "../spacerBar";
import Credit from "../credit";

// Import Photos
import ivbPhotoOne from "../../assets/gallery/ivb_photo_one.jpg";
import ivbPhotoTwo from "../../assets/gallery/ivb_photo_two.png";
import ivbPhotoThree from "../../assets/gallery/ivb_photo_three.png";
import ivbPhotoFour from "../../assets/gallery/ivb_photo_four.jpg";
import ivbPhotoFive from "../../assets/gallery/ivb_photo_five.jpg";
import ivbPhotoSix from "../../assets/gallery/ivb_photo_six.jpg";
import ivbPhotoSeven from "../../assets/gallery/ivb_photo_seven.jpg";
import ivbPhotoEight from "../../assets/gallery/ivb_photo_eight.jpg";
import ivbPhotoNine from "../../assets/gallery/ivb_photo_nine.jpg";
import ivbPhotoTen from "../../assets/gallery/ivb_photo_ten.jpg";
import ivbPhotoEleven from "../../assets/gallery/ivb_photo_eleven.jpg";
import ivbVideoOne from "../../assets/gallery/ivb_video_one.mp4";
import ivbVideoTwo from "../../assets/gallery/ivb_video_two.mp4";

function Gallery() {

  const mediaFiles = [ivbPhotoOne, ivbPhotoTwo, ivbVideoOne, ivbVideoTwo, ivbPhotoThree, ivbPhotoFour, ivbPhotoFive, ivbPhotoSix, ivbPhotoSeven, ivbPhotoEight, ivbPhotoNine, ivbPhotoTen, ivbPhotoEleven];

  const itemsPerPage = 9;

  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const [enlargedSrc, setEnlargedSrc] = useState(null);

  // Keep isMobile Updated
  useEffect(() => {
    function onResize() {
      setIsMobile(window.innerWidth <= 768);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Pagination math
  const totalPages = Math.max(1, Math.ceil(mediaFiles.length / itemsPerPage));

  // Clamp Current Page If Media Changes
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  const pageItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return mediaFiles.slice(start, start + itemsPerPage);
  }, [mediaFiles, currentPage]);

  // Layout
  const itemsPerRow = isMobile ? 1 : 3;

  function chunk(array, size) {
    const out = [];
    for (let i = 0; i < array.length; i += size) out.push(array.slice(i, i + size));
    return out;
  }

  const rows = useMemo(() => chunk(pageItems, itemsPerRow), [pageItems, itemsPerRow]);

  // Close Enlarged View On Escape
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") setEnlargedSrc(null);
    }
    if (enlargedSrc) document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [enlargedSrc]);

  return (
    <Container className="justify-content-center">
      <SpacerBar />

      {mediaFiles.length === 0 ? (
        <div>No Media Found</div>
      ) : (
        <>
          <div className="media-container">
            {rows.map((rowItems, rowIdx) => (
              <Row key={rowIdx} className="g-3 mb-3">
                {rowItems.map((file) => {
                  const isVideo = file.toLowerCase().endsWith(".mp4");

                  return (
                    <Col key={file} xs={12} md={4}>
                      {isVideo ? (
                        <video
                          className="w-100 media-video border border-4 border-dark rounded"
                          controls
                          preload="metadata"
                          style={{ cursor: "pointer" }}
                          onClick={() => setEnlargedSrc(file)}
                        >
                          <source src={file} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <Image
                          src={file}
                          alt="Gallery item"
                          className="w-100 border border-4 border-dark rounded"
                          loading="lazy"
                          style={{ cursor: "pointer" }}
                          onClick={() => setEnlargedSrc(file)}
                        />
                      )}
                    </Col>
                  );
                })}
              </Row>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination d-flex gap-2 justify-content-center align-items-center my-3">
              <Button
                variant="secondary"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Prev
              </Button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Button
                  key={p}
                  variant={p === currentPage ? "primary" : "outline-primary"}
                  onClick={() => setCurrentPage(p)}
                  disabled={p === currentPage}
                >
                  {p}
                </Button>
              ))}

              <Button
                variant="secondary"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}

      {/* Enlarged overlay */}
      {enlargedSrc && (
        <div
          role="button"
          tabIndex={-1}
          onClick={() => setEnlargedSrc(null)}
          style={{
            display: "flex",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 9999,
            padding: "24px",
          }}
        >
          <div onClick={(e) => e.stopPropagation()} style={{ maxWidth: "95vw", maxHeight: "95vh" }}>
            {enlargedSrc.toLowerCase().endsWith(".mp4") ? (
              <video className="w-100" controls autoPlay style={{ maxHeight: "95vh" }}>
                <source src={enlargedSrc} type="video/mp4" />
              </video>
            ) : (
              <Image
                src={enlargedSrc}
                alt="Enlarged media"
                style={{ maxWidth: "95vw", maxHeight: "95vh" }}
                className='border border-5 border-dark rounded'
              />
            )}
          </div>
        </div>
      )}

      <SpacerBar />
      <Credit />
    </Container>
  );
}

export default Gallery;
