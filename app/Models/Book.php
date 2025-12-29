<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Book extends Model
{
	protected $fillable = [
		'name',
		'author_id',
		'description',
		'price',
		'year',
		'genre_id',
	];

    public function author(): BelongsTo
	{
		return $this->belongsTo(Author::class);
	}
	
	public function genre()
	{
		return $this->belongsTo(Genre::class);
	}
}
