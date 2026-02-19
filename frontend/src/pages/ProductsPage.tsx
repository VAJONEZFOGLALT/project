import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import ProductCard from '../components/ProductCard';
import { ProductCardSkeleton } from '../components/SkeletonLoader';
import CompareDrawer from '../components/CompareDrawer';
import { useAuth } from '../contexts/AuthContext';
import { useWishlist } from '../hooks/useWishlist';
import { useToast } from '../contexts/ToastContext';

export default function ProductsPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user, isAuthenticated } = useAuth();
  const { wishlistIds, handleToggleWishlist } = useWishlist();
  const { showToast } = useToast();
  const [compareIds, setCompareIds] = useState<number[]>([]);
  const [compareItems, setCompareItems] = useState<any[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<any[]>([]);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getProducts();
      setProducts(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => { load(); }, []);

  useEffect(() => {
    const loadLists = async () => {
      if (!user) {
        setCompareIds([]);
        setRecentlyViewed([]);
        return;
      }
      const compare = await api.getCompare(user.id);
      setCompareIds(compare.map((item: any) => item.productId));
      setCompareItems(compare.map((item: any) => item.product));
      const recent = await api.getRecentlyViewed(user.id);
      setRecentlyViewed(recent.map((item: any) => item.product));
    };
    loadLists();
  }, [user]);

  const handleNavigate = (id: number) => {
    navigate(`/shop/product/${id}`);
  };

  const compareItemsFallback = useMemo(() => {
    return products.filter(p => compareIds.includes(p.id));
  }, [products, compareIds]);

  const resolvedCompareItems = useMemo(() => {
    if (user && compareItems.length > 0) {
      return compareItems;
    }
    return compareItemsFallback;
  }, [user, compareItems, compareItemsFallback]);

  const wishlistItems = useMemo(() => {
    return products.filter(p => wishlistIds.includes(p.id));
  }, [products, wishlistIds]);



  const handleToggleCompare = async (productId: number) => {
    if (!isAuthenticated) {
      showToast('Please log in to compare products', 'warning');
      return;
    }

    if (compareIds.includes(productId)) {
      await api.removeCompare(user!.id, productId);
    } else {
      try {
        await api.addCompare({ userId: user!.id, productId });
      } catch (err: any) {
        showToast(err.message || 'Failed to add to compare', 'error');
      }
    }
    const updated = await api.getCompare(user!.id);
    setCompareIds(updated.map((item: any) => item.productId));
    setCompareItems(updated.map((item: any) => item.product));
  };

  const handleClearCompare = async () => {
    if (!isAuthenticated) {
      showToast('Please log in to use compare feature', 'warning');
      return;
    }
    await api.clearCompare(user!.id);
    setCompareIds([]);
    setCompareItems([]);
  };

  return (
    <div className="view products-page">
      <div className="products-header">
        <h2>Products</h2>
      </div>
      {error && <div className="error">{error}</div>}

      <div className="products-layout">
        <main className="products-main">
          {loading ? (
            <div className="grid-products">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid-products">
              {products.map((p: any) => (
                <div key={p.id} onClick={() => handleNavigate(p.id)} style={{ cursor: 'pointer' }}>
                  <ProductCard
                    product={p}
                    disableNav={true}
                    showWishlist={true}
                    isWishlisted={wishlistIds.includes(p.id)}
                    onToggleWishlist={(id) => handleToggleWishlist(id, p.name)}
                    showCompare={true}
                    isCompared={compareIds.includes(p.id)}
                    onToggleCompare={handleToggleCompare}
                    showStockBadge={true}
                  />
                </div>
              ))}
              {products.length === 0 && <p>No products found.</p>}
            </div>
          )}
        </main>

        <aside className="products-side">
          <div className="side-card">
            <h3>Wishlist</h3>
            {wishlistItems.length === 0 ? (
              <p className="muted">No items yet.</p>
            ) : (
              <div className="side-list">
                {wishlistItems.slice(0, 4).map((item) => (
                  <button key={item.id} className="side-item" onClick={() => navigate(`/shop/product/${item.id}`)}>
                    <span>{item.name}</span>
                    <span>${Number(item.price).toFixed(2)}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="side-card">
            <h3>Recently Viewed</h3>
            {recentlyViewed.length === 0 ? (
              <p className="muted">Nothing yet.</p>
            ) : (
              <div className="side-list">
                {recentlyViewed.slice(0, 4).map((item: any) => (
                  <button key={item.id} className="side-item" onClick={() => navigate(`/shop/product/${item.id}`)}>
                    <span>{item.name}</span>
                    <span>${Number(item.price).toFixed(2)}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </aside>
      </div>

      <CompareDrawer items={resolvedCompareItems} onRemove={handleToggleCompare} onClear={handleClearCompare} />
    </div>
  );
}
