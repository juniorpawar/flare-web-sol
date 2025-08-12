document.addEventListener('DOMContentLoaded', () => {
  const box = document.querySelector('.box');
  const layers = document.querySelectorAll('.layer');

  window.addEventListener('scroll', () => {
    // Get the scroll position of the window
    const scrollY = window.scrollY;
    console.log(scrollY)

    // Determine the scroll range for your animation. This example starts the
    // animation when the user scrolls 100px and ends it at 400px.
    const startScroll = 2500;
    const endScroll = 2800;

    // Calculate the scroll progress as a value between 0 and 1
    let scrollProgress = 0;
    if (scrollY > startScroll) {
      scrollProgress = Math.min(1, (scrollY - startScroll) / (endScroll - startScroll));
    }
    
    // Animate each layer based on the scroll progress
    layers.forEach((layer, index) => {
      // The base movement for each layer from your hover effect
      const baseTranslateX = 40 * (index + 1); // 40, 80, 120, 160
      const baseTranslateY = -40 * (index + 1); // -40, -80, -120, -160

      // Calculate the new transform value based on scroll progress
      const newTranslateX = baseTranslateX * scrollProgress;
      const newTranslateY = baseTranslateY * scrollProgress;

      // Apply the transformation to the layer
      layer.style.transform = `translate(${newTranslateX}px, ${newTranslateY}px)`;
    });
  });
});