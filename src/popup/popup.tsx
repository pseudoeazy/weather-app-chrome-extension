import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { InputBase, IconButton, Paper, Box, Grid } from "@mui/material";
import { Add as AddIcon, PictureInPicture } from "@mui/icons-material";
import WeatherCard from "../components/WeatherCard";
import {
  setStoredCities,
  getStoredCities,
  setStoredOptions,
  getStoredOptions,
  LocalStorageOptions,
} from "../utils/storage";
import "fontsource-roboto";
import "./popup.css";
import { Messages } from "../utils/messages";

const App: React.FC<{}> = () => {
  const [cities, setCities] = useState<string[]>([]);
  const [cityInput, setCityInput] = useState<string>("");
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);

  const handleCityButtonClick = () => {
    if (!cityInput) {
      return;
    }
    const updatedCities = [...cities, cityInput];

    setStoredCities(updatedCities).then(() => {
      setCities(updatedCities);
      setCityInput("");
    });
  };

  const handleCityDeleteButtonClick = (index: number) => {
    cities.splice(index, 1);
    const updatedCities = [...cities];
    setStoredCities(updatedCities).then(() => setCities(updatedCities));
  };

  const handleTempScaleButtonClick = () => {
    const updatedOptions: LocalStorageOptions = {
      ...options,
      tempScale: options.tempScale === "metric" ? "imperial" : "metric",
    };
    setStoredOptions(updatedOptions).then(() => setOptions(updatedOptions));
  };

  const handleOverlayButtonClick = () => {
    chrome.tabs.query({ active: true }, (tabs) => {
      if (tabs.length) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          Messages.OVERLAY_TOGGLE,
          (response) => {}
        );
      }
    });
  };

  useEffect(() => {
    chrome.tabs.query({ active: true }, (tabs) => {
      if (tabs.length) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          Messages.TEMPSCALE_TOGGLE,
          (response) => {}
        );
      }
    });
  }, [options]);

  useEffect(() => {
    getStoredCities().then((storedCities) => setCities(storedCities));
    getStoredOptions().then((storedOptions) => setOptions(storedOptions));
  }, []);

  return (
    <Box>
      {options && (
        <>
          <Box mx="8px" my="16px">
            <Grid container justifyContent="space-evenly">
              <Grid item>
                <Paper>
                  <Box px="8px" py="5px">
                    <InputBase
                      placeholder="Add a city name"
                      value={cityInput}
                      onChange={(e) => setCityInput(e.target.value)}
                    />
                    <IconButton onClick={handleCityButtonClick}>
                      <AddIcon />
                    </IconButton>
                  </Box>
                </Paper>
              </Grid>
              <Grid item>
                <Paper>
                  <Box>
                    <IconButton onClick={handleTempScaleButtonClick}>
                      {options.tempScale === "metric" ? "\u2103" : "\u2109"}
                    </IconButton>
                  </Box>
                </Paper>
              </Grid>
              <Grid item>
                <Paper>
                  <Box>
                    <IconButton onClick={handleOverlayButtonClick}>
                      <PictureInPicture />
                    </IconButton>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Box>
          {options.homeCity && (
            <WeatherCard
              city={options.homeCity}
              tempScale={options.tempScale}
            />
          )}
          {cities.map((city, idx) => (
            <WeatherCard
              key={idx}
              tempScale={options.tempScale}
              city={city}
              onDelete={() => handleCityDeleteButtonClick(idx)}
            />
          ))}
        </>
      )}
      <Box height="16px" />
    </Box>
  );
};

const container = document.createElement("div");
document.body.appendChild(container);
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
