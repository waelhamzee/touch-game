import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { generateDimensions, generateCircles } from "./helpers";

function App() {
  const [active, setActive] = useState(false);
  const [count, setCount] = useState(0);
  const [timer, setTimer] = useState(0);
  const [spawnRate, setSpawnRate] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!active) return;
    generateDimensions(document.querySelector(".circles"));
    window.addEventListener("mousedown", onMouseClick);
    return () => {
      window.removeEventListener("mousedown", onMouseClick);
    };
    // eslint-disable-next-line
  }, [active]);

  useEffect(() => {
    if (!active) return;

    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [active]);

  useEffect(() => {
    if ((!active && !timer && !count) || timer) return;
    setActive(false);
    alert(`You clicked ${count} time(s)`);
    setTimer(0);
    setCount(0);
    // eslint-disable-next-line
  }, [timer]);

  useEffect(() => {
    if (!active) return;
    const interval = setInterval(generateCircles, spawnRate);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [active]);

  useEffect(() => {
    if (!error) return;
    setTimeout(() => {
      setError(false);
    }, 3000);
  }, [error]);

  const onMouseClick = (e) => {
    if (e.target.className !== "circle") return;
    removeCircles(e.target);
    setCount((prevCount) => {
      return prevCount + 1;
    });
  };

  const removeCircles = (circle) => {
    const circles = circle.parentElement;
    circles.classList.add("removed");
    setTimeout(() => {
      circles.remove();
    }, 300);
  };

  const startGame = (e) => {
    e.preventDefault();
    if (!timer || !spawnRate) {
      setError(true);
      return;
    }
    setActive(true);
  };

  return (
    <div className="wrapper">
      {active ? (
        <React.Fragment>
          <div className="count-container">
            <p>{timer}s</p>
          </div>
          <div className="box">
            <div className="circles">
              <div className="circle" style={{ animationDelay: "-3s" }}></div>
              <div className="circle" style={{ animationDelay: "-2s" }}></div>
              <div className="circle" style={{ animationDelay: "-1s" }}></div>
              <div className="circle" style={{ animationDelay: "0s" }}></div>
            </div>
          </div>
        </React.Fragment>
      ) : (
        <form>
          <input
            type="number"
            placeholder="timer(s)"
            min={0}
            onChange={(e) => setTimer(e.target.value)}
          />
          <input
            type="number"
            placeholder="spawn rate(ms)"
            min={0}
            onChange={(e) => setSpawnRate(e.target.value)}
          />
          {error && (
            <span style={{ color: "#d75353", marginLeft: "1rem" }}>
              please fill all inputs
            </span>
          )}
          <button className="btn" onClick={startGame}>
            start game
          </button>
        </form>
      )}
    </div>
  );
}

export default App;
