import { Component } from '@angular/core';
import {BenchmarkComponent} from "./benchmark/benchmark.component";
@Component({
    selector: 'jsbb-app',
    template: `

<div class="container">
    <div class="page-header">
      <h1>jsbb <small>JavaScript Browser Benchmark</small></h1>
    </div>
    
    <benchmark></benchmark>
</div>

`
})
export class AppComponent { }