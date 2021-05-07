@extends('layouts.template',[
    'title' => 'Post',
    'pageTitle' => 'CRUD',
])
@section('content')
{{-- @include('layouts.components.datatables') --}}
{{-- @include('layouts.components.alert-dismissible') --}}
<div>
    <a href="{{ route('post.create') }}" class="btn btn-md btn-success mb-3">Tambah Post</a>
    <table class="table table-bordered datatable">
        <thead class="thead-dark">
            <tr>
                <th scope="col">Title</th>
                <th scope="col">Content</th>
                <th scope="col">Aksi</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($post as $v )
                <tr>
                    <td>{{$v->title}}</td>
                    <td>{{$v->content}}</td>
                    <td class="text-center">
                        <a href="{{route('post.edit', $v->id)}}" class="btn btn-sm btn-primary">Edit</a>
                        <a href="destroy({{($v->id)}})" class="btn btn-sm btn-danger">Delete</a>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
    {{$post->links()}}
</div>
@stop
