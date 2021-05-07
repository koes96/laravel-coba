@extends('layouts.template',[
    'title' => 'TES',
    'pageTitle' => 'TES',
])
@section('content')
{{-- @include('layouts.components.datatables') --}}
{{-- @include('layouts.components.alert-dismissible') --}}
<div class="card shadow mb-4">
    <h1>{{ session('status') }}</h1>
    @livewire('show-posts')
    @livewire('counter')
</div>
@stop