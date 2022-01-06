
import { WindowScreen } from "Elementa"
import body from './layout/body.js'


register("worldLoad", function (){
  
  const app = new JavaAdapter( WindowScreen, {
    init: function () {
            const window = this.getWindow()
            window.addChild(body)
    },
  });

  app.init()


  const gui = GuiHandler.INSTANCE



  register("chat", function (){

      gui.openGui(app)

  }).setCriteria("#bn").setContains()


})
