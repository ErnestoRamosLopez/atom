import { configureStore } from "@reduxjs/toolkit";

//src/store/store.ts
const loggerMiddleware = (store: any) => (next: any) => (action: any) => {
    console.log('Dispatching:', action);
    let result = next(action);
    console.log('Next State:', store.getState());
    return result;
}