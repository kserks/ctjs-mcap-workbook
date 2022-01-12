import state from '../../lib/state.js'
import aside from './aside/index.js'
import content from './content/index.js'



export default function (){
  
  aside(state.screenContainer)
  content(state.screenContainer)
}