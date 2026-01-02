import { useEffect, useState } from "react";
import '../css/loader.css';

const topBooks = [
  {
    "id": 7,
    "name": "The Girl Who Played with Fire",
    "description": "The second book in the Millennium series deepens the mystery and psychological tension. Features strong characters and a fast-paced plot that builds on the first book’s events.",
    "author": "Stieg Larsson",
    "genre": null,
    "price": "12.79",
    "year": 2006,
    "image": "http://project2/images/6953d8fe9b6f6.jpg"
  },
  {
    "id": 5,
    "name": "The Very Hungry Caterpillar",
    "description": "A beautifully illustrated picture book that follows the journey of a caterpillar eating its way through various foods before becoming a butterfly — perfect for young readers.",
    "author": "Eric Carle",
    "genre": null,
    "price": "8.39",
    "year": 1969,
    "image": "http://project2/images/6953d823d3f5e.jpg"
  },
  {
    "id": 3,
    "name": "The Girl with the Dragon Tattoo",
    "description": "A gripping thriller that introduces Lisbeth Salander and Mikael Blomkvist as they investigate a decades-old disappearance in Sweden — tense, complex, and highly popular worldwide.",
    "author": "Stieg Larsson",
    "genre": null,
    "price": "11.99",
    "year": 2005,
    "image": "http://project2/images/6953d710af846.jpg"
  }
];

const selectedBook = {
  "id": 3,
  "name": "The Girl with the Dragon Tattoo",
  "description": "A gripping thriller that introduces Lisbeth Salander and Mikael Blomkvist as they investigate a decades-old disappearance in Sweden — tense, complex, and highly popular worldwide.",
  "author": "Stieg Larsson",
  "genre": null,
  "price": "11.99",
  "year": 2005,
  "image": "http://project2/images/6953d710af846.jpg"
};

const relatedBooks = [
  {
    "id": 5,
    "name": "The Very Hungry Caterpillar",
    "description": "A beautifully illustrated picture book that follows the journey of a caterpillar eating its way through various foods before becoming a butterfly — perfect for young readers.",
    "author": "Eric Carle",
    "genre": null,
    "price": "8.39",
    "year": 1969,
    "image": "http://project2/images/6953d823d3f5e.jpg"
  },
  {
    "id": 1,
    "name": "Harry Potter and the Philosopher's Stone",
    "description": "Harry Potter and the Philosopher's Stone is a fantasy novel written by British author J. K. Rowling. It is the first novel in the Harry Potter series and was Rowling's debut novel. It follows Harry Potter, a young wizard who discovers his magical heritage on his eleventh birthday when he receives a letter of acceptance to Hogwarts School of Witchcraft and Wizardry. Harry makes close friends and a few enemies during his first year at the school. With the help of his friends, Ron Weasley and Hermione Granger, he faces an attempted comeback by the dark wizard Lord Voldemort, who killed Harry's parents but failed to kill Harry when he was just fifteen months old.",
    "author": "J. K. Rowling",
    "genre": null,
    "price": "9.99",
    "year": 1997,
    "image": "http://project2/images/695159d1d31a5.webp"
  },
  {
    "id": 6,
    "name": "The Hobbit",
    "description": "A prelude to The Lord of the Rings, this classic adventurer’s tale follows Bilbo Baggins on a quest with dwarves to reclaim treasure guarded by a dragon. A cornerstone of modern fantasy.",
    "author": "J.R.R. Tolkien",
    "genre": null,
    "price": "17.99",
    "year": 1937,
    "image": "http://project2/images/6953d8974ea30.jpg"
  }
];

// Header and Footer components - structural components without processing or data
function Header() {
	return (
		<header className="bg-green-500 mb-8 py-5 sticky top-0">
			<div className="px-2 py-2 font-serif text-green-50 text-4xl leading-6
md:container md:mx-auto">
				Project 2
			</div>
		</header>
	)
}

function Footer() {
	return (
		<footer className="bg-neutral-300 mt-8">
			<div className="py-8 md:container md:mx-auto px-2 text-xl">
				D.D.Strals, 2025
			</div>
		</footer>
	)
}

