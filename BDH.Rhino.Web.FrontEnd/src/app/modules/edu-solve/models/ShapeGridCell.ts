
export class ShapeGridCell {
    constructor(public value: boolean) {
    }

    toggle() {
        this.value = !this.value;
    }
}
