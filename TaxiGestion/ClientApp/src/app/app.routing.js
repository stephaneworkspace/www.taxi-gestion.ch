"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var pages_component_1 = require("./pages/pages.component");
var blank_component_1 = require("./pages/blank/blank.component");
var search_component_1 = require("./pages/search/search.component");
var not_found_component_1 = require("./pages/errors/not-found/not-found.component");
var error_component_1 = require("./pages/errors/error/error.component");
exports.routes = [
    {
        path: 'index',
        component: pages_component_1.PagesComponent, children: [
            { path: '', loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/dashboard/dashboard.module'); }).then(function (m) { return m.DashboardModule; }); }, data: { breadcrumb: 'Dashboard' } },
            { path: 'comptabilite', loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/comptabilite/comptabilite.module'); }).then(function (m) { return m.ComptabiliteModule; }); }, data: { breadcrumb: 'Comptabilité' } },
            { path: 'users', loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/users/users.module'); }).then(function (m) { return m.UsersModule; }); }, data: { breadcrumb: 'Users' } },
            { path: 'ui', loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/ui/ui.module'); }).then(function (m) { return m.UiModule; }); }, data: { breadcrumb: 'UI' } },
            { path: 'form-controls', loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/form-controls/form-controls.module'); }).then(function (m) { return m.FormControlsModule; }); }, data: { breadcrumb: 'Form Controls' } },
            { path: 'tables', loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/tables/tables.module'); }).then(function (m) { return m.TablesModule; }); }, data: { breadcrumb: 'Tables' } },
            { path: 'icons', loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/icons/icons.module'); }).then(function (m) { return m.IconsModule; }); }, data: { breadcrumb: 'Material Icons' } },
            { path: 'drag-drop', loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/drag-drop/drag-drop.module'); }).then(function (m) { return m.DragDropModule; }); }, data: { breadcrumb: 'Drag & Drop' } },
            { path: 'schedule', loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/schedule/schedule.module'); }).then(function (m) { return m.ScheduleModule; }); }, data: { breadcrumb: 'Schedule' } },
            { path: 'mailbox', loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/mailbox/mailbox.module'); }).then(function (m) { return m.MailboxModule; }); }, data: { breadcrumb: 'Mailbox' } },
            { path: 'chat', loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/chat/chat.module'); }).then(function (m) { return m.ChatModule; }); }, data: { breadcrumb: 'Chat' } },
            { path: 'maps', loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/maps/maps.module'); }).then(function (m) { return m.MapsModule; }); }, data: { breadcrumb: 'Maps' } },
            { path: 'charts', loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/charts/charts.module'); }).then(function (m) { return m.ChartsModule; }); }, data: { breadcrumb: 'Charts' } },
            { path: 'dynamic-menu', loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/dynamic-menu/dynamic-menu.module'); }).then(function (m) { return m.DynamicMenuModule; }); }, data: { breadcrumb: 'Dynamic Menu' } },
            { path: 'profile', loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/profile/profile.module'); }).then(function (m) { return m.ProfileModule; }); }, data: { breadcrumb: 'Profile' } },
            { path: 'blank', component: blank_component_1.BlankComponent, data: { breadcrumb: 'Blank page' } },
            { path: 'search', component: search_component_1.SearchComponent, data: { breadcrumb: 'Search' } }
        ]
    },
    { path: '', loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/landing/landing.module'); }).then(function (m) { return m.LandingModule; }); } },
    { path: 'login', loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/login/login.module'); }).then(function (m) { return m.LoginModule; }); } },
    { path: 'creer-un-compte', loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/register/register.module'); }).then(function (m) { return m.RegisterModule; }); } },
    { path: 'e-mail', loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/email/email.module'); }).then(function (m) { return m.EmailModule; }); } },
    { path: 'error', component: error_component_1.ErrorComponent, data: { breadcrumb: 'Error' } },
    { path: '**', component: not_found_component_1.NotFoundComponent }
];
exports.routing = router_1.RouterModule.forRoot(exports.routes, {
// preloadingStrategy: PreloadAllModules,  // <- uncomment this line for disable lazy load
// useHash: true
});
//# sourceMappingURL=app.routing.js.map