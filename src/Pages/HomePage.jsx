
import React, { useContext, useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";



const HomePage = () => {


  // scripts.js
document.addEventListener('mousemove', (event) => {
    const eye = document.querySelector('.eye');
    const pupil = document.querySelector('.pupil');
    const eyeRect = eye.getBoundingClientRect();
    const pupilRect = pupil.getBoundingClientRect();

    const eyeCenterX = eyeRect.left + eyeRect.width / 2;
    const eyeCenterY = eyeRect.top + eyeRect.height / 2;

    const angle = Math.atan2(event.clientY - eyeCenterY, event.clientX - eyeCenterX);
    const radius = (eyeRect.width / 2) - (pupilRect.width / 2);

    const pupilX = eyeCenterX + radius * Math.cos(angle) - eyeRect.left - (pupilRect.width / 2);
    const pupilY = eyeCenterY + radius * Math.sin(angle) - eyeRect.top - (pupilRect.height / 2);

    pupil.style.left = `${pupilX}px`;
    pupil.style.top = `${pupilY}px`;
});

    //--------------------------------------inscription-------------------

    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };
    // --------------------------------------------section navigation --------------------------------
    const section1Ref = useRef(null);
    const section2Ref = useRef(null);
    const section3Ref = useRef(null);
    const section4Ref = useRef(null);

    const scrollToSection = (ref) => {
        ref.current.scrollIntoView({ behavior: "smooth" });
    };
    // --------------------------------------------slider --------------------------------
    const images = Array.from({ length: 20 }, (_, i) => `/imgs/Kallos_${i + 1}.jpg`);

    // --------------------------------------------scrolling --------------------------------
    const [isScrolled, setIsScrolled] = useState(false);

    // Détecter le défilement
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsScrolled(scrollPosition > 300); // Modifier selon vos besoins
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // --------------------------------------------slider --------------------------------

    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' }
        );
    }; useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    },
        []);

    return (
        <div>

            {/* // ------------HomePage------------ */}

            <div className="container">
                <div className={`img ${isScrolled ? "scrolled-container" : ""}`}>

                    <div class="logo">
                        <div class="eye">
                            <div class="pupil"></div>
                        </div>
                    </div>

                    <h1 className="head-title">KALLOS VISION</h1>
                    <div className="head-text">
                        <p>
                            Kallos Vision est une plateforme innovante conçue pour mettre en lumière
                            le talent et la créativité des mannequins et photographes. Notre objectif
                            est de vous offrir un espace unique où l’art de la photographie rencontre
                            l’élégance de la mode.
                        </p>
                    </div>
                    <div className="head-buton" >
                        <button className="btn">MANNEQUINS</button>
                        <button className="btn">PHOTOGRAPHES</button>
                    </div>
                    <div className="head-buton mt-5">
                        <button className="bt" onClick={() => scrollToSection(section1Ref)} >POURQUOI</button>
                        <button className="bt" onClick={() => scrollToSection(section2Ref)}>MANNEQUINS</button>
                        <button className="bt" onClick={() => scrollToSection(section3Ref)}>PHOTOGRAPHES</button>
                        <button className="bt" onClick={() => scrollToSection(section4Ref)}>NOS ENGAGEMENTS</button>
                    </div>
                </div>
                <div>
                    <div style={{ margin: "50px auto", maxWidth: "80%" }}>
                        <h2 style={{ textAlign: "center", fontFamily: "Arial, sans-serif" }}>
                            Découvrez nos artistes
                        </h2>
                        <Swiper
                            modules={[Autoplay, Pagination, Navigation]}
                            spaceBetween={10} // Espace entre les slides
                            slidesPerView={5} // Nombre de slides visibles en même temps
                            loop // Activer le défilement infini
                            autoplay={{
                                delay: 2000, // Temps avant changement (en millisecondes)
                                disableOnInteraction: false, // L'autoplay continue après interaction
                            }}
                            pagination={{ clickable: true }} // Ajouter des dots interactifs
                            navigation // Ajouter des flèches de navigation
                        >
                            {images.map((imgs, index) => (
                                <SwiperSlide key={index}>
                                    <img
                                        //  src="/imgs/Kallos_1.jpg" alt="Test Image" style={{ width: "300px", height: "auto" }} 

                                        src={imgs}
                                        alt={`Slide ${index + 1}`}
                                        style={{
                                            margin: "30px",
                                            width: "100%",
                                            height: "auto",
                                            borderRadius: "10px",
                                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.9)",
                                        }}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
                <div>
                    {/* Première section */}
                    <div className="pourquoi-section" ref={section1Ref} style={{ height: "100vh" }}>
                        <div className="content">
                            <h1 className="title">Pourquoi Kallos Vision</h1>
                            <p className="description">
                                Le mot "Kallos", qui signifie beauté en grec ancien, reflète notre mission :
                                capturer et célébrer la beauté sous toutes ses formes. Que vous soyez mannequin,
                                photographe ou amateur d’esthétique, Kallos Vision est votre vitrine pour partager,
                                découvrir et collaborer autour d’un art visuel d’exception.
                            </p>
                            <button className="cta-button">Voir Plus</button>
                        </div>
                        <div className="image-container">
                            <img src="src/img/kallos_oeil.png" alt="Kallos Vision" />
                        </div>
                    </div>

                    {/* Deuxième section */}
                    <div className="mannequin-section">
                        <div className="image-container">
                            <img src="public/imgs/Kallos_1.jpg" alt="Mannequin Showcase" />
                        </div>
                        <div className="content" ref={section2Ref} style={{ height: "90vh" }}>
                            <h1 className="title">Pour les Mannequins</h1>
                            <p className="description">
                                Exposez votre portfolio professionnel, connectez-vous avec des photographes talentueux
                                et laissez votre empreinte dans l’univers de la mode.
                            </p>
                            <h2 className="subtitle">Mettez votre talent en avant</h2>
                            <p className="description">
                                Créez un portfolio captivant et professionnel pour présenter vos photos les plus impressionnantes.
                                Montrez votre style, votre diversité et votre personnalité à travers des galeries soignées et attrayantes.
                            </p>
                            <h2 className="subtitle">Boostez votre carrière</h2>
                            <p className="description">
                                Connectez-vous avec des photographes talentueux, des agences et des marques qui cherchent
                                à collaborer avec des mannequins créatifs et authentiques. Chaque image partagée sur Kallos Vision
                                est une opportunité de décrocher de nouveaux projets.
                            </p>
                            <h2 className="subtitle">Des outils pensés pour vous</h2>
                            <ul className="description">
                                <li>Galerie Personnalisée : Présentez vos meilleures photos dans des portfolios adaptatifs et élégants.</li>
                                <li>Profil Professionnel : Ajoutez vos informations clés, vos mensurations et vos expériences pour une visibilité optimale.</li>
                                <li>Opportunités de Collaboration : Explorez les projets créatifs proposés par notre communauté de photographes.</li>
                            </ul>
                            <button className="cta-button">En savoir plus</button>
                        </div>
                    </div>

                    {/* troisieme section */}
                    <div className="photographe-section" ref={section3Ref} style={{ height: "100vh" }}>
                        <div className="content">
                            <h1 className="title">Pour les Photographes</h1>
                            <p className="description">
                                Partagez vos œuvres, développez votre réseau et trouvez
                                l’inspiration à travers les multiples talents qui enrichissent
                                notre communauté.
                            </p>
                            <button className="cta-button">Voir Plus</button>
                        </div>
                        <div className="image-container">
                            <img src="public/imgs/Kallos_3.jpg" alt="Kallos Vision" />
                        </div>
                    </div>
                    {/* quatrieme section */}
                    <div className="engagement-section" ref={section4Ref} style={{ height: "100vh" }}>
                        <div className="image-container">
                            <img src="src/img/Kallos_engagement.jpg" alt="Kallos Vision" />
                        </div>
                        <div className="content"> <h1 className="title">Nos Engagements</h1>
                            <ul className="description">
                                <li>Accessibilité : Une interface intuitive et moderne pour une expérience utilisateur optimale.</li>
                                <li>Qualité : Des outils puissants pour sublimer vos portfolios.</li>
                                <li> Communauté : Un espace dynamique pour favoriser les collaborations artistiques et les opportunités professionnelles</li>.
                                <li>Rejoignez Kallos Vision dès aujourd'hui et révélez au monde votre talent.</li>
                                <li>Ensemble, construisons une communauté qui valorise la beauté, la créativité et l'authenticité.</li>
                            </ul>
                            <button className="cta-button">Voir Plus</button>
                        </div>
                    </div>
                    <button className={`scroll-to-top-btn ${isVisible ? 'visible' : ''}`} onClick={scrollToTop} > ↑ </button>
                </div>
            </div>
        </div>

    );
};

export default HomePage;
