import { useRef, useLayoutEffect } from 'react';
import { useLenis } from '@studio-freight/react-lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { StatCard } from './StatCard';

import statPredavanja from 'assets/images/stat-predavanja.jpg';
import statRadionica from 'assets/images/stat-radionica.jpg';
import statPanela from 'assets/images/stat-panela.jpg';
import statCampfire from 'assets/images/stat-campfire.jpg';
import statFlytalks from 'assets/images/stat-flytalks.jpg';

import c from './StatsSection.module.scss';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { image: statPredavanja, number: 10, text: 'Predavanja' },
  null,
  { image: statRadionica, number: 5, text: 'Radionica' },
  { image: statPanela, number: 4, text: 'Panela' },
  { image: statCampfire, number: 4, text: 'Campfire Talks' },
  { image: statFlytalks, number: 20, text: 'Flytalks' },
];

export const StatsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<any>(null);

  const lenis = useLenis();
  lenisRef.current = lenis;

  useLayoutEffect(() => {
    if (window.innerWidth < 1028) return;

    const ctx = gsap.context(() => {
      if (!gridRef.current || !sectionRef.current) return;

      const children = gsap.utils.toArray<HTMLElement>(
        gridRef.current.children
      );
      if (children.length === 0) return;

      const titleCard = children[1];
      const otherCards = children.filter((_, i) => i !== 1);

      gsap.set(children, { y: window.innerHeight });

      const tl = gsap.timeline({ paused: true });
      tl.to(titleCard, { y: 0, duration: 1, ease: 'none' });
      otherCards.forEach((card) => {
        tl.to(card, { y: 0, duration: 1, ease: 'none' });
      });

      let completed = false;

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=2500',
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          if (!completed) {
            tl.progress(self.progress);
          }
        },
        onLeave: (self) => {
          completed = true;
          children.forEach((child) => {
            gsap.set(child, { clearProps: 'all' });
          });

          const pinScrollSpace = self.end - self.start;
          const targetScroll = window.scrollY - pinScrollSpace;

          self.kill();

          const lenisInstance = lenisRef.current;
          if (lenisInstance) {
            lenisInstance.scrollTo(targetScroll, { immediate: true });
          } else {
            window.scrollTo(0, targetScroll);
          }

          ScrollTrigger.refresh();
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={c.statsSection} ref={sectionRef}>
      <div className={c.grid} ref={gridRef}>
        {stats.map((stat, i) =>
          stat === null ? (
            <div key={i} className={c.titleCard}>
              <span className={c.titleText}>
                Šta ima na Daysima?
              </span>
            </div>
          ) : (
            <StatCard
              key={i}
              image={stat.image}
              number={stat.number}
              text={stat.text}
            />
          )
        )}
      </div>
    </section>
  );
};
