const {src,dest, watch,series,parallel} = require('gulp');

//SASS
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

/* saber que archivo contiene el codigo original de cada pagina */
const sourcemaps = require('gulp-sourcemaps');

/* css nano minificar la hoja css */

const cssnano = require('cssnano');
//IMAGENES
const imagemin = require('gulp-imagemin');

function css(done){
    //compilar sass
    //ideptificar el archivo (hoja de sass)
    src('src/scss/app.scss')
    //compilar archivo}
    .pipe(sourcemaps.init())
    .pipe(sass(  {outputStyle: 'compressed'} ))
    .pipe(postcss( [autoprefixer(), cssnano()] )) 
    .pipe(sourcemaps.write('.'))
    //guardar archivo
    .pipe(dest('build/css'))
    done();
}


function imagenes(done){

    src('src/img/**/*')
    .pipe(imagemin({optimizationLevel: 3}))
    .pipe(dest('build/img'))


    done();
}
function dev(){
    //buscamos todos los archivos scss
   watch('src/scss/**/*.scss', css);
   watch('src/img/**/*', imagenes);
   
}
exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.default= series(imagenes,css,dev)