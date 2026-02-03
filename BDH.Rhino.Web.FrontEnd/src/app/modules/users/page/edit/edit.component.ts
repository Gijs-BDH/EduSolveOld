import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '@app/data/schema/models/User';
import { UserService } from '@app/data/service/user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {

    form : FormGroup;

    constructor(formBuilder : FormBuilder, private users : UserService,  @Inject(MAT_DIALOG_DATA) data : User, private dialog : MatDialog){
        this.form = formBuilder.group({
            email : new FormControl(data.emailAddress, [Validators.required, Validators.email]),
            company: new FormControl(data.company, [Validators.required]),
            isAdmin: data.isAdmin
        })
    }

    submit(){
        var data = this.form.value;

        this.users.edit(data.email, data.isAdmin, data.company).subscribe({
            next : () => this.dialog.closeAll()
        })
    }

    
}
