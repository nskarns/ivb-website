// Gallery.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { Container, Row, Col, Image, Button, Spinner } from "react-bootstrap";
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

/**
 * Lazy-load images only when near viewport.
 * Always renders in a 16:9 box and uses object-fit: cover.
 */
function LazyImage16x9({ src, alt, onClick }) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const showSpinner = shouldLoad && !loaded && !failed;

  return (
    <div ref={ref} className="ratio ratio-16x9" style={{ position: "relative" }}>
      {/* Background placeholder */}
      <div
        className="w-100 h-100 border border-4 border-dark rounded"
        style={{ background: "rgba(0,0,0,0.08)" }}
      />

      {/* Spinner overlay while loading */}
      {showSpinner && (
        <div
          className="d-flex align-items-center justify-content-center"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
          }}
        >
          <Spinner animation="border" role="status" />
        </div>
      )}

      {/* Image */}
      {shouldLoad && !failed && (
        <Image
          src={src}
          alt={alt}
          onClick={onClick}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className="border border-4 border-dark rounded"
          style={{
            cursor: "pointer",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            inset: 0,
            zIndex: 1,
            opacity: loaded ? 1 : 0,
            transition: "opacity 160ms ease",
          }}
        />
      )}

      {/* Error */}
      {failed && (
        <div className="w-100 h-100 border border-4 border-dark rounded d-flex align-items-center justify-content-center">
          <span>Image failed to load</span>
        </div>
      )}
    </div>
  );
}


/**
 * Grab the first frame of a video and return it as a dataURL poster.
 * Works best for same-origin videos (your imported mp4s are typically same-origin).
 */
function getVideoFirstFramePoster(videoSrc, seekTo = 0.01) {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.src = videoSrc;
    video.preload = "metadata";
    video.muted = true;
    video.playsInline = true;
    video.crossOrigin = "anonymous";
    video.style.position = "fixed";
    video.style.left = "-9999px";
    video.style.top = "0";
    video.style.width = "1px";
    video.style.height = "1px";
    video.style.opacity = "0";

    const cleanup = () => {
      try {
        video.pause();
        video.removeAttribute("src");
        video.load();
        video.remove();
      } catch {
        // ignore
      }
    };

    const onError = () => {
      cleanup();
      reject(new Error("Could not load video to extract poster"));
    };

    video.addEventListener("error", onError, { once: true });

    video.addEventListener(
      "loadedmetadata",
      () => {
        const dur = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : 1;
        const t = Math.min(Math.max(seekTo, 0), dur - 0.01);
        video.currentTime = t;
      },
      { once: true }
    );

    video.addEventListener(
      "seeked",
      () => {
        try {
          const w = video.videoWidth || 1280;
          const h = video.videoHeight || 720;

          const canvas = document.createElement("canvas");
          canvas.width = w;
          canvas.height = h;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(video, 0, 0, w, h);

          const dataUrl = canvas.toDataURL("image/jpeg", 0.82);
          cleanup();
          resolve(dataUrl);
        } catch (e) {
          cleanup();
          reject(e);
        }
      },
      { once: true }
    );

    document.body.appendChild(video);
  });
}

/**
 * Video tile (no <video> in grid). Uses extracted poster if available.
 */
