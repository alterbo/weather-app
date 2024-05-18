import { WeekStoreContext } from "../../app/context/week-context";
import { WeekStore } from "../../app/stores/week-store";
import { Week } from "./Week";

export const WeekForecast = () => {
    return (
        <WeekStoreContext.Provider value={new WeekStore()}>
            <Week />
        </WeekStoreContext.Provider>
    );
};
