import {enableProdMode} from "@angular/core";
import {platformBrowser} from '@angular/platform-browser';
import {AppModuleNgFactory} from "../dist/temp/aot_ts/src/app.module.ngfactory";

enableProdMode();

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);