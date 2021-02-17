import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import {
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptHttpClientModule,
    NativeScriptRouterModule,
} from "@nativescript/angular";

import { AppComponent } from "./app.component";
import { routes, navigatableComponents } from './app.routing';

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        NativeScriptHttpClientModule,
        NativeScriptRouterModule,
        NativeScriptRouterModule.forRoot(routes),
    ],
    declarations: [
        AppComponent,
        ...navigatableComponents,
    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
