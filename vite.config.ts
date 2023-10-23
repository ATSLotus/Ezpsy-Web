import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from 'fs'
import path from 'path'

const getRouters = () => {
  const pagesDir = "src/pages/"
  const pages = fs.readdirSync(path.join(__dirname, pagesDir))
  const routers = {}
  pages.forEach(page => {
    const item = fs.readdirSync(path.join(__dirname, pagesDir+`${page}/`))
    routers[page] = new Array()
    item.forEach(i => {
      routers[page].push(i.split('.')[0])
    })
  })
  return routers
}

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [vue({
    template: {
      compilerOptions: {
        // 忽略自定义标签警告 vue3 app.config.compilerOptions.isCustomElement 配置有问题
        isCustomElement: (tag) => {
          return [
            "field", 
            "shadow", 
            "value", 
            "block", 
            "category", 
            "sep", 
            "mutation", 
            "xml", 
            "next", 
            "statement", 
            "container", 
            "subblock"
          ].includes(tag)
        },
      }
    }
  })],
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src')
    }
  },
  build: {
    target: 'esnext',
    outDir: 'dist', //指定输出路径
    assetsDir: 'src/assets', // 指定生成静态资源的存放路径
    minify: 'terser', // 混淆器，terser构建后文件体积更小
    commonjsOptions: {
      transformMixedEsModules: true
    },
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  },
  define: {
    "env.routers": getRouters(),
    "env.state": process.env.NODE_ENV === "production"
  },
  server: {
    host: '0.0.0.0',
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '/#/')
      },
    },
  }
})
