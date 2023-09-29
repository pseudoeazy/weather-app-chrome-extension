import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { InputBase, IconButton, Paper, Box, Grid } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import WeatherCard from "./WeatherCard";
import {
  setStoredCities,
  getStoredCities,
  setStoredOptions,
  getStoredOptions,
  LocalStorageOptions,
} from "../utils/storage";
import "fontsource-roboto";
import "./popup.css";

const App: React.FC<{}> = () => {
  const [cities, setCities] = useState<string[]>([]);
  const [cityInput, setCityInput] = useState<string>("");
  const [options, setOptions] = useState<LocalStorageOptions>({
    tempScale: "metric",
    homeCity: "",
  });

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
    setStoredCities(updatedCities).then(() => {
      setCities(updatedCities);
    });
  };

  const handleTempScaleButtonClick = () => {
    const updatedOptions: LocalStorageOptions = {
      ...options,
      tempScale: options.tempScale === "metric" ? "imperial" : "metric",
    };
    setStoredOptions(updatedOptions).then(() => {
      setOptions(updatedOptions);
    });
  };

  useEffect(() => {
    getStoredCities().then((storedCities) => setCities(storedCities));
    getStoredOptions().then((storedOptions) => setOptions(storedOptions));
  }, []);

  return (
    <Box>
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
        </Grid>
      </Box>
      {options.homeCity && (
        <WeatherCard city={options.homeCity} tempScale={options.tempScale} />
      )}
      {cities.map((city, idx) => (
        <WeatherCard
          key={idx}
          tempScale={options.tempScale}
          city={city}
          onDelete={() => handleCityDeleteButtonClick(idx)}
        />
      ))}
      <Box height="16px" />
    </Box>
  );
};

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(<App />, root);
