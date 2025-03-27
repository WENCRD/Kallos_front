import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom"; // ✅ Ajout de la navigation

const HomePage = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRefs = {
    pourquoi: useRef(null),
    mannequins: useRef(null),
    photographes: useRef(null),
    engagements: useRef(null)
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      console.log("Scroll Position:", scrollPosition); // Vérifier la position
      setIsScrolled(scrollPosition > 300);
      setIsVisible(scrollPosition > 300);
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
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
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <button className="btnhp px-6 py-2 bg-white text-black rounded-lg" onClick={() => navigate("/mannequins")}> MANNEQUINS</button>
            <button className="btnhp px-6 py-2 bg-white text-black rounded-lg">PHOTOGRAPHES</button>
          </div>
        </div>

      </header>

      <nav className="navbare sticky top-0 bg-white shadow-md py-4 z-50">
        <div className="flex space-x-8">
          {Object.entries(sectionRefs).map(([key, ref]) => (
            <button
              key={key}
              onClick={() => scrollToSection(ref)}
              className=" btnhp px-6 py-2 text-gray-700 hover:text-black transition">
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

      <section ref={sectionRefs.pourquoi} className="py-8 px-4 bg-gray-200">
  <div className="max-w-7xl mx-auto section-container">
    <img className="img-left rounded-lg shadow-lg" src="src/img/Amour_Kallos.jpg" alt="amour" />
    <div className="text-right">
      <h2 className="text-3xl font-bold">Pourquoi Kallos Vision</h2>
      <p className="mt-4">
        Kallos signifie beauté en grec ancien. Notre mission : capturer et célébrer la beauté sous toutes ses formes.
      </p>
    </div>
  </div>
</section>

<section ref={sectionRefs.mannequins} className="py-8 px-4">
  <div className="max-w-7xl mx-auto section-container">
    <img className="img-left rounded-lg shadow-lg" src="src/img/Amour_Kallos.jpg" alt="amour" />
    <div className="text-right">
      <h2 className="text-3xl font-bold">Pour les Mannequins</h2>
      <p className="mt-4">
        Exposez votre portfolio et connectez-vous avec des photographes talentueux.
      </p>
    </div>
  </div>
</section>

<section ref={sectionRefs.photographes} className="py-8 px-4 bg-gray-200">
  <div className="max-w-7xl mx-auto section-container">
    <img className="img-left rounded-lg shadow-lg" src="src/img/Amour_Kallos.jpg" alt="amour" />
    <div className="text-right">
      <h2 className="text-3xl font-bold">Pour les Photographes</h2>
      <p className="mt-4">
        Partagez vos œuvres et développez votre réseau.
      </p>
    </div>
  </div>
</section>

<section ref={sectionRefs.engagements} className="py-8 px-4">
  <div className="max-w-7xl mx-auto text-center">
    <h2 className="text-3xl font-bold">Nos Engagements</h2>
    <p className="mt-4 max-w-2xl mx-auto">
      Accessibilité, qualité et communauté pour un espace dynamique.
    </p>
  </div>
</section>



      {isVisible && (
        <button
        onClick={() => {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }}
        className="fixed bottom-5 right-5 p-3 bg-gray-700 text-white rounded-full shadow-lg hover:bg-gray-900 transition"
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