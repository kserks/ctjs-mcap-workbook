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
    //callback()
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
//updateParam('123', {order: 0, name: 'Новое имя'})

/*

update workbooks set hide = true, name = "let Новое имя", order = 99 where id="123"
http://atlant.mcacademy.ru/reindexer/api/v1/db/mcap_learn/query?q=update%20workbooks%20set%20name%20%3D%20%22%D0%9D%D0%BE%D0%B2%D0%BE%D0%B5%20%D0%B8%D0%BC%D1%8F%22%20where%20id%3D%22123%22
 */


