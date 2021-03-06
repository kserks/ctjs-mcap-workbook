
import { WindowScreen } from "Elementa"
import body from './layout/body.js'
import state from './lib/state.js'
import bus from './utils/bus.js'



const app = new JavaAdapter( WindowScreen, {
    init: function () {
            const window = this.getWindow()
            window.addChild(body)
           // window.addChild(closeBtn)
    },
});

app.init()


const gui = GuiHandler.INSTANCE




register("command", () => {
  gui.openGui(app)
}).setName("wb");

