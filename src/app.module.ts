import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent}  from './components/app.component';
import {BenchmarkComponent} from "./components/benchmark/benchmark.component";
import {EditorComponent} from "./components/editor/editor.component";
import {FormsModule} from "@angular/forms";
import {BenchmarkService} from "./components/benchmark/benchmark.service";
import {ExportService} from "./components/export/export.service";
import {BenchmarkContainerComponent} from "./components/benchmark/benchmark-container.component";
import {FormatNumberPipe} from "./components/benchmark/format-number.pipe";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule
    ],
    declarations: [
        AppComponent,
        BenchmarkComponent,
        BenchmarkContainerComponent,
        EditorComponent,
        FormatNumberPipe
    ],
    providers: [
        BenchmarkService,
        ExportService
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {}