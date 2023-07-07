class Shape{
	constructor(dimensions){
		this.dimensions = dimensions
	}
	area(){
		throw new Error('not implemented');
	}
}

class Square extends Shape {
	area() {
		return this.dimensions.width*this.dimensions.width;
	}
}

class Circle extends Shape {
	area() {
		let pi = 3.14159265358979323846;
		return (pi * this.dimensions.radius * this.dimensions.radius);
	}
}
class Rectangle extends Shape {
	area() {
		return this.dimensions.width*this.dimensions.height;
	}
}

// TODO: Square, Circle, Rectangle

const app = {
  Shape: Shape,
  Square : Square,
  Circle : Circle,
  Rectangle : Rectangle
}

module.exports = app