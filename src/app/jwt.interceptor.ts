import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { HelperService } from './helper.service';
import { Router } from '@angular/router';

@Injectable()

export class JwtInterceptor implements HttpInterceptor {

    constructor(private HelperService: HelperService,
        private router: Router,) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        request = request.clone({
            setHeaders: {
                'auth-token': `${localStorage.getItem('auth_token')}`
            }
        });
        return next.handle(request);
    }
}


