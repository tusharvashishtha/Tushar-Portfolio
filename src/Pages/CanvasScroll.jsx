import React, { useRef, useEffect, useState } from 'react';

const CanvasScroll = ({ speed = 0, scale = 1, translateY = 0 }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [images, setImages] = useState([]);
  const frameCount = 79;

  const currentFrame = (index) => {
    const paddedIndex = (index + 1).toString().padStart(4, '0');
    return `/Face_canvas/Frame_${paddedIndex}.jpg`;
  };

  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = [];
      for (let i = 0; i < frameCount; i++) {
        const promise = new Promise((resolve, reject) => {
          const img = new Image();
          img.src = currentFrame(i);
          img.onload = () => resolve(img);
          img.onerror = reject;
        });
        imagePromises.push(promise);
      }
      const loadedImages = await Promise.all(imagePromises);
      setImages(loadedImages);

      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      const img = loadedImages[0];
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imgAspect = img.width / img.height;
      const canvasAspect = canvasWidth / canvasHeight;
      let drawWidth, drawHeight, drawX, drawY;
      if (imgAspect > canvasAspect) {
        drawHeight = canvasHeight;
        drawWidth = drawHeight * imgAspect;
        drawX = (canvasWidth - drawWidth) / 2;
        drawY = 0;
      } else {
        drawWidth = canvasWidth;
        drawHeight = drawWidth / imgAspect;
        drawX = 0;
        drawY = (canvasHeight - drawHeight) / 2;
      }
      const scaledWidth = drawWidth * scale;
      const scaledHeight = drawHeight * scale;
      const scaledX = drawX - (scaledWidth - drawWidth) / 2;
      const scaledY = drawY - (scaledHeight - drawHeight) / 2 + translateY;
      context.clearRect(0, 0, canvasWidth, canvasHeight);
      context.drawImage(img, scaledX, scaledY, scaledWidth, scaledHeight);
    };
    preloadImages();
  }, [scale, translateY]);

  useEffect(() => {
    if (images.length === 0) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const container = containerRef.current;

    const updateImage = (index) => {
      if (!images[index]) return;
      const img = images[index];
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imgAspect = img.width / img.height;
      const canvasAspect = canvasWidth / canvasHeight;
      let drawWidth, drawHeight, drawX, drawY;
      if (imgAspect > canvasAspect) {
        drawHeight = canvasHeight;
        drawWidth = drawHeight * imgAspect;
        drawX = (canvasWidth - drawWidth) / 2;
        drawY = 0;
      } else {
        drawWidth = canvasWidth;
        drawHeight = drawWidth / imgAspect;
        drawX = 0;
        drawY = (canvasHeight - drawHeight) / 2;
      }
      const scaledWidth = drawWidth * scale;
      const scaledHeight = drawHeight * scale;
      const scaledX = drawX - (scaledWidth - drawWidth) / 2;
      const scaledY = drawY - (scaledHeight - drawHeight) / 2 + translateY;
      context.clearRect(0, 0, canvasWidth, canvasHeight);
      context.drawImage(img, scaledX, scaledY, scaledWidth, scaledHeight);
    };

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      handleScroll();
    };

    const handleScroll = () => {
      if (!container) return;
      const scrollTop = window.scrollY;
      const containerTop = container.offsetTop;
      const containerHeight = container.offsetHeight;
      const animationDistance = containerHeight - window.innerHeight;
      const scrollPosition = scrollTop - containerTop;
      let scrollFraction = animationDistance > 0 ? scrollPosition / animationDistance : 0;
      scrollFraction = Math.max(0, Math.min(1, scrollFraction));
      const frameIndex = Math.min(frameCount - 1, Math.floor(scrollFraction * frameCount * speed));
      requestAnimationFrame(() => updateImage(frameIndex));
    };

    handleResize();
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [images, speed, scale, translateY]);

  return (
    <div ref={containerRef} className="h-[200vh] relative">
      <div className="h-screen sticky top-0 flex items-center justify-center">
        <canvas ref={canvasRef} className="w-full h-full"></canvas>
      </div>
    </div>
  );
};

export default CanvasScroll;
