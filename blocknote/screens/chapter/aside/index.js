import { 
  UIRoundedRectangle, 
  SubtractiveConstraint, 
  ScrollComponent,
  SiblingConstraint
} from 'Elementa'

import color from '../../../utils/color.js'
import state from '../../../lib/state.js'

/**
 * Components
 */
import notes from './notes.js'
import playerControl from './player-control.js'

export default function (parent){


const aside = new UIRoundedRectangle(3)
      .setX( (0).pixels() )
      .setY( (0).pixels() )
      .setWidth( ( 200 ).pixels() )
      .setHeight( new SubtractiveConstraint( (100).percent(), (0).pixels() ) )
      .setColor( color.aside )
      .setChildOf(parent)
state.ui.notes = new ScrollComponent()
              .setX( (5).pixels() )
              .setY( (5).pixels())
              .setWidth( (aside.getWidth()-10).pixels() )
              .setHeight(new SubtractiveConstraint( (75).percent(), (5).pixels() ))
              .setChildOf(aside)
  notes(state.ui.notes)
  playerControl(aside)


}


