import './Chicago.css';
import Section from './Section';
import photoA from '../assets/images/Mario and Adrian A.jpg';
import photoB from '../assets/images/Mario and Adrian B.jpg';

const Chicago = () => {
  return (
    <Section className="chicago">
      <div className='text-container'>
        <h1>Little Lemon</h1>
        <h2>Chicago</h2>
        <p>Little Lemon is owned by two Italian brothers, Mario and Adrian, who moved to the United States to pursue their shared dream of owning a restaurant. To craft the menu, Mario relies on family recipes and his experience as a chef in Italy. Adrian does all the marketing for the restaurant and led the effort to expand the menu beyond classic Italian to incorporate additional cuisines from the Mediterranean region.</p>
      </div>
      <div className='image-container'>
        <img className='owner-photo-a' src={photoA} alt="Mario and Adrian" />
        <img className='owner-photo-b' src={photoB} alt="Mario and Adrian" />
      </div>
    </Section>
  );
}

export default Chicago;
