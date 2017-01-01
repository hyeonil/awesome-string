import babelConfig from './babel_config';
import banner from './banner';

export default {
  entry: 'src/index.js',
  plugins: [
    babelConfig
  ],
  targets: [{
    dest: 'dist/awesome-string.js',
    format: 'umd',
    moduleName: 'as',
    sourceMap: false,
    banner: banner
  }]
};