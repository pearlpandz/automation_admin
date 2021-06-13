import { HttpRequest, HttpHandler, HttpInterceptor, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { Router } from "@angular/router";
import { Subject, Observable, throwError } from "rxjs";
import { catchError, switchMap, tap } from "rxjs/operators";
import { AuthService } from "./auth.service";
import { MessageService } from 'primeng/api';

@Injectable({
    providedIn: 'root',
})

export class AuthInterceptor implements HttpInterceptor {

    refreshTokenInProgress = false;

    tokenRefreshedSource = new Subject();
    tokenRefreshed$ = this.tokenRefreshedSource.asObservable();

    constructor(
        private authService: AuthService,
        private messageService: MessageService,
    ) { }

    addAuthHeader(request) {
        const authHeader = this.authService.getAuthorizationHeader();
        if (authHeader) {
            return request.clone({
                setHeaders: {
                    "Authorization": authHeader
                }
            });
        }
        return request;
    }

    refreshToken(): Observable<any> {
        if (this.refreshTokenInProgress) {
            return new Observable(observer => {
                this.tokenRefreshed$.subscribe(() => {
                    observer.next();
                    observer.complete();
                });
            });
        } else {
            this.authService.logout();
        }
    }

    logout() {
        this.authService.logout();
    }

    handleResponseError(error, request?, next?) {
        // Business error
        if (error.status === 400) {
            // Show message
            this.messageService.add({
                severity: 'error',
                summary: `${error?.error?.errorList ?
                    error?.error?.errorList.map(a => a.error).toString() :
                    error?.error?.error}`,
                detail: `${error?.error?.errorList ?
                    error?.error?.errorList.map(a => a.error_description).toString() :
                    error?.error?.error_description}`
            });
        }

        // Invalid token error
        else if (error.status === 401) {
            return this.refreshToken().pipe(
                switchMap(() => {
                    request = this.addAuthHeader(request);
                    return next.handle(request);
                }),
                catchError(e => {
                    if (e.status !== 401) {
                        return this.handleResponseError(e);
                    } else {
                        this.logout();
                    }
                }));
        }

        // Access denied error
        else if (error.status === 403) {
            // Show message
            this.messageService.add({
                severity: 'error',
                summary: 'Access Denied',
                detail: `You're not authorized to access this page!`
            });
            // Logout
            this.logout();
        }

        // Server error
        else if (error.status === 500) {
            // Show message
            this.messageService.add({
                severity: 'error',
                summary: 'Internal Server Error',
                detail: `Something went wrong!`
            });
        }

        // Maintenance error
        else if (error.status === 503) {
            // Show message
            this.messageService.add({
                severity: 'error',
                summary: 'Maintanance Error',
                detail: `Apologize for redirecting!`
            });

        }

        return throwError(error);
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {

        // Handle request
        request = this.addAuthHeader(request);

        // Handle response
        return next.handle(request).pipe(catchError(error => {
            return this.handleResponseError(error, request, next);
        }));
    }
}

export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
};