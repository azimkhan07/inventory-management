<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{
    protected $fillable = [
        'category_id',
        'product_name',
        'sku',
        'purchase_price',
        'selling_price',
        'stock_quantity',
        'status',
    ];

    /**
     * Product belongs to a Category
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}
