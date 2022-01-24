import bus from '../utils/bus.js'


const data = {
  notes: null,
  courses: null,
  ctx: {
    "id": "",
    "player": "",
    "subject": "",
    "index": 1,
    "order": '',
    "name": "",
    "content": "",
    "linkin": "",
    "linkout": "",
    "mark": 0,
    "remark": "",
    "hide": false
  },
  newCtx: null,
  content: {},
  screenContainer: null,
  screen: {},
  screenID: null,
  courseID: null,
  subjectID: null,
  courseName: null,
  ui: {},
  history: [],
  edited: false,
  editBtnText: '',
  addNote: true
};


export default data

