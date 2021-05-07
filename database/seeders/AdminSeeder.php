<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use DB;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            [
                'name' => 'Administrator',
                'email' => 'admin@gmail.com',
                'password' => \Hash::make('admin123')
            ],
        ]);
    }
}
