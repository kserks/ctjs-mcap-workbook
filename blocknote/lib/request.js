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
/*


{
  "id": "1",
  "player": "mcap_serg",
  "subject": "A1-1.1",
  "tso": 0,
  "dto": "",
  "code": 0,
  "order": 0,
  "name": "+++++++ бъяление let",
  "source": "Интересно, ",
  "content": "PUT PUT PUT PUT",
  "link": "",
  "mark1": 0,
  "mark2": "",
  "hide": false
}
 */