import React, { useEffect, useRef, useState } from 'react';

const ScrollWordAnimation = () => {
  const containerRef = useRef(null);
  const [wordElements, setWordElements] = useState([]);

  useEffect(() => {
    // Convert paragraphs into word spans
    const paragraphs = containerRef.current.querySelectorAll('.scroll-section p');
    const words = [];

    paragraphs.forEach(p => {
      const text = p.innerText.trim().split(' ');
      p.innerHTML = '';
      
      text.forEach(word => {
        const span = document.createElement('span');
        span.className = 'word';
        span.textContent = word;
        p.appendChild(span);
        words.push(span);
      });
    });

    setWordElements(words);

    // Scroll animation handler
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = scrollTop / maxScroll;

      words.forEach((word, index) => {
        const start = index / words.length;
        const end = (index + 1) / words.length;
        let value = (progress - start) / (end - start);
        value = Math.min(Math.max(value, 0), 1);
        word.style.backgroundPosition = `${100 - value * 100}% 0`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-black">
      <style>{`
        .word {
          display: inline-block;
          margin-right: 8px;
          background: linear-gradient(90deg, #f1a163 0%, #f65c3b 50%, #d4d4d8 50%, #d4d4d8 100%);
          background-size: 200% 100%;
          background-position: 100% 0;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          transition: background-position 0.12s linear;
        }
      `}</style>

      <div className="py-32 px-5">
        <section className="scroll-section max-w-4xl mx-auto my-12">
          <p className="text-2xl sm:text-3xl md:text-4xl leading-relaxed font-semibold mb-5">
            Word by word color animation creates a premium storytelling experience
            that feels natural and smooth while reading.
          </p>
          <p className="text-2xl sm:text-3xl md:text-4xl leading-relaxed font-semibold mb-5">
            This effect works perfectly for landing pages brand stories
            and long form content.
          </p>
        </section>

        <section className="scroll-section max-w-4xl mx-auto my-12">
          <p className="text-2xl sm:text-3xl md:text-4xl leading-relaxed font-semibold mb-5">
            Multiple sections and paragraphs are supported automatically
            without writing extra code.
          </p>
          <p className="text-2xl sm:text-3xl md:text-4xl leading-relaxed font-semibold mb-5">
            The animation follows the reading order from left to right
            and section to section.
          </p>
        </section>

        <section className="scroll-section max-w-4xl mx-auto my-12">
          <p className="text-2xl sm:text-3xl md:text-4xl leading-relaxed font-semibold mb-5">
            Keep scrolling to see the gradient effect animate across each word
            creating an engaging visual journey through your content.
          </p>
          <p className="text-2xl sm:text-3xl md:text-4xl leading-relaxed font-semibold mb-5">
            The warm orange to red gradient smoothly transitions as you scroll
            making every word stand out at the perfect moment.
          </p>
        </section>

        <section className="scroll-section max-w-4xl mx-auto my-12">
          <p className="text-2xl sm:text-3xl md:text-4xl leading-relaxed font-semibold mb-5">
            This technique is perfect for hero sections about pages
            or any narrative driven content that deserves attention.
          </p>
          <p className="text-2xl sm:text-3xl md:text-4xl leading-relaxed font-semibold mb-5">
            The smooth scroll triggered animation keeps users engaged
            as they explore your story word by word.
          </p>
        </section>
      </div>
    </div>
  );
};

export default ScrollWordAnimation;