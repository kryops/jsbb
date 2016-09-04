import { rollup } from 'rollup';
import nodeResolve from 'rollup-plugin-node-resolve';

class RollupNG2 {
    constructor(options){
        this.options = options;
    }
    resolveId(id, from){
        if (id.startsWith('rxjs/')){
            return `${__dirname}/node_modules/rxjs-es/${id.replace('rxjs/', '')}.js`;
        }
    }
}

const rollupNG2 = (config) => new RollupNG2(config);

export default {
    entry: 'dist/temp/es6/main.js',
    plugins: [
        rollupNG2(),
        nodeResolve({ jsnext: true, main: true })
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
    format: 'iife'
};