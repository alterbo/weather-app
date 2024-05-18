import { createContext, useContext } from 'react';
import { WeekStore } from '../stores/week-store';

export const WeekStoreContext = createContext<WeekStore>({} as WeekStore);

export const useWeekStore = () => useContext(WeekStoreContext);
