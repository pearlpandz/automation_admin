export const MENU = {
    admin: [
        {
            label: 'Customers',
            routerLink: "/customer",
            visible: true,
            permission: 'customers' // module name
        },
        // {
        //     label: 'Manufacturers',
        //     routerLink: "/manufacturer",
        //     visible: true,
        //     permission: 'Customers' // module name
        // },
        {
            label: 'Agents',
            routerLink: "/agent",
            visible: true,
            permission: 'agents' // module name
        }
    ],
    agent: [
        {
            label: 'Customers',
            routerLink: "/customer",
            visible: true,
            permission: 'customers' // module name
        }
    ]
}