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
function isRestore(){
    return state.ctx.id.length>0&&state.ctx.linkin!==""
}
const restoreBtn = new UIRoundedRectangle(3)
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
                        if(isRestore()){
                            let original =  state.notes.find(item=>item.linkout===state.ctx.linkin)
                            if(original){
                              restore(original.linkout)
                              //state.methods.copyNote(original.linkout)

                            }
                        }
                })
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
      state.ctx.linkin = state.ctx.linkin
      request.updateNote(state.ctx, function (){
        state.ui.notes()
      })
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
                  state.ctx.order = new Number(state.content.inputOrderEdited.getText())
                  state.ctx.name = name
                  state.ctx.content = content
                  state.ctx.linkin = ""
                  state.ctx.mark = 0
                  state.ctx.remark = ""
                  state.ctx.hide = false
                  request.getMax (max=>{
                      state.ctx.index =max+1
                      state.ctx.linkout = getLinkout(state.ctx.index)
                      request.addNote(state.ctx, ()=>{
                        state.ui.notes()
                        state.viewMode(state.contentNoteCenter)
                      })
                  })                  
}


function setCurrentContent(){
      state.content.inputOrder.setText('')
      state.content.centerHeaderText.setText('' )
      state.content.centerText.setText('')
}




function restore (linkout){

  //console.log(linkout)
request.deleteItem (state.ctx.id, ()=>{


  copyNote()

})

  function copyNote(){
    request.copyNote (linkout, (ctx, linkout)=>{
          state.ctx = state.linkInObj
          state.ctx.id = uid()
          state.ctx.player = Player.getName()
          state.ctx.mark = 0
          state.ctx.remark = ""
          state.ctx.linkin = linkout
          
          state.notes.push(state.ctx)
          request.getMax (max=>{
               state.ctx.index =max+1
               state.ctx.linkout = getLinkout(state.ctx.index)
               request.addNote(state.ctx, ()=>{
                  state.ui.notes()
            

                  state.viewMode(state.contentNoteCenter)

                  console.log('Note has coped')
               })
          })
       })
    }
}