export class Cube {
  constructor(x, y, z) {
    this.cords = new Array(x, y, z);
  }

  getCords(){
    return this.cords;
  }
}