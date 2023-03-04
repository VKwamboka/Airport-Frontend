import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
import { ErrorComponent } from 'src/app/error/error.component';
import { Store } from '@ngrx/store';
import { login, logout } from '../authAction';
import { AuthState } from '../authState';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,ErrorComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!:FormGroup
  login$!:Observable<AuthState[]>
  error=null
  constructor(private fb:FormBuilder, private authentication:AuthenticationService, private auth :AuthService,
    private router:Router, private store:Store<AuthState>
    ){

  }
  ngOnInit(): void {
    this.form = this.fb.group({
      Email:[null, [Validators.required, Validators.email]],
      Password:[null, Validators.required]
    })
   
    // this.store.dispatch(login({email:this.form.value.email,password:this.form.value.password}))
  //   this.store.dispatch(login(this.form.value))
  //   this.store.select('userl')
  //  this.store.select('userl').subscribe(state=>{
  //   console.log(state);
    
  // })
    // this.login$ = this.store.select(login(email:this.form.value.email,password:this.form.value.password))
  }

  submitForm(){
    this.authentication.loginUser(this.form.value).subscribe(response=>{
      this.auth.setRole(response.role)
      this.auth.setName(response.name)
      this.auth.login()
      localStorage.setItem('token', response.token)
      if(response.token){
        
        this.router.navigate(['book'])
      }
    },(error)=>{
    this.error=error.error.error
    })
    this.store.dispatch(login({userlogged:this.form.value}))
    console.log(this.form.value)
    // this.store.select('userl')
   
  }

  Close(){
    this.error=null
  }

  //login with state
  // onLogin(email: string, password: string) {
  //   this.store.dispatch(login({ email, password }));
  // }

  // logout with state
  onLogout() {
    this.store.dispatch(logout());
  }


  
  
}
