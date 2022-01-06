import bus from '../utils/bus.js'

const data = {
  notes: null,
  courses: null,
  ctx: null,
  content: {},
  screenContainer: null,
  screen: {},
  screenID: null,
  courseID: null,
  subjectID: null,
};

const state = new Proxy(data, {
  get: function(target, key) {

    return Reflect.get(target, key);
  },
  set: function(target, key, value) {

    if(key==='screenID'){
        bus.emit('screenID.'+value)
    }
    bus.emit(key, value)

    return Reflect.set(target, key, value);
  }
});




export default state

