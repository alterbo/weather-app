import { makeObservable, observable, runInAction } from "mobx";
import { Forecast, ForecastApiResponse } from "../models/forecast";

export class WeekStore {
    week: Forecast[] = [];

    constructor() {
        makeObservable(this, {
            week: observable,
        })
    }

    fecthWeek = async (lat: number, lon: number) => {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.VITE_OPENWEATHER_API_KEY}&units=metric`);
        const data: ForecastApiResponse = await response.json();
        runInAction(() => this.week = data.list);
    }
}
