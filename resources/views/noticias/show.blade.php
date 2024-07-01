<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ $noticia->titulo }}
        </h2>
    </x-slot>

    <div class="container mx-auto px-4">
        <div class="py-8">
            <div class="max-w 7x1 mx auto">
                <div class="text-2x1">
                    {{$noticia->titulo}}
                </div>
                
                <div class="mt-4 text-gray-400">
                    {{$noticia->descricao}}
                </div>
                <div class="mt-6">
                    @if ($noticia->url)
                        <img src="{{asset($noticia->url)}}" alt="{{ $noticia->titulo}}" class="max-w-full h-auto"/>
                    @endif
                </div>

            </div>
        </div>
    </div>
</x-app-layout>

