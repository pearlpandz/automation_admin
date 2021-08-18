export const MENU = {
    admin: [
        // {
        //     label: 'Customers',
        //     routerLink: "/customer",
        //     visible: true,
        //     permission: 'customers' // module name
        // },
        // {
        //     label: 'Manufacturers',
        //     routerLink: "/manufacturer",
        //     visible: true,
        //     permission: 'Customers' // module name
        // },
        {
            label: 'Products',
            routerLink: "/product",
            visible: true,
            permission: 'products' // module name
        },
        {
            label: 'Production',
            routerLink: "/production",
            visible: true,
            permission: 'production' // module name
        },
        {
            label: 'Inventory',
            routerLink: "/inventory",
            visible: true,
            permission: 'inventory' // module name
        },
        {
            label: 'Agents',
            routerLink: "/agent",
            visible: true,
            permission: 'agents' // module name
        },
    ],
    agent: [
        {
            label: 'Customers',
            routerLink: "/customer",
            visible: true,
            permission: 'customers' // module name
        },
        {
            label: 'Inventory',
            routerLink: "/inventory",
            visible: true,
            permission: 'inventory' // module name
        },
    ]
}