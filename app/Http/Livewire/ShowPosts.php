<?php

namespace App\Http\Livewire;

use Livewire\Component;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use Mediconesystems\LivewireDatatables\Column;
use Mediconesystems\LivewireDatatables\NumberColumn;
use Mediconesystems\LivewireDatatables\DateColumn;
use Mediconesystems\LivewireDatatables\Http\Livewire\LivewireDatatable;

class ShowPosts extends Component
{
    public $model = User::class;

    public function columns()
    {
        return [
            NumberColumn::name('id')
                ->label('ID')
                ->sortBy('id'),

            Column::name('name')
                ->label('Name'),

            Column::name('email'),

            DateColumn::name('created_at')
                ->label('Creation Date')
        ];
    }

    public function render()
    {
        $user = DB::table('users')
            ->get();
        return view('livewire.show-posts', [
            'judul' => 'Livewire ini',
            'user' => $user
        ]);
    }

    public function getUser(Request $request, User $user)
    {
        $data = $user->getData();
        //$data = User::select(['name', 'email', 'created_at']);
        return \DataTables::of($data)
            ->addColumn('Actions', function ($data) {
                return '<button type="button" class="btn btn-success btn-sm" id="getEditArticleData" data-id="' . $data->id . '">Edit</button>
                    <button type="button" data-id="' . $data->id . '" data-toggle="modal" data-target="#DeleteArticleModal" class="btn btn-danger btn-sm" id="getDeleteId">Delete</button>';
            })
            ->rawColumns(['Actions'])
            ->make(true);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, User $user)
    {
        $validator = \Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()->all()]);
        }

        $user->storeData($request->all());

        return response()->json(['success' => 'User added successfully']);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function show(User $article)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $user = new User();
        $data = $user->findData($id);

        $html = '<div class="form-group">
                    <label for="name">Name:</label>
                    <input type="text" class="form-control" name="names" id="names" value="' . $data->name . '">
                </div>
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" class="form-control" name="emails" id="emails" value=' . $data->email . '>
                </div>';

        return response()->json([
            'html' => $html,
            'data' => $data
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validator = \Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()->all()]);
        }

        $user = new User();
        $user->updateData($id, $request->all());

        return response()->json(['success' => 'User updated successfully']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = new User();
        $user->deleteData($id);

        return response()->json(['success' => 'User deleted successfully']);
    }
}
