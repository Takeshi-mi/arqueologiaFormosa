<?php

use App\Http\Controllers\noticiasController;
use App\Http\Controllers\paginainicial;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// sintaxe = Route::método('url',[classe, função])->name('');
Route::get('/',[noticiasController::class, 'home'])->name('home');
Route::resource('noticias',noticiasController::class);

Route::get('/dashboard',[noticiasController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');
Route::get('/noticias/{noticia}',[noticiasController::class, 'show'])->name('noticias.show');
Route::get('/noticias/{noticia}',[noticiasController::class, 'store'])->name('noticias.store');
Route::put('/noticias/{noticia}',[noticiasController::class, 'update'])->name('noticias.update');






Route::get('/brgov',[noticiasController::class, 'brgov'])->name('noticias.brgov');


//Route::get('/',[paginainicial::class, 'index'])->name('index');

/*Route::get('/user/{id}', function($id){
    return "user".$id;
    });
    
    // colocando retrições com where
    Route::get('/user/{id}', function($id){
    return "user".$id;
})->where('id','[0-9]+');

//Com parametro opcional
Route::get('/user/{name}', function($name="padrão"){
    return "user".$name;
    });
    
    Route::get('/dashboard', function () {
        return view('dashboard');
        })->middleware(['auth', 'verified'])->name('dashboard');
        
        // Pega tudo o que tiver dentro do controller
        Route::resource('noticia', noticiasController::class);
        
        */
        // middleware separa quem pode acessar as áreas
        Route::middleware('auth')->group(function () {
            Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
            Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
