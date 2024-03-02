interface Forecast {
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
  
  interface DailyForecast {
    date: string;
    maxTemp: number;
    minTemp: number;
    weatherIcon: string;
  }