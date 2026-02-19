import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';

type CourierService = 'UPS' | 'PACKETA' | 'DPD' | 'INPOST';

interface CourierOption {
  id: CourierService;
  name: string;
  description: string;
  estimatedDays: string;
  price: number;
  icon: string;
}

const courierOptions: CourierOption[] = [
  { id: 'UPS', name: 'UPS Express', description: 'Fast and reliable worldwide delivery', estimatedDays: '2-3 days', price: 15.99, icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/UPS_Logo_Shield_2017.svg/240px-UPS_Logo_Shield_2017.svg.png' },
  { id: 'PACKETA', name: 'Packeta', description: 'Pickup point delivery across Europe', estimatedDays: '3-5 days', price: 4.99, icon: 'https://cdn.packeta.com/images/v2/packeta-logo.svg' },
  { id: 'DPD', name: 'DPD', description: 'Express courier service', estimatedDays: '1-2 days', price: 12.99, icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/DPD_logo.svg/240px-DPD_logo.svg.png' },
  { id: 'INPOST', name: 'InPost', description: 'Parcel locker delivery', estimatedDays: '2-4 days', price: 3.99, icon: 'https://inpost.pl/themes/custom/inpost_theme/images/logo.svg' },
];

export default function CheckoutPage({ onSuccess }: { onSuccess?: (id: number) => void }) {
  const { items, remove, clear, total } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<'existing' | 'new'>('existing');
  const [userId, setUserId] = useState<number>(0);
  const [userForm, setUserForm] = useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCourier, setSelectedCourier] = useState<CourierService>('UPS');
  const [addresses, setAddresses] = useState<any[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressForm, setAddressForm] = useState({
    label: '',
    fullName: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA',
  });

  useEffect(() => {
    if (user) {
      loadAddresses();
    }
  }, [user]);

  async function loadAddresses() {
    try {
      const addrs = await api.getAddresses(user!.id);
      setAddresses(addrs);
      const defaultAddr = addrs.find((a: any) => a.isDefault);
      if (defaultAddr) {
        setSelectedAddressId(defaultAddr.id);
      }
    } catch (e) {
      console.error('Failed to load addresses', e);
    }
  }

  const handleModeExisting = () => {
    setMode('existing');
  };

  const handleModeNew = () => {
    setMode('new');
  };

  const handleUserIdChange = (value: string) => {
    const num = Number(value);
    setUserId(num);
  };

  const handleUserFormChange = (patch: Partial<typeof userForm>) => {
    setUserForm(prev => ({ ...prev, ...patch }));
  };

  async function placeOrder() {
    setLoading(true);
    setError(null);
    try {
      let uid = user?.id ?? userId;
      if (!user && mode === 'new') {
        const created = await api.createUser(userForm);
        if (created && typeof created.id !== 'undefined') {
          uid = created.id;
        }
      }

      // Get shipping address
      let shippingAddress = '';
      if (selectedAddressId) {
        const addr = addresses.find(a => a.id === selectedAddressId);
        if (addr) {
          shippingAddress = `${addr.fullName}, ${addr.street}, ${addr.city}, ${addr.state} ${addr.zipCode}, ${addr.country}`;
        }
      }

      const itemPayload: { productId: number; quantity: number }[] = [];
      for (let i = 0; i < items.length; i += 1) {
        const item = items[i];
        itemPayload.push({ productId: item.productId, quantity: item.quantity });
      }
      const payload = { 
        userId: Number(uid), 
        items: itemPayload,
        courier: selectedCourier,
        shippingAddress: shippingAddress || undefined,
      };
      const order = await api.createOrder(payload);
      clear();
      if (onSuccess) {
        const orderId = order?.id ?? order;
        onSuccess(orderId);
      }
      navigate('/shop/confirmation');
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  const selectedCourierOption = courierOptions.find(c => c.id === selectedCourier);
  const shippingCost = selectedCourierOption?.price || 0;
  const finalTotal = total + shippingCost;

  return (
    <div className="checkout-wrapper">
      <div className="checkout-container">
        <div className="checkout-main">
          <h2>Checkout</h2>
          {error && <div className="error">{error}</div>}

          {/* Order Items */}
          <div className="checkout-section">
            <h3>Order Summary</h3>
            <div className="checkout-items">
              {items.length === 0 ? (
                <p className="muted">Your cart is empty.</p>
              ) : items.map(it => (
                <div key={it.productId} className="checkout-item">
                  <div className="checkout-item-info">
                    <strong>{it.name}</strong>
                    <div className="muted">Quantity: {it.quantity}</div>
                  </div>
                  <div className="checkout-item-price">
                    <span>${(it.price * it.quantity).toFixed(2)}</span>
                    <button className="btn-text" onClick={() => remove(it.productId)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Address */}
          {user && (
            <div className="checkout-section">
              <div className="checkout-section-header">
                <h3>Shipping Address</h3>
                {!showAddressForm && (
                  <button className="btn-secondary" onClick={() => setShowAddressForm(true)}>
                    + Add New Address
                  </button>
                )}
              </div>
              {showAddressForm ? (
                <form className="address-form" onSubmit={async (e) => {
                  e.preventDefault();
                  try {
                    const newAddr = await api.createAddress({ ...addressForm, userId: user.id });
                    await loadAddresses();
                    setSelectedAddressId(newAddr.id);
                    setShowAddressForm(false);
                    setAddressForm({ label: '', fullName: '', street: '', city: '', state: '', zipCode: '', country: 'USA' });
                  } catch (e) {
                    console.error('Failed to create address');
                  }
                }}>
                  <input 
                    placeholder="Label (e.g., Home, Work)" 
                    value={addressForm.label}
                    onChange={e => setAddressForm({...addressForm, label: e.target.value})}
                    required 
                  />
                  <input 
                    placeholder="Full Name" 
                    value={addressForm.fullName}
                    onChange={e => setAddressForm({...addressForm, fullName: e.target.value})}
                    required 
                  />
                  <input 
                    placeholder="Street Address" 
                    value={addressForm.street}
                    onChange={e => setAddressForm({...addressForm, street: e.target.value})}
                    required 
                  />
                  <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px'}}>
                    <input 
                      placeholder="City" 
                      value={addressForm.city}
                      onChange={e => setAddressForm({...addressForm, city: e.target.value})}
                      required 
                    />
                    <input 
                      placeholder="State" 
                      value={addressForm.state}
                      onChange={e => setAddressForm({...addressForm, state: e.target.value})}
                      required 
                    />
                  </div>
                  <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px'}}>
                    <input 
                      placeholder="ZIP Code" 
                      value={addressForm.zipCode}
                      onChange={e => setAddressForm({...addressForm, zipCode: e.target.value})}
                      required 
                    />
                    <input 
                      placeholder="Country" 
                      value={addressForm.country}
                      onChange={e => setAddressForm({...addressForm, country: e.target.value})}
                    />
                  </div>
                  <div style={{display: 'flex', gap: '12px'}}>
                    <button type="submit" className="btn-primary">Save Address</button>
                    <button type="button" className="btn-secondary" onClick={() => { 
                      setShowAddressForm(false);
                      setAddressForm({ label: '', fullName: '', street: '', city: '', state: '', zipCode: '', country: 'USA' });
                    }}>Cancel</button>
                  </div>
                </form>
              ) : addresses.length > 0 ? (
                <div className="address-selection">
                  {addresses.map(addr => (
                    <label key={addr.id} className={`address-option ${selectedAddressId === addr.id ? 'selected' : ''}`}>
                      <input 
                        type="radio" 
                        name="address"
                        checked={selectedAddressId === addr.id}
                        onChange={() => setSelectedAddressId(addr.id)}
                      />
                      <div className="address-details">
                        <div className="address-header">
                          <strong>{addr.label}</strong>
                          {addr.isDefault && <span className="default-badge">Default</span>}
                        </div>
                        <div>{addr.fullName}</div>
                        <div className="muted">{addr.street}</div>
                        <div className="muted">{addr.city}, {addr.state} {addr.zipCode}</div>
                        <div className="muted">{addr.country}</div>
                      </div>
                    </label>
                  ))}
                </div>
              ) : (
                <p className="muted">No saved addresses. Add one above.</p>
              )}
            </div>
          )}

          {/* Courier Selection */}
          <div className="checkout-section">
            <h3>Delivery Method</h3>
            <div className="courier-options">
              {courierOptions.map(courier => (
                <label key={courier.id} className={`courier-option ${selectedCourier === courier.id ? 'selected' : ''}`}>
                  <input 
                    type="radio" 
                    name="courier"
                    value={courier.id}
                    checked={selectedCourier === courier.id}
                    onChange={(e) => setSelectedCourier(e.target.value as CourierService)}
                  />
                  <img src={courier.icon} alt={courier.name} className="courier-logo" style={{ width: '50px', height: '50px', objectFit: 'contain', marginRight: '12px' }} />
                  <div className="courier-info">
                    <div className="courier-header">
                      <strong>{courier.name}</strong>
                      <span className="courier-price">${courier.price.toFixed(2)}</span>
                    </div>
                    <div className="muted">{courier.description}</div>
                    <div className="courier-eta">Estimated delivery: {courier.estimatedDays}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="checkout-sidebar">
          {!user && (
            <div className="checkout-section">
              <h3>Account</h3>
              <div className="checkout-tabs">
                <button className={mode === 'existing' ? 'active' : ''} onClick={handleModeExisting}>Existing User</button>
                <button className={mode === 'new' ? 'active' : ''} onClick={handleModeNew}>New User</button>
              </div>
              {mode === 'existing' ? (
                <div className="checkout-form">
                  <label>
                    <span>User ID</span>
                    <input type="number" value={userId} onChange={e => handleUserIdChange(e.target.value)} required />
                  </label>
                </div>
              ) : (
                <div className="checkout-form">
                  <label>
                    <span>Username</span>
                    <input value={userForm.username} onChange={e => handleUserFormChange({ username: e.target.value })} required />
                  </label>
                  <label>
                    <span>Email</span>
                    <input type="email" value={userForm.email} onChange={e => handleUserFormChange({ email: e.target.value })} required />
                  </label>
                  <label>
                    <span>Password</span>
                    <input type="password" value={userForm.password} onChange={e => handleUserFormChange({ password: e.target.value })} required />
                  </label>
                </div>
              )}
            </div>
          )}

          {user && (
            <div className="checkout-section">
              <h3>Account</h3>
              <div className="user-info">
                <div className="user-avatar">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name || user.username} />
                  ) : (
                    <div className="avatar-placeholder">{(user.name || user.username)[0].toUpperCase()}</div>
                  )}
                </div>
                <div>
                  <strong>{user.name || user.username}</strong>
                  <div className="muted">{user.email}</div>
                </div>
              </div>
            </div>
          )}

          <div className="checkout-section">
            <h3>Order Total</h3>
            <div className="checkout-summary">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping ({selectedCourierOption?.name})</span>
                <span>${shippingCost.toFixed(2)}</span>
              </div>
              <div className="summary-row total">
                <strong>Total</strong>
                <strong>${finalTotal.toFixed(2)}</strong>
              </div>
            </div>
            <button className="btn-primary btn-block" onClick={placeOrder} disabled={loading || items.length === 0}>
              {loading ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
