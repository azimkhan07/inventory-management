<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'category_id' => $this->category_id,
            'category' => [
                'id' => $this->category?->id,
                'name' => $this->category?->name,
            ],
            'product_name' => $this->product_name,
            'sku' => $this->sku,
            'purchase_price' => $this->purchase_price,
            'selling_price' => $this->selling_price,
            'stock_quantity' => $this->stock_quantity,
            'status' => $this->status,
            'created_at' => $this->created_at,
        ];
    }
}
