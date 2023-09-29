import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import WeatherCardLoader from "./WeatherCardLoader";
import WeatherCardContainer from "./WeatherCardContainer";
import {
  OpenWeatherData,
  OpenWeatherTempScale,
  fetchOpenWeatherData,
} from "../../utils/api";
import "./WeatherCard.css";

interface Props {
  city: string;
  tempScale: OpenWeatherTempScale;
  onDelete?: () => void;
}
enum WeatherCardState {
  LOADING = "LOADING",
  READY = "READY",
  ERROR = "ERROR",
}
export default function WeatherCard({ city, tempScale, onDelete }: Props) {
  const [weatherData, setWeatherData] = useState<OpenWeatherData | null>(null);
  const [cardState, setCardState] = useState<WeatherCardState>(
    WeatherCardState.LOADING
  );

  useEffect(() => {
    fetchOpenWeatherData(city, tempScale)
      .then((data) => {
        console.log(data);
        setWeatherData(data);
        setCardState(WeatherCardState.READY);
      })
      .catch((error) => {
        console.log(error);
        setCardState(WeatherCardState.ERROR);
      });
  }, [city, tempScale]);

  if (cardState === WeatherCardState.ERROR) {
    return (
      <WeatherCardContainer onDelete={onDelete}>
        <Typography component="p">
          {cardState === WeatherCardState.ERROR &&
            "Could not retrieve data from this city."}
        </Typography>
      </WeatherCardContainer>
    );
  }

  return (
    <WeatherCardContainer onDelete={onDelete}>
      {cardState === WeatherCardState.LOADING ? (
        <WeatherCardLoader />
      ) : (
        <>
          <Typography variant="h5">{weatherData.name}</Typography>
          <Typography variant="body1">
            {Math.round(weatherData.main.temp)}
          </Typography>
          <Typography variant="body1">
            Feels like: {Math.round(weatherData.main.feels_like)}
          </Typography>
        </>
      )}
    </WeatherCardContainer>
  );
}
