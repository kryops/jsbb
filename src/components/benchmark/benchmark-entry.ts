import * as Benchmark from "benchmark";

export interface BenchmarkEntry {
    name: string;
    code: string;

    running?: boolean;
    finished?: boolean;
    fastest?: boolean;
    result?: Benchmark;
}