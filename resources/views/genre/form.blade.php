@extends('layout')

@section('content')

	<h1>{{ $title }}</h1>
 
	@if ($errors->any())
		<div class="alert alert-danger">Please fix the errors!</div>
	@endif
 
 
	<form method="post" action="{{ $genre->exists ? '/genres/patch/' . $genre->id : '/genres/put' }}"
>
		@csrf
 
		<div class="mb-3">
			<label for="genre-name" class="form-label">Genre</label>
 
			<input
				type="text"
				class="form-control @error('genre') is-invalid @enderror"
				id="genre-name"
				name="genre"
				value="{{ old('genre', $genre->genre) }}">
				
			@error('genre')
				<p class="invalid-feedback">{{ $errors->first('genre') }}</p>
			@enderror
		</div>
		
		<div class="mb-3">
			<label for="description" class="form-label">Genre's description</label>
			
			<textarea
				class="form-control @error('description') is-invalid @enderror"
				id="description"
				name="description"
				rows="4">{{ old('description', $genre->description) }}
			</textarea>

			@error('description')
				<p class="invalid-feedback">{{ $errors->first('description') }}</p>
			@enderror
		</div>
		
		<button type="submit" class="btn btn-primary">Save</button>
	
	</form>
	
@endsection