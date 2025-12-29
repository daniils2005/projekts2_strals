<!doctype html>
<html lang="en">
 
	<head>
		<meta charset="utf-8">
		<title>Project 2 - {{ $title }}</title>
		<meta name="description" content="My Second Project">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link
			href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css"
			rel="stylesheet"
			integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB"
			crossorigin="anonymous"
		>
	</head>
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
	<body>
		<header>
			<nav class="navbar navbar-expand-lg bg-body-tertiary">
				<div class="container">
					<a class="navbar-brand" href="#">Navbar</a>
					<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
						<span class="navbar-toggler-icon"></span>
					</button>
					<div class="collapse navbar-collapse" id="navbarNav">
						<ul class="navbar-nav">
						@if(Auth::check())
							<li class="nav-item">
								<a class="nav-link active" aria-current="page" href="/">Home</a>
							</li>								
							<li class="nav-item">
								<a class="nav-link" href="/authors">Authors</a>
							</li>
							<li class="nav-item">
								<a class="nav-link" href="/books">Books</a>
							</li>		
							<li class="nav-item">
								<a class="nav-link" href="/genres">Genres</a>
							</li>
							<li class="nav-item">
								<a class="nav-link" href="/logout">Log out</a>
							</li>	
						@else
							<li class="nav-item">
								<a class="nav-link" href="/login">Authenticate</a>
							</li>
						@endif
						</ul>
					</div>
				</div>
			</nav>
		</header>
		
		<main class="container">
			<div class="row">
				<div class="col">
				
					@yield('content')
					
				</div>
			</div>
		</main>
		
		<footer class="text-bg-dark mt-3">
			<div class="container">
				<div class="row py-5">
					<div class="col">
						D. Štrāls, 2025
					</div>
				</div>
			</div>
		</footer>
		
		<script src="/js/admin.js"></script>
		
	</body>

</html>