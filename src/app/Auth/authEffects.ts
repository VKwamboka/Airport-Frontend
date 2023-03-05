import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, exhaustMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as UserActions from './authAction'
import { login, loginSuccess, loginFailure } from './authAction';
import { LoginSuccess, LoginUser, User } from '../Interfaces';
import { AuthenticationService } from '../Services/authentication.service';

@Injectable()
export class AuthEffects {
  
   
  constructor(private actions$: Actions, private authService: AuthenticationService ) {}

  login$ = createEffect(()=>{
    return  this.actions$.pipe( ofType(login),
    tap(action =>{console.log(action.userlogged)}),
    concatMap(action=>{
      return this.authService.loginUser(action.userlogged).pipe(
        
        map((loginsuccess:LoginSuccess) => loginSuccess({ loginSuccess:loginsuccess})),
          catchError((error) => of(loginFailure(error)))
      )
  })
    )
  }
   
  );

  // update user
  updateUser= createEffect(()=>{
    return this.actions$.pipe(
        ofType(UserActions.updateUserProfile),
        concatMap(action=>{
            return  this.authService.updateUser(action.id,action.user).pipe(
                map(successresponse=>{
                    return UserActions.updateUserProfileSuccess({user:successresponse})
                }),
                catchError(error=>of(UserActions.updateUserProfileFailure(error.error.message)))
            )
        })
    )
})
}


