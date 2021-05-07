@extends('layouts.template',[
    'title' => 'TES',
    'pageTitle' => 'TES',
])
@section('content')
{{-- @include('layouts.components.datatables') --}}
{{-- @include('layouts.components.alert-dismissible') --}}
@livewire('UserDatatables')
@stop