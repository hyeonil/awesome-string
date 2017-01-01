import babelConfig from './babel_config';
import banner from './banner';
import uglify from 'rollup-plugin-uglify';

export default {
  entry: 'src/index.js',
  plugins: [
    babelConfig,
    uglify({
      output: {
        comments: /^!/
      }
    })
  ],
  targets: [{
    dest: 'dist/awesome-string.min.js',
    format: 'umd',
    moduleName: 'as',
    sourceMap: true,
    banner: banner
  }]
};