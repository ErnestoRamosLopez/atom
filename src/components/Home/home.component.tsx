import React, { FC } from 'react';
import './home.styles.css';

interface HomeProps {}

const Home: FC<HomeProps> = () => (
  <div className="Home" data-testid="Home">
    Home Component
  </div>
);

export default Home;
