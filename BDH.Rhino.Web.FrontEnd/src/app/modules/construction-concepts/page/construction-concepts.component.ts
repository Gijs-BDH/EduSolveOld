import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstructionConceptProducer } from '@data/schema/models/ConstructConceptProducer';
import { ConstructionConceptService } from "@data/service/construction-concept.service"
import { Observable, ReplaySubject, map, switchMap } from 'rxjs';


@Component({
  selector: 'app-construction-concepts',
  templateUrl: './construction-concepts.component.html',
  styleUrls: ['./construction-concepts.component.scss']
})
export class ConstructionConceptsComponent implements OnInit {

    public displayedColumns = ["name", "edit", "delete"]

    public newManufacturer : string = "";
    public manufacturers$ : Observable<ConstructionConceptProducer[]>;
    private refresh$ = new ReplaySubject<boolean>(1);

    constructor(public data : ConstructionConceptService, private router : Router, private route : ActivatedRoute){
        this.manufacturers$ = this.refresh$.pipe(switchMap(v => this.data.getManufacturers()));
    }


    ngOnInit(): void {
        this.refresh$.next(true);
    }

    public addManufacturer(){
        this.data.addManufacturer(this.newManufacturer)
            .pipe(map(v => this.refresh$.next(true)))
            .subscribe({
                next: () => {
                    this.newManufacturer = "";
                }
            });
    }

    public edit(manufacturer : ConstructionConceptProducer){
        this.router.navigate(["./edit-manufacturer"], { relativeTo: this.route, queryParams: {id: manufacturer.id} } );
    }

    public add(){
        var name = window.prompt("What will be the name?");
        if(!name){
            return;
        }

        this.data.addManufacturer(name)
            .pipe(map(v => this.refresh$.next(true)))
            .subscribe({
                next: () => window.alert("Alles lijkt okay."),
                error: (err) => window.alert("Er is iets niet goed gegaan: " + err)
            })
    }

    public remove(manufacturer : ConstructionConceptProducer){
        this.data.deleteManufacturer(manufacturer.id).pipe(map(v => this.refresh$.next(true))).subscribe();
    }
}
