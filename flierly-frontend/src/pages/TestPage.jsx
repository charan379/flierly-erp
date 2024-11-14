import useLocale from "@/features/Language/hooks/useLocale";
import { useState } from "react";
import reactLogo from "@/assets/react.svg";

export default function TestPage() {
  const [count, setCount] = useState(0);

  const { locale, translate, resetLocale, setLanguage } = useLocale();

  return (
    <>
      <div className="card">
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src="/vite.svg" className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <button onClick={() => resetLocale()}>Reset Language</button>
          <button onClick={() => setLanguage("te_in")}>Change Language</button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
          <ul>
            {Object.entries(locale.translation).map((entry) => {
              return (
                <li key={entry[0]}>
                  <b>{entry[0]}</b> : {translate(entry[0])}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="card">
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src="/vite.svg" className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <button onClick={() => resetLocale()}>Reset Language</button>
          <button onClick={() => setLanguage("te_in")}>Change Language</button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
          <ul>
            {Object.entries(locale.translation).map((entry) => {
              return (
                <li key={entry[0]}>
                  <b>{entry[0]}</b> : {translate(entry[0])}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="card">
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src="/vite.svg" className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <button onClick={() => resetLocale()}>Reset Language</button>
          <button onClick={() => setLanguage("te_in")}>Change Language</button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
          <ul>
            {Object.entries(locale.translation).map((entry) => {
              return (
                <li key={entry[0]}>
                  <b>{entry[0]}</b> : {translate(entry[0])}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="card">
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src="/vite.svg" className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <button onClick={() => resetLocale()}>Reset Language</button>
          <button onClick={() => setLanguage("te_in")}>Change Language</button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
          <ul>
            {Object.entries(locale.translation).map((entry) => {
              return (
                <li key={entry[0]}>
                  <b>{entry[0]}</b> : {translate(entry[0])}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="card">
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src="/vite.svg" className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <button onClick={() => resetLocale()}>Reset Language</button>
          <button onClick={() => setLanguage("te_in")}>Change Language</button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
          <ul>
            {Object.entries(locale.translation).map((entry) => {
              return (
                <li key={entry[0]}>
                  <b>{entry[0]}</b> : {translate(entry[0])}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="card">
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src="/vite.svg" className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <button onClick={() => resetLocale()}>Reset Language</button>
          <button onClick={() => setLanguage("te_in")}>Change Language</button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
          <ul>
            {Object.entries(locale.translation).map((entry) => {
              return (
                <li key={entry[0]}>
                  <b>{entry[0]}</b> : {translate(entry[0])}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="card">
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src="/vite.svg" className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <button onClick={() => resetLocale()}>Reset Language</button>
          <button onClick={() => setLanguage("te_in")}>Change Language</button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
          <ul>
            {Object.entries(locale.translation).map((entry) => {
              return (
                <li key={entry[0]}>
                  <b>{entry[0]}</b> : {translate(entry[0])}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="card">
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src="/vite.svg" className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <button onClick={() => resetLocale()}>Reset Language</button>
          <button onClick={() => setLanguage("te_in")}>Change Language</button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
          <ul>
            {Object.entries(locale.translation).map((entry) => {
              return (
                <li key={entry[0]}>
                  <b>{entry[0]}</b> : {translate(entry[0])}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="card">
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src="/vite.svg" className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <button onClick={() => resetLocale()}>Reset Language</button>
          <button onClick={() => setLanguage("te_in")}>Change Language</button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
          <ul>
            {Object.entries(locale.translation).map((entry) => {
              return (
                <li key={entry[0]}>
                  <b>{entry[0]}</b> : {translate(entry[0])}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="card">
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src="/vite.svg" className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <button onClick={() => resetLocale()}>Reset Language</button>
          <button onClick={() => setLanguage("te_in")}>Change Language</button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
          <ul>
            {Object.entries(locale.translation).map((entry) => {
              return (
                <li key={entry[0]}>
                  <b>{entry[0]}</b> : {translate(entry[0])}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="card">
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src="/vite.svg" className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <button onClick={() => resetLocale()}>Reset Language</button>
          <button onClick={() => setLanguage("te_in")}>Change Language</button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
          <ul>
            {Object.entries(locale.translation).map((entry) => {
              return (
                <li key={entry[0]}>
                  <b>{entry[0]}</b> : {translate(entry[0])}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="card">
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src="/vite.svg" className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <button onClick={() => resetLocale()}>Reset Language</button>
          <button onClick={() => setLanguage("te_in")}>Change Language</button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
          <ul>
            {Object.entries(locale.translation).map((entry) => {
              return (
                <li key={entry[0]}>
                  <b>{entry[0]}</b> : {translate(entry[0])}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
