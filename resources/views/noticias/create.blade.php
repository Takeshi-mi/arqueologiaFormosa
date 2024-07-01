<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Criar Notícia') }}
        </h2>
    </x-slot>

    <div class="container mx-auto px-4">
        <div class="py-8">
            @if ($errors->any())

            <div class="alert alert-danger">
                <ul>
                    @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>

                    @endforeach
            </div>
            @endif
            <div class="container mt-5">
            <form action="{{ route('noticias.store')}} method="POST" enctype="multipart/form-data">
                        @csrf
                        <div class="form-group">
                            <label for="title">Título</label>
                            <input type="text" class="form-control" id="titulo" name="titulo" required>
                        </div>
                        <div class="form-group">
                            <label for="description">Descrição</label>
                            <textarea class="form-control" id="descricao" name="descricao" rows="3" required></textarea>
                        </div>
                        <div class="form-group">
                            <label for="image">Imagem da Notícia</label>
                            <input type="file" class="form-control-file" id="arquivo" name="arquivo" required>
                        </div>
                        <button type="submit" class="btn btn-primary">Enviar</button>
                    </form>
                </div>

           
</x-app-layout>

