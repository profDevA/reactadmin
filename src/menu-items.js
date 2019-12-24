export default {
    items: [
        {
            id: 'navigation',
            title: '',
            type: 'group',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'dashboard',
                    title: 'Dashboard',
                    type: 'item',
                    url: '/dashboard/default',
                    icon: 'feather icon-home',
                },

                {
                    id: 'users',
                    title: 'Users',
                    type: 'collapse',
                    url: '/dashboard/default',
                    icon: 'fa fa-users',
                    children:[   

                        {
                            id: 'existing-users',
                            title: 'Existing Users',
                            type: 'item',
                            url: '/user/users',
                            icon: 'fa fa-users',
                        },

                        {
                            id: 'staff',
                            title: 'Staff',
                            type: 'item',
                            url: '/user/staff',
                            icon: 'fa fa-list',
                        }
                    ]
                },

                {
                    id: 'listings',
                    title: 'Listings',
                    type: 'collapse',
                    url: '/dashboard/default',
                    icon: 'fa fa-list',
                    children:[ 
                        {
                            id: 'add_listings',
                            title: 'Add Listings',
                            type: 'item',
                            url: '/listings/addlistings',
                            icon: 'fa fa-list',
                        }, 

                        {
                            id: 'buy_listings',
                            title: 'Buy',
                            type: 'item',
                            url: '/Listings/Buy/buylistings',
                            icon: 'fa fa-list',
                        },
                    
                        {
                            id: 'sell_listings',
                            title: 'Sell',
                            type: 'item',
                            url: '/Listings/Sell/selllistings',
                            icon: 'fa fa-list',
                        },
                   
                        {
                            id: 'service_listings',
                            title: 'Service',
                            type: 'item',
                            url: '/listings/service/servicelistings',
                            icon: 'fa fa-list',
                        },
                    ]
                },

                {
                    id: 'products',
                    title: 'Products',
                    type: 'collapse',
                    url: '/dashboard/default',
                    icon: 'fa fa-product-hunt',
                    children:[  

                        {
                            id: 'productsType',
                            title: 'Products Type',
                            type: 'item',
                            url: '/products/products',
                            icon: 'fa fa-product-hunt',
                        },
                        {
                            id: 'make',
                            title: 'Add Make',
                            type: 'item',
                            url: '/products/addmake',
                            icon: 'fa fa-building',
                        },

                    ]
                },
                {
                    id: 'notifications',
                    title: 'Notifications',
                    type: 'collapse',
                    url: '/dashboard/default',
                    icon: 'fa fa-envelope',
                    children:[  

                        {
                            id: 'newemail',
                            title: 'New Email',
                            type: 'item',
                            url: '/notifications/emails',
                            icon: 'fa fa-envelope',
                        },

                    ]
                },
               
            ]
        },  
    ]
}