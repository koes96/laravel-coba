<?php

namespace App\Http\Livewire\Post;

use Livewire\Component;
use App\Models\Post;
use Livewire\WithPagination;

class Index extends Component
{

    use WithPagination;

    public function render()
    {
        return view('livewire.post.index', [
            'post' => Post::latest()->paginate(5)
        ]);
    }
}
