import React, { useEffect } from 'react';
import HomePage from './Pages/HomePage';
import Lenis from '@studio-freight/lenis';


const App = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.2,
      easing: (t) => t,
      smooth: true,
      direction: 'vertical'
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, []);

  return (
    <div>
      <HomePage />
    </div>
  );
};

export default App;
