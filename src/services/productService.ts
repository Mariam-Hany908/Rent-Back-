import { Product, ProductCategorySlug, ProductFilterOptions, Review } from '../types';
import { MOCK_PRODUCTS, MOCK_REVIEWS, MOCK_RENTAL_REQUESTS, MOCK_BOOKINGS } from './mockData';

/**
 * Product Service
 * 
 * Provides an abstract data boundary for querying and managing listings.
 * Currently backed by mock storage; designed to seamlessly swap to real API endpoints.
 */
class ProductService {
  private products: Product[] = [...MOCK_PRODUCTS];

  /**
   * Checks whether a product is available for the given start and end date range.
   * Compares against existing active requests and bookings.
   */
  isProductAvailable(productId: string, startDate?: string, endDate?: string): boolean {
    if (!startDate || !endDate) return true;

    const queryStart = new Date(startDate).getTime();
    const queryEnd = new Date(endDate).getTime();
    if (isNaN(queryStart) || isNaN(queryEnd) || queryStart > queryEnd) return true;

    // Check active rental requests that lock dates
    const hasConflictingRequest = MOCK_RENTAL_REQUESTS.some((req) => {
      if (req.productId !== productId) return false;
      if (req.status === 'cancelled' || req.status === 'rejected') return false;
      const reqStart = new Date(req.startDate).getTime();
      const reqEnd = new Date(req.returnDate).getTime();
      return reqStart <= queryEnd && reqEnd >= queryStart;
    });

    if (hasConflictingRequest) return false;

    // Check confirmed bookings
    const hasConflictingBooking = MOCK_BOOKINGS.some((b) => {
      if (b.productId !== productId) return false;
      if (b.bookingStatus === 'cancelled') return false;
      const bStart = new Date(b.startDate).getTime();
      const bEnd = new Date(b.returnDate).getTime();
      return bStart <= queryEnd && bEnd >= queryStart;
    });

    if (hasConflictingBooking) return false;

    return true;
  }

  async getProducts(filter?: ProductFilterOptions): Promise<Product[]> {
    // Simulate slight network latency
    await new Promise((res) => setTimeout(res, 120));

    let list = [...this.products];

    // Status filter (default to active for public search unless explicitly set)
    if (filter?.status) {
      list = list.filter((p) => p.status === filter.status);
    } else {
      list = list.filter((p) => p.status === 'active');
    }

    // Category filter
    if (filter?.category && filter.category !== 'all') {
      list = list.filter((p) => p.category === filter.category);
    }

    // Owner ID
    if (filter?.ownerId) {
      list = list.filter((p) => p.ownerId === filter.ownerId);
    }

    // Condition filter
    if (filter?.condition && filter.condition !== 'all') {
      list = list.filter((p) => p.condition === filter.condition);
    }

    // Min & Max Price
    if (filter?.minPrice !== undefined && !isNaN(filter.minPrice)) {
      list = list.filter((p) => p.rentalPricePerDay >= filter.minPrice!);
    }
    if (filter?.maxPrice !== undefined && !isNaN(filter.maxPrice)) {
      list = list.filter((p) => p.rentalPricePerDay <= filter.maxPrice!);
    }

    // Location filter (matches city or area)
    if (filter?.location && filter.location.trim() !== '') {
      const loc = filter.location.toLowerCase().trim();
      list = list.filter((p) =>
        p.location.city.toLowerCase().includes(loc) ||
        p.location.area.toLowerCase().includes(loc)
      );
    }

    // Minimum Rating
    if (filter?.minRating !== undefined && filter.minRating > 0) {
      list = list.filter((p) => p.rating >= filter.minRating!);
    }

    // Availability Date Range
    if (filter?.startDate && filter?.endDate) {
      list = list.filter((p) =>
        this.isProductAvailable(p.id, filter.startDate, filter.endDate)
      );
    }

    // Dynamic Category Fields (e.g. clothingType, size, brand, cameraType, deviceType, toolType)
    if (filter?.categoryFields) {
      for (const [key, val] of Object.entries(filter.categoryFields)) {
        if (!val || val === 'all' || val.trim() === '') continue;
        const targetVal = val.toLowerCase().trim();
        list = list.filter((p) => {
          const fieldVal = p.categoryFields?.[key];
          if (!fieldVal) return false;
          return String(fieldVal).toLowerCase().includes(targetVal);
        });
      }
    }

    // Search Query (Keyword)
    if (filter?.searchQuery && filter.searchQuery.trim() !== '') {
      const terms = filter.searchQuery.toLowerCase().trim().split(/\s+/);
      list = list.filter((p) => {
        const title = p.title.toLowerCase();
        const desc = p.description.toLowerCase();
        const city = p.location.city.toLowerCase();
        const area = p.location.area.toLowerCase();
        const category = p.category.toLowerCase();
        const brand = String(p.categoryFields?.brand || '').toLowerCase();
        const model = String(p.categoryFields?.model || '').toLowerCase();
        const type = String(
          p.categoryFields?.clothingType ||
          p.categoryFields?.cameraType ||
          p.categoryFields?.deviceType ||
          p.categoryFields?.toolType || ''
        ).toLowerCase();

        const combinedText = `${title} ${desc} ${city} ${area} ${category} ${brand} ${model} ${type}`;
        return terms.every((t) => combinedText.includes(t));
      });
    }

    // Sorting
    const sort = filter?.sort || 'recommended';
    switch (sort) {
      case 'price_asc':
        list.sort((a, b) => a.rentalPricePerDay - b.rentalPricePerDay);
        break;
      case 'price_desc':
        list.sort((a, b) => b.rentalPricePerDay - a.rentalPricePerDay);
        break;
      case 'rating_desc':
        list.sort((a, b) => {
          if (b.rating !== a.rating) return b.rating - a.rating;
          return b.reviewCount - a.reviewCount;
        });
        break;
      case 'newest':
        list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'recommended':
      default:
        // Rank by weighted score: high rating, review count, and recency
        list.sort((a, b) => {
          const scoreA = (a.rating * 20) + Math.min(a.reviewCount, 30);
          const scoreB = (b.rating * 20) + Math.min(b.reviewCount, 30);
          return scoreB - scoreA;
        });
        break;
    }

    return list;
  }

