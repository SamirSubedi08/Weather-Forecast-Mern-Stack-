
import styled, { keyframes } from 'styled-components';
import LoadingSpinner from './LoadingSpinner';
import SearchForm from './Searchform';


// Create a fade-in animation
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Create a responsive container component
const Container = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 5px;
  animation: ${fadeIn} 0.5s ease-in;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

// Create a weather card component
const WeatherCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  padding: 1px;
  margin: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  @media (max-width: 480px) {
    margin: 5px;
    padding: 15px;
  }

  &:hover {
    transform: translateY(-2px);
  }
`;

// Create a responsive grid layout
const WeatherGrid = styled.div`
  display: grid;

  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 10px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

// Create a responsive typography component
const WeatherTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #333;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`;

// Responsive weather display component
const WeatherDisplay = ({ weatherData,isLoading }) => {
    if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <Container>
      <WeatherTitle>Weather Forecast</WeatherTitle>
      <WeatherGrid>
        <WeatherCard>
          {<SearchForm />}
        </WeatherCard>

      </WeatherGrid>
    </Container>
  );
};

export default WeatherDisplay;