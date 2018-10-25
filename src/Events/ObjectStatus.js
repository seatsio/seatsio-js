class ObjectStatus{
  constructor(){
    this.FREE = 'free';
    this.BOOKED = 'booked';
    this.HELD = 'reservedByToken';
    this.status = '';
  }
  setStatus(status){
    this.status = status;
  }
}

module.exports = ObjectStatus;
