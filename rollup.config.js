import resolve from 'rollup-plugin-node-resolve'
import vue from 'rollup-plugin-vue'
import uglify from 'rollup-plugin-uglify'
import babel from 'rollup-plugin-babel'

export default {
  input: 'src/main.js',
  output: [
    {
      file: 'dist/mutt-forms-vue.es.js',
      format: 'es',
    },
    {
      file: 'dist/mutt-forms-vue.min.js',
      format: 'iife',
      exports: ['default', 'ValueSubstituteMixin'],
      name: 'MuttVue',
      globals: {
        '@mutt/forms': 'Mutt',
        'vue': 'Vue',
      },
    },
  ],
  plugins: [
    // IE11 gets upset about fnames....
    resolve(),
    vue(),
    babel(),
    uglify({
      mangle: false,
      keep_classnames: true,
      keep_fnames: true,
      safari10: true,
    }),
  ],
  external: [
    'vue',
    '@mutt/forms',
  ]
}
