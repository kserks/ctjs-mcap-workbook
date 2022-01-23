class EventEmitter {
  constructor (){
    this.events = {} 
  }
 on  (event, handler){
      if(!this.events[event]) {
        this.events[event] = [];
      }
      this.events[event].push(handler);
  }
  emit (event, a){
      if(event in this.events) {
          this.events[event].forEach(handler=>{
            handler.call(this, a)
          })
      }

  }
  off (event){
    delete this.events[event]
  }
}

const bus = new EventEmitter()

export default bus

