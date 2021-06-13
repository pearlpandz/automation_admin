import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})

export class CommonService {
    constructor(private http: HttpClient) { }

    getToken(): any {
        const httpOptions = {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + sessionStorage.getItem('qa_token')
            })
        };
        return httpOptions;
    }

    getTokenForFileFormat(): any {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                authorization: 'Bearer ' + sessionStorage.getItem('qa_token')
            }),
            responseType: 'blob' as 'blob',
            pragma: 'no-cache'
        };
        return httpOptions;
    }

    postFileMethod(url, data): Observable<any> {
        return this.http.post(url, data, this.getTokenForFileFormat())
    }

    postMethodMHTML(url, data): Observable<any> {
        return this.http.post(url, data, {
            responseType: 'text'
        })
    }

    postMethod(url, data): Observable<any> {
        return this.http.post(url, data)
    }

    postMethodWithAuth(url, data): Observable<any> {
        return this.http.post(url, data, this.getToken())
    }

    putMethod(url, data): Observable<any> {
        return this.http.put(url, data)
    }

    getMethod(url): Observable<any> {
        return this.http.get(url)
    }

    getMethodWithAuth(url): Observable<any> {
        return this.http.get(url, this.getToken())
    }

    deleteMethod(url): Observable<any> {
        return this.http.delete(url)
    }

    bulkDeleteMethod(url, data): Observable<any> {
        return this.http.delete(url, data)
    }

}