// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ProfileService } from './../profile.service';
// import { RouterModule, Params, Router, ActivatedRoute } from '@angular/router';
// import { Observable } from "rxjs"
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// // import { CustomerComponent } from '../customer/customer.component';
// import { User } from 'src/app/Interfaces';

// @Component({
//   selector: 'app-edit-profile',
//   standalone: true,
//   imports: [CommonModule,ReactiveFormsModule, RouterModule],
//   templateUrl: './edit-profile.component.html',
//   styleUrls: ['./edit-profile.component.css']
// })
// export class EditProfileComponent {

//   user: User ={
//     Name: '',
//     Email: '',
//     Password:'',
//   }
//   id=''
//   updated = false

//   form!: FormGroup
//   constructor(private fb: FormBuilder, public profileService: ProfileService, private route:ActivatedRoute, private router:Router) {

//   }

//   ngOnInit(): void {
//     this.form = this.fb.group({
//       name: [null, [Validators.required]],
//       email: [null, [Validators.required]],
//       password: [null, [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$')]],
//       confirmPassword: [null, [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$')]]
      
//     })
//     this.profileService.getUserProfile().subscribe((user) => {
//       this.user = user
//       console.log(user)
//       this.form.setValue({
//         name: this.user.name,
//         email: this.user.email,
//         password: '',
//         confirmPassword: ''
//       })
      
//     })
    
//   }

  
//   updateProfile() {
//     console.log(this.user);
    

//     // let user:User={this.user}
//     this.profileService.updateProfile(this.form.value)
//     this.router.navigate(['/dashboard'],{relativeTo:this.route})
//     this.updated=true    
//   }
  
  

//   canDeactive(): boolean | Promise<boolean> | Observable<boolean> {

//     if ((
//       this.form.value.name != this.user.name ||
//       this.form.value.email != this.user.email ||
//       this.form.value.password != this.user.password ||
//       this.form.value.confirmPassword != this.user.confirmPassword
//     ) && !this.updated) {
//       const prom = new Promise<boolean>((resolve, reject) => {
//         setTimeout(() => {
//           resolve(confirm('Are you Sure you want to Discard the Changes'))
//         }, 1000)       
//       })
//       console.log("confirm");
//       return prom
//     } else {
//       return true
//     }
//   };

// }

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
  user: User ={
    Name: '',
    Email: '',
    Password:'',
  }
 
  updated = false

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
      this.id=param['id']
      })

      this.store.select(getSingleUser).subscribe(res=>{
        if(res){
                
          this.form.setValue({
            Name:res.name,
            Email:res.email,
            Password:res.password
        })
        }
      })
    
  }

  submitForm(){
    this.store.dispatch(updateUserProfile({user:this.form.value}))
    this.router.navigate(['../'],{relativeTo:this.route})
    
  }
}