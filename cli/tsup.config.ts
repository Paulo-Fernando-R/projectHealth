import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],   // ponto de entrada do seu projeto
  format: ['esm'],           // gera ESM
  target: 'esnext',          // target do JS
  sourcemap: true,           // gera source maps
  clean: true,               // limpa a pasta dist antes de build
  dts: true,                 // gera arquivos de declaração .d.ts
  minify: false,             // opcional: minifica JS
  splitting: false,          // evita chunks, bom para libs
})