  /**
   * Retrieves aggregated metadata for filters based on the catalog
   */
  async getFilterMeta(categorySlug?: string) {
    const relevantProducts = categorySlug && categorySlug !== 'all'
      ? this.products.filter((p) => p.category === categorySlug)
      : this.products;

    const locations = Array.from(
      new Set(relevantProducts.map((p) => p.location.area || p.location.city))
    ).filter(Boolean).sort();

    const cities = Array.from(
      new Set(relevantProducts.map((p) => p.location.city))
    ).filter(Boolean).sort();

    const prices = relevantProducts.map((p) => p.rentalPricePerDay);
    const minPrice = prices.length ? Math.min(...prices) : 0;
    const maxPrice = prices.length ? Math.max(...prices) : 5000;

    const brands = Array.from(
      new Set(relevantProducts.map((p) => p.categoryFields?.brand as string).filter(Boolean))
    ).sort();

    return {
      locations,
      cities,
      minPrice,
      maxPrice,
      brands,
      totalCount: relevantProducts.length
    };
  }

  async getProductById(id: string): Promise<Product | null> {
    await new Promise((res) => setTimeout(res, 80));
    return this.products.find((p) => p.id === id) || null;
  }

  async createProductListing(data: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'rating' | 'reviewCount'>): Promise<Product> {
    await new Promise((res) => setTimeout(res, 150));
    const newProduct: Product = {
      ...data,
      id: `prod_${Date.now()}`,
      rating: 0,
      reviewCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.products.unshift(newProduct);
    return newProduct;
  }

  async updateProductListing(id: string, updates: Partial<Product>): Promise<Product | null> {
    await new Promise((res) => setTimeout(res, 120));
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) return null;
    this.products[index] = {
      ...this.products[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    return this.products[index];
  }

  async getFeaturedProducts(limit = 8): Promise<Product[]> {
    await new Promise((res) => setTimeout(res, 100));
    return this.products.filter((p) => p.status === 'active').slice(0, limit);
  }

  async getCategoryCounts(): Promise<Record<string, number>> {
    await new Promise((res) => setTimeout(res, 60));
    const counts: Record<string, number> = {};
    for (const p of this.products) {
      counts[p.category] = (counts[p.category] || 0) + 1;
    }
    return counts;
  }

  async getReviews(): Promise<Review[]> {
    await new Promise((res) => setTimeout(res, 80));
    return [...MOCK_REVIEWS];
  }

  async getProductReviews(productId: string): Promise<Review[]> {
    await new Promise((res) => setTimeout(res, 70));
    return MOCK_REVIEWS.filter((r) => r.productId === productId);
  }

  async getSimilarProducts(productId: string, category: ProductCategorySlug, limit = 4): Promise<Product[]> {
    await new Promise((res) => setTimeout(res, 90));
    return this.products
      .filter((p) => p.id !== productId && p.status === 'active' && p.category === category)
      .slice(0, limit);
  }
}

export const productService = new ProductService();
