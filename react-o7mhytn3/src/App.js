import React, { useState, useRef } from "react";
import "./style.css";

export default function App() {
  const areaSize = { width: 260, height: 160 };

  const [pos1, setPos1] = useState({ x: 0, y: 0 });
  const [pos2, setPos2] = useState({ x: 0, y: 0 });

  const areaRef1 = useRef(null);
  const areaRef2 = useRef(null);

  const escapeLogic = (e, areaRef, setPos) => {
    const rect = areaRef.current.getBoundingClientRect();

    const cursorX = e.clientX - rect.left - rect.width / 2;
    const cursorY = e.clientY - rect.top - rect.height / 2;

    const distance = Math.sqrt(cursorX * cursorX + cursorY * cursorY);

    const threshold = 120;

    if (distance < threshold) {
      // Opposite direction vector
      let moveX = -cursorX;
      let moveY = -cursorY;

      // Normalize
      const length = Math.max(Math.sqrt(moveX * moveX + moveY * moveY), 0.01);

      moveX /= length;
      moveY /= length;

      // Speed increases as cursor comes closer
      const speed = (threshold - distance) * 1.2;

      let newX = moveX * speed;
      let newY = moveY * speed;

      // Clamp inside area bounds
      const limitX = areaSize.width / 2 - 40;
      const limitY = areaSize.height / 2 - 20;

      newX = Math.max(-limitX, Math.min(limitX, newX));
      newY = Math.max(-limitY, Math.min(limitY, newY));

      setPos({ x: newX, y: newY });
    }
  };

  const resetPosition = (setPos) => {
    setPos({ x: 0, y: 0 });
  };

  const handleCorrectClick = () => {
    alert("Congratulations, you have selected the right answer 🎉");
  };

  return (
    <div className="app">
      <h1 className="question">
        What is the highest priority in life for Bebu?
      </h1>

      <div className="options-row">
        {/* Correct Answer */}
        <button className="btn correct" onClick={handleCorrectClick}>
          YoShu
        </button>

        {/* Wrong 1 */}
        <div
          ref={areaRef1}
          className="movement-area"
          onMouseMove={(e) => escapeLogic(e, areaRef1, setPos1)}
          onMouseLeave={() => resetPosition(setPos1)}
        >
          <button
            className="btn wrong"
            style={{
              transform: `translate(${pos1.x}px, ${pos1.y}px)`
            }}
          >
            Career
          </button>
        </div>

        {/* Wrong 2 */}
        <div
          ref={areaRef2}
          className="movement-area"
          onMouseMove={(e) => escapeLogic(e, areaRef2, setPos2)}
          onMouseLeave={() => resetPosition(setPos2)}
        >
          <button
            className="btn wrong"
            style={{
              transform: `translate(${pos2.x}px, ${pos2.y}px)`
            }}
          >
            Health
          </button>
        </div>
      </div>
    </div>
  );
}
``
