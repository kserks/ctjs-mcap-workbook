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
import bus from '../../../utils/bus.js'


export default function (parent){

/**
 * WRAPPER 
 */
const wrapper = new UIContainer()
                .setX( (5).pixels() )
                .setY( new SiblingConstraint(5) )
                .setWidth( new SubtractiveConstraint( (100).percent(), (10).pixels() ) )
                .setHeight( (20).pixels() )

/**
 * HIDE
 */
const hideBtn = new UIRoundedRectangle(3)
                .setX( (0).pixels() )
                .setY( (0).pixels())
                .setWidth( new SubtractiveConstraint( (25).percent(), (3.7).pixels() ) )
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
 */
const showBtn = new UIRoundedRectangle(3)
                .setX( new SiblingConstraint(5) )
                .setY( (0).pixels() )
                .setWidth( new SubtractiveConstraint( (25).percent(), (3.7).pixels() ) )
                .setHeight( (20).pixels() )
                .setColor( color.disabled )
                .setChildOf(wrapper)
      new UIText('Показать', false)
                      .setX( new CenterConstraint() )
                      .setY( new CenterConstraint() )
                      .setColor(color.disabledText)
                      .setChildOf(showBtn)   

/**
 * RESTORE
 */
const restoreBtn = new UIRoundedRectangle(3)
                .setX( new SiblingConstraint(5) )
                .setY( (0).pixels() )
                .setWidth( new SubtractiveConstraint( (25).percent(), (3.7).pixels() ) )
                .setHeight( (20).pixels() )
                .setColor( color.disabled )
                .setChildOf(wrapper)
      new UIText('Востановить', false)
                      .setX( new CenterConstraint() )
                      .setY( new CenterConstraint() )
                      .setColor(color.disabledText)
                      .setChildOf(restoreBtn)  
/**
 * WRITE
 */
const writeBtn = new UIRoundedRectangle(3)
                .setX( new SiblingConstraint(5) )
                .setY( (0).pixels() )
                .setWidth( new SubtractiveConstraint( (25).percent(), (3.7).pixels() ) )
                .setHeight( (20).pixels() )
                .setColor( color.disabled )
                .setChildOf(wrapper)
      new UIText('Записать', false)
                      .setX( new CenterConstraint() )
                      .setY( new CenterConstraint() )
                      .setColor(color.disabledText)
                      .setChildOf(writeBtn)  

  parent.addChild(wrapper)
}