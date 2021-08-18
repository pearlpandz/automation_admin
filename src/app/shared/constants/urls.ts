export const BASE_URL = `http://165.22.208.52:8000`;
// export const BASE_URL = `http://localhost:8000`;

export const URLS = {
    LOGIN: `${BASE_URL}/admin/login`,
    TOKEN: `${BASE_URL}/admin/verify`,
    USER: {
        SINGLE: `${BASE_URL}/customer`,
        LIST: `${BASE_URL}/customer/list`,
        ADD: `${BASE_URL}/customer/add`,
        EDIT: `${BASE_URL}/customer/edit`,
        TRANSFER: `${BASE_URL}/customer/transfer`
    },
    ADMIN: {
        SINGLE: `${BASE_URL}/admin`,
        LIST: `${BASE_URL}/admin/list`,
        ADD: `${BASE_URL}/admin/add`,
        EDIT: `${BASE_URL}/admin/edit`,
        EXCEPT_AGENT_LIST: `${BASE_URL}/admin/agent/list`
    },
    PRODUCT: {
        SINGLE: `${BASE_URL}/product`,
        LIST: `${BASE_URL}/products`
    },
    OTHERS: {
        BASE_DEVICES: `${BASE_URL}/basedevices/list`,
        SWITCH_TYPES: `${BASE_URL}/switch/list`,
    },
    INVENTORY: {
        SINGLE: `${BASE_URL}/inventory`,
        LIST_ADMIN: `${BASE_URL}/inventory/list/admin`,
        LIST_AGENT: `${BASE_URL}/inventory/list/agent`,
        MOVE_PRODUCT_TO_AGENT: `${BASE_URL}/inventory/moveProductToAgent`
    },
    PRODUCTION: {
        LIST: `${BASE_URL}/production/list`
    }
}
