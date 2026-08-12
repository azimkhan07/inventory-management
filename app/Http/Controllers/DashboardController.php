<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Models\Product;

class DashboardController extends Controller
{
    public function index()
    {
        $totalProducts = Product::count();
        $totalStock = Product::sum('stock_quantity');
        $lowStock = Product::where('stock_quantity', '<=', 10)->count();
        $inventoryValue = Product::selectRaw('SUM(stock_quantity * purchase_price) as total')->value('total');

        return response()->json([
            'total_products' => $totalProducts,
            'total_stock' => $totalStock,
            'low_stock' => $lowStock,
            'inventory_value' => $inventoryValue ?? 0
        ]);
    }
}
