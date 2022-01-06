import { 
  UIRoundedRectangle, 
  SiblingConstraint, 
  CenterConstraint,
  UIText,
  SubtractiveConstraint
} from 'Elementa'

import color from '../../../utils/color.js'
import { getWorkbooks } from '../../../lib/request.js'
import bus from '../../../utils/bus.js'
import state from '../../../lib/state.js'


export default function (parent){

parent.clearChildren()



getWorkbooks(function (notes){

      notes.map( (obj, index)=>{
          let item = new UIRoundedRectangle(5)
                  .setX( (0).pixels() )
                  .setY( new SiblingConstraint(5) )
                  .setWidth( new SubtractiveConstraint( (100).percent(), (5).pixels() ))
                  .setHeight( ( 20 ).pixels() )
                  .setColor( color.asideNoteItem )
                  .onMouseEnter( _this=>{
                      _this.setColor(color.asideNoteItemHover)
                  })
                  .onMouseLeave( _this=>{
                      _this.setColor(color.asideNoteItem)
                  })
                  .onMouseClick(_this=>{
                      getCurrentNotes(_this, notes)
                  })
            

          let itemText = new UIText(obj.order+'. '+obj.name, false)
                        .setX( (5).pixels() )
                        .setY( new CenterConstraint() )
                        .setColor(color.asideNoteItemText)
                        .setChildOf(item)
          parent.addChild(item)
      })

})



}

function getNoteByOrder (order){
  return state.notes.filter(note=>note.order===+order)[0]
}

function getCurrentNotes(_this, notes){

let index = _this.children[0].getText().match(/^\d+/i)[0]
      
    state.ctx = {
          top:  getNoteByOrder(--index),
          center: getNoteByOrder(index),
          bottom: getNoteByOrder(++index),
          index
    }

}