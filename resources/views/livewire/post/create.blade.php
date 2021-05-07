@extends('layouts.template',[
    'title' => 'Post',
    'pageTitle' => 'CRUD',
])
@section('content')
    <div class="card">
        <div class="card-body">
            <form wire:submit.prevent="store">
                <div class="form-group">
                    <label>Title</label>
                    <input type="text" wire:model="title" class="form-control @error('title') is_invalid @enderror " placeholder="Title">
                    @error('title')
                        <span class="invalid-feedback">
                            {{$message}}
                        </span>
                    @enderror
                </div>
                <div class="form-group">
                    <label>Content</label>
                    <textarea type="text" wire:model="content" class="form-control @error('content') is_invalid @enderror " rows="4" placeholder="Konten"> </textarea>
                    @error('title')
                        <span class="invalid-feedback">
                            {{$message}}
                        </span>
                    @enderror
                </div>
                <button type="submit" class="btn btn-sm btn-primary">Simpan</button>
            </form>
        </div>
    </div>
@stop
