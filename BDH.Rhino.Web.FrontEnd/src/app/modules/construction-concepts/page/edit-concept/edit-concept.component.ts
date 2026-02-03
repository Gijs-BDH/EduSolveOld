import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstructionConceptService } from '@app/data/service/construction-concept.service';
import { map, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-edit-concept',
  templateUrl: './edit-concept.component.html',
  styleUrls: ['./edit-concept.component.scss']
})
export class EditConceptComponent implements OnInit {

    public form! : FormGroup;
    public component$;
    public spanLength : number = 0;

    constructor(private route : ActivatedRoute, private data : ConstructionConceptService, private formBuilder : FormBuilder, private router : Router){

        this.component$ = this.route.queryParamMap
            .pipe(map(v => v.get('id')))
            .pipe(switchMap(v => {
                if(!v){
                    throw new Error();
                }

                return data.getComponent(v);
            }))
            .pipe(tap(v => this.form.patchValue(v)));

    }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            id: ['', Validators.required],
            name: ['', Validators.required],
            spanLength: ['', Validators.required],
            spanWidth: ['', Validators.required]
        });
    }

    save(){
        this.data
            .updateConcept(this.form.value['id'], this.form.value['name'], this.form.value['spanWidth'], this.form.value['spanLength'])
            .subscribe(v => this.router.navigate([".."], { relativeTo: this.route }));
    }
}
