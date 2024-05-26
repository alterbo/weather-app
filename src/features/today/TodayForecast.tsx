import { TodayStoreContext } from "../../app/context/today-context";
import { TodayStore } from "../../app/stores/today-store";
import { Today } from "./Today";

export const TodayForecast = () => {
    return (
        <TodayStoreContext.Provider value={new TodayStore()}>
            <Today/>
        </TodayStoreContext.Provider>
    );
};
