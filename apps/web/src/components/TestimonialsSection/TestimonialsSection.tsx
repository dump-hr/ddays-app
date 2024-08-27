import Testimonial from 'components/Testimonial/Testimonial';

import c from './TestimonialsSection.module.scss';

const TestimonialsSection = () => {
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
      <Testimonial color='black' {...testimonials[1]} />
      <Testimonial color='beige' {...testimonials[2]} />
    </section>
  );
};

export default TestimonialsSection;
