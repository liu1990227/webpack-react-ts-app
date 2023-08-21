import path from 'path';

import { Configuration } from 'webpack';
import { merge } from 'webpack-merge';

import 'webpack-dev-server';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import WebpackBar from 'webpackbar';
import SpeedMeasurePlugin from 'speed-measure-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import CompressionPlugin from 'compression-webpack-plugin';

const isDev = process.env.NODE_ENV === 'development';

const withAnaly = process.env.ANALY === 'true';

const baseConfig: Configuration = {
  cache: {
    type: 'filesystem',
  },

  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    port: 8080,
    open: true,
    hot: true,
  },

  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash:8].js',
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.[tj]sx?$/i,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.\w?css$/i,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[path].[name].[local].[contenthash:8]',
              },
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.css'],
    alias: {
      '@': path.join(__dirname, './src'),
    },
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
    new WebpackBar({
      color: '#85d',
    }),
    withAnaly && new BundleAnalyzerPlugin(),
    !isDev &&
      new CompressionPlugin({
        test: /.(js|css)$/,
        filename: '[path][base].gz',
        algorithm: 'gzip',
      }),
  ].filter(Boolean),
};

let config: Configuration = merge(
  baseConfig,
  isDev
    ? {
        mode: 'development',
        devtool: 'inline-source-map',
      }
    : {
        mode: 'production',
        optimization: {
          splitChunks: {
            cacheGroups: {
              vendors: {
                test: /node_modules/,
                name: 'vendors',
                minChunks: 1,
                chunks: 'initial',
                minSize: 0,
                priority: 1,
              },
              commons: {
                name: 'commons',
                minChunks: 2,
                chunks: 'initial',
                minSize: 0,
              },
            },
          },
        },
      },
);

if (withAnaly) {
  config = new SpeedMeasurePlugin().wrap(config as any) as any;
}

export default config;
