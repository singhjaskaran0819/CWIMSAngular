export const APIS = {
    AUTH: {
        LOGIN: "/v1/user/login",
        SIGN_UP: "/v1/user/sign-up",
        FORGOT_PASSWORD: "​/v1​/user​/forgot-password",
        RESET_PASSWORD: "/v1/user/reset-password",
        VERIFY_OTP: "/v1/user/verify-otp",
        RESEND_OTP: "/v1/user/resend-otp",
        LOGOUT: "/v1/user/logout",
        WAREHOUSE_LIST: "/v1/warehouse/code-list",
        VALIDATE_CAPTCHA: "/v1/user/validate-captcha",
        GET_ROLES: "/v1/user/get-roles-for-signup",
        GET_OTP: "/v1/user/get-otp"
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
        UPDATE_USER_ROLE: "​/v1​/user​/updateUser",
        FETCH_USER_DETAILS: '/v1/user/fetch-user'
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
        FETCH_SUBLOCATIONS: '/v1/warehouse/fetch-sub-locations/:code',
        FETCH_INVENTORY_BY_ID: "​/v1/inventory/fetch-by-id",
        GET_INVENTORY_FILTER_DATA: "/v1/inventory/get-filters",
        GENERATE_VARINCE_REPORT: "/v1/inventory/generate-variance-report",
        GET_VARINCE_REPORTS: "/v1/inventory/get-variance-reports",
        APPROVE_REJECT_VARIANCE_REPORT: "/v1/inventory/approve-reject-variance-report",
        UPDATE_STOCK: "/v1/inventory/update-stock",
        GET_PRODUCT_ID: "/v1/inventory/get-all-products",
        GROUP_ITEMS: "/v1/inventory/group-items",
        GROUP_ITEMS_LIST: "/v1/inventory/fetch-grouped-items",
        UNGROUP_ITEMS: "/v1/inventory/ungroup-items",
        ADD_STOCK_TAKE_ITEMS: "/v1/inventory/add-stocktake-item",
        EDIT_STOCK_TAKE_ITEM: "/v1/inventory/edit-stocktake-item",
        GET_STOCK_TAKE_LIST: "/v1/inventory/list-stocktakes",
        CREATE_NEW_STOCK_TAKE: "/v1/inventory/create-stocktake",
        EDIT_STOCK_TAKE: "/v1/inventory/edit-stocktake",
        FETCH_STOCK_TAKE: "/v1/inventory/fetch-stocktake",
        GET_STOCK_TAKE_ITEMS: "/v1/inventory/list-stocktake-items",
        DELETE_STOCK_TAKE_ITEM: "/v1/inventory/delete-stocktake-item",
        CHECK_IF_PRODUCT_EXIST: "/v1/inventory/check-productId"
    },
    DECLARATION: {
        GET_GOODS_RECEIVED: "/v1/declaration/goods-received",
        FETCH_DECLARATION_BY_ID: "/v1/declaration/fetch-declaration-by-id",
        FETCH_SAD_ITEMS: "/v1/declaration/fetch-sad-items",
        RACK_ITEMS: "/v1/declaration/rack-items",
        FETCH_RACKED_ITEMS: "/v1/declaration/fetch-rack-items",
        FILTERS_FOR_SAD_ITEM_LIST: "/v1/declaration/get-filters",
        UPLOAD_FILE: "/v1/declaration/upload",
        APPROVE_REJECT_RACKED_ITEMS: "/v1/declaration/approve-reject-request",
        SUBMIT_RACKED_ITEMS: '/v1/declaration/submit-request',
        GET_MESSAGES: "​/v1​/declaration​/get-messages",
        REPLY_TO_MESSAGE: "​/v1​/declaration​/reply-to-message",
        RESET_RACKED_ITEMS: "/v1/declaration/reset-racked-items",
        MODIFY_RACKED_ITEMS: "/v1/declaration/modify-racked-items",
        DELETE_DECLARATION: "/v1/declaration"
    },
    SALES: {
        SALES: "/v1/sales",
        GET_DROPDOWN_DATA: "/v1/sales/getDropDownData",
        SALES_FILTER: "/v1/sales/get-filters"
    },
    LOGS: {
        GET_LOGS: "/v1/logs/get-logs",
        FILTERS: "/v1/logs/get-filters",
        FETCH_ERROR_LOGS: '/v1/logs/get-error-logs'
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
    'Rejected': 2
}

export const ROLE_TYPE = {
    ADMIN: 0,
    CUSTOMS: 1,
    OPERATOR: 2,
    API_CONSUMER: 3
}

export const DECLARATION_STATUS = {
    SUBMITTED: 0,
    APPROVED: 1,
    REJECTED: 2,
    PENDING: 3,
    "RE-SUBMITTED": 4
}

export const VARIANCE_REPORT_STATUSES = {
    SUBMITTED: 0,
    APPROVED: 1,
    REJECTED: 2,
    UPDATED: 3,
    CANCELLED: 4
}

export const INVENTORY_ITEM_STATUSES = {
    'NOT FOUND': 0,
    EXISTS: 1
};

export const MODAL_SIZE = {
    SMALL: 'sm',
    MEDIUM: 'md',
    LARGE: 'lg',
    EXTRA_LARGE: 'xl'
}

export const LOGS_OPERATION = {
    DELETE_USER: 1,
    ITEMS_RACKED: 2,
    REJECT_DECLARATION: 3,
    APPROVE_DECLARATION: 4,
    SUBMIT_DECLARATION: 5,
    RESUBMIT_DECLARATION: 6,
    LOG_IN: 7,
    LOG_OUT: 8,
    LOGGED_OUT_DUE_TO_IDLE_STATE: 9,
    REJECT_USER: 10,
    APPROVE_USER: 11,
    SUSPEND_USER: 12,
    RESET_RACKED_ITEMS: 13,
    ADD_DECLARATION: 14,
    UPLOAD_RACKED_GOODS: 15,
    UNSUSPEND_USER: 16,
    REASSIGN_ROLE: 17,
    ADD_USER: 18,
    LOGIN_ATTEMPT_FAILED: 19,
    CHANGE_PASSWORD: 20,
    PASSWORD_RESET: 21,
    PROFILE_UPDATED: 22,
    DELETE_DECLARATION: 23,
    GROUP_ITEMS: 24,
    UNGROUP_ITEMS: 25,
    VARIANCE_REPORT_GENERATED: 26,
    UPDATE_STOCK: 27,
    REGISTER_USER: 28,
    FORGOT_PASSWORD: 29,
    VERIFY_OTP: 30,
    RESEND_OTP: 31,
    ADD_ROLE: 32,
    DELETE_ROLE: 33,
    UPDATE_ROLE: 34,
}

export const logsTab = {
    userLogs: 1,
    productsTab: 2
}

export const saleType = {
    WAREHOUSE_TRANSFER: 1,
    DIPLOMAT: 2,
    DUTY_PAID: 3,
    DUTY_FREE: 3,
    DUTY_FREE_FOREX: 4,
    RESIDENT_DUTY_FREE: 5,
    CHANGE_LOCATION: 6
}

export const REGEX = {
    PASSWORD: /^(?=.*[A-Za-z])(?=(.*[\d]){1,})(?=.*?[^\w\s]).{8,}$/, //Contains 8 characters atleast 1 number, 1 alphabet, 1 special char
    EMAIL: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/,
    // PHONE_NUMBER: /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/
    ONLY_ALPHABETS: /^([a-zA-Z]+)$/,
    // ^[+]?(?:[0-9]{2})?[0-9]{10}$  // +919808999342
    PHONE_NUMBER: /^[1-9]{1}[0-9]{9}$/,
    NUMER_GREATER_THAN_0: /^([1-9][0-9]*(\.[0-9]+)?)|(0+[0-9]*[1-9][0-9]*$)/,
    NUMBER_GREATER_THAN_0_OR_EQUALTO_ZERO: /^[0-9]*$/,
    ALPHA_NUMERIC: /^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]+$/
}