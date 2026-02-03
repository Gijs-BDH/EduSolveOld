import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '@app/data/service/user.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent {

    form : FormGroup;

    constructor(formBuilder : FormBuilder, private users : UserService, private dialog : MatDialog){
        this.form = formBuilder.group({
            email : new FormControl('', [Validators.required, Validators.email]),
            company: new FormControl('', [Validators.required]),
            isAdmin: false
        })
    }

    submit(){
        if(this.form.invalid){
            return;
        }
        
        var data = this.form.value;

        this.users.add(data.email, data.company, data.isAdmin)
            .subscribe({
                next : () => this.dialog.closeAll(),
                error: (err) => window.alert(err.error.message)
            })
    }

    
}
