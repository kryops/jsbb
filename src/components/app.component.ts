import { Component } from '@angular/core';

@Component({
    selector: 'jsbb-app',
    template: `

<div class="container">
    <div class="page-header">
      <h1>jsbb <small>JavaScript Browser Benchmark</small></h1>
    </div>
    
    <benchmark></benchmark>
</div>

<hr>

<p class="text-muted text-center">
    <small>
        &copy; 2016 Michael Strobel
        -
        <a href="https://github.com/kryops/jsbb" target="_blank">GitHub</a>
    </small>
</p>

`
})
export class AppComponent { }