import React, { useState, useEffect, useRef } from 'react';
import { Carousel } from 'primereact/carousel';
import "../style/Home.css";

// Importa tus componentes de vistas aquí
import VistaDerecho1 from '../Components/Vista Derecho/VistaDerecho1';
import VistaIzquierdo1 from '../Components/Vista Izquierdo/VistaIzquierdo1';
import VistaDerecho2 from '../Components/Vista Derecho/VistaDerecho2';
import VistaIzquierdo2 from '../Components/Vista Izquierdo/VistaIzquierdo2';

export default function Home() {
    const [activeIndex, setActiveIndex] = useState(0);
    const carouselRef = useRef(null);
    const autoScrollRef = useRef(null);

    // Datos para cada slide - defines qué vista izquierda y derecha mostrar
    const slides = [
        { 
            id: 1, 
            vistaIzquierda: 'vista1',
            vistaDerecha: 'vista1'
        },
        { 
            id: 2, 
            vistaIzquierda: 'vista2',
            vistaDerecha: 'vista2'
        },
        { 
            id: 3, 
            vistaIzquierda: 'vista1',
            vistaDerecha: 'vista1'
        },
        { 
            id: 4, 
            vistaIzquierda: 'vista2',
            vistaDerecha: 'vista2'
        },
        { 
            id: 5, 
            vistaIzquierda: 'vista1',
            vistaDerecha: 'vista1'
        }
    ];

    // Función para manejar el scroll del mouse en toda la página
    useEffect(() => {
        let isScrolling = false;
        let scrollTimeout;

        const handleWheel = (e) => {
            e.preventDefault();

            // Si ya está en proceso de scroll, ignorar
            if (isScrolling) return;

            // Marcar que está en proceso de scroll
            isScrolling = true;

            if (e.deltaY > 0) {
                // Scroll hacia abajo - siguiente slide
                setActiveIndex((prevIndex) => {
                    const nextIndex = prevIndex + 1;
                    // Si llega al final, se queda en el último
                    return nextIndex >= slides.length ? slides.length - 1 : nextIndex;
                });
            } else {
                // Scroll hacia arriba - slide anterior
                setActiveIndex((prevIndex) => {
                    const prevIndexCalc = prevIndex - 1;
                    // Si llega al inicio, se queda en el primero
                    return prevIndexCalc < 0 ? 0 : prevIndexCalc;
                });
            }

            // Delay para evitar scroll rápido (ajusta el tiempo según necesites)
            scrollTimeout = setTimeout(() => {
                isScrolling = false;
            }, 800); // 800ms de delay entre cada cambio de slide
        };

        window.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            window.removeEventListener('wheel', handleWheel);
            if (scrollTimeout) clearTimeout(scrollTimeout);
        };
    }, [slides.length]);

    // Template de cada slide completo (toda la vista)
    const slideTemplate = (slide) => {
        // Función para renderizar la vista izquierda según el slide
        const renderVistaIzquierda = () => {
            switch(slide.vistaIzquierda) {
                case 'vista1':
                    return <VistaIzquierdo1 />;
                case 'vista2':
                    return <VistaIzquierdo2 />;
                default:
                    return <VistaIzquierdo1 />;
            }
        };

        // Función para renderizar la vista derecha según el slide
        const renderVistaDerecha = () => {
            switch(slide.vistaDerecha) {
                case 'vista1':
                    return <VistaDerecho1 />;
                case 'vista2':
                    return <VistaDerecho2 />;
                default:
                    return <VistaDerecho1 />;
            }
        };

        return (
            <div className="slide-container">
                {/* Lado izquierdo - Renderiza el componente VistaIzquierdo */}
                <div className="slide-left">
                    {renderVistaIzquierda()}
                </div>

                {/* Lado derecho - Renderiza el componente VistaDerecho */}
                <div className="slide-right">
                    {renderVistaDerecha()}
                </div>
            </div>
        );
    };

    return (
        <div className="home-wrapper">
            <Carousel
                ref={carouselRef}
                value={slides}
                numVisible={1}
                numScroll={1}
                orientation="vertical"
                verticalViewPortHeight="100vh"
                itemTemplate={slideTemplate}
                showIndicators={true}
                showNavigators={false}
                page={activeIndex}
                onPageChange={(e) => setActiveIndex(e.page)}
                circular={false}
                autoplayInterval={0}
            />
        </div>
    );
}