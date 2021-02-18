import { LoginComponent } from './pages/login/login.component';
import { ListComponent } from './pages/list/list.component';

export const routes = [
    { path: '', redirectTo: 'auth', pathMatch: 'full' },

    { path: 'auth', component: LoginComponent },
    { path: 'list', component: ListComponent },
];

export const navigatableComponents = [
    LoginComponent,
    ListComponent,
];
