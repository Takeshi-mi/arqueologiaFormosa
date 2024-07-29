<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-x1 text-gray-800 leading-tight">
            {{ $noticia->titulo}}
        </h2>
    </x-slot>
    <div>
        {{$noticia->titulo}}
    </div>

    <div>
        {{$noticia->descricao}}
    </div>

    <div>
        @if ($noticia->url)
            <img src="{{asset($noticia->url)}}" alt="{{$noticia->titulo}}" class="max-w-full h-auto">
        @endif
    </div>
</x-app-layout>