import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Card } from "@mui/material";
import WeatherCard from "../components/WeatherCard";
import "./contentScript.css";
import { LocalStorageOptions, getStoredOptions } from "../utils/storage";
import { Messages } from "../utils/messages";

const App: React.FC<{}> = () => {
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    chrome.runtime.onMessage.addListener((message) => {
      if (message === Messages.OVERLAY_TOGGLE) {
        setIsActive(!isActive);
      }
    });
  }, [isActive]);

  useEffect(() => {
    chrome.runtime.onMessage.addListener((message) => {
      if (message === Messages.TEMPSCALE_TOGGLE) {
        getStoredOptions().then((storedOptions) => setOptions(storedOptions));
      }
    });
  }, [options]);

  useEffect(() => {
    getStoredOptions().then((storedOptions) => {
      setOptions(storedOptions);
      setIsActive(storedOptions.hasStorageOverlay);
    });
  }, []);

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
