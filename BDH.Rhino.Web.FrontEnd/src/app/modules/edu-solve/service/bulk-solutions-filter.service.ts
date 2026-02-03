import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BulkSolutionsFilterService {


    private _footPrint: BehaviorSubject<number> = new BehaviorSubject(0);
    public readonly footrpint$ = this._footPrint.asObservable();

    private _hoeken: BehaviorSubject<number> = new BehaviorSubject(0);
    public readonly hoeken$ = this._hoeken.asObservable();

    private _gevel: BehaviorSubject<number> = new BehaviorSubject(0);
    public readonly gevel$ = this._gevel.asObservable();


    
    constructor() { }




    setFootprint(number: number) {
        this._footPrint.next(number);
    }

    getFootprint(){
        return this._footPrint.value;
    }



    setGevel(number: number) {
        this._gevel.next(number);
    }

    getGevel(){
        return this._gevel.value;
    }



    setHoeken(number: number) {
        this._hoeken.next(number);
    }

    getHoeken(){
        return this._hoeken.value;
    }
}
