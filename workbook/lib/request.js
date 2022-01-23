import request from 'requestV2'
import query from '../utils/query.js'
import state from '../lib/state.js'


export function getWorkbooks (callback){
// subjectID
    
    request({url: query.subjectsURL(state.subjectID)})
    .then(response=> {
        state.notes = JSON.parse(response).items
        callback(state.notes)
    })
    .catch(error=>console.error(error))
}



// POST /db/{database}/namespaces/{name}/items

export function addNote (body, callback){

  request({
    url: query.setNoteURL,
    method: 'POST',
    headers: {
        'User-Agent': 'Mozilla/5.0'
    },
    body,
  })
  .then(response=>{
    console.log(response)
    callback()
  })
  .catch( error=>console.error(error) )

}


export function getAllCourses (callback){
    request({
        url: query.noteBookURL
    })
    .then(response=>{
        state.courses = JSON.parse(response).items
        callback(state.courses)
    })
    .catch( error=>console.error(error) )
}

export function getSubjects (course, callback){
    request({
        url: query.getSubjectsURL(course)
    })
    .then(response=>{

        state.subjects = JSON.parse(response).items
        callback(state.subjects)
    })
    .catch( error=>console.error(error) )
}


export function updateNote (body, callback){

  request({
    url: query.setNoteURL,
    method: 'PUT',
    headers: {
        'User-Agent': 'Mozilla/5.0',
        'Content-Type': 'application/json',
        'Accept':  '*/*',
    },
    body
  })
  .then(response=>{
    console.log(response)
    callback()
  })
  .catch( error=>console.error(JSON.stringify(error) ) )
}



function updateParam(id, param){
   request({url: query.updateParam(id, param)})
    .then(response=> {
        console.log(response)
    })
    .catch( error=>console.error( JSON.stringify(error) ) )

}

//updateParam('123', {content: str})
export function copyNote (linkout, callback){

    request({
        url: query.copyNoteURL(linkout)
    })
    .then(response=>{
        state.linkInObj = JSON.parse(response).items[0]
        
        callback(state.linkInObj, linkout)
    })
    .catch( error=>console.error(JSON.stringify(error) ) )

}
export function getMax (callback){

    request({
        url: query.maxUrl(Player.getName())
    })
    .then(response=>{
        state.maxPlayerNotes = JSON.parse(response).aggregations[0].value

       callback(state.maxPlayerNotes)
    })
    .catch( error=>console.error(JSON.stringify(error) ) )

}

getMax ()


