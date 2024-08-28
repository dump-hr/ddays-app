import Testimonial from 'components/Testimonial/Testimonial';

import c from './TestimonialsSection.module.scss';

const TestimonialsSection = () => {
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
      <Testimonial color='black' {...testimonials[1]} />
      <Testimonial color='beige' {...testimonials[2]} />
      <div className={c.sectionBreaker}></div>
    </section>
  );
};

export default TestimonialsSection;
