import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map} from 'rxjs/operators';
import { HelperService } from './helper.service';
import { Router } from '@angular/router';

@Injectable()

export class ErrorInterceptor implements HttpInterceptor {

    constructor(private HelperService: HelperService,
        private router: Router,) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(map(event => {
            if (event instanceof HttpResponse) {
                console.log('event.body')
                console.log(event.body.error)
                if (event.body.status == '401') {
                    this.HelperService.logout();
                    this.router.navigate(['/login']);
                    
                }
            }         
            return event;
        }));
    }
}


