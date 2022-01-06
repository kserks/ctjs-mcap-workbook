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
  UIContainer
} from 'Elementa'

import color from '../../../utils/color.js'
import bus from '../../../utils/bus.js'
import edit from './edit.js'
import * as base64 from '../../../utils/base64.js'
import state from '../../../lib/state.js'



export default function (parent){


const content = new UIRoundedRectangle(3)
          .setX( (205).pixels() )
          .setY((0).pixels()  )
          .setWidth(  (parent.getWidth()-205).pixels() )
          .setHeight( new SubtractiveConstraint( (100).percent(), (0).pixels() ) )
          .setColor( color.aside )
/**
 * TOP 
 */
const contentNoteTop = new UIRoundedRectangle(3)
                .setX( (5).pixels() )
                .setY( (5).pixels() )
                .setWidth( new SubtractiveConstraint( (100).percent(), (10).pixels() ) )
                .setHeight( (20).pixels() )
                .setColor( color.contentNoteCollapsed )
                .setChildOf(content)
state.content.topText = new UIText('', false)
                      .setX( (5).pixels() )
                      .setY( new CenterConstraint() )
                      .setColor(color.asideNoteItemText)
                      .setChildOf(contentNoteTop)
/**
 * CENTER
 */
const contentNoteCenter = new UIRoundedRectangle(3)
                .setX( (5).pixels() )
                .setY( new SiblingConstraint(5) )
                .setWidth( new SubtractiveConstraint( (100).percent(), (10).pixels() ) )
                .setHeight( new SubtractiveConstraint( (50).percent(), (0).pixels() ) )
                .setColor( color.content )
                .setChildOf(content)
const contentHeader = new UIRoundedRectangle(3)
                .setX( (0).pixels() )
                .setY( (0).pixels() )
                .setWidth( new SubtractiveConstraint( (100).percent(), (0).pixels() ) )
                .setHeight( (20).pixels() )
                .setColor( color.contentNoteCollapsed )
                .setChildOf(contentNoteCenter)
state.content.centerHeaderText = new UIText('', false)
                      .setX( (5).pixels() )
                      .setY( new CenterConstraint() )
                      .setColor(color.asideNoteItemText)
                      .setChildOf(contentHeader)

const contentNoteBodyWrapper = new UIContainer()
                .setX( (0).pixels() )
                .setY( new SiblingConstraint(0) )
                .setWidth( new SubtractiveConstraint( (100).percent(), (0).pixels() ) )
                .setHeight(new SubtractiveConstraint(new FillConstraint(), (0).pixels()) )

                .setChildOf(contentNoteCenter)

const __str =  ''                
  state.content.centerText = new UIWrappedText(__str)
                      .setX( (5).pixels() )
                      .setY( (5).pixels() )
                      .setWidth(new SubtractiveConstraint( (100).percent(), (10).pixels() ))
                      .setHeight(new SubtractiveConstraint( (100).percent(), (10).pixels() ))
                      .setColor(color.asideNoteItemText)
                      .setChildOf(contentNoteBodyWrapper)

/**
 * BOTTOM 
 */
const contentNoteBottom = new UIRoundedRectangle(3)
                .setX( (5).pixels() )
                .setY( new SiblingConstraint(5) )
                .setWidth( new SubtractiveConstraint( (100).percent(), (10).pixels() ) )
                .setHeight( (20).pixels() )
                .setColor( color.contentNoteCollapsed )
                .setChildOf(content)
  state.content.bottomText = new UIText('', false)
                      .setX( (5).pixels() )
                      .setY( new CenterConstraint() )
                      .setColor(color.asideNoteItemText)
                      .setChildOf(contentNoteBottom)

/**
 * TEXTAREA
 */
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
                 
                  //let text = textArea.getText()
                  //ChatLib.chat(text)
             })
             
  edit(content)


  parent.addChild(content)

}


bus.on('ctx', function (data){

  const { top, center, bottom, index } = data
  state.content.topText.setText(--index+". "+top.name)
  state.content.centerHeaderText.setText(index+". "+center.name)
  state.content.centerText.setText(center.content)
  state.content.bottomText.setText(++index+". "+bottom.name)
  
})