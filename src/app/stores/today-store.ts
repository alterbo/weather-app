import { makeObservable, observable, runInAction } from "mobx";
import { Today, TodayApiResponse } from "../models/today";
import { apiKey, baseURL } from "../api/api";

export class TodayStore {
    today: Today | undefined = undefined;

    constructor() {
        makeObservable(this, {
            today: observable,
        })
    }

    fetchToday = async (lat: number, lon: number) => {
        const response = await fetch(`${baseURL}/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
        const data: TodayApiResponse = await response.json();
        runInAction(() => this.today = data);
    }
}
