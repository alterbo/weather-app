export interface Forecast {
  dt: number;
  main: {
    temp: number;
  };
  weather: {
    description: string;
    icon: string;
    id: number;
    main: string;
  }[];
}

export interface ForecastApiResponse {
  cod: string,
  list: Forecast[],
}

export interface DailyForecast {
  date: string;
  maxTemp: number;
  minTemp: number;
  dominantWeather: string[];
}