import React, { useCallback } from 'react';
import Particles from 'react-tsparticles';
import './ParticleEffect.css';
import { loadFull } from 'tsparticles';

const ParticleEffect = () => {
  function getRandomColor() {
    const minBrightness = 30;
    const maxBrightness = 220;

    const r =
      Math.floor(Math.random() * (maxBrightness - minBrightness + 1)) +
      minBrightness;
    const g =
      Math.floor(Math.random() * (maxBrightness - minBrightness + 1)) +
      minBrightness;
    const b =
      Math.floor(Math.random() * (maxBrightness - minBrightness + 1)) +
      minBrightness;

    const hexColor = `#${((1 << 24) | (r << 16) | (g << 8) | b)
      .toString(16)
      .slice(1)}`;

    return hexColor;
  }

  const randomColor = getRandomColor();

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {}, []);
  const options = {
    background: {
      color: {
        value: 'transparent',
      },
    },
    fpsLimit: 60,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: 'push',
        },
        onHover: {
          enable: true,
          mode: 'repulse',
        },
        resize: true,
      },
      modes: {
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 150,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: randomColor,
      },
      links: {
        color: 'random',
        distance: 80,
        enable: true,
        opacity: 0.5,
        width: 1,
      },
      move: {
        direction: 'left',
        enable: true,
        outModes: {
          left: 'out',
          right: 'out',
        },
        random: true,
        speed: 2,
        straight: true,
      },
      number: {
        density: {
          enable: true,
          area: 150,
        },
        value: 60,
      },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: 'circle',
      },
      size: {
        value: { min: 1, max: 2 },
      },
    },
    detectRetina: true,
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={options}
      className="particles"
    />
  );
};

export default ParticleEffect;
