module.exports = {
  presets: ['@babel/preset-env'], // Transpile based on target environment
  plugins: ['@babel/plugin-transform-modules-commonjs'] // Convert ES modules to CommonJS (important for Jest)
};