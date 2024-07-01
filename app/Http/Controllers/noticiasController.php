<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Noticia;

class noticiasController extends Controller
{
    //vai pro ademiro
    public function index()
    {
        $noticias = Noticia::all();
        return view('dashboard', compact('noticias'));
    }
    //vai pro ademiro
    public function brgov()
    {
        return view('govbr-ds.brgov');
    }

    public function home()
    {
        $noticias = Noticia::all();
        return view('home', compact('noticias'));
    }

    public function create()
    {
        return view('noticias.create');
    }

    public function store(Request $request)
     {
        $request->validate([
            'titulo' => 'required|string|max:255',
            'descricao' => 'required',
            'arquivo' => 'required|file|image|mimes:jpg,jpeg,png,gif|max:4096',
        ]);
        
        $noticia = Noticia::create([
            'titulo' => $request->titulo,
            'descricao' => $request->descricao,
        ]);

        $noticia->storeArquivo($request->file('arquivo'));
        return redirect()->route("dashboard")->with('success','Notícia criada com sucesso.');

    }

    
    public function show(Noticia $noticia)
    {
        return view('noticias.show', compact('noticia'));
    }

    public function edit(Noticia $noticia)
    {
        return view('noticias.edit', compact('noticia'));
    }


    public function update(Request $request, Noticia $noticia)
    {
        $request->validate([
            'titulo' => 'required',
            'descricao' => 'required',
            'arquivo' => 'nullable|file|image|mimes:jpg,jpeg,png,pdf|max:4096',
        ]);
        $noticia->titulo = $request->titulo;
        $noticia->descricao = $request->descricao;

        if($request->hasFile('arquivo')){
            // Se um novo arquivo for enviado, armazenar e atualizar a URL
            $noticia->storeArquivo($request->file('arquivo'));
        }
        $noticia->save();
        return redirect()->route('dashboard')-with('success','Notícia atualizada');
    }
  
    public function destroy(Noticia $noticia)
    {
            $noticia->delete();
            return redirect()->route('dashboard')-with('success','Notícia atualizada');


    }

}

