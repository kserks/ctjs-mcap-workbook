import request from 'requestV2'
import config from '../config.js'
import bus from '../utils/bus.js'
import state from '../lib/state.js'


export function getWorkbooks (callback){
// subjectID
    
    request({url: config.subjectsURL(state.subjectID)})
    .then(response=> {
        state.notes = JSON.parse(response).items
        callback(state.notes)
    })
    .catch(error=>console.error(error))
}



// POST /db/{database}/namespaces/{name}/items

export function addNote (body){
  request({
    url: config.setNoteURL,
    method: 'POST',
    headers: {
        'User-Agent': 'Mozilla/5.0'
    },
    body: body,
  })
  .then(response=>{
    console.log(response)
  })
  .catch( error=>console.error(error) )

}


export function getAllCourses (){
    request({
        url: config.noteBookURL
    })
    .then(response=>{
        state.courses = JSON.parse(response).items
    })
    .catch( error=>console.error(error) )
}

export function getSubjects (course, callback){
    request({
        url: config.getSubjectsURL(course)
    })
    .then(response=>{

        state.subjects = JSON.parse(response).items
        callback(state.subjects)
    })
    .catch( error=>console.error(error) )
}

