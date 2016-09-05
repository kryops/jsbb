import {Pipe, PipeTransform} from "@angular/core";
import {DecimalPipe} from "@angular/common";

@Pipe({name: 'formatNumber'})
export class FormatNumberPipe implements PipeTransform {

    private decimalPipe: DecimalPipe;

    constructor() {
        this.decimalPipe = new DecimalPipe('en');
    }

    transform(value: any, digits: string = null): string {
        if(!value) {
            return '';
        }

        return this.decimalPipe.transform(value, digits || '1.0-0');
    }
}