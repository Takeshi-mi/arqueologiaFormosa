@include('layouts.navigation')
<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Dashboard') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900 dark:text-gray-100">
                    {{ __("You're logged in!") }}
                </div>
            </div>
        </div>
    </div>

    <div class="container">
        <h1>Notícias</h1>
        <a href="{{ route('noticias.create') }}" class="btn btn-primary">Criar notícia</a>
        @if($message = Session::get('success'))
            <div class="alert alert-sucess mt-2">
                {{$message}}
            </div>
        @endif
   
    @if($noticias->count())
    <div class="container">
        <table class="table table-bordered mt-2">
            <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Descrição</th>
                <th>URL</th>
            </tr>
            @foreach ($noticias as $noticia)
                <tr>
                    <td>{{ $noticia->id }}</td>
                    <td>{{ $noticia->titulo }}</td>
                    <td>{{ $noticia->descricao }}</td>
                    <td><a href="{{ $noticia->url}}" target="_blank">{{ $noticia->url }}</a></td>
                    <td>
                            <a class="btn btn-info" href="{{ route('noticias.show',$noticia->id)}}">Ver</a>
                            <a class="btn btn-primary" href="{{ route('noticias.edit',$noticia->id)}}">Editar</a>
                        <form action="{{ route('noticias.destroy',$noticia->id)}}" method="POST">
                            
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="btn btn-danger">Excluir</button>
                        </form>
                    </td>
                </tr>
            @endforeach
        </table>
        <div class= "d-flex justify-content-center mt-3">
            {{ $noticias->links() }}
        </div>
        @else
            <p> Nenhuma notícia encontrada </p>
        @endif
    </div>
 </div>
</x-app-layout>

