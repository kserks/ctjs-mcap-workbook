import bus from '../utils/bus.js'


const data = {
  notes: null,
  courses: null,
  ctx: {
    "id": "",
    "player": "",
    "subject": "",
    "tso": 0,
    "dto": "",
    "order": '',
    "name": "",
    "source": "",
    "content": "",
    "link": "",
    "mark1": 0,
    "mark2": "",
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

