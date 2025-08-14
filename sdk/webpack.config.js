// webpack.config.js
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'nyxpay-pay-sdk.umd.js',
    library: 'nyxpayPaySDK',
    libraryTarget: 'umd',
    globalObject: 'this',
    umdNamedDefine: true
  },

  mode: 'production',
  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { targets: '> 0.25%, not dead' }]]
          }
        }
      }
    ]
  },

  resolve: {
    extensions: ['.js'],
    // Prevent Node-only modules from being pulled in by transitive deps
    // We don't want heavy polyfills for offline browser bundle.
    fallback: {
      buffer: require.resolve('buffer/'),
      crypto: false,
      stream: false,
      http: false,
      https: false,
      zlib: false,
      url: false,
      os: false,
      path: false,
      fs: false,
      net: false,
      tls: false
    }
  },

  plugins: [
    // Provide Buffer globally if anything expects it
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer']
    }),
    // Keep "process" references from dragging in Node polyfills
    new webpack.DefinePlugin({
      'process.env.NODE_DEBUG': JSON.stringify(''),
      'process.browser': JSON.stringify(true)
    })
  ],


// webpack.config.js
externals: {
  '@solana/web3.js': 'solanaWeb3'   // keep web3 external
  // NOTE: do NOT list 'bn.js' here (we want BN bundled)
}}