function VideoTile16x9({ posterSrc, onClick }) {
  const isLoading = !posterSrc;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={!isLoading ? onClick : undefined}
      onKeyDown={(e) =>
        !isLoading && (e.key === "Enter" || e.key === " ") ? onClick?.() : null
      }
      className="ratio ratio-16x9 border border-4 border-dark rounded"
      style={{
        cursor: isLoading ? "default" : "pointer",
        position: "relative",
        backgroundColor: "rgba(0,0,0,0.08)",
        backgroundImage: posterSrc ? `url(${posterSrc})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden",
      }}
    >
      {/* Spinner while poster is loading */}
      {isLoading && (
        <div
          className="d-flex align-items-center justify-content-center"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
          }}
        >
          <Spinner animation="border" role="status"  />
        </div>
      )}

      {/* Play overlay — ONLY when poster is ready */}
      {!isLoading && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.12)",
            zIndex: 3,
          }}
        >
          <span
            style={{
              padding: "6px 10px",
              borderRadius: 8,
              background: "rgba(0,0,0,0.7)",
              color: "white",
              fontWeight: 700,
            }}
          >
            ▶ Play
          </span>
        </div>
      )}
    </div>
  );
}


export default function Gallery() {
  const mediaFiles = useMemo(
    () => [
      ivbPhotoOne,
      ivbPhotoTwo,
      ivbVideoOne,
      ivbPhotoThree,
      ivbPhotoFour,
      ivbPhotoFive,
      ivbPhotoSix,
      ivbPhotoSeven,
      ivbPhotoEight,
      ivbPhotoNine,
      ivbPhotoTen,
      ivbPhotoEleven,
      ivbVideoTwo,
    ],
    []
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const [enlargedSrc, setEnlargedSrc] = useState(null);

  // posters extracted from videos: { [videoSrc]: dataUrl }
  const [videoPosters, setVideoPosters] = useState({});
  const [pageTopBg, setPageTopBg] = useState(null);

  // Update isMobile on resize
  useEffect(() => {
    function onResize() {
      setIsMobile(window.innerWidth <= 768);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const itemsPerPage = 6;

  const totalPages = Math.max(1, Math.ceil(mediaFiles.length / itemsPerPage));

  // Clamp current page if needed
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  const pageItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return mediaFiles.slice(start, start + itemsPerPage);
  }, [mediaFiles, currentPage, itemsPerPage]);

  // Layout
  const itemsPerRow = isMobile ? 1 : 3;

  function chunk(array, size) {
    const out = [];
    for (let i = 0; i < array.length; i += size) out.push(array.slice(i, i + size));
    return out;
  }

  const rows = useMemo(() => chunk(pageItems, itemsPerRow), [pageItems, itemsPerRow]);

  // Build first-frame posters for videos on the current page (and cache them)
  useEffect(() => {
    let cancelled = false;

    async function buildPosters() {
      const videosOnPage = pageItems.filter((f) => f.toLowerCase().endsWith(".mp4"));
      for (const v of videosOnPage) {
        if (videoPosters[v]) continue;

        try {
          const dataUrl = await getVideoFirstFramePoster(v, 0.01);
          if (cancelled) return;
          setVideoPosters((prev) => ({ ...prev, [v]: dataUrl }));
        } catch {
        }
      }
    }

    buildPosters();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageItems]);

  // Set page-top background to the first item on the current page
  useEffect(() => {
    const first = pageItems[0];
    if (!first) {
      setPageTopBg(null);
      return;
    }

    const isVideo = first.toLowerCase().endsWith(".mp4");
    if (!isVideo) {
      setPageTopBg(first);
      return;
    }

    // Use the extracted poster if available; if not, keep existing background until it appears
    if (videoPosters[first]) setPageTopBg(videoPosters[first]);
  }, [pageItems, videoPosters]);

  // Close overlay on Escape
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") setEnlargedSrc(null);
    }
    if (enlargedSrc) document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [enlargedSrc]);

  // Prevent scroll behind overlay
  useEffect(() => {
    if (!enlargedSrc) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
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
                            <VideoTile16x9
                              posterSrc={videoPosters[file] ?? null}
                              onClick={() => setEnlargedSrc(file)}
                            />
                          ) : (
                            <LazyImage16x9
                              src={file}
                              alt="Gallery item"
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
                      variant={p === currentPage ? "light" : "dark"}
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
              <div
                onClick={(e) => e.stopPropagation()}
                style={{ maxWidth: "95vw", maxHeight: "95vh" }}
              >
                {enlargedSrc.toLowerCase().endsWith(".mp4") ? (
                  <video
                    className="w-100 border border-5 border-dark rounded"
                    controls
                    autoPlay
                    preload="metadata" // only one video loads, here
                    style={{ maxHeight: "95vh" }}
                  >
                    <source src={enlargedSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <Image
                    src={enlargedSrc}
                    alt="Enlarged media"
                    className="border border-5 border-dark rounded"
                    style={{
                      maxWidth: "95vw",
                      maxHeight: "95vh",
                      objectFit: "contain",
                    }}
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
