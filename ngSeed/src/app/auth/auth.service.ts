import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { LoginUser } from "@app/login/login-user.model";
import { API_URLS } from "@app/config/app.config";

@Injectable({ 
    providedIn: 'root' 
})
export class AuthService {

    constructor(private http: HttpClient) { }

    login(username: string, password: string): Observable<LoginUser> {
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', 'Basic ' + btoa(encodeURI(username + ':' + password)));
        return this.http.post<LoginUser>(API_URLS.LOGIN, 'grant_type=client_credentials', { headers: headers });
    }

    logout() {
        return this.http.post(API_URLS.LOGOUT, '');
    }
}
