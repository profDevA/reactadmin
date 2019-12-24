import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const DashboardDefault = React.lazy(() => import('./Demo/Dashboard/Default'));
const UIBasicButton = React.lazy(() => import('./Demo/UIElements/Basic/Button'));

const UIBasicBadges = React.lazy(() => import('./Demo/UIElements/Basic/Badges'));

const UIBasicBreadcrumbPagination = React.lazy(() => import('./Demo/UIElements/Basic/BreadcrumbPagination'));

const UIBasicCollapse = React.lazy(() => import('./Demo/UIElements/Basic/Collapse'));
const UIBasicTabsPills = React.lazy(() => import('./Demo/UIElements/Basic/TabsPills'));
const UIBasicBasicTypography = React.lazy(() => import('./Demo/UIElements/Basic/Typography'));

const FormsElements = React.lazy(() => import('./Demo/Forms/FormsElements'));

const BootstrapTable = React.lazy(() => import('./Demo/Tables/BootstrapTable'));

const Nvd3Chart = React.lazy(() => import('./Demo/Charts/Nvd3Chart/index'));

const GoogleMap = React.lazy(() => import('./Demo/Maps/GoogleMap/index'));

const OtherSamplePage = React.lazy(() => import('./Demo/Other/SamplePage'));
const OtherDocs = React.lazy(() => import('./Demo/Other/Docs'));

// Existing Users
const Users = React.lazy(() => import('./Demo/User/Users'));
// Staff List
const StaffList = React.lazy(() => import('./Demo/User/Staff'));
// Add New Staff
const AddStaff = React.lazy(() => import('./Demo/User/AddStaff'));
// Update  Staff
const UpdateStaff = React.lazy(() => import('./Demo/User/UpdateStaff'));
// Update User
const UpdateUser = React.lazy(() => import('./Demo/User/UpdateUser'));

//Products
const Products = React.lazy(() => import('./Demo/Products/Products'));
const Addmake = React.lazy(() => import('./Demo/Products/Addmake'));
const AddProducts = React.lazy(() => import('./Demo/Products/AddProducts'));
const UpdateProducts = React.lazy(() => import('./Demo/Products/UpdateProducts'));

//Listings buy Listings
const BuyListings = React.lazy(() => import('./Demo/Listings/Buy/BuyListings'));
const UpdateBuyListings = React.lazy(() => import('./Demo/Listings/Buy/UpdateBuyListings'));

//Listings Sell Listings
const SellListings = React.lazy(() => import('./Demo/Listings/Sell/SellListings'));
const UpdateSellListings = React.lazy(() => import('./Demo/Listings/Sell/UpdateSellListings'));


const ServiceListings = React.lazy(() => import('./Demo/Listings/Service/ServiceListings'));
const UpdateServiceListings = React.lazy(() => import('./Demo/Listings/Service/UpdateServiceListings'));

const AddListings = React.lazy(() => import('./Demo/Listings/AddListings'));

const Emails = React.lazy(() => import('./Demo/Notifications/Emails'));
const AddEmails = React.lazy(() => import('./Demo/Notifications/AddEmails'));






const routes = [
    { path: '/dashboard/default', exact: true, name: 'Default', component: DashboardDefault },
    
    // { path: '/dashboard/index', exact: true, name: 'Default', component: IndexDefault },
    
    { path: '/basic/button', exact: true, name: 'Basic Button', component: UIBasicButton },
    { path: '/basic/badges', exact: true, name: 'Basic Badges', component: UIBasicBadges },
    { path: '/basic/breadcrumb-paging', exact: true, name: 'Basic Breadcrumb Pagination', component: UIBasicBreadcrumbPagination },
    { path: '/basic/collapse', exact: true, name: 'Basic Collapse', component: UIBasicCollapse },
    { path: '/basic/tabs-pills', exact: true, name: 'Basic Tabs & Pills', component: UIBasicTabsPills },
    { path: '/basic/typography', exact: true, name: 'Basic Typography', component: UIBasicBasicTypography },
    { path: '/forms/form-basic', exact: true, name: 'Forms Elements', component: FormsElements },
    { path: '/tables/bootstrap', exact: true, name: 'Bootstrap Table', component: BootstrapTable },
    { path: '/charts/nvd3', exact: true, name: 'Nvd3 Chart', component: Nvd3Chart },
    { path: '/maps/google-map', exact: true, name: 'Google Map', component: GoogleMap },
    { path: '/sample-page', exact: true, name: 'Sample Page', component: OtherSamplePage },
    { path: '/docs', exact: true, name: 'Documentation', component: OtherDocs },
    //from here new code
    { path: '/user/users', exact: true, name: 'Documentation', component: Users },
    { path: '/user/staff', exact: true, name: 'Documentation', component: StaffList },
    { path: '/user/AddStaff', exact: true, name: 'Documentation', component: AddStaff},
    { path: '/user/UpdateStaff', exact: true, name: 'Documentation', component: UpdateStaff},
    //update user path
    { path: '/user/UpdateUser', exact: true, name: 'Documentation', component: UpdateUser},
    
    //products
    { path: '/products/products', exact: true, name: 'Products', component: Products},
    { path: '/products/addproducts', exact: true, name: 'AddProducts', component: AddProducts},
    { path: '/products/updateproducts', exact: true, name: 'UpdateProducts', component: UpdateProducts},
    { path: '/products/addmake', exact: true, name: 'UpdateProducts', component: Addmake},

    //Listings Buy Listings
    { path: '/listings/Buy/buylistings', exact: true, name: 'BuyListings', component: BuyListings},
    { path: '/listings/Buy/updatebuylistings', exact: true, name: 'UpdateBuyListings', component: UpdateBuyListings},

    //Listings Sell Listings
    { path: '/listings/Sell/selllistings', exact: true, name: 'BuyListings', component: SellListings},
    { path: '/listings/Sell/updateselllistings', exact: true, name: 'UpdateBuyListings', component: UpdateSellListings},

    { path: '/listings/service/servicelistings', exact: true, name: 'BuyListings', component: ServiceListings},
    { path: '/listings/service/updateservicelistings', exact: true, name: 'UpdateBuyListings', component: UpdateServiceListings},

    
    { path: '/listings/addlistings', exact: true, name: 'AddListings', component: AddListings},

        
    { path: '/notifications/emails', exact: true, name: 'AddListings', component: Emails},
    { path: '/notifications/addemails', exact: true, name: 'AddListings', component: AddEmails},


];

export default routes;