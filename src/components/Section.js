import './Section.css';

const Section = ({ className, children }) => {
  return (
    <section className={`section ${className}`}>
      <div className="section-content">
        {children}
      </div>
    </section>
  );
}

export default Section;
