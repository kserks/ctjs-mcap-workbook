import { 
  UIRoundedRectangle, 
  SiblingConstraint, 
  SubtractiveConstraint, 
  FillConstraint,
  CenterConstraint,
  UIText,
  UIWrappedText
} from 'Elementa'

import color from '../../utils/color.js'
import state from '../../lib/state.js'

export default function (parent){


const topBar = new UIRoundedRectangle(3)
          .setX( (5).pixels() )
          .setY( (5).pixels() )
          .setWidth( new SubtractiveConstraint( (100).percent(), (10).pixels() ) )
          .setHeight(new SubtractiveConstraint( (10).percent(), (10).pixels() ) )
          .setColor( color.aside )
/**
 * Тетрадь
 */
const noteBookBtn = new UIRoundedRectangle(3)
                .setX( (5).pixels() )
                .setY( new CenterConstraint() )
                .setWidth( (195).pixels() )
                .setHeight(  new SubtractiveConstraint( (100).percent(), (10).pixels() ) )
                .setColor( color.topBarItem )
                .onMouseEnter( _this=>{
                      _this.setColor(color.topBarItemHover)
                })
                .onMouseLeave( _this=>{
                      _this.setColor(color.topBarItem)
                })
                .onMouseClick(_this=>{
                    state.screen.notebook()
                    
                })
                .setChildOf(topBar)
  state.workbookBtnText = new UIText('', false)
                        .setX( (5).pixels() )
                        .setY( new CenterConstraint() )
                        .setColor(color.asideNoteItemText)
                        .setChildOf(noteBookBtn)



/**
 * Тема
 *//*
const themeBtn = new UIRoundedRectangle(3)
                .setX( ( (195/2)+5).pixels() )
                .setY( new CenterConstraint() )
                .setWidth( (195/2).pixels() )
                .setHeight(  new SubtractiveConstraint( (100).percent(), (10).pixels() ) )
                .setColor( color.topBarItem )
                .onMouseEnter( _this=>{
                      _this.setColor(color.topBarItemHover)
                })
                .onMouseLeave( _this=>{
                      _this.setColor(color.topBarItem)
                })
                .onMouseClick(_this=>{

                })
                .setChildOf(topBar)
      new UIText('A1-1.1', false)
                        .setX( (5).pixels() )
                        .setY( new CenterConstraint() )
                        .setColor(color.asideNoteItemText)
                        .setChildOf(themeBtn)
*/
/**
 * Зелёная полоса
 */
const greenBtn = new UIRoundedRectangle(3)
                .setX( (205).pixels() )
                .setY( new CenterConstraint() )
                .setWidth( (360).pixels() )
                .setHeight(  new SubtractiveConstraint( (100).percent(), (10).pixels() ) )
                .setColor( color.topBarType)
                /*.onMouseEnter( _this=>{
                      _this.setColor(color.topBarItemHover)
                })
                .onMouseLeave( _this=>{
                      _this.setColor(color.topBarType)
                })
                .onMouseClick(_this=>{

                })*/
                .setChildOf(topBar)
state.topBarTitle = new UIWrappedText('', false)
                        .setX( (5).pixels() )
                        .setY( new CenterConstraint() )
                        .setColor(color.asideNoteItemText)
                        .setTextScale((0.75).pixels())
                        .setChildOf(greenBtn)


  parent.addChild(topBar)

}
