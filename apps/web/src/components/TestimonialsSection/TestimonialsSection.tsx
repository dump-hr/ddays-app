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
  const { isMobile, isSmallScreen, screenWidth } = useScreenSize(420, 1024);

  const moveInFromTopAnimate = useCallback(
    (
      animationY: number,
      section: MutableRefObject<null>,
      currIndex: number,
      endAnimationValue: string,
    ) => {
      const yValue = currIndex * animationY;

      gsap.to(section.current, {
        y: currIndex === 1 ? yValue : yValue * 0.85,
        scrollTrigger: {
          trigger: beigeSection.current,
          start: isMobile ? 'top 100%' : 'top 90%',
          end: endAnimationValue,
          scrub: true,
          toggleActions: 'play none none none',
        },
      });
    },
    [beigeSection, isMobile],
  );

  useEffect(() => {
    let animationY: number;
    const width = window.innerWidth;

    if (width <= 450) animationY = 460;
    else if (width <= 768) animationY = 425;
    else if (width > 768 && width < 924) animationY = 350;
    else if (width >= 925 && width < 1200) animationY = 212;
    else animationY = 200;

    const endAnimationValue = width <= 480 ? '+=400' : '+=600';

    const ctx = gsap.context(() => {
      [blackSection, beigeSection].forEach((section, index) => {
        const currIndex = index + 1;
        moveInFromTopAnimate(animationY, section, currIndex, endAnimationValue);
      });
    });

    return () => ctx.revert();
  }, [isMobile, isSmallScreen, screenWidth, moveInFromTopAnimate]);

  const testimonials = [
    {
      name: 'Miljenko Baković',
      title: 'Product manager',
      company: 'Rimac Automobili',
      text: 'Bilo da sam na DUMP Daysima sudjelovao kao jedan od sponzora ili posjetitelja, uvijek sam bio ugodno iznenađen kako event iz godine u godinu postaje sve bolji, sa sve interesantnijim predavačima i sve boljom organizacijom koje se ne bi posramile i puno veće konferencije.',
    },
    {
      name: 'Dragan Petric',
      title: 'Executive Editor',
      company: 'Bug',
      text: 'Sudjelovao sam na DUMP Daysima preko nekoliko puta kao speaker i uvijek je to bilo vanserijsko iskustvo kakvo nisam u prilici doživjeti niti na jednoj drugoj tehnološkoj konferenciji u našoj regiji.',
    },
    {
      name: 'Nicolette Pribanić',
      title: 'Software Engineering Manager',
      company: 'Google',
      text: 'Preporučila bih ovu konferenciju svim studentima, kao i inženjerima koji već rade u nekoj IT tvrtki, a žele napredovati u karijeri u tehnološkoj industriji ili upoznati predstavnike raznih tvrtki te naučiti ponešto o njima iz prve ruke.',
    },
  ];

  return (
    <section className={c.testimonialsSection}>
      <Testimonial color='white' {...testimonials[0]} />
      <Testimonial color='black' {...testimonials[1]} refEl={blackSection} />
      <Testimonial color='beige' {...testimonials[2]} refEl={beigeSection} />
      <div className={c.sectionBreaker}></div>
    </section>
  );
};

export default TestimonialsSection;
