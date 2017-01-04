import sourcemaps from 'rollup-plugin-sourcemaps';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
    entry: 'dist/temp/aot_js/src/main.js',
    plugins: [
        sourcemaps(),
        nodeResolve({ jsnext: true, main: true }),
        commonjs({
            include: [
                'node_modules/rxjs/**'
            ]
        })
    ],
    external: [
        'lodash',
        'benchmark',
        'ace'
    ],
    globals: {
        benchmark: 'Benchmark',
        lodash: '_',
        ace: 'ace'
    },
    dest: 'dist/temp/rollup/bundle.js',
    format: 'iife',
    sourceMap: true
};
