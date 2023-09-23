export class LFSR {
    state: number;
    coefficient: number;
    offset: number;
    modulo: number;
    constructor(seed = 340081546) {
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
    setState(state: number) {
        this.state = state;
    }
    setModulo(mod: number) {
        this.modulo = mod;
    }
    setOffset(off: number) {
        this.offset = off;
    }
    setScalar(coeff: number) {
        this.coefficient = coeff;
    }
    clone() {
        let rngClone = new LFSR();
        rngClone.state = this.state;
        rngClone.coefficient = this.coefficient;
        rngClone.offset = this.offset;
        rngClone.modulo = this.modulo;
        return rngClone;
    }
}
