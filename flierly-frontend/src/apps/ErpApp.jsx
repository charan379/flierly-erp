import React from "react";
import { useState } from "react";
import reactLogo from "@/assets/react.svg";
import useLocale from "@/redux/locale/useLocale";

export default function ErpApp() {
  const [count, setCount] = useState(0);

  const { locale, resetLocale, changeLanguage } = useLocale();

  return (
    <>
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
        <button onClick={() => changeLanguage({ langCode: "TE", isLoading: false, isSuccess: true, sdfdf:"sdf" })}>Change Language</button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
        <ul>
          {Object.entries(locale).map(entry => {
            return (
              <li key={entry[0]}>
                <b>{entry[0]}</b> : {typeof entry[1] !== 'object' ? entry[1].toString() : "object"}
              </li>
            );
          })}
        </ul>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}
