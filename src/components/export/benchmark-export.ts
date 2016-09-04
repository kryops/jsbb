export interface BenchmarkExportEntry {

    /**
     * name
     */
    n: string;

    /**
     * code
     */
    c: string;
}

export interface BenchmarkExport {

    /**
     * title
     */
    t: string,

    /**
     * setup code
     */
    s: string,

    /**
     * benchmarks
     */
    b: BenchmarkExportEntry[];

}