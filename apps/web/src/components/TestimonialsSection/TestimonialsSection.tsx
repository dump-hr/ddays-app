import Testimonial from 'components/Testimonial/Testimonial';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MutableRefObject, useCallback, useEffect, useRef } from 'react';

import { useScreenSize } from '../../hooks/useScreenSize';
import c from './TestimonialsSection.module.scss';

gsap.registerPlugin(ScrollTrigger);

const TestimonialsSection = () => {
  const blackSection = useRef(null);
  const beigeSection = useRef(null);
  const { isMobile, isSmallScreen, screenWidth } = useScreenSize(768, 1024);

  const moveInFromTopAnimate = useCallback(
    (
      animationY: number,
      section: MutableRefObject<null>,
      currIndex: number,
    ) => {
      const yValue = currIndex * animationY;

      gsap.to(section.current, {
        y: currIndex === 1 ? yValue : yValue * 0.85,
        duration: currIndex === 1 ? 1 : 1.5,
        scrollTrigger: {
          trigger:
            isMobile || isSmallScreen
              ? blackSection.current
              : beigeSection.current,
          start: isMobile || isSmallScreen ? 'top 80%' : 'top 90%',
          end: 'bottom center',
          scrub: true,
          toggleActions: 'play none none none',
        },
      });
    },
    [isMobile, isSmallScreen],
  );

  useEffect(() => {
    let animationY;
    if (window.innerWidth <= 768) animationY = 460;
    else if (window.innerWidth > 768 && window.innerWidth < 924)
      animationY = 350;
    else if (window.innerWidth >= 925 && window.innerWidth < 1200)
      animationY = 220;
    else animationY = 200;

    const ctx = gsap.context(() => {
      [blackSection, beigeSection].forEach((section, index) => {
        const currIndex = index + 1;
        moveInFromTopAnimate(animationY, section, currIndex);
      });
    });

    return () => ctx.revert();
  }, [isMobile, isSmallScreen, screenWidth, moveInFromTopAnimate]);

  const testimonials = [
    {
      name: 'Miljenko Baković',
      position: 'Product manager @ Rimac Automobili',
      text: 'Bilo da sam na DUMP Daysima sudjelovao kao jedan od sponzora ili posjetitelja, uvijek sam bio ugodno iznenađen kako event iz godine u godinu postaje sve bolji, sa sve interesantnijim predavačima i sve boljom organizacijom koje se ne bi posramile i puno veće konferencije.',
    },
    {
      name: 'Dragan Petric',
      position: 'Executive Editor @ Bug',
      text: 'Sudjelovao sam na DUMP Daysima preko nekoliko puta kao speaker i uvijek je to bilo vanserijsko iskustvo kakvo nisam u prilici doživjeti niti na jednoj drugoj tehnološkoj konferenciji u našoj regiji.',
    },
    {
      name: 'Nicolette Pribanić',
      position: 'Software Engineering Manager @ Google',
      text: 'Preporučila bih ovu konferenciju svim studentima, kao i inženjerima koji već rade u nekoj IT tvrtki, a žele napredovati u karijeri u tehnološkoj industriji ili upoznati predstavnike raznih tvrtki te naučiti ponešto o njima iz prve ruke.',
    },
  ];

  return (
    <section className={c.testimonialsSection}>
      <Testimonial color='white' {...testimonials[0]} />
      <Testimonial color='black' {...testimonials[1]} refEl={blackSection} />
      <Testimonial color='beige' {...testimonials[2]} refEl={beigeSection} />
    </section>
  );
};

export default TestimonialsSection;
