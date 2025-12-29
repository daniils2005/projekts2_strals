<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BookRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|min:3|max:256',
			'author_id' => 'required',
			'description' => 'nullable',
			'price' => 'nullable|numeric',
			'year' => 'numeric',
			'image' => 'nullable|image',
			'display' => 'nullable',
			'genre_id' => 'nullable|exists:genres,id',
        ];
    }
}
