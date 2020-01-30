import "./configStore";
import { statusSlice } from "./modules/status";
import { subscribe } from "./getStore";

statusSlice.commit.changeStatus(2)

setTimeout(async () => {
    await import ('./lazySlices')
    const {counterSlice} = await import ('./modules/counter')
    counterSlice.commit.addOne()
}, 1000);

subscribe((state) => {
    console.log(state)
})