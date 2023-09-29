//const baseUrl = "http://api.openweathermap.org/data/2.5/weather";

export type OpenWeatherTempScale = "metric" | "imperial";
export interface OpenWeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
}
export async function fetchOpenWeatherData(
  city: string,
  tempScale: OpenWeatherTempScale
): Promise<OpenWeatherData> {
  const baseUrl = `${process.env.OPEN_WEATHER_API_URL}?q=`;
  const suffix = `&units=${tempScale}&appid=${process.env.OPEN_WEATHER_API_KEY}`;

  const res = await fetch(baseUrl + city + suffix);
  if (!res.ok) {
    throw new Error("City not found");
  }
  const data = await res.json();
  return data as OpenWeatherData;
}
