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

import state from '../../../lib/state.js'


var noteName =  null

export default function (parent){


const playerControl = new UIRoundedRectangle(3)
      .setX(  (5).pixels()  )
      .setY( new SiblingConstraint(5) )
      .setWidth(new SubtractiveConstraint( (100).percent(), (10).pixels() ) )
      .setHeight( new SubtractiveConstraint( (25).percent(), (10).pixels() ) )
      .setColor( color.content )
      
/**
 * Имя заметки или ссылка
 */

const noteNameWrapper = new UIRoundedRectangle(3)
        .setX((5).pixels())
        .setY((5).pixels())
        .setWidth(new SubtractiveConstraint( (100).percent(), (10).pixels() ) )
        .setHeight((20).pixels())
        .setColor(color.content )

  noteName = new UITextInput('Имя заметки или ссылка')
                  .setX((5).pixels())
                  .setY((5).pixels())
                  .setWidth(new SubtractiveConstraint( (100).percent(), (10).pixels() ) )
                  .setHeight((15).pixels())
                  .setChildOf(noteNameWrapper)

    noteNameWrapper.onMouseClick((mx, my, btn) => {
            noteName.grabWindowFocus()
    })

    playerControl.addChild(noteNameWrapper)

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
 * НОВАЯ
 */
const newNoteBtn = new UIRoundedRectangle(3)
                .setX( (5).pixels() )
                .setY( (0).pixels() )
                .setWidth( new SubtractiveConstraint( (50).percent(), (5).pixels() ) )
                .setHeight( (20).pixels() )
                .setColor( color.disabled )
                .onMouseEnter( _this=>{
                          
                            _this.setColor(color.itemActiveText)
                          
                })
                .onMouseLeave( _this=>{
                            _this.setColor( color.disabled )
                })
                .onMouseClick(_this=>{
                        
                              addNewNote ()
                          
                })
                .setChildOf(copyWrapper)
      new UIText('Новая', false)
                      .setX( new CenterConstraint() )
                      .setY( new CenterConstraint() )
                      .setColor(color.disabledText)

                      .setChildOf(newNoteBtn)   
/**
 * ДАЙ СПИСАТЬ
 */
const newCopyBtn = new UIRoundedRectangle(3)
                .setX( new SiblingConstraint(5) )
                .setY( (0).pixels())
                .setWidth( new SubtractiveConstraint( (50).percent(), (5).pixels() ) )
                .setHeight( (20).pixels() )
                .setColor( color.disabled )
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
          .setY( new SiblingConstraint(5) )
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
      const starOrName = new UITextInput('* или Имя')
                      .setX((5).pixels())
                      .setY((5).pixels())
                      .setWidth(new SubtractiveConstraint( (100).percent(), (5).pixels() ) )
                      .setHeight((15).pixels())
                      .setChildOf(starOrNameWrapper)

        starOrNameWrapper.onMouseClick((mx, my, btn) => {
            starOrName.grabWindowFocus()
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
                .setChildOf(linkWrapper)
      new UIText('Кинуть ссылку', false)
                      .setX( new CenterConstraint() )
                      .setY( new CenterConstraint() )
                      .setColor(color.disabledText)
                      .setChildOf(sendLinkBtn)   


    parent.addChild(playerControl)

}



function addNewNote (){


var name = noteName.getText()

const ctx = {
  "id": "",
  "player": Player.getName(),
  "subject": state.subjectID,
  "tso": 0,
  "dto": "",
  "code": 0,
  "order": 15,
  "name": name,
  "source": "",
  "content": "",
  "link": "",
  "mark1": 0,
  "mark2": "",
  "hide": false
}

 // addNote(body)

  state.notes.push(ctx)
  state.ctx = ctx

  state.editMode(state.contentNoteCenter)
}