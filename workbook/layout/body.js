import { 
  UIBlock, 
  CenterConstraint, 
  UIRoundedRectangle, 
  UIContainer, 
  SubtractiveConstraint, SiblingConstraint
} from "Elementa"

import color from '../utils/color.js'
import state from '../lib/state.js'
/**
 * Components
 */
import topBar from './top-bar/index.js'
/**
 * Screens
 */

import notebook from '../screens/notebook/index.js'
import chapter from '../screens/chapter/index.js'



state.screen.notebook = notebook
state.screen.chapter = chapter
/**
 * Отображаем изначальный экран
 */
state.screen.notebook()


const width = 720
const height = 540


const body = new UIBlock()
              .setX( new CenterConstraint() )
              .setY( new CenterConstraint() )
              .setWidth( ( width ).pixels() )
              .setHeight( ( height ).pixels() )
              .setColor( color.body )

const mainWrapper = new UIRoundedRectangle(3)
                      .setX( new CenterConstraint() )
                      .setY( new CenterConstraint() )
                      .setWidth( ( width/1.1 ).pixels() )
                      .setHeight( ( height/1.2 ).pixels() )
                      .setColor( color.wrapper )
                      .setChildOf(body)
/**
 * Components
 */
topBar(mainWrapper)

state.screenContainer = new UIContainer()
          .setX( (5).pixels() )
          .setY( new SiblingConstraint(5) )
          .setWidth( new SubtractiveConstraint( (100).percent(), (10).pixels() ) )
          .setHeight(new SubtractiveConstraint( (90).percent(), (5).pixels() ) )
          .setColor( color.aside )
          .setChildOf(mainWrapper)



export default body