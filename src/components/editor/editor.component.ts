import {Component, OnInit, OnDestroy, ElementRef, ViewChild, EventEmitter, Output, Input} from '@angular/core';
import Editor = AceAjax.Editor;

(<any>ace).config.set("basePath", "/dist");

@Component({
    selector: 'editor',
    template: ``
})
export class EditorComponent implements OnInit, OnDestroy {

    private editor: Editor;
    private _value: string;

    @Input() set value(val: string) {
        if(val === this._value) return;

        this._value = val;

        if(this.editor) {
            this.editor.setValue(val, 1);
        }
    }

    @Output() valueChange: EventEmitter<String> = new EventEmitter();

    constructor(private elm: ElementRef) {}


    getValue(): string {
        return this.editor.getValue();
    }


    ngOnInit(): void {
        this.editor = ace.edit(this.elm.nativeElement);
        this.editor.getSession().setMode('ace/mode/javascript');

        this.editor.setOptions({
            minLines: 5,
            maxLines: 15,
            fontSize: 14,
            showPrintMargin: false
        });

        this.editor.$blockScrolling = Infinity;

        if(this._value) {
            this.editor.setValue(this._value, 1);
        }

        this.editor.on('change', () => {
            this._value = this.editor.getValue();
            this.valueChange.emit(this._value)
        });
    }

    ngOnDestroy(): void {
        this.editor.destroy();
    }
}
