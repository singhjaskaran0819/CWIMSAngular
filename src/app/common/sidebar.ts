export const SIDEBAR_ITEMS =
    //  {
    // "API CONSUMER":
    [
        {
            icon: 'assets/img/icons/dashboard_icon.svg',
            name: 'Dashboard',
            htmlName: 'dashboard',
            accessAllowed: false,
            link: '/main/dashboard'
        },
        {
            icon: 'assets/img/icons/declarations_icon.svg',
            name: 'Declarations',
            htmlName: 'declaration',
            accessAllowed: false,
            link: '/main/declarations'
        },
        {
            icon: 'assets/img/icons/inventory_icon.svg',
            name: 'Inventory',
            htmlName: 'inventory',
            id: 'inventory',
            accessAllowed: false,
            // link: '/main/inventory'
            children: [
                {
                    icon: 'assets/img/icons/list_icon.svg',
                    name: 'List',
                    htmlName: "list",
                    accessAllowed: false,
                    link: '/main/inventory/list',
                },
                {
                    icon: 'assets/img/icons/group_items_icon.svg',
                    name: 'Grouped Items',
                    htmlName: "grouped-items",
                    accessAllowed: false,
                    link: '/main/inventory/grouped-items'
                },
                {
                    icon: 'assets/img/icons/inventory_icon.svg',
                    name: 'Variance Report',
                    htmlName: "variance-report",
                    accessAllowed: false,
                    link: '/main/inventory/variance-report'
                }
            ]
        },
        {
            icon: 'assets/img/icons/warehouse_icon.svg',
            name: 'Warehouse',
            htmlName: 'warehouse',
            accessAllowed: false,
            link: '/main/warehouse'
        },
        {
            icon: 'assets/img/icons/sales_icon.svg',
            name: 'Sales',
            htmlName: 'sales',
            accessAllowed: false,
            id: 'sales',
            // link: '/main/sales/salesmain',
            children: [
                {
                    icon: 'assets/img/icons/create_sale_icon.svg',
                    name: 'Create New Sales',
                    htmlName: 'create',
                    accessAllowed: false,
                    link: '/main/sale/salesmain'
                },
                {
                    icon: 'assets/img/icons/list_sale_icon.svg',
                    name: 'List of Sales',
                    htmlName: 'list-sales',
                    accessAllowed: false,
                    link: '/main/sale/detailed-list'
                }
            ]
        },
        {
            icon: 'assets/img/icons/reports_icon.svg',
            name: 'Standard Reports',
            htmlName: 'standard-report',
            accessAllowed: false,
            link: '/main/reports'
        },
        {
            icon: 'assets/img/icons/riskManagement_icon.svg',
            name: 'Risk Management',
            id: 'risk_management',
            accessAllowed: false,
            htmlName: 'risk-management',
            // link: '/main/risk-management',
            children: [
                {
                    icon: 'assets/img/icons/riskManagement_icon.svg',
                    name: 'Risk Criteria',
                    accessAllowed: false,
                    id: 'risk_criteria',
                    // link: '/main/risk-management',
                    subchildren: [
                        {
                            icon: 'assets/img/icons/riskCriteria_icon.svg',
                            name: 'Risk Criteria',
                            // accessAllowed: false,
                            link: '/main/risk-management/risk-criteria/criteria'
                        },
                        {
                            icon: 'assets/img/icons/listCriteria_icon.svg',
                            name: 'List of Criteria',
                            // accessAllowed: false,
                            link: '/main/risk-management/risk-criteria/list-of-criteria'
                        }
                    ]
                },
                {
                    icon: 'assets/img/icons/targetList_icon.svg',
                    name: 'Target List',
                    id: 'target_list',
                    accessAllowed: false,
                    // link: '/main/risk-management',
                    subchildren: [
                        {
                            icon: 'assets/img/icons/targetList_icon.svg',
                            name: 'Target List',
                            // accessAllowed: false,
                            link: '/main/risk-management/target/target-list'
                        },
                        {
                            icon: 'assets/img/icons/listCriteria_icon.svg',
                            name: 'List of Target ',
                            // accessAllowed: false,
                            link: '/main/risk-management/target/list-of-target'
                        }
                    ]
                },
                {
                    icon: 'assets/img/icons/riskReport_icon.svg',
                    name: 'Risk Report',
                    id: 'risk_report',
                    accessAllowed: true,
                    // link: '/main/risk-management',
                    subchildren: [
                        {
                            icon: 'assets/img/icons/riskReport_icon.svg',
                            name: 'Risk Report',
                            // accessAllowed: false,
                            link: '/main/risk-management/report/risk-report'
                        },
                        {
                            icon: 'assets/img/icons/listCriteria_icon.svg',
                            name: 'List of Findings ',
                            // accessAllowed: false,
                            link: '/main/risk-management/report/list-of-findings'
                        }
                    ]
                }
            ]
        },
        {
            icon: 'assets/img/icons/user_management_icon.svg',
            name: 'User Management',
            id: 'user',
            accessAllowed: false,
            htmlName: 'user-management',
            // link: '/main/sales/salesmain',
            children: [
                {
                    icon: 'assets/img/icons/listUser_icon.svg',
                    name: 'List of User',
                    htmlName: 'list-of-user',
                    accessAllowed: false,
                    link: '/main/user/list'
                },
                {
                    icon: 'assets/img/icons/listUser_icon.svg',
                    name: 'Manage Roles',
                    htmlName: 'manage-role',
                    accessAllowed: false,
                    link: '/main/user/roles'
                }
            ]
        },
        {
            icon: 'assets/img/icons/appointments_icon.svg',
            name: 'Appointments',
            link: '/main/appointments',
            accessAllowed: false,
            htmlName: "appointment"
        }

    ]
    // ,
    // OPERATOR: [
    //     {
    //         icon: 'assets/img/icons/dashboard_icon.svg',
    //         name: 'Dashboard',
    //         link: '/main/dashboard'
    //     },
    //     {
    //         icon: 'assets/img/icons/declarations_icon.svg',
    //         name: 'Declarations',
    //         link: '/main/declarations'
    //     },
    //     {
    //         icon: 'assets/img/icons/inventory_icon.svg',
    //         name: 'Inventory',
    //         id: 'inventory',
    //         // link: '/main/inventory/list',
    //         children: [
    //             {
    //                 icon: 'assets/img/icons/list_icon.svg',
    //                 name: 'List',
    //                 link: '/main/inventory/list',
    //             },
    //             {
    //                 icon: 'assets/img/icons/group_items_icon.svg',
    //                 name: 'Grouped Items',
    //                 link: '/main/inventory/grouped-items'
    //             }
    //         ]
    //     },
    //     {
    //         icon: 'assets/img/icons/warehouse_icon.svg',
    //         name: 'Warehouse',
    //         link: '/main/warehouse'
    //     },
    //     {
    //         icon: 'assets/img/icons/sales_icon.svg',
    //         name: 'Sales',
    //         id: 'sales',
    //         // link: '/main/sales/salesmain',
    //         children: [
    //             {
    //                 icon: 'assets/img/icons/create_sale_icon.svg',
    //                 name: 'Create New Sales',
    //                 link: '/main/sale/create'
    //             },
    //             {
    //                 icon: 'assets/img/icons/list_sale_icon.svg',
    //                 name: 'List of Sales',
    //                 link: '/main/sale/detailed-list'
    //             }
    //         ]
    //     },
    //     {
    //         icon: 'assets/img/icons/analytics_icon.svg',
    //         name: 'Analytics',
    //         link: '/main/analytics'
    //     },
    //     {
    //         icon: 'assets/img/icons/appointments_icon.svg',
    //         name: 'Appointments',
    //         link: '/main/appointments'
    //     },
    //     {
    //         icon: 'assets/img/icons/reports_icon.svg',
    //         name: 'Standard Reports',
    //         link: '/main/reports'
    //     }
    // ],
    // OFFICER: [
    //     {
    //         icon: 'assets/img/icons/dashboard_icon.svg',
    //         name: 'Dashboard',
    //         link: '/main/dashboard'
    //     },
    //     {
    //         icon: 'assets/img/icons/declarations_icon.svg',
    //         name: 'Declarations',
    //         link: '/main/declarations'
    //     },
    //     {
    //         icon: 'assets/img/icons/inventory_icon.svg',
    //         name: 'Inventory',
    //         id: 'inventory',
    //         // link: '/main/inventory/list',
    //         children: [
    //             {
    //                 icon: 'assets/img/icons/inventory_icon.svg',
    //                 name: 'List',
    //                 link: '/main/inventory/list',
    //             },
    //             {
    //                 icon: 'assets/img/icons/inventory_icon.svg',
    //                 name: 'Variance Report',
    //                 link: '/main/inventory/variance-report'
    //             }
    //         ]
    //     },
    //     {
    //         icon: 'assets/img/icons/warehouse_icon.svg',
    //         name: 'Warehouse',
    //         link: '/main/warehouse'
    //     },
    //     {
    //         icon: 'assets/img/icons/sales_icon.svg',
    //         name: 'Sales',
    //         id: 'sales',
    //         // link: '/main/sales',
    //         children: [
    //             {
    //                 icon: 'assets/img/icons/list_sale_icon.svg',
    //                 name: 'Sales',
    //                 link: '/main/sale/sales'
    //             },
    //             {
    //                 icon: 'assets/img/icons/list_sale_icon.svg',
    //                 name: 'List of Sales',
    //                 link: '/main/sale/detailed-list'
    //             }
    //         ]
    //     },
    //     {
    //         icon: 'assets/img/icons/reports_icon.svg',
    //         name: 'Standard Reports',
    //         link: '/main/reports'
    //     },
    //     {
    //         icon: 'assets/img/icons/riskManagement_icon.svg',
    //         name: 'Risk Management',
    //         id: 'risk_management',
    //         // link: '/main/risk-management',
    //         children: [
    //             {
    //                 icon: 'assets/img/icons/riskManagement_icon.svg',
    //                 name: 'Risk Criteria',
    //                 id: 'risk_criteria',
    //                 // link: '/main/risk-management',
    //                 subchildren: [
    //                     {
    //                         icon: 'assets/img/icons/riskCriteria_icon.svg',
    //                         name: 'Risk Criteria',
    //                         link: '/main/risk-management/risk-criteria/criteria'
    //                     },
    //                     {
    //                         icon: 'assets/img/icons/listCriteria_icon.svg',
    //                         name: 'List of Criteria',
    //                         link: '/main/risk-management/risk-criteria/list-of-criteria'
    //                     }
    //                 ]
    //             },
    //             {
    //                 icon: 'assets/img/icons/targetList_icon.svg',
    //                 name: 'Target List',
    //                 id: 'target_list',
    //                 // link: '/main/risk-management',
    //                 subchildren: [
    //                     {
    //                         icon: 'assets/img/icons/targetList_icon.svg',
    //                         name: 'Target List',
    //                         link: '/main/risk-management/target/target-list'
    //                     },
    //                     {
    //                         icon: 'assets/img/icons/targetList_icon.svg',
    //                         name: 'List of Target ',
    //                         link: '/main/risk-management/target/list-of-target'
    //                     }
    //                 ]
    //             },
    //             {
    //                 icon: 'assets/img/icons/riskReport_icon.svg',
    //                 name: 'Risk Report',
    //                 id: 'risk_report',
    //                 // link: '/main/risk-management',
    //                 subchildren: [
    //                     {
    //                         icon: 'assets/img/icons/riskReport_icon.svg',
    //                         name: 'Risk Report',
    //                         link: '/main/risk-management/report/risk-report'
    //                     },
    //                     {
    //                         icon: 'assets/img/icons/listCriteria_icon.svg',
    //                         name: 'List of Findings ',
    //                         link: '/main/risk-management/report/list-of-findings'
    //                     }
    //                 ]
    //             }
    //         ]
    //     },
    //     {
    //         icon: 'assets/img/icons/user_management_icon.svg',
    //         name: 'User Management',
    //         id: 'user',
    //         // link: '/main/sales/salesmain',
    //         children: [
    //             {
    //                 icon: 'assets/img/icons/listUser_icon.svg',
    //                 name: 'List of User',
    //                 link: '/main/user/list'
    //             }
    //         ]
    //     },
    //     {
    //         icon: 'assets/img/icons/appointments_icon.svg',
    //         name: 'Appointments',
    //         link: '/main/appointments'
    //     }
    // ]

// }

