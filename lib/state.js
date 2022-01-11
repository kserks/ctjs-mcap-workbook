import bus from '../utils/bus.js'


const data = {
  notes: null,
  courses: null,
  ctx: null,
  newCtx: null,
  content: {},
  screenContainer: null,
  screen: {},
  screenID: null,
  courseID: null,
  subjectID: null,
  courseName: null,
};

const state = new Proxy(data, {
  get: function(target, key) {

    return Reflect.get(target, key);
  },
  set: function(target, key, value) {

    return Reflect.set(target, key, value);
  }
});




export default state

