import color from './color.js'

export default function (parent){
  parent.children.map(item=>{
    item.children[0].setColor(color.asideNoteItemText)
  })
}