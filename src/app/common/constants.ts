export const APIS = {
    AUTH: {
        LOGIN: "/v1/user/login",
        SIGN_UP: "/v1/user/sign-up",
        FORGOT_PASSWORD: "​/v1​/user​/forgot-password",
        VERIFY_OTP: "/v1/user/verify-otp",
        RESEND_OTP: "/v1/user/resend-otp",
        LOGOUT: "/v1/user/logout",
        WAREHOUSE_LIST: "/v1/warehouse/code-list",
        VALIDATE_CAPTCHA: "/v1/user/validate-captcha",
        GET_ROLES: "/v1/user/get-roles-for-signup"
    },
    USER: {
        USER_DETAILS: "/v1/user/get-details",
        USER_LIST: "/v1/user/list-user",
        APPROVE_USER: "/v1/user/approveOrRejectUser",
        ADD_NEW_USER: "/v1/user/add-user",
        UPDATE_USER: "/v1/user",
        CHANGE_PASSWORD: "/v1/user/change-password",
        SUSPEND_UNSUSPEND_USER: "/v1/user",
        GET_FILTERS: "/v1/user/get-filters",
        GET_PERMISSIONS: "/v1/user/get-permissions",
        GET_PERMISSIONS_BY_ROLE: "/v1/role/fetch-by-id",
        UPDATE_USER_ROLE: "​/v1​/user​/updateUser"
    },
    ROLE: {
        ROLE: "/v1/role"
    },
    IMAGE: {
        PROFILE_PIC: "/v1/file-upload"
    },
    WAREHOUSE: {
        WAREHOUSE_LIST: "/v1/warehouse/list",
        WAREHOUSE_LOCATION_FILTERS: '/v1/warehouse/get-warehouse-location-filters',
        FILTERS: "/v1/warehouse/get-filters",
        FETCH_WAREHOUSE_BY_CODE: "/v1/warehouse/fetch-by-code",
        FETCH_LOCATION_BY_CODE: '/v1/warehouse/fetch-location-by-code',
        SEARCH_WAREHOUSE: "/v1/warehouse/search-warehouse"
    },
    INVENTORY: {
        INVENTORY_LIST: "/v1/inventory/list",
        FETCH_INVENTORY_BY_ID: "​/v1/inventory/fetch-by-id",
        GET_INVENTORY_FILTER_DATA: "/v1/inventory/get-filters",
        GENERATE_VARINCE_REPORT: "/v1/inventory/generate-variance-report",
        GET_VARINCE_REPORTS: "/v1/inventory/get-variance-reports",
        UPDATE_STOCK: "/v1/inventory/update-stock",
        GET_PRODUCT_ID: "/v1/inventory/get-all-products",
        GROUP_ITEMS: "/v1/inventory/group-items",
        GROUP_ITEMS_LIST: "/v1/inventory/fetch-grouped-items"
    }

}

export const ROLE_CODE = {
    'ADMIN': 1,
    'API CONSUMER': 2,
    'WAREHOUSE CLERK': 3,
    'WAREHOUSE MANAGER': 4,
    'CUSTOMS CLERK': 5,
    'CUSTOMS MANAGER': 6
}

export const ROLE_NATURE = {
    SYSTEM: 0,
    BUSINESS: 1
}

export const USER_POSITIONS = {
    OPERATOR: {
        'Warehouse Clerk': 0,
        'Warehouse Manager': 1
    },
    OFFICER: {
        'Customs Clerk': 2,
        'Customs Manager': 3
    }
}

export const APPROVE_USER = {
    'Pending': 0,
    'Approved': 1,
    'Rejected': 2,
    'Suspended': 3
}

export const MODAL_SIZE = {
    SMALL: 'sm',
    MEDIUM: 'md',
    LARGE: 'lg',
    EXTRA_LARGE: 'xl'
}

export const REGEX = {
    PASSWORD: /^(?=.*[A-Za-z])(?=(.*[\d]){1,})(?=.*?[^\w\s]).{8,}$/, //Contains 8 characters atleast 1 number, 1 alphabet, 1 special char
    EMAIL: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/,
    // PHONE_NUMBER: /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/
    ONLY_ALPHABETS: /^([a-zA-Z]+)$/,
    // ^[+]?(?:[0-9]{2})?[0-9]{10}$  // +919808999342
    PHONE_NUMBER: /^[1-9]{1}[0-9]{9}$/
}