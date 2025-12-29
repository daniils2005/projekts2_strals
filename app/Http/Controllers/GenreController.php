<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Genre;
use Illuminate\View\View;
use Illuminate\Http\RedirectResponse;

class GenreController extends Controller
{
	public function list(): View
	{
		return view(
			'genre.list',
			[
				'title' => 'Genres',
				'items' => Genre::all(),
			]
		);
	}
	public function create(): View
	{
		return view(
			'genre.form',
			[
				'title' => 'Add new genre',
				'genre' => new Genre()
			]
		);
	}
	public function put(Request $request): RedirectResponse
	{
		$validatedData = $request->validate([
			'genre' => 'required|string|max:255',
			'description' => 'nullable|string',
		]);

		$genre = new Genre();
		$genre->genre = $validatedData['genre'];
		$genre->description = $validatedData['description'] ?? null;
		$genre->save();

		return redirect('/genres');
	}
	// display Author editing form
	public function update(Genre $genre): View
	{
		return view(
			'genre.form',
			[
				'title' => 'Edit genre',
				'genre' => $genre
			]
		);
	}
	// update existing Author data
	public function patch(Genre $genre, Request $request): RedirectResponse
	{
		$validatedData = $request->validate([
			'genre' => 'required|string|max:255',
			'description' => 'nullable|string'
		]);
		
		$genre->genre = $validatedData['genre'];
		$genre->description = $validatedData['description'] ?? null;
		$genre->save();
 
		return redirect('/genres');
	}
	public function delete(Genre $genre): RedirectResponse
	{
		// this is a good place to check if author has related Book items and if so, prevent deletion
 
		$genre->delete();
		return redirect('/genres');
	}
}
