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
import getLinkout from '../../../utils/get-linkout.js'
ChatLib.chat(getLinkout())
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
                .onMouseEnter( _this=>{
                      _this.setColor(color.asideNoteItemHover)
                })
                .onMouseLeave( _this=>{
                      _this.setColor( color.disabled )
                })
                .onMouseClick(_this=>{
                   state.ctx.hide = true
                   request.updateNote(state.ctx, function (){
                       state.ui.notes()

                       setCurrentContent()
                   })
                })
                .setChildOf(wrapper)
      new UIText('Скрыть', false)
                      .setX( new CenterConstraint() )
                      .setY( new CenterConstraint() )
                      .setColor(color.disabledText)
                      .setChildOf(hideBtn)          

/**
 * RESTORE
 */
const restoreBtn = new UIRoundedRectangle(3)
                .setX( new SiblingConstraint(3) )
                .setY( (0).pixels() )
                .setWidth( new SubtractiveConstraint( (25).percent(), (3).pixels() ) )
                .setHeight( (20).pixels() )
                .setColor( color.disabled2 )
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
                  if(state.addNote){
                    addNote()
                  }
                  else{
                    editHandler()
                  }
                })
                .setChildOf(wrapper)
  state.editBtnText = new UIText('Изменить', false)
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
                .setColor( color.content )
                .setChildOf(wrapper)
  state.ui.mark = new UIText('', false)
                      .setX( new CenterConstraint() )
                      .setY( new CenterConstraint() )
                      .setColor(color.disabledText)
                      .setChildOf(writeBtn)

  parent.addChild(wrapper)
}


function editHandler(){
  if(state.mode==='view'){
    state.editMode(state.contentNoteCenter)
  }
  else{
    if(state.edited){
      const content = base64.encode(state.content.centerTextEdited.getText())
      state.editBtnText.setText('Изменить')
      //подставляем отредактированные данные вместо старых
      state.ctx.order = new Number(state.content.inputOrderEdited.getText())
      state.ctx.name = state.content.centerHeaderTextEdited.getText()
      state.ctx.content = content
      state.ctx.tso = Number( new Date().getTime() )
      state.ctx.dto = new Date().toLocaleString()
      request.updateNote(state.ctx, function (){})
    }
    state.viewMode(state.contentNoteCenter)
  }
}



function addNote (){
  state.addNote = false
  const body = state.content.centerTextEdited.getText()
  let name = state.content.centerHeaderTextEdited.getText()
  if(name===''){
    name = 'Новая запись'
  }

const content = base64.encode(body)
                  state.ctx.id = uid()
                  state.ctx.player = Player.getName()
                  state.ctx.subject = state.subjectID
                  state.ctx.tso = Number( new Date().getTime() )
                  state.ctx.dto = new Date().toLocaleString()
                  state.ctx.order = new Number(state.content.inputOrderEdited.getText())
                  state.ctx.name = name
                  state.ctx.content = content
                  state.ctx.index = 1
                  state.ctx.linkin = ""
                  state.ctx.linkout = ""
                  state.ctx.mark = 0
                  state.ctx.remark = ""
                  state.ctx.hide = false
                  request.addNote(state.ctx, ()=>{
                    state.ui.notes()
                  })
                  state.viewMode(state.contentNoteCenter)
}


function setCurrentContent(){
      state.content.inputOrder.setText('')
      state.content.centerHeaderText.setText('' )
      state.content.centerText.setText('')
}

