// import { Injectable } from '@angular/core';
// import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { HelperService } from './helper.service';
// import { Router } from '@angular/router';

// @Injectable()

// export class JwtInterceptor implements HttpInterceptor {

//     constructor(private HelperService: HelperService,
//         private router: Router,) { }

//     intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

//         request = request.clone({
//             setHeaders: {
//                 'auth-token': `${localStorage.getItem('auth_token')}`
//             }
//         });
//         return next.handle(request);
//     }
// }



//Modified code below

import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HelperService } from './helper.service';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(
        private helperService: HelperService,
        private router: Router
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authToken = localStorage.getItem('auth_token');

        if (authToken) {
            request = request.clone({
                setHeaders: {
                    'auth-token': authToken
                }
            });
        }

        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                console.log(error)
                if (error.status === 401) {
                    // Token is invalid or expired, redirect to logout API
                    this.helperService.logout();
                    this.router.navigate(['/login']);
                }
                // Pass the error along to the calling code
                return throwError(error);
            })
        );
    }
}


