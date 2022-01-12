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
import state from '../../../lib/state.js'

import * as request from '../../../lib/request.js'

import * as base64 from '../../../utils/base64.js'

export default function (parent){

/**
 * WRAPPER 
 */
const wrapper = new UIContainer()
                .setX( (5).pixels() )
                .setY( new SiblingConstraint(10) )
                .setWidth( new SubtractiveConstraint( (100).percent(), (10).pixels() ) )
                .setHeight( (20).pixels() )

/**
 * HIDE
 */
const hideBtn = new UIRoundedRectangle(3)
                .setX( (0).pixels() )
                .setY( (0).pixels())
                .setWidth( new SubtractiveConstraint( (25).percent(), (3).pixels() ) )
                .setHeight( (20).pixels() )
                .setColor( color.disabled )
                .setChildOf(wrapper)
      new UIText('Скрыть', false)
                      .setX( new CenterConstraint() )
                      .setY( new CenterConstraint() )
                      .setColor(color.disabledText)
                      .setChildOf(hideBtn)          

/**
 * SHOW
 *//*
const showBtn = new UIRoundedRectangle(3)
                .setX( new SiblingConstraint(3) )
                .setY( (0).pixels() )
                .setWidth( new SubtractiveConstraint( (20).percent(), (0).pixels() ) )
                .setHeight( (20).pixels() )
                .setColor( color.disabled )
                .setChildOf(wrapper)
      new UIText('Показать', false)
                      .setX( new CenterConstraint() )
                      .setY( new CenterConstraint() )
                      .setColor(color.disabledText)
                      .setChildOf(showBtn)   */

/**
 * RESTORE
 */
const restoreBtn = new UIRoundedRectangle(3)
                .setX( new SiblingConstraint(3) )
                .setY( (0).pixels() )
                .setWidth( new SubtractiveConstraint( (25).percent(), (3).pixels() ) )
                .setHeight( (20).pixels() )
                .setColor( color.disabled )
                .setChildOf(wrapper)
      new UIText('Востановить', false)
                      .setX( new CenterConstraint() )
                      .setY( new CenterConstraint() )
                      .setColor(color.disabledText)
                      .setChildOf(restoreBtn)
/**
 * EDIT
 */
const editBtn = new UIRoundedRectangle(3)
                .setX( new SiblingConstraint(3) )
                .setY( (0).pixels() )
                .setWidth( new SubtractiveConstraint( (25).percent(), (3).pixels() ) )
                .setHeight( (20).pixels() )
                .setColor( color.disabled )
                .onMouseEnter( _this=>{
                      _this.setColor(color.asideNoteItemHover)
                })
                .onMouseLeave( _this=>{
                      _this.setColor( color.disabled )
                })
                .onMouseClick(_this=>{
                    editHandler()
                })
                .setChildOf(wrapper)
      new UIText('Изменить', false)
                      .setX( new CenterConstraint() )
                      .setY( new CenterConstraint() )
                      .setColor(color.disabledText)
                      .setChildOf(editBtn)
/**
 * WRITE
 */
const writeBtn = new UIRoundedRectangle(3)
                .setX( new SiblingConstraint(3) )
                .setY( (0).pixels() )
                .setWidth( new SubtractiveConstraint( (25).percent(), (0).pixels() ) )
                .setHeight( (20).pixels() )
                .setColor( color.disabled )
                .onMouseEnter( _this=>{
                      _this.setColor(color.asideNoteItemHover)
                })
                .onMouseLeave( _this=>{
                      _this.setColor( color.disabled )
                })
                .onMouseClick(()=>{
                  /* !!!!!!!!! */
                  state.ctx.order = +state.content.inputOrderEdited.getText()
                  state.ctx.name = state.content.centerHeaderTextEdited.getText()
                  state.ctx.content = state.content.centerTextEdited.getText()
                  state.id =  base64.encode(state.ctx.name)
                  request.addNote(JSON.stringify(state.ctx) )
                  state.viewMode(state.contentNoteCenter)
                  //state.ui.notes.draw()

                })
                .setChildOf(wrapper)
      new UIText('Сохранить', false)
                      .setX( new CenterConstraint() )
                      .setY( new CenterConstraint() )
                      .setColor(color.disabledText)
                      .setChildOf(writeBtn)
  parent.addChild(wrapper)
}

var veiwMode = true
var edited = false
function editHandler(){

  if(veiwMode){
    state.editMode(state.contentNoteCenter)
    veiwMode = false
    edited = true
  }
  else{
    if(edited){
      //подставляем отредактированные данные вместо старых
      state.ctx.order = state.content.inputOrderEdited.getText()
      state.ctx.name = state.content.centerHeaderTextEdited.getText()
      state.ctx.content = state.content.centerTextEdited.getText()
      request.updateNote(state.ctx)
    }

    state.viewMode(state.contentNoteCenter)
    veiwMode = true
  }
}
