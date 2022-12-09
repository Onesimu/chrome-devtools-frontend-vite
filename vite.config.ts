const path = require('path')
const fs = require('fs')

const _devtools_templates = [
  "devtools_app",
  "inspector",
  "js_app",
  "ndb_app",
  "node_app",
  "worker_app",
  "device_mode_emulation_frame",
]

export default {
  build:{
    target: 'esnext',
    minify: false,
    // assetsDir: 'static',
    sourcemap: false,
    rollupOptions: {
      input: _devtools_templates.map(it => path.resolve(__dirname, it + '.html')),
      output: {
        chunkFileNames: 'js/[name].js',
        entryFileNames: '[name].js',
        assetFileNames: 'static/[name].[ext]',
        // manualChunks(id) { // 静态资源分拆打包
        //   if (id.includes('node_modules')) {
        //     return 'lib/' + id.toString().split('node_modules/')[1].split('/')[0].toString()
        //   }
        //   if (id.includes('/front_end/')) { 
        //     return (id.toString().split('/front_end/')[1].split('.')[0].toString())
        //   }
        // }
      }
    },
  },
  base: './',
  plugins: [
    {
    //    enforce: 'pre',
    name: 'chrome-dev',
    resolveId(source, importer, options) {
      if (source.endsWith('.css.legacy.js') || source.endsWith('.css.js') ){
        const css = source.replace('.js', '').replace('.legacy', '')
        var ap = path.resolve(path.dirname(importer), css + '.js') + '?css=js'
        if (source.endsWith('.css.legacy.js')) ap += '&legacy'
        return ap
      }
      return null
    },
    load(id) {
      // if (id.endsWith('.css.legacy.js') || id.endsWith('.css.js') ){
      //   const stylesheetContents = fs.readFileSync(id.replace('.js', '').replace('.legacy', ''), {encoding:'utf8', flag:'r'})
      if (id.endsWith('?css=js') || id.endsWith('?css=js&legacy') ) {
        const content = fs.readFileSync(id.split('?')[0].replace('.js', ''), {encoding:'utf8', flag:'r'})
        const stylesheetContents = content.replace(/\`/g, '\\\'').replace(/\\/g, '\\\\')
          .replace(/\/\*.+?\*\//gs, '')
        let exportStatement;
        if (id.endsWith('?css=js&legacy')) {
          exportStatement = `export default {
            cssContent: \`${stylesheetContents}\`
          }`
        } else {
          exportStatement = `const styles = new CSSStyleSheet()
          styles.replaceSync(\`${stylesheetContents}\`)
          export default styles`
        }
        return exportStatement
      }
      return null;
    }
  }
  ]
}
