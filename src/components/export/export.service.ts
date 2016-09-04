import {Injectable} from "@angular/core";
import {BenchmarkEntry} from "../benchmark/benchmark-entry";
import {BenchmarkExport} from "./benchmark-export";

@Injectable()
export class ExportService {

    getExportLink(title: string, setupCode: string, benchmarks: BenchmarkEntry[]): string {

        var exportObj = this.getExport(title, setupCode, benchmarks);
        var hash = this.encode(JSON.stringify(exportObj));

        return window.location.protocol + '//' + window.location.host + window.location.pathname
                + '#' + hash;
    }

    importFromUrl(): BenchmarkExport {
        var hash = window.location.hash;

        if(!hash) return undefined;

        try {
            return <BenchmarkExport> JSON.parse(this.decode(hash.slice(1)));
        }
        catch(e) {
            return undefined;
        }
    }


    private getExport(title: string, setupCode: string, benchmarks: BenchmarkEntry[]): BenchmarkExport {
        return {
            t: title,
            s: setupCode,
            b: benchmarks.map(b => { return { n: b.name, c: b.code } })
        }
    }

    /*
     * Base64 atob/btoa implementation unicode problem workaround:
     * https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_.22Unicode_Problem.22
     */

    private encode(str: string): string {
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
            return String.fromCharCode(<number><any> '0x' + p1);
        }));
    }

    private decode(str: string): string {
        return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    }

}
