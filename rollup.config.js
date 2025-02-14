import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import del from 'rollup-plugin-delete'
import resolve from '@rollup/plugin-node-resolve';

export default {
    input: 'src/main.js',
    output: [
        {
            file: 'dist/main.js',
            format: 'es',
        },
        {
            file: 'dist/asd.js',
            format: 'cjs',
        },
        // {
        //     file: 'dist/bundle.min.js',
        //     format: 'iife',
        //     name: 'version',
        //     plugins: [terser()],
        //     inlineDynamicImports: true,
        // }
    ],
    plugins: [
        resolve({
            extensions: ['.mjs', '.js', '.json'], // Убедитесь, что эти расширения поддерживаются
        }),
        commonjs(),
        json(),
    ]
}