# products-api

a [Sails v1](https://sailsjs.com) application


### Links

+ [Sails framework documentation](https://sailsjs.com/get-started)
+ [Version notes / upgrading](https://sailsjs.com/documentation/upgrading)
+ [Deployment tips](https://sailsjs.com/documentation/concepts/deployment)
+ [Community support options](https://sailsjs.com/support)
+ [Professional / enterprise options](https://sailsjs.com/enterprise)


### Version info

This app was originally generated on Mon Mar 14 2022 12:10:33 GMT+0200 (hora estándar de Israel) using Sails v1.5.2.

### Instructions

+ Start: `npm start` (Nodemon required)


### BluePrint Routes

+ GET ALL PRODUCTS: http://localhost:1337/productos
+ GET ONE PRODUCT: http://localhost:1337/productos/:id 
    + Example: http://localhost:1337/productos/622f41904c65cd6fba6ca7f2
+ GET CREATE PRODUCT: http://localhost:1337/create?...
    + Example: http://localhost:1337/productos/create?nombre=Zapatillas%20Adidas&precio=10000&foto=https://cdn-icons.flaticon.com/png/512/5750/premium/5750915.png?token=exp=1647266224~hmac=370e112a9e5b5d057c7cffe3d57f4236
+ GET UPDATE PRODUCT: http://localhost:1337/update/:id?... 
    + Example: http://localhost:1337/productos/update/622f46631decca721851dbae?precio=11000
+ GET DELETE PRODUCT: http://localhost:1337/destroy/:id
    + Example: http://localhost:1337/productos/destroy/622f46631decca721851dbae




<!-- Internally, Sails used [`sails-generate@2.0.6`](https://github.com/balderdashy/sails-generate/tree/v2.0.6/lib/core-generators/new). -->



<!--
Note:  Generators are usually run using the globally-installed `sails` CLI (command-line interface).  This CLI version is _environment-specific_ rather than app-specific, thus over time, as a project's dependencies are upgraded or the project is worked on by different developers on different computers using different versions of Node.js, the Sails dependency in its package.json file may differ from the globally-installed Sails CLI release it was originally generated with.  (Be sure to always check out the relevant [upgrading guides](https://sailsjs.com/upgrading) before upgrading the version of Sails used by your app.  If you're stuck, [get help here](https://sailsjs.com/support).)
-->

