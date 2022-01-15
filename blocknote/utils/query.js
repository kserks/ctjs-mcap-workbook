import objToUrl from './obj-to-url.js'

const baseUrl = 'http://atlant.mcacademy.ru/reindexer/api/v1/db/mcap_learn/'


export default {

  subjectsURL: subject=>{
    console.log('subject: '+subject)
    return  `${baseUrl}query?q=select%20%2a%20from%20workbooks%20where%20subject%3D%22${subject}%22`
  },
  setNoteURL: baseUrl+'namespaces/workbooks/items',
  noteBookURL: baseUrl+'query?q=select%20%2a%20from%20courses',
  getSubjectsURL: course=>{
    return  `${baseUrl}query?q=select%20%2a%20from%20subjects%20where%20course%3D%22${course}%22`
  },
  updateNoteURL: id=>{
    return `${baseUrl}query?q=select%20%2a%20from%20workbooks%20where%20id%3D%22${id}%22`
  },
  updateParam: (id, obj)=>{

    return `${baseUrl}query?q=update%20workbooks%20set${objToUrl(obj)}%20where%20id%3D%22${id}%22`
  }

}
