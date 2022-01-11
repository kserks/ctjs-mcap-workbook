import { 
  UIRoundedRectangle, 
  SiblingConstraint, 
  SubtractiveConstraint, 
  FillConstraint,
  UIText,
  CenterConstraint,
  SiblingConstraint,
  UIWrappedText,
  UIMultilineTextInput,
  UITextInput,
  UIContainer,
  MarkdownComponent
} from 'Elementa'

import color from '../../../utils/color.js'
import editBtns from './edit-btns.js'
import * as base64 from '../../../utils/base64.js'
import state from '../../../lib/state.js'


export default function (contentNoteCenter){
contentNoteCenter.clearChildren()
/**
 * CONTENT Header
 */
const contentHeader = new UIContainer()
                .setX( (0).pixels() )
                .setY( (0).pixels() )
                .setWidth( new SubtractiveConstraint( (100).percent(), (0).pixels() ) )
                .setHeight( (20).pixels() )
                .setChildOf(contentNoteCenter)
// header order
const orderWrapper = new UIRoundedRectangle(3)
                .setX( (0).pixels() )
                .setY( (0).pixels() )
                .setWidth( new SubtractiveConstraint( (6).percent(), (0).pixels() ) )
                .setHeight( (20).pixels() )
                .setColor( color.content )
                .onMouseClick((mx, my, btn) => {
                    state.content.inputOrder.grabWindowFocus()
                    //let text = inputOrder.getText()
                })
                .setChildOf(contentHeader)

state.content.inputOrder = new UIText('', false)
                    .setX((5).pixels())
                    .setY((5).pixels())
                    .setChildOf(orderWrapper)

//header title
const titleWrapper = new UIRoundedRectangle(3)
                .setX( new SiblingConstraint(3) )
                .setY(  (0).pixels() )
                .setWidth( new SubtractiveConstraint( (94).percent(), (3).pixels() ) )
                .setHeight( (20).pixels() )
                .setColor( color.content )
                .onMouseClick((mx, my, btn) => {
                    state.content.centerHeaderText.grabWindowFocus()
                    //let text = inputOrder.getText()
                })
                .setChildOf(contentHeader)
state.content.centerHeaderText =  new UIText('', false)
                      .setX( (5).pixels() )
                      .setY(  new CenterConstraint() )
                      .setChildOf(titleWrapper)


const contentNoteBodyWrapper = new UIRoundedRectangle(3)
                .setX( (0).pixels() )
                .setY( new SiblingConstraint(3) )
                .setWidth( new SubtractiveConstraint( (100).percent(), (0).pixels() ) )
                .setHeight(new SubtractiveConstraint(new FillConstraint(), (0).pixels()) )
                .setColor( color.content )
                .setChildOf(contentNoteCenter)

const __str =  ''                
  state.content.centerText = new UIWrappedText(__str, false)
                      .setX( (5).pixels() )
                      .setY( (5).pixels() )
                      .setWidth(new SubtractiveConstraint( (100).percent(), (10).pixels() ))
                      //.setHeight(new SubtractiveConstraint( (100).percent(), (10).pixels() ))
                      .setColor(color.asideNoteItemText)
                      .setChildOf(contentNoteBodyWrapper)
  if(state.ctx){
    state.content.inputOrder.setText(state.ctx.order)
    state.content.centerHeaderText.setText(state.ctx.name)
    state.content.centerText.setText(state.ctx.content)
  }
}