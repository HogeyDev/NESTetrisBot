export class LFSR {
	constructor(seed=340081546) {
		this.state = seed;
		this.coefficient = 43216423;
		this.offset = 789993;
		this.modulo = 643762173;
	}
	update() {
		this.state = (this.coefficient * this.state + this.offset) % this.modulo;
	}
	int() {
		this.update();
		return this.state;
	}
	float() {
		this.update();
		return this.state / this.modulo;
	}
	setState(state) {
		this.state = state;
	}
	setModulo(mod) {
		this.modulo = mod;
	}
	setOffset(off) {
		this.offset = off;
	}
	setScalar(coeff) {
		this.coefficient = coeff;
	}
}