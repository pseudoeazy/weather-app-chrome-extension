import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Card } from "@mui/material";
import WeatherCard from "../components/WeatherCard";
import "./contentScript.css";
import { LocalStorageOptions, getStoredOptions } from "../utils/storage";

const App: React.FC<{}> = () => {
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    getStoredOptions().then((storedOptions) => {
      setOptions(storedOptions);
      setIsActive(storedOptions.hasStorageOverlay);
    });
  }, []);
  console.log("Hello from content script", { options, isActive });
  return (
    <>
      {isActive && (
        <div className="overlayCard">
          <Card>
            {options && (
              <WeatherCard
                city={options.homeCity}
                tempScale={options.tempScale}
                onDelete={() => setIsActive(false)}
              />
            )}
          </Card>
        </div>
      )}
    </>
  );
};

const container = document.createElement("div");
container.setAttribute("id", "contentScript");
document.body.appendChild(container);
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
