import { makeObservable, observable, runInAction } from "mobx";
import { Forecast, ForecastApiResponse } from "../models/forecast";
import { apiKey, baseURL } from "../api/api";

export class WeekStore {
    week: Forecast[] = [];

    constructor() {
        makeObservable(this, {
            week: observable,
        })
    }

    fetchWeek = async (lat: number, lon: number) => {
        const response = await fetch(`${baseURL}/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
        const data: ForecastApiResponse = await response.json();
        runInAction(() => this.week = data.list);
    }
}
