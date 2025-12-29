@extends('layout')

@section('content')
 
	<h1>{{ $title }}</h1>
 
	@if (count($items) > 0)
 
		<table class="table table-striped table-hover table-sm">
			<thead class="thead-light">
				<tr>
					<th>ID</th>
					<th>Genre</th>
					<th>Description</th>
					<th>&nbsp;</th>
				</tr>
			</thead>
			<tbody>
 
			@foreach($items as $genre)
			<tr>
				<td>{{ $genre->id }}</td>
				<td>{{ $genre->genre }}</td>
				<td>{{ $genre->description }}</td>
				<td>
					<a href="/genres/update/{{ $genre->id }}" class="btn btn-outline-primary btnsm">Edit</a>
					<form action="/genres/delete/{{ $genre->id }}" method="post" class="deletionform d-inline">
						@csrf
						<button type="submit" class="btn btn-outline-danger btn-sm">Delete</button>
					</form>
				</td>
			</tr>
			@endforeach
 
			</tbody>
		</table>
 
	@else
		
		<p>No entries found in database</p>
 
	@endif
	
	<a href="/genres/create" class="btn btn-primary">Add new</a>
	
@endsection