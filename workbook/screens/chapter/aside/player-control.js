import { 
  UIRoundedRectangle, 
  SubtractiveConstraint, 
  ScrollComponent,
  SiblingConstraint,
  UITextInput,
  UIText,
  CenterConstraint,
  SiblingConstraint,
  UIContainer
} from 'Elementa'

import color from '../../../utils/color.js'
import uid from '../../../utils/uid.js'
import state from '../../../lib/state.js'
import getLinkout from '../../../utils/get-linkout.js'
import * as request from '../../../lib/request.js'


export default function (parent){


const playerControl = new UIRoundedRectangle(3)
      .setX(  (5).pixels()  )
      .setY( new SiblingConstraint(5) )
      .setWidth(new SubtractiveConstraint( (100).percent(), (10).pixels() ) )
      .setHeight( new SubtractiveConstraint( (25).percent(), (10).pixels() ) )
      .setColor( color.content )
   




/**
 * Обертка для ряда кнопок
 */
const copyWrapper = new UIContainer()
          .setX( (0).pixels() )
          .setY( new SiblingConstraint(5) )
          .setWidth( new SubtractiveConstraint( (100).percent(), (5).pixels() ))
          .setHeight( (20).pixels()  )
          .setChildOf(playerControl)
/**
 * Ссылка
 */

const noteNameWrapper = new UIRoundedRectangle(3)
        .setX((5).pixels())
        .setY((5).pixels())
        .setWidth(new SubtractiveConstraint( (50).percent(), (5).pixels() ) )
        .setHeight((20).pixels())
        .setColor(color.content )
        .setChildOf(copyWrapper)
  state.ui.linkin = new UITextInput('Ссылка')
                  .setX((5).pixels())
                  .setY((5).pixels())
                  .setWidth(new SubtractiveConstraint( (100).percent(), (10).pixels() ) )
                  .setHeight((15).pixels())
                  .setChildOf(noteNameWrapper)

    noteNameWrapper.onMouseClick((mx, my, btn) => {
            state.ui.linkin.grabWindowFocus()
    })
/**
 * ДАЙ СПИСАТЬ
 */
const newCopyBtn = new UIRoundedRectangle(3)
                .setX( new SiblingConstraint(5) )
                .setY( (5).pixels())
                .setWidth( new SubtractiveConstraint( (50).percent(), (5).pixels() ) )
                .setHeight( (20).pixels() )
                .setColor( color.disabled )
                .onMouseEnter( _this=>{
                      _this.setColor(color.asideNoteItemHover)
                })
                .onMouseLeave( _this=>{
                      _this.setColor( color.disabled )
                })
                .onMouseClick(()=>{
                  if(state.ui.linkin!==''){
                    copyNote()
                  }
                })
                .setChildOf(copyWrapper)
      new UIText('Дай списать', false)
                      .setX( new CenterConstraint() )
                      .setY( new CenterConstraint() )
                      .setColor(color.disabledText)
                      .setChildOf(newCopyBtn)   

/**
 * Кинуть ссылку
 */
const linkWrapper = new UIContainer()
          .setX( (0).pixels() )
          .setY( new SiblingConstraint(10) )
          .setWidth( new SubtractiveConstraint( (100).percent(), (5).pixels() ))
          .setHeight( (20).pixels()  )
          //.setChildOf(playerControl)
/**
 * или Имя
 */
const starOrNameWrapper = new UIRoundedRectangle(3)
                .setX( (5).pixels() )
                .setY( (0).pixels() )
                .setWidth( new SubtractiveConstraint( (50).percent(), (5).pixels() ) )
                .setHeight( (20).pixels() )
                .setColor(color.content )
                //.setChildOf(LinkWrapper)
      state.ui.starOrName = new UITextInput('* или Имя')
                      .setX((5).pixels())
                      .setY((5).pixels())
                      .setWidth(new SubtractiveConstraint( (100).percent(), (5).pixels() ) )
                      .setHeight((15).pixels())
                      .setChildOf(starOrNameWrapper)

        starOrNameWrapper.onMouseClick((mx, my, btn) => {
            state.ui.starOrName.grabWindowFocus()
        })

    linkWrapper.addChild(starOrNameWrapper)
    playerControl.addChild(linkWrapper)   
/**
 * Кинуть ссылку
 */
const sendLinkBtn = new UIRoundedRectangle(3)
                .setX( new SiblingConstraint(5) )
                .setY( (0).pixels())
                .setWidth( new SubtractiveConstraint( (50).percent(), (5).pixels() ) )
                .setHeight( (20).pixels() )
                .setColor( color.disabled )
                .onMouseEnter( _this=>{
                      _this.setColor(color.asideNoteItemHover)
                })
                .onMouseLeave( _this=>{
                      _this.setColor( color.disabled )
                })
                .onMouseClick(()=>{
                    if(state.ctx.id !==""){
                      if(state.ui.starOrName!==''){
                            let player = state.ui.starOrName.getText()
                            if(player==='*'){
                                ChatLib.chat(`${state.ctx.linkout}`)       
                            }
                            else{
                                let str = `msg ${player} ${state.ctx.linkout}`
                                ChatLib.command(str)
                            }
                      }
                    }
                })
                .setChildOf(linkWrapper)
      new UIText('Кинуть ссылку', false)
                      .setX( new CenterConstraint() )
                      .setY( new CenterConstraint() )
                      .setColor(color.disabledText)
                      .setChildOf(sendLinkBtn)   
/**
 * НОВАЯ
 */
const newNoteBtn = new UIRoundedRectangle(3)
                .setX( (5).pixels() )
                .setY( new SiblingConstraint(5) )
                .setWidth( new SubtractiveConstraint( (100).percent(), (10).pixels() ) )
                .setHeight( (20).pixels() )
                .setColor( color.disabled )
                .onMouseEnter( _this=>{
                      _this.setColor(color.asideNoteItemHover)
                })
                .onMouseLeave( _this=>{
                      _this.setColor( color.disabled )
                })
                .onMouseClick(addNewNote)
                .setChildOf(playerControl)
      new UIText('Новая', false)
                      .setX( new CenterConstraint() )
                      .setY( new CenterConstraint() )
                      .setColor(color.disabledText)
                      .setChildOf(newNoteBtn)  
    parent.addChild(playerControl)

}



function addNewNote (){

  state.addNote = true

const ctx = {
    "id": "",
    "player": Player.getName(),
    "subject": state.subjectID,
    "index": 1,
    "order": state.notes.length+1,
    "name": "",
    "content": "",
    "linkin": "",
    "linkout": "",
    "mark": 0,
    "remark": "",
    "hide": false
}

  state.notes.push(ctx)
  state.ctx = ctx
  state.editMode(state.contentNoteCenter)
}

/**
 * Дай списать
 */

function copyNote(){
  let linkin = state.ui.linkin.getText()

  
   let   isExists =  state.notes.find(item=>item.linkin===linkin)
 
 
  if(!isExists){
       request.copyNote (linkin, (ctx, linkout)=>{
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
                  console.log('Note has coped')
               })
          })
       })
  }
  else{
    console.log('Item is exists')
  }

}

