import { initStore } from "../../src/RedVue";
import "./staticSlices";

const store = initStore()

store.subscribe(() => {
    console.log(store.getState())
})