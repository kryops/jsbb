import {Component, OnInit} from '@angular/core';
import {BenchmarkEntry} from "./benchmark-entry";
import {BenchmarkService} from "./benchmark.service";
import {ExportService} from "../export/export.service";

@Component({
    selector: 'benchmark',
    template: `

<input type="text" class="form-control" placeholder="Benchmark Title"
    [(ngModel)]="title" (ngModelChange)="refreshShareLink()" />

<h4>Setup code</h4>

<div class="panel panel-default">
    <div class="panel-body">
        <editor [(value)]="setupCode" (valueChange)="refreshShareLink()"></editor>
    </div>
</div>

<h4>Benchmark tests</h4>

<benchmark-container
    *ngFor="let b of benchmarks"
    [data]="b"
    (remove)="removeBenchmark(b)"
    (reset)="resetStatus(b)"></benchmark-container> 

<button type="button" class="btn btn-primary"
    *ngIf="!running" (click)="run()">
    <span class="glyphicon glyphicon-play"></span> Run
</button>

<button type="button" class="btn btn-warning"
    *ngIf="running" (click)="cancel()">
    <span class="glyphicon glyphicon-stop"></span> Stop
</button>

<button type="button" class="btn btn-default"
    *ngIf="!running" (click)="addBenchmark()">
    <span class="glyphicon glyphicon-plus"></span> Add benchmark
</button>

<button type="button" class="btn btn-default"
    *ngIf="!running" (click)="share()">
    <span class="glyphicon glyphicon-share"></span> Share link
</button>

<br /><br />

<div class="panel panel-info" *ngIf="shareVisible">
    <div class="panel-heading">
        <h3 class="panel-title">Share link</h3>
    </div>
    <div class="panel-body">
        <textarea class="form-control" rows="5"
            #textarea (click)="textarea.select()">{{shareLink}}</textarea>
    </div>
</div>
`
})
export class BenchmarkComponent implements OnInit {

    title: string;
    setupCode: string = '';
    benchmarks: BenchmarkEntry[] = [];
    running: boolean;

    shareVisible: boolean;
    shareLink: string;

    constructor(private service: BenchmarkService, private exportService: ExportService) {
    }

    ngOnInit(): void {
        var imported = this.exportService.importFromUrl();

        if(imported) {
            this.title = imported.t;
            this.setupCode = imported.s;
            this.benchmarks = imported.b.map(b => {
                return {
                    name: b.n,
                    code: b.c,
                    running: false,
                    finished: false,
                    result: undefined
                };
            });
        }
        else {
            // init 2 benchmarks
            this.addBenchmark();
            this.addBenchmark();
        }

    }

    addBenchmark() {
        this.benchmarks.push({
            name: '',
            code: '',
            running: false,
            finished: false,
            result: undefined
        });

        this.refreshShareLink();
    }

    removeBenchmark(b: BenchmarkEntry) {
        if(this.benchmarks.length === 1) return;

        var index = this.benchmarks.indexOf(b);

        if(index !== -1) {
            this.benchmarks.splice(index,1);
        }

        this.refreshShareLink();
    }

    run() {
        this.running = true;

        this.service.run(this.setupCode, this.benchmarks, () => {
            this.running = false;
            this.computeFastest();
        });
    }

    cancel() {
        this.service.cancel();
    }

    share() {
        this.shareVisible = !this.shareVisible;
        this.refreshShareLink();
    }

    refreshShareLink() {
        if(this.shareVisible) {
            this.shareLink = this.exportService.getExportLink(this.title, this.setupCode, this.benchmarks);
        }
    }

    resetStatus(benchmark: BenchmarkEntry) {

        var resetBenchmark = () => {
            benchmark.running = false;
            benchmark.finished = false;
            benchmark.result = undefined;

            this.refreshShareLink();
        };

        if(this.running) {
            this.cancel();

            // wrap the reset in a timeout as the benchmark will receive a 'cycle'
            // event after canceling
            window.setTimeout(resetBenchmark, 50);
        }
        else {
            resetBenchmark();
        }
    }


    private computeFastest() {
        var fastest = this.benchmarks.reduce((prev, cur) => {
            return (!prev.result || (cur.result && cur.result.hz > prev.result.hz))
                ? cur
                : prev;
        });

        if(fastest.result && !fastest.result.error) {
            fastest.fastest = true;
        }
    }

}