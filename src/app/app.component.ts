import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from './Services/auth.service';
import { ShowFormUser } from './State/Actions/sampleActions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Airport';
  constructor(public auth:AuthService,private store:Store<any>,private router:Router){}

  ShowMore(){
    this.router.navigate(['/update'])
    }

  showForm(){
      this.store.dispatch(ShowFormUser())
    }
}
