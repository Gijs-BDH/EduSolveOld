import { ShapeGridCell } from './ShapeGridCell';


export class ShapeGrid {
    values: ShapeGridCell[];

    columns = 1;
    rows = 1;

    constructor(values: boolean[], shapeWidth: number) {
        var rows = values.length / shapeWidth;
        this.values = values.map(v => new ShapeGridCell(v));
        this.columns = shapeWidth;
        this.rows = rows;
    }

    addRow() {
        if (!this.values.length) {
            this.values.push(new ShapeGridCell(false));
            this.columns = 1;
            this.rows = 1;
            return;
        }
        for (var i = 0; i < this.columns; i++) {
            this.values.push(new ShapeGridCell(false));
        }
        this.rows++;
    }

    removeRow() {
        if (this.rows == 1) {
            return;
        }

        for (var i = 0; i < this.columns; i++) {
            this.values.splice(this.values.length - 1, 1);
        }
        this.rows--;
    }

    addColumn() {
        if (!this.values.length) {
            this.values.push(new ShapeGridCell(false));
            this.columns = 1;
            this.rows = 1;
            return;
        }

        for (var i = this.columns; i <= this.values.length; i += this.columns + 1) {
            this.values.splice(i, 0, new ShapeGridCell(false));
        }
        this.columns++;
    }

    removeColumn() {
        if (this.columns == 1) {
            return;
        }

        for (var i = this.values.length - 1; i > 0; i -= this.columns) {
            this.values.splice(i, 1);
        }
        this.columns--;
    }
}
