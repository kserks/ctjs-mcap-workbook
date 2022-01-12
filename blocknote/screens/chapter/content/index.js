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

import * as base64 from '../../../utils/base64.js'
import state from '../../../lib/state.js'

import viewMode from './view-mode.js'
import editMode from './edit-mode.js'

import editBtns from './edit-btns.js'

state.viewMode = viewMode
state.editMode = editMode

export default function (parent){

const content = new UIRoundedRectangle(3)
          .setX( (205).pixels() )
          .setY((0).pixels()  )
          .setWidth(  (parent.getWidth()-205).pixels() )
          .setHeight( new SubtractiveConstraint( (100).percent(), (0).pixels() ) )
          .setColor( color.aside )

/**
 * CONTENT
 */
state.contentNoteCenter = new UIContainer()
                .setX( (5).pixels() )
                .setY( (5).pixels() )
                .setWidth( new SubtractiveConstraint( (100).percent(), (10).pixels() ) )
                .setHeight( new SubtractiveConstraint( (100).percent(), (40).pixels() ) )
                .setChildOf(content)




state.viewMode(state.contentNoteCenter)

/**
 * TEXTAREA
 *//*
const textAreaWrapper = new UIRoundedRectangle(3)
  .setX( (5).pixels() )
  .setY( new SiblingConstraint(5) )
  .setWidth( new SubtractiveConstraint( (100).percent(), (10).pixels() ))
  .setHeight( new SubtractiveConstraint( (27.5).percent(), (10).pixels() ))
  .setColor( color.contentNoteCollapsed )
  .setChildOf(content)
  state.content.textArea = new UIMultilineTextInput("...")
                   .setMaxLines(10)
                   .setX( (5).pixels() )
                   .setY( (5).pixels() )
                   .setWidth( new SubtractiveConstraint( (100).percent(), (5).pixels() ) )
                   .setHeight( new SubtractiveConstraint( (100).percent(), (5).pixels() ))
                   .setChildOf(textAreaWrapper)
   
             textAreaWrapper.onMouseClick(function (){
                  state.content.textArea.grabWindowFocus()
             })*/
             
  editBtns(content)


  parent.addChild(content)

}

/*
bus.on('ctx', function (ctx){ 
  state.content.inputOrder.setText(ctx.order)
  state.content.centerHeaderText.setText(ctx.name)
  state.content.centerText.setText(ctx.content) 
})*/