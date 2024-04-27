import Testimonial from 'components/Testimonial/Testimonial';

const TestimonialsSection = () => {
  const data = {
    name: 'Nicolette Pribanić',
    position: 'Software Engineering Manager @ Google',
    text: 'Preporučila bih ovu konferenciju svim studentima, kao i inženjerima koji već rade u nekoj IT tvrtki, a žele napredovati u karijeri u tehnološkoj industriji ili upoznati predstavnike raznih tvrtki te naučiti ponešto o njima iz prve ruke.',
  };

  return (
    <section>
      <Testimonial color='white' {...data} />
      <Testimonial color='black' {...data} />
      <Testimonial color='beige' {...data} />
    </section>
  );
};

export default TestimonialsSection;
