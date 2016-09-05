import {Component, Input, Output, EventEmitter} from "@angular/core";
import {BenchmarkEntry} from "./benchmark-entry";

@Component({
    selector: 'benchmark-container',
    template: `
<div
    class="panel"
    [class.panel-default]="!b.running && !b.result"
    [class.panel-info]="b.running"
    [class.panel-success]="b.finished && !b.result?.error"
    [class.panel-danger]="b.result?.error">
    
    <div class="panel-heading" *ngIf="b.result">
        <h3 class="panel-title"
            [style.fontWeight]="b.fastest ? 'bold' : 'normal'">
            <template [ngIf]="b.result.error">
                {{b.result.error}}
            </template>
            <template [ngIf]="!b.result.error">
                {{b.result.hz | formatNumber}} 
                <template [ngIf]="b.result.stats && b.result.stats.rme">&plusmn; {{b.result.stats.rme | formatNumber:'1.2-2'}} %</template>
            </template>
            <template [ngIf]="b.fastest">
                (FASTEST)
            </template>
        </h3>
    </div>
    <div class="panel-body">
        <div class="row">
            <div class="col-sm-4 col-md-3 col-lg-2">
                <p>
                    <input type="text" class="form-control" placeholder="Name" [(ngModel)]="b.name" />
                </p>
                <p>
                    <button type="button" class="btn btn-sm btn-danger" (click)="removeBenchmark()">
                        <span class="glyphicon glyphicon-remove"></span> Remove
                    </button>
                </p>
            </div>
            <div class="col-sm-8 col-md-9 col-lg-10">
                <editor [(value)]="b.code" (valueChange)="resetStatus()"></editor>
            </div>
        </div> 
    </div>
</div>`
})
export class BenchmarkContainerComponent {

    @Input('data') b: BenchmarkEntry;
    @Output() remove: EventEmitter<any> = new EventEmitter();
    @Output() reset: EventEmitter<any> = new EventEmitter();

    removeBenchmark() {
        this.remove.emit();
    }

    resetStatus() {
        this.reset.emit();
    }

}