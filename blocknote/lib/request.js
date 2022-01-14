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
  /*
var body1 = {
  "id": '745',
  "player": "mcap_serg",
  "subject": "A1-1.1",
  "tso": 0,
  "dto": "",
  "code": 0,
  "order": 1,
  "name": "Тест текс тест",
  "source": "Интересно, что все эти тексты – искусственного происхождения. Генератор случайного текста использует загруженную в него базу текстов, на основе которой с использованием определенного алгоритма и создается рыба-текст",
  "content": "Интересно, что все эти тексты – искусственного происхождения. Генератор случайного текста использует загруженную в него базу текстов, на основе которой с использованием определенного алгоритма и создается рыба-текст",
  "link": "",
  "mark1": 0,
  "mark2": "",
  "hide": true
}*/

  //console.log(JSON.stringify(body))
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


export function updateNote (data, callback){

var body1 = {
  "id": "123",
  "player": "mcap_serg",
  "subject": "A1-1.1",
  "tso": 0,
  "dto": "",
  "code": 0,
  "order": 1,
  "name": "------------ Объяление let",
  "source": "Интересно, что все эти тексты – искусственного происхождения. Генератор случайного текста использует загруженную в него базу текстов, на основе которой с использованием определенного алгоритма и создается рыба-текст",
  "content": "Интересно, что все эти тексты – искусственного происхождения. Генератор случайного текста использует загруженную в него базу текстов, на основе которой с использованием определенного алгоритма и создается рыба-текст",
  "link": "",
  "mark1": 0,
  "mark2": "",
  "hide": false
}


      request({
        url: query.setNoteURL,
        method: 'PUT',
        headers: {
            'User-Agent': 'Mozilla/5.0',
            'Content-Type': 'application/json',
            'Accept':  '*/*'
        },
        body: body1
      })
      .then(response=>{
        console.log('put: '+response)
      })
      .catch( error=>console.error( JSON.stringify(error) ) )
}

