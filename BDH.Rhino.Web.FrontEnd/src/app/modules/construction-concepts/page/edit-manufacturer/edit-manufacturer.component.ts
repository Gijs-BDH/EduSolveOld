import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstructionConceptService } from '@app/data/service/construction-concept.service';
import { ConstructionConcept } from '@app/data/schema/models/ConstructionConcept';
import { Observable, ReplaySubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators'

@Component({
  selector: 'app-edit-manufacturer',
  templateUrl: './edit-manufacturer.component.html',
  styleUrls: ['./edit-manufacturer.component.scss']
})
export class EditManufacturerComponent implements OnInit {

    public displayedColumns = ["name", "edit", "delete"]

    public concepts$ : Observable<ConstructionConcept[]>;
    public refresh$ = new ReplaySubject(1);
    private id : string | undefined;

    constructor( private route : ActivatedRoute, private router : Router, private dataSerivce : ConstructionConceptService ) {

        this.concepts$ = this.refresh$
            .pipe(switchMap(v => this.dataSerivce.getByManufacturer(this.id!)));

    }

    ngOnInit(): void {
        this.id = this.route.snapshot.queryParamMap.get('id')!;
        this.refresh$.next(true);
    }


    public add(){
        var name = window.prompt("Hoe wilt u dat het gaat heten?");
        if(!name){
            return;
        }

        this.dataSerivce.addConcept(name!, 2000, 6000, this.id!)
            .pipe(map(v => this.refresh$.next(true)))
            .subscribe();
    }

    public remove(component : ConstructionConcept){
        this.dataSerivce.deleteComponent(component.id)
            .pipe(map(v => this.refresh$.next(true)))
            .subscribe();
    }

    public edit(component : ConstructionConcept){
        this.router.navigate(["../edit-component"], { relativeTo: this.route, queryParams: {id: component.id} } );
    }
}
