module.exports = {
  entry:  {
    app: ["webpack/hot/dev-server", "./app/app.js"]
    // app: ["./app/app.js"]
  },
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css" },
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
    ]
  }
};
