import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { AppState } from 'src/app/State/appState';
import { Store } from '@ngrx/store';
import { getSingleUser } from 'src/app/Auth/authState';
import { updateUserProfile } from 'src/app/Auth/authAction';
import { User } from 'src/app/Interfaces';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, RouterModule],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
  // user: User ={
  //   Name: '',
  //   Email: '',
  //   Password:'',
  // }
 
  // updated = false

  show=false
  id!:string
  form!:FormGroup
  constructor(private fb:FormBuilder,private route:ActivatedRoute,private router:Router, private store:Store<AppState>){

  }

  ngOnInit(): void {
     
    this.form = this.fb.group({
      Name:[null, Validators.required],
      Email:[null, [Validators.required, Validators.email]],
      Password:[null, Validators.required]
    })

    this.route.params.subscribe((param:Params)=>{
      this.id=param['Id']
      })

      this.store.select(getSingleUser).subscribe(res=>{
        if(res){    
          console.log(res)     
          this.form.setValue({
            Name:res.name,
            Email:res.email,
            Password:res.password
        })
        }
      })
    
  }

  submitForm(){
    this.store.dispatch(updateUserProfile({id:this.id, user:this.form.value, }))
    this.router.navigate(['../'],{relativeTo:this.route})
    
  }
}