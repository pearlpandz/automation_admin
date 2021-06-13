import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class HelperService {
    constructor() { }

    isAccessible(pageName: string, action: string): boolean {
        let permissions = JSON.parse(sessionStorage.getItem('tlca_user_permissions'))
        let permission = permissions.find(page => page.pageName == pageName);
        if (permission) {
            return permission[action]
        } else {
            return false;
        }
    }
}