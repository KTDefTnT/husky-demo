const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

export default {
  entry: "../src/main.js",
  mode: "production",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[chunk]_[hash:8].[ext]",
  },
  modules: {
    rules: [{
      test: /\.(scss|css)$/,
      exclude: "node_modules",
      use: ["style-loader", "css-loader", "sass-loader"]
    }, {
      test: /\.(js|jsx)$/,
      use: [{
        loader: "babel-loader",
        exclude: "node_modules",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
          plugins: ["@babel/plugin-transform-runtime"]
        },
      }]
    }]
  },
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
  devServer: {
    port: 3000,
    contentBase: path.resolve(__dirname, "src"),
    hot: true,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "../public/index.html" //* 配置index映射路径
    })
  ]
};