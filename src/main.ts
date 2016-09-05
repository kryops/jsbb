import {enableProdMode} from "@angular/core";
import {platformBrowser} from '@angular/platform-browser';
import {AppModuleNgFactory} from "./app.module.ngfactory";

enableProdMode();

//platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.log(err));

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);