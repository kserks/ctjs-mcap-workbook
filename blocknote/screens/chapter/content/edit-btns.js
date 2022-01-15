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
import uid from '../../../utils/uid.js'
import * as base64 from '../../../utils/base64.js'
import * as request from '../../../lib/request.js'



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
                .onMouseClick(addNote)
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
      state.ctx.order = new Number(state.content.inputOrderEdited.getText())
      state.ctx.name = state.content.centerHeaderTextEdited.getText()
      state.ctx.content = state.content.centerTextEdited.getText()
      request.updateNote(state.ctx)
    }

    state.viewMode(state.contentNoteCenter)
    veiwMode = true
  }
}



function addNote (){
const body = state.content.centerTextEdited.getText()
const content = base64.encode(body)

                  state.ctx.id =  uid(8)
                  state.ctx.player = Player.getName()
                  state.ctx.subject = state.subjectID
                  state.ctx.tso = 0
                  state.ctx.dto = ""
                  state.ctx.code = 0
                  state.ctx.order = new Number(state.content.inputOrderEdited.getText())
                  state.ctx.name = state.content.centerHeaderTextEdited.getText()
                  state.ctx.source = content
                  state.ctx.content = content
                  state.ctx.link = ""
                  state.ctx.mark1 = 0
                  state.ctx.mark2 = ""
                  state.ctx.hide = false
                  request.addNote(state.ctx, ()=>{
                    state.ui.notes()
                  })
                  state.viewMode(state.contentNoteCenter)

}