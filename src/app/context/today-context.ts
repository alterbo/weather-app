import { createContext, useContext } from 'react';
import { TodayStore } from '../stores/today-store';

export const TodayStoreContext = createContext<TodayStore>({} as TodayStore);

export const useTodayStore = () => useContext(TodayStoreContext);
