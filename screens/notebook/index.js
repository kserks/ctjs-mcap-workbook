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
import chapter from '../chapter/index.js'


bus.on('screenID.notebook', ()=>{

  if(state.courses){
    showNotebooksList(state.screenContainer)
  }

})
request.getAllCourses()


function showNotebooksList(parent){
  state.screenContainer.clearChildren()
    var  selectSubject = null
    state.screenContainer.clearChildren()
      /**
       * LEFT WRAPPER
       */
        const selectCourseScreen = new UIRoundedRectangle(3)
                  .setX( (0).pixels() )
                  .setY( (0).pixels() )
                  .setWidth( new SubtractiveConstraint( (50).percent(), (5).pixels() ) )
                  .setHeight(new SubtractiveConstraint( (100).percent(), (0).pixels() ) )
                  .setColor( color.content )
        //Костыль для первого отступа          
        new UIContainer().setX( (0).pixels() ).setY( (0).pixels() ).setWidth( (5).pixels() ).setHeight( (0).pixels() ).setChildOf(selectCourseScreen)
        //рисуем список курсов
        state.courses.map(item=>{
            const courseItemComponent = new UIRoundedRectangle(3)
                  .setX( (5).pixels() )
                  .setY( new SiblingConstraint(5) )
                  .setWidth( new SubtractiveConstraint( (100).percent(), (10).pixels() ) )
                  .setHeight( (20).pixels()  )
                  .setColor( color.screen )
                  .onMouseEnter( _this=>{
                      _this.setColor(color.asideNoteItemHover)
                  })
                  .onMouseLeave( _this=>{
                      _this.setColor(color.screen)
                  })
                  .onMouseClick(_this=>{

                      state.courseID = item.id
                      selectSubject.clearChildren()
                      getSubjects(state.courseID, selectSubject)
                  })
                  .setChildOf(selectCourseScreen)
                  

          let itemText = new UIText(item.id+' '+item.name, false)
                        .setX( (5).pixels() )
                        .setY( new CenterConstraint() )
                        .setColor(color.asideNoteItemText)
                        .setChildOf(courseItemComponent )
        })
        parent.addChild(selectCourseScreen)
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
  request.getSubjects(id, subjects=>{
        //Костыль для первого отступа          
        new UIContainer().setX( (0).pixels() ).setY( (0).pixels() ).setWidth( (5).pixels() ).setHeight( (0).pixels() ).setChildOf(selectSubject)
        // рисуем список subjects
        subjects.map(item=>{
            const subjectItem = new UIRoundedRectangle(3)
                  .setX( (5).pixels() )
                  .setY( new SiblingConstraint(5) )
                  .setWidth( new SubtractiveConstraint( (100).percent(), (10).pixels() ) )
                  .setHeight( (20).pixels()  )
                  .setColor( color.screen )
                  .onMouseEnter( _this=>{
                      _this.setColor(color.asideNoteItemHover)
                  })
                  .onMouseLeave( _this=>{
                      _this.setColor(color.screen)
                  })
                  .onMouseClick(_this=>{
                      state.subjectID = item.id
                

                  })
                  .setChildOf(selectSubject)
                  

          let itemText = new UIText(item.id+' '+item.name, false)
                        .setX( (5).pixels() )
                        .setY( new CenterConstraint() )
                        .setColor(color.asideNoteItemText)
                        .setChildOf(subjectItem )
        })
      
  })

}

bus.on('subjectID', ()=>{
  
  state.screenContainer.clearChildren()
  chapter()
})

export default function (){}