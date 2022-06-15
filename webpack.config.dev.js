const path = require('path'); //path ya está disponible en node
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
//const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
//const TerserPlugin = require('terser-webpack-plugin');
const Dotenv = require('dotenv-webpack');


module.exports = {
    entry: './src/index.js', //punto de entrada de nuestra aplicación
    output: {
        path: path.resolve(__dirname, 'dist'), //para saber dónde se encuentra nuestro proyecto
        filename: '[name].[contenthash].js', //también lo podemos encontrar como boundle
        assetModuleFilename: 'assets/images/[hash][ext][query]'
    }, //hacia dónde vamos a enviar lo que va a preparar webpack (una carpeta o un archivo)
    mode: 'development', //esto es único de este archivo, a diferencia de la otra configuración
    watch: true, //activa el modo watch
    resolve: {
        extensions: ['.js'],
        alias: {
            '@utils': path.resolve(__dirname, 'src/utils/'),
            '@templates': path.resolve(__dirname, 'src/templates/'),
            '@styles': path.resolve(__dirname, 'src/styles/'),
            '@images': path.resolve(__dirname, 'src/assets/images/'),
        }
    },
    module: {
        rules: [ //esto conectará nuestro archivo de configuación con Babel
        {
            test: /.\.m?.js$/, //Expresión regular que significa: test nos permite saber qué tipo de extensiones vamos a utilizar. Cualquier archivo que empiece por m (.m) o (?) con extensión (.js) y cerramos con el dolar. "Utiliza cualquier archivo que sea m*.js o *js".
            exclude: /node_modules/, //Ahora vamos a excluir node_modules
            use: {
                loader: 'babel-loader'
            }
        },
        {
            test: /\.css|.styl$/i,
            use: [
                MiniCssExtractPlugin.loader, 
                'css-loader',
                'stylus-loader'
            ],
        },
        {
            test: /\.png/,
            type: 'asset/resource'
        },
        {
            test: /\.(woff\woff2)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    mimetype: "application/font-woff",
                    name: "[name].[contenthash].[ext]",
                    outputPath: "../assets/fonts/",
                    publicPath: "../assets/fonts/",
                    esModule: false,
                },
            }
        }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true, //para que haga la inserción de los elementos
            template: './public/index.html',
            filename: './index.html' //este va a ser el resultado, pero el estandar es usar el mismo
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/[name].[contenthash].css' //el hash nos permitirá identificar el build que estamos haciendo
        }),
        new CopyPlugin({
            patterns: [{ //mueve las imágenes desde from hasta donde le digamos en to
                from: path.resolve(__dirname, "src", "assets/images"),
                to: "assets/images"
            }]
        }
        ),
        new Dotenv(),
    ],
    /*optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin(), //esto es para javascript
        ]

    }*/ //Esta parte la eliminamos porque no es necesaria en nuestra parte de desarrollo.
}