// Homepage- loads data from API and displays top books
function Homepage({ handleBookSelection }) {
	const [topBooks, setTopBooks] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(function () {
		async function fetchTopBooks() {

			try {
				setIsLoading(true);
				setError(null);
				const response = await fetch('http://project2/data/get-top-books');
				
				if (!response.ok) {
					throw new Error("Error while loading data. Please reload page!");
				}

				const data = await response.json();
				console.log('top books fetched', data);
				setTopBooks(data);
			} catch (error) {
				setError(error.message);
			} finally {
				setIsLoading(false);
			}
		}

		fetchTopBooks();
	}, []);

	return (
		<>
			{isLoading && <Loader />}
			{error && <ErrorMessage msg={error} />}
			{!isLoading && !error && (
				topBooks.map((book, index) => (
					<TopBookView
						book={book}
						key={book.id}
						index={index}
						handleBookSelection={handleBookSelection}
					/>
				))
			)}
		</>
	)
}

// Top Book View - displays books on Homepage
function TopBookView({ book, index, handleBookSelection }) {
	return (
		<div className="bg-neutral-100 rounded-lg mb-8 py-8 flex flex-wrap md:flex-row">
			<div className=
				{`order-2 px-12 md:basis-1/2
					${ index % 2 === 1 ? "md:order-1 md:text-right" : ""}
				`}
			>
				<h2 className="mb-4 text-3xl leading-8 font-light text-neutral-900">
					{book.name}
				</h2>
				<p className="mb-4 text-xl leading-7 font-light text-neutral-900 mb-4">
					{ book.description
					? (book.description.split(' ').slice(0, 16).join(' ')) + '...'
					: '' }
				</p>
				<SeeMoreBtn
					bookID={book.id}
					handleBookSelection={handleBookSelection}
				/>
			</div>
			<div className=
				{`order-1 md:basis-1/2 ${ index % 2 === 1 ? "md:order-2" : ""}`}
			>
				<img
					src={ book.image }
					alt={ book.name }
					className="p-1 rounded-md border border-neutral-200 w-2/4 aspect-auto
mx-auto" />
			</div>
		</div>
	)
}

// See More Button
function SeeMoreBtn({ bookID, handleBookSelection }) {
	return (
		<button
			className="inline-block rounded-full py-2 px-4 bg-sky-500 hover:bg-sky-400 text-sky-50 cursor-pointer"
			onClick={() => handleBookSelection(bookID)}
		>See more</button>
	)
}

// Book page component- structural component that contains parts of the book page
function BookPage({ selectedBookID, handleBookSelection, handleGoingBack }) {
	return (
		<>
			<SelectedBookView
				selectedBookID={selectedBookID}
				handleGoingBack={handleGoingBack}
			/>
			<RelatedBookSection
				selectedBookID={selectedBookID}
				handleBookSelection={handleBookSelection}
			/>
		</>
	)
}

// Selected Book View - displays selected book details
function SelectedBookView({ selectedBookID, handleGoingBack }) {
	const [selectedBook, setSelectedBook] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(function () {
		async function fetchSelectedBook() {

			try {
				setIsLoading(true);
				setError(null);
				const response = await fetch('http://project2/data/get-book/' +
selectedBookID);

				if (!response.ok) {
					throw new Error("Error while loading data. Please reload page!");
				}

				const data = await response.json();
				console.log('book ' + selectedBookID + ' fetched', data);
				setSelectedBook(data);
			} catch (error) {
				setError(error.message);
			} finally {
				setIsLoading(false);
			}
		}

		fetchSelectedBook();
	}, [selectedBookID]);

	return (
		<>
			{isLoading && <Loader />}
			{error && <ErrorMessage msg={error} />}
			{!isLoading && !error && <>
				<div className="rounded-lg flex flex-wrap md:flex-row">
					<div className="order-2 md:order-1 md:pt-12 md:basis-1/2">
						<h1 className="text-3xl leading-8 font-bold text-neutral-900">
							{selectedBook.name}
						</h1>
						<p className="text-xl leading-7 font-light text-neutral-900 mb-2">
							{selectedBook.author}
						</p>
						<p className="text-xl leading-7 font-light text-neutral-900 mb-4">
							{selectedBook.description}
						</p>
						<dl className="mb-10 md:flex md:flex-wrap md:flex-row mt-10">
							<dt className="font-bold md:basis-1/4 text-2xl opacity-70">
								Published
							</dt>
							<dd className="mb-2 md:basis-3/4 text-2xl">
								{selectedBook.year}
							</dd>
					
							<dt className="font-bold md:basis-1/4 text-2xl opacity-70">
								Price
							</dt>
							<dd className="mb-2 md:basis-3/4 text-2xl">
								&euro;{selectedBook.price}
							</dd>
					
							<dt className="font-bold md:basis-1/4 text-2xl opacity-70">
								Genre
							</dt>
							<dd className="mb-2 md:basis-3/4 text-2xl">
								{selectedBook.genre}
							</dd>
						</dl>
					</div>
					<div className="order-1 md:order-2 md:pt-12 md:px-12 md:basis-1/2">
						<img
							src={selectedBook.image}
							alt={selectedBook.name}
							className="p-1 rounded-md border border-neutral-200 mx-auto h-150 object-contain" />
					</div>
				</div>
				<div className="mb-12 flex flex-wrap">
					<GoBackBtn handleGoingBack={handleGoingBack} />
				</div>
			</>}
		</>
	)
}

