import { 
  UIRoundedRectangle, 
  SiblingConstraint, 
  CenterConstraint,
  UIText,
  SubtractiveConstraint
} from 'Elementa'

import color from '../../../utils/color.js'
import * as base64 from '../../../utils/base64.js'
import { getWorkbooks } from '../../../lib/request.js'
import bus from '../../../utils/bus.js'
import state from '../../../lib/state.js'
import clearActiveItem from '../../../utils/clear-active-item.js'

export default function (parent){

parent.clearChildren()



getWorkbooks(function (notes){

      notes.map( (ctx, index)=>{
        if(!ctx.hide){
              let itemText = null
              let item = new UIRoundedRectangle(3)
                      .setX( (0).pixels() )
                      .setY( new SiblingConstraint(5) )
                      .setWidth( new SubtractiveConstraint( (100).percent(), (0).pixels() ))
                      .setHeight( ( 20 ).pixels() )
                      .setColor( color.asideNoteItem )
                      .onMouseEnter( _this=>{
                         _this.setColor(color.asideNoteItemHover)
                      })
                      .onMouseLeave(_this=>{
                           _this.setColor(color.asideNoteItem)
                      })
                      .onMouseClick(_this=>{
                          clearActiveItem(_this.getParent())
                          itemText.setColor(color.itemActiveText)
                          state.ctx = ctx
                          state.content.inputOrder.setText(state.ctx.order)
                          state.content.centerHeaderText.setText(state.ctx.name)
                          //state.content.centerText.setText(base64.decode(state.ctx.content) ) 
                          //state.history.push({index, ctx: state.ctx})
                          state.edited = false
                          state.editBtnText.setText('Изменить')
                          state.addNote = false
                          state.viewMode(state.contentNoteCenter)
                      })
                

              itemText = new UIText(ctx.order+'. '+ctx.name, false)
                            .setX( (5).pixels() )
                            .setY( new CenterConstraint() )
                            .setColor(color.asideNoteItemText)
                            .setChildOf(item)
              parent.addChild(item)
        }
      })

  })

}

