import { 
  UIRoundedRectangle, 
  SiblingConstraint, 
  SubtractiveConstraint, 
  FillConstraint,
  CenterConstraint,
  UIText,
  UIWrappedText,
  SiblingConstraint,
  UIContainer
} from 'Elementa'

import color from '../../utils/color.js'
import bus from '../../utils/bus.js'
import * as request from '../../lib/request.js'
import state from '../../lib/state.js'
import clearActiveItem from '../../utils/clear-active-item.js'

var courseName = null

function showNotebooksList(){
    const parent = state.screenContainer
    parent.clearChildren()
    state.ctx = null
    var selectSubject = null
      /**
       * LEFT WRAPPER
       */

        const selectCourseScreen = new UIRoundedRectangle(3)
                  .setX( (0).pixels() )
                  .setY( (0).pixels() )
                  .setWidth( new SubtractiveConstraint( (50).percent(), (5).pixels() ) )
                  .setHeight(new SubtractiveConstraint( (100).percent(), (0).pixels() ) )
                  .setColor( color.content )
                  .setChildOf(parent)
        //Костыль для первого отступа          
        let paddingElement = new UIContainer().setX( (0).pixels() ).setY( (0).pixels() ).setWidth( (5).pixels() ).setHeight( (0).pixels() ).setChildOf(selectCourseScreen)
        new UIText('', false).setX( (0).pixels() )
                        .setY( (0).pixels() )
                        .setColor(color.asideNoteItemText)
                        .setChildOf(paddingElement )
        //рисуем список курсов
        state.courses.map(item=>{
            let itemText = null
            const courseItemComponent = new UIRoundedRectangle(3)
                  .setX( (5).pixels() )
                  .setY( new SiblingConstraint(5) )
                  .setWidth( new SubtractiveConstraint( (100).percent(), (10).pixels() ) )
                  .setHeight( (20).pixels()  )
                  .setColor( color.asideNoteItem )
                  .onMouseEnter( _this=>{
                      _this.setColor(color.asideNoteItemHover)
                  })
                  .onMouseLeave( _this=>{
                      _this.setColor(color.asideNoteItem)
                  })
                  .onMouseClick(_this=>{
                      clearActiveItem(selectCourseScreen)
                      itemText.setColor(color.itemActiveText)
                      state.courseID = item.id
                      selectSubject.clearChildren()
                      getSubjects(state.courseID, selectSubject)
                      state.workbookBtnText.setText(state.courseID)
                      courseName = item.name
                      state.topBarTitle.setText(courseName)
                  })
                  .setChildOf(selectCourseScreen)
                  

          itemText = new UIText(item.id+' '+item.name, false)
                        .setX( (5).pixels() )
                        .setY( new CenterConstraint() )
                        .setColor(color.asideNoteItemText)
                        .setChildOf(courseItemComponent )
        })
    /**
     * RIGHT WRAPPER
     */
        selectSubject = new UIRoundedRectangle(3)
                  .setX( new SiblingConstraint(5) )
                  .setY( (0).pixels() )
                  .setWidth( new SubtractiveConstraint( (50).percent(), (0).pixels() ) )
                  .setHeight(new SubtractiveConstraint( (100).percent(), (0).pixels() ) )
                  .setColor( color.content )
        parent.addChild(selectSubject)
  }



/**
 * Subjects
 */

function getSubjects (id, selectSubject, parent){
 // let itemText = null
  request.getSubjects(id, subjects=>{
        //Костыль для первого отступа [hover->не забыть добавить текст]         
        new UIContainer().setX( (0).pixels() ).setY( (0).pixels() ).setWidth( (5).pixels() ).setHeight( (0).pixels() ).setChildOf(selectSubject)
        // рисуем список subjects
        subjects.map(item=>{
            const subjectItem = new UIRoundedRectangle(3)
                  .setX( (5).pixels() )
                  .setY( new SiblingConstraint(5) )
                  .setWidth( new SubtractiveConstraint( (100).percent(), (10).pixels() ) )
                  .setHeight( (20).pixels()  )
                  .setColor( color.asideNoteItem )
                  .onMouseEnter( _this=>{
                      _this.setColor(color.asideNoteItemHover)
                  })
                  .onMouseLeave( _this=>{
                      _this.setColor(color.asideNoteItem)
                  })
                  .onMouseClick(_this=>{
                      //clearActiveItem(_this.getParent())
                      //itemText.setColor(color.itemActiveText)
                      state.subjectID = item.id
                      state.workbookBtnText.setText(state.courseID+' / '+state.subjectID)
                      state.topBarTitle.setText(courseName+'\n'+item.name)
                      state.screenContainer.clearChildren()
                      state.screen.chapter()

                  })
                  .setChildOf(selectSubject)
                  
          itemText = new UIText(item.id+' '+item.name, false)
                        .setX( (5).pixels() )
                        .setY( new CenterConstraint() )
                        .setColor(color.asideNoteItemText)
                        .setChildOf(subjectItem )
        })
  })
}


export default function (){

  request.getAllCourses(showNotebooksList)

}