// Go Back Button
function GoBackBtn({ handleGoingBack }) {
	return (
		<button
			className="inline-block rounded-full py-2 px-4 bg-neutral-500 hover:bg-neutral-400 text-neutral-50 cursor-pointer"
			onClick={handleGoingBack}
		>Back</button>
	)
}

// Related Book Section
function RelatedBookSection({ selectedBookID, handleBookSelection }) {
	const [relatedBooks, setRelatedBooks] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(function () {
		async function fetchRelatedBooks() {
			try {
				setIsLoading(true);
				setError(null);

				const response = await fetch(
					'http://project2/data/get-related-books/' + selectedBookID
				);

				if (!response.ok) {
					throw new Error(
						"Error while loading related books. Please reload page!"
					);
				}

				const data = await response.json();
				console.log('related books fetched', data);
				setRelatedBooks(data);
			} catch (error) {
				setError(error.message);
			} finally {
				setIsLoading(false);
			}
		}

		if (selectedBookID) fetchRelatedBooks();
	}, [selectedBookID]);

	return (
		<>
			{isLoading && <Loader />}
			{error && <ErrorMessage msg={error} />}

			{!isLoading && !error && relatedBooks.length > 0 && (
				<>
					<div className="flex flex-wrap">
						<h2 className="text-3xl leading-8 font-light text-neutral-900 mb-4">
							Similar books
						</h2>
					</div>

					<div className="flex flex-wrap md:flex-row md:space-x-4 md:flex-nowrap">
						{relatedBooks.map(book => (
							<RelatedBookView
								key={book.id}
								book={book}
								handleBookSelection={handleBookSelection}
							/>
						))}
					</div>
				</>
			)}
		</>
	);
}


// Related Book View
function RelatedBookView({ book, handleBookSelection }) {
	return (
		<div className="rounded-lg mb-4 md:basis-1/3">
			<img
				src={ book.image }
				alt={ book.name }
				className="md:h-[400px] md:mx-auto max-md:w-2/4 max-md:mx-auto" />
			<div className="p-4">
				<h3 className="text-xl leading-7 font-light text-neutral-900 mb-4">
					{ book.name }
				</h3>
				<SeeMoreBtn
					bookID={book.id}
					handleBookSelection={handleBookSelection}
				/>
			</div>
		</div>
	)
}

// Loader and Error Message components
function Loader() {
	return (
		<div className="my-12 px-2 md:container md:mx-auto text-center clear-both">
			<div className="loader"></div>
		</div>
	)
}

function ErrorMessage({ msg }) {
	return (
		<div className="md:container md:mx-auto bg-red-300 my-8 p-2">
			<p className="text-black">{ msg }</p>
		</div>
	)
}

// Main application component
export default function App() {
	const [selectedBookID, setSelectedBookID] = useState(null);
	// function to store Book ID in state
	function handleBookSelection(bookID) {
		setSelectedBookID(bookID);
	}
	// function to clear Book ID from state
	function handleGoingBack() {
		setSelectedBookID(null);
	}

	return (
		<>
			<Header />
			<main className="mb-8 px-2 md:container md:mx-auto">
				{
				selectedBookID
				? <BookPage
					selectedBookID={selectedBookID}
					handleBookSelection={handleBookSelection}
					handleGoingBack={handleGoingBack}
				/>
				: <Homepage handleBookSelection={handleBookSelection} />
				}
			</main>
			<Footer />
		</>
	)
}
