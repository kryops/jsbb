import {Injectable} from "@angular/core";
import * as Benchmark from "benchmark";
import {BenchmarkEntry} from "./benchmark-entry";

@Injectable()
export class BenchmarkService {

    private suite: Benchmark.Suite;

    run(setupCode: string, benchmarks: BenchmarkEntry[], doneCallback?: Function) {

        this.cancel();

        this.suite = new Benchmark.Suite;

        this.suite.on('complete', () => {
            if(doneCallback) doneCallback();

            this.suite = undefined;
        });

        function handleAbort(benchmark: BenchmarkEntry, result: Benchmark) {
            benchmark.result = result.error ? result : undefined;
            benchmark.running = false;
            benchmark.finished = true;
        }

        function handleCycle(event, benchmark: BenchmarkEntry) {
            var result = <Benchmark> event.target;

            if(result.aborted) {
                handleAbort(benchmark, result);
            }
            else {
                benchmark.running = true;
                benchmark.finished = false;
                benchmark.result = result;
            }
        }

        function handleDone(event, benchmark: BenchmarkEntry) {
            var result = <Benchmark> event.target;

            if(result.aborted) {
                handleAbort(benchmark, result);
            }
            else {
                benchmark.running = false;
                benchmark.finished = true;
                benchmark.result = result;
            }
        }

        benchmarks.forEach(b => {

            // reset previous results
            b.result = undefined;
            b.finished = false;
            b.fastest = false;

            this.suite.add({
                setup: setupCode,
                name: b.name,
                fn: b.code,
                onCycle: e => handleCycle(e,b),
                onComplete: e => handleDone(e,b)
            });
        });

        this.suite.run({ 'async': true });
    }

    cancel() {
        if (!this.suite) return;

        this.suite.abort();
        this.suite = undefined;
    }

}