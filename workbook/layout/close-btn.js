import { 
  UIRoundedRectangle, 
  UIText,
  UIContainer
} from 'Elementa'

import color from '../utils/color.js'
import bus from '../utils/bus.js'

let text = null
//Renderer.screen.getWidth()-
const closeBtn = new UIContainer()
          .setX( (10).pixels() )
          .setY( ( 50 ).pixels() )
          .setWidth( (30).pixels() )
          .setHeight( (30).pixels() )
          .onMouseEnter( _this=>{
                      text.setColor(color.asideNoteItemHover)
          })
          .onMouseLeave( _this=>{
                      text.setColor(color.itemActiveText)
          })
          .onMouseClick(_this=>{

               bus.emit('close')

          })

          text = new UIText('x', false)
                        .setX( (5).pixels() )
                        .setY( (5).pixels() )
                        .setColor(color.itemActiveText)
                        .setChildOf(closeBtn )


export default  closeBtn
