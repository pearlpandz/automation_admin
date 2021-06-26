export const BASE_URL = `http://165.22.208.52:8000`;

export const URLS = {
    LOGIN: `${BASE_URL}/admin/login`,
    USER: {
        SINGLE: `${BASE_URL}/customer`,
        LIST: `${BASE_URL}/customer/list`,
        ADD: `${BASE_URL}/customer/add`,
        EDIT: `${BASE_URL}/customer/edit`,
    },
    ADMIN: {
        SINGLE: `${BASE_URL}/admin`,
        LIST: `${BASE_URL}/admin/list`,
        ADD: `${BASE_URL}/admin/add`,
        EDIT: `${BASE_URL}/admin/edit`,
    }
}
