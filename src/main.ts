import { platformNativeScriptDynamic } from "@nativescript/angular";

import { AppModule } from "./app/app.module";
import { setStatusBarColors } from "./app/utils/status-bar-util";

setStatusBarColors();

platformNativeScriptDynamic().bootstrapModule(AppModule);
