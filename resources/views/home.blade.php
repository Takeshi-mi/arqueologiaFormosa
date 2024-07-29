<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Página de Notícias') }}
        </h2>
    </x-slot>

    <div class="container py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900 dark:text-gray-100">
                   <h1> Notícias </h1>
                   @if ($noticias->isEmpty())
                   <p>Não há notícias disponíveis no momento.</p>
                   @endif

                   <div class="row">
                        @foreach ($noticias as $noticia)
                            <div class="col-md4 mb-4">
                                <div class="card">
                                    @if ($noticia->url)
                                        <img src="{{ asset($noticia->url)}}" alt="{{ $noticia->titulo}}">
                                    @endif
                                <div class="card-body">
                                    <h5 class="card-title">{{ $noticia->titulo}}</h5>
                                    <p class="card-text">{{ $noticia->descricao }}</p>
                                </div>        
                                </div>
                            </div>
                        @endforeach
                   </div>
                </div>
            </div>
        </div>
    </div>

</x-app-layout>
