document.addEventListener('DOMContentLoaded', () => {
  const words = ['Development', 'Designing', 'SEO', 'Digital Marketing'];
  let wordIndex = 0;
  let charIndex = 0;
  const wordSlider = document.getElementById('word-slider');
  const typingSpeed = 150; // Typing speed in milliseconds
  const deletingSpeed = 100; // Deleting speed in milliseconds
  const pauseTime = 4000; // Pause before deleting, in milliseconds

  function type() {
    if (charIndex < words[wordIndex].length) {
      wordSlider.textContent += words[wordIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingSpeed);
    } else {
      // Pause for a moment, then start deleting
      setTimeout(erase, pauseTime);
    }
  }

  function erase() {
    if (charIndex > 0) {
      wordSlider.textContent = words[wordIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, deletingSpeed);
    } else {
      // Move to the next word and start typing
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(type, typingSpeed);
    }
  }

  // Start the typing process
  setTimeout(type, typingSpeed);
});