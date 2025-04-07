import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom"; 
import "/modale.css";
const HomePage = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRefs = {
    pourquoi: useRef(null),
    mannequins: useRef(null),
    photographes: useRef(null),
    engagements: useRef(null)
  };
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  


  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  const images = Array.from({ length: 20 }, (_, i) => `/imgs/Kallos_${i + 1}.jpg`).filter(img => img); // Afficher seulement les images disponibles

  return (
    <div className="min-h-screen bg-gray-100">
  <header className="relative h-screen flex flex-col items-center justify-center text-center bg-cover bg-center img">
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-white px-4">
          <h1 className="head-title text-4xl md:text-6xl font-bold">KALLOS VISION</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg">
            Une plateforme innovante pour mannequins et photographes.
          </p>
          <div className=" button-container  mt-6 flex flex-wrap justify-center gap-4">
            <button
              className="btnhp px-6 py-2 text-gray-700 hover:text-black transition"
              onClick={() => navigate('/mannequins')}
            >
              MANNEQUINS
            </button>
            <button
      className="btnhp px-6 py-2 text-gray-700 hover:text-black transition"
      onClick={() => navigate('/photographes')} 
    >
      PHOTOGRAPHES
    </button>
          </div>
        </div>
      </header>



      <nav className="navbare sticky top-0 bg-white shadow-md py-4 z-50 flex justify-center text-center">

      <div className="flex justify-center items-center space-x-4 w-full">

    {Object.entries(sectionRefs).map(([key, ref]) => (
      <button
        key={key}
        onClick={() => scrollToSection(ref)}
        className="btnhp px-6 py-2 text-gray-700 hover:text-black transition">
        {key.toUpperCase()}
      </button>
    ))}
  </div>
</nav>
      <section className="py-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">Découvrez nos artistes</h2>
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={10}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: Math.min(4, images.length) }
          }}
          loop
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <img src={img} alt={`Slide ${index + 1}`} className="swiper-slide w-full rounded-lg shadow-md" />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section ref={sectionRefs.pourquoi} class="section-container">
  <div class="content-wrapper">
    <img class="img-left" src="src/img/Amour_Kallos.jpg" alt="amour" />
    <div class="text-right">
      <h2>Pourquoi Kallos Vision</h2>
      <p>
        Kallos signifie beauté en grec ancien. Notre mission : capturer et célébrer la beauté sous toutes ses formes.
      </p>
    </div>
  </div>
</section>


      <section ref={sectionRefs.mannequins} class="section-container">
        <div class="content-wrapper">
          <img className="img-left rounded-lg shadow-lg" src="src/img/Amour_Kallos.jpg" alt="amour" />
          <div className="text-right">
            <h2>Pour les Mannequins</h2>
            <p>
              Exposez votre portfolio et connectez-vous avec des photographes talentueux.
            </p>
          </div>
        </div>
      </section>

      <section ref={sectionRefs.photographes} class="section-container">
        <div className="content-wrapper">
          <img className="img-left rounded-lg shadow-lg" src="src/img/Amour_Kallos.jpg" alt="amour" />
          <div className="text-right">
            <h2>Pour les Photographes</h2>
            <p>
              Partagez vos œuvres et développez votre réseau.
            </p>
          </div>
        </div>
      </section>

      <section ref={sectionRefs.engagements} class="section-container">
        <div className="content-wrapper">
          <h2>Nos Engagements</h2>
          <p>
            Accessibilité, qualité et communauté pour un espace dynamique.
          </p>
        </div>
      </section>



      {isVisible && (
  <button
    onClick={() => window.scrollTo({ top: 20, left: 30, behavior: "smooth" })}
    className="absolute bottom-5 right-5 z-50 p-4 bg-gray-700 text-white rounded-full shadow-lg hover:bg-gray-900 transition"
  >
    ↑
  </button>
)}
    </div>
  );
};

export default HomePage;


// oeilscripts.js
// document.addEventListener('mousemove', (event) => {
//     const eye = document.querySelector('.eye');
//     const pupil = document.querySelector('.pupil');
//     const eyeRect = eye.getBoundingClientRect();
//     const pupilRect = pupil.getBoundingClientRect();

//     const eyeCenterX = eyeRect.left + eyeRect.width / 2;
//     const eyeCenterY = eyeRect.top + eyeRect.height / 2;

//     const angle = Math.atan2(event.clientY - eyeCenterY, event.clientX - eyeCenterX);
//     const radius = (eyeRect.width / 2) - (pupilRect.width / 2);

//     const pupilX = eyeCenterX + radius * Math.cos(angle) - eyeRect.left - (pupilRect.width / 2);
//     const pupilY = eyeCenterY + radius * Math.sin(angle) - eyeRect.top - (pupilRect.height / 2);

//     pupil.style.left = `${pupilX}px`;
//     pupil.style.top = `${pupilY}px`;
// });