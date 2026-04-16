import React from 'react';
import { ShoppingCart, Search, Menu, X, ChevronRight, CreditCard, Truck, ShieldCheck, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn, formatCurrency } from '@/src/lib/utils';
import { Product, CartItem, PRODUCTS } from '@/src/types';

export default function App() {
  const [cart, setCart] = React.useState<CartItem[]>([]);
  const [currency, setCurrency] = React.useState<'USD' | 'INR'>('USD');
  const [view, setView] = React.useState<'home' | 'checkout'>('home');
  const [category, setCategory] = React.useState<string>('All');
  const [searchQuery, setSearchQuery] = React.useState('');

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const filteredProducts = PRODUCTS.filter(p => {
    const matchesCategory = category === 'All' || p.category === category;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex h-screen overflow-hidden bg-bg">
      {/* Sidebar Navigation */}
      <aside className="w-60 border-r border-border-dim p-8 flex flex-col gap-10 flex-shrink-0">
        <div 
          onClick={() => { setView('home'); setCategory('All'); }}
          className="text-2xl font-black tracking-tighter text-accent cursor-pointer hover:scale-105 transition-transform"
        >
          HOOPSHUB
        </div>
        
        <nav className="flex flex-col gap-6">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-dim">Categories</p>
          <ul className="space-y-4">
            {['All', 'Jerseys', 'Shoes', 'Accessories'].map(cat => (
              <li 
                key={cat}
                onClick={() => { setCategory(cat); setView('home'); }}
                className={cn(
                  "flex items-center gap-3 text-sm font-bold cursor-pointer transition-colors hover:text-white",
                  category === cat ? "text-white" : "text-text-dim"
                )}
              >
                {category === cat && <div className="w-1.5 h-1.5 rounded-full bg-accent" />}
                {cat.toUpperCase()}
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto space-y-6">
          <div className="text-xs font-bold text-text-dim hover:text-white cursor-pointer transition-colors uppercase tracking-widest">Support</div>
          <div className="text-xs font-bold text-text-dim hover:text-white cursor-pointer transition-colors uppercase tracking-widest">Shipping Info</div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header / Search */}
        <header className="h-20 border-b border-border-dim px-8 flex items-center justify-between flex-shrink-0">
          <div className="relative w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-dim" size={18} />
            <input 
              type="text" 
              placeholder="Search player, team or brand..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-glass border border-border-dim rounded-full py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:border-accent transition-colors"
            />
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setCurrency(prev => prev === 'USD' ? 'INR' : 'USD')}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-glass border border-border-dim hover:bg-white/10 transition-colors text-[10px] font-black tracking-widest uppercase"
            >
              <Globe size={14} />
              {currency}
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {view === 'home' ? (
            <div className="space-y-12">
              {/* Hero Banner */}
              <section className="relative h-64 rounded-3xl overflow-hidden group">
                <img 
                  src="https://picsum.photos/seed/lebron-immersive/1200/400" 
                  alt="Hero" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-2">New Arrival</p>
                  <h1 className="text-4xl font-black uppercase tracking-tighter leading-none mb-2">LEBRON XX <br /> TRIPLE BLACK</h1>
                  <p className="text-sm text-text-dim max-w-md">Engineered for the next generation of players. Full-length Zoom Air for ultimate responsiveness.</p>
                </div>
              </section>

              {/* Product Grid */}
              <section>
                <div className="flex justify-between items-end mb-8">
                  <h2 className="text-xl font-black uppercase tracking-tight">{category} Collection</h2>
                  <span className="text-xs font-bold text-text-dim">{filteredProducts.length} Results</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map((product, idx) => (
                    <motion.div 
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="immersive-card p-5 group"
                    >
                      <div className="relative aspect-[4/3] bg-zinc-900 rounded-xl overflow-hidden mb-4">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="bg-black/60 backdrop-blur-md text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded border border-white/10">
                            {product.category}
                          </span>
                        </div>
                      </div>
                      <h3 className="font-bold text-sm mb-1 group-hover:text-accent transition-colors">{product.name}</h3>
                      <p className="text-text-dim text-[10px] mb-4 line-clamp-1 uppercase tracking-wider">{product.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-black text-accent">{formatCurrency(product.price, currency)}</span>
                        <button 
                          onClick={() => addToCart(product)}
                          className="bg-white text-black px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-accent hover:text-white transition-colors"
                        >
                          Add
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            </div>
          ) : (
            <CheckoutView 
              cart={cart} 
              total={cartTotal} 
              currency={currency} 
              onBack={() => setView('home')} 
              onSuccess={() => {
                setCart([]);
                setView('home');
              }}
            />
          )}
        </div>
      </main>

      {/* Right Panel: Cart / Summary */}
      <aside className="w-80 glass-panel flex flex-col flex-shrink-0">
        <div className="p-8 border-b border-border-dim flex justify-between items-center">
          <h2 className="text-sm font-black uppercase tracking-[0.2em]">Cart ({cartCount})</h2>
          <div className="flex gap-1">
            <div className="w-1 h-1 rounded-full bg-accent" />
            <div className="w-1 h-1 rounded-full bg-accent opacity-50" />
            <div className="w-1 h-1 rounded-full bg-accent opacity-20" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-30">
              <ShoppingCart size={40} className="mb-4" />
              <p className="text-xs font-bold uppercase tracking-widest">Empty Cart</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex gap-4 group">
                <div className="w-16 h-16 bg-zinc-900 rounded-lg overflow-hidden flex-shrink-0 border border-border-dim">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="flex-1 flex flex-col justify-center min-w-0">
                  <h4 className="font-bold text-xs truncate">{item.name}</h4>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-[10px] text-text-dim font-bold uppercase tracking-widest">x{item.quantity}</span>
                    <span className="text-xs font-black text-accent">{formatCurrency(item.price * item.quantity, currency)}</span>
                  </div>
                  <div className="flex gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => updateQuantity(item.id, -1)} className="text-[10px] text-text-dim hover:text-white">-</button>
                    <button onClick={() => updateQuantity(item.id, 1)} className="text-[10px] text-text-dim hover:text-white">+</button>
                    <button onClick={() => removeFromCart(item.id)} className="text-[10px] text-red-500 hover:text-red-400 ml-auto">Remove</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-8 border-t border-border-dim bg-black/40">
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-text-dim">
              <span>Subtotal</span>
              <span>{formatCurrency(cartTotal, currency)}</span>
            </div>
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-text-dim">
              <span>Shipping</span>
              <span className="text-green-500">Free</span>
            </div>
            <div className="flex justify-between text-sm font-black uppercase tracking-widest pt-3 border-t border-border-dim">
              <span>Total</span>
              <span className="text-accent">{formatCurrency(cartTotal, currency)}</span>
            </div>
          </div>

          {view === 'home' && cart.length > 0 && (
            <button 
              onClick={() => setView('checkout')}
              className="w-full accent-button py-4 text-xs"
            >
              Secure Checkout
            </button>
          )}

          <div className="mt-6 flex justify-center gap-4 opacity-30 grayscale">
            <div className="text-[8px] font-black border border-white px-1">VISA</div>
            <div className="text-[8px] font-black border border-white px-1">STRIPE</div>
            <div className="text-[8px] font-black border border-white px-1">APPLE</div>
          </div>
          
          <div className="mt-4 flex items-center justify-center gap-2 text-[8px] font-bold text-green-500/60 uppercase tracking-widest">
            <ShieldCheck size={10} />
            SSL Encrypted Payment
          </div>
        </div>
      </aside>
    </div>
  );
}

function CheckoutView({ cart, total, currency, onBack, onSuccess }: { 
  cart: CartItem[], 
  total: number, 
  currency: 'USD' | 'INR',
  onBack: () => void,
  onSuccess: () => void
}) {
  const [step, setStep] = React.useState(1);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [formData, setFormData] = React.useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
      return;
    }

    setIsProcessing(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart,
          total: formatCurrency(total, currency),
          billing: formData,
          shipping: formData
        })
      });
      const data = await response.json();
      if (data.success) {
        onSuccess();
        alert(`Order Placed! Order ID: ${data.orderId}`);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <button onClick={onBack} className="flex items-center gap-2 text-text-dim hover:text-white mb-10 font-black uppercase tracking-[0.2em] text-[10px] transition-colors">
        <ChevronRight className="rotate-180" size={14} /> Back to Shop
      </button>

      <div className="grid grid-cols-1 gap-12">
        <div className="space-y-12">
          {/* Stepper */}
          <div className="flex items-center gap-4 max-w-md mx-auto">
            {[1, 2, 3].map(i => (
              <React.Fragment key={i}>
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black transition-all duration-500",
                  step >= i ? "bg-accent text-white shadow-lg shadow-accent/20" : "bg-glass text-text-dim border border-border-dim"
                )}>
                  {i}
                </div>
                {i < 3 && <div className={cn("flex-1 h-[1px] transition-colors duration-500", step > i ? "bg-accent" : "bg-border-dim")} />}
              </React.Fragment>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                    <Truck size={20} />
                  </div>
                  <h3 className="text-xl font-black uppercase tracking-tight">Shipping Details</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2">
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-text-dim mb-3">Email Address</label>
                    <input required name="email" value={formData.email} onChange={handleInputChange} type="email" className="w-full p-4 bg-glass border border-border-dim rounded-xl focus:border-accent outline-none transition-colors text-sm" placeholder="lebron@example.com" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-text-dim mb-3">First Name</label>
                    <input required name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full p-4 bg-glass border border-border-dim rounded-xl focus:border-accent outline-none transition-colors text-sm" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-text-dim mb-3">Last Name</label>
                    <input required name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full p-4 bg-glass border border-border-dim rounded-xl focus:border-accent outline-none transition-colors text-sm" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-text-dim mb-3">Address</label>
                    <input required name="address" value={formData.address} onChange={handleInputChange} className="w-full p-4 bg-glass border border-border-dim rounded-xl focus:border-accent outline-none transition-colors text-sm" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-text-dim mb-3">City</label>
                    <input required name="city" value={formData.city} onChange={handleInputChange} className="w-full p-4 bg-glass border border-border-dim rounded-xl focus:border-accent outline-none transition-colors text-sm" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-text-dim mb-3">ZIP Code</label>
                    <input required name="zip" value={formData.zip} onChange={handleInputChange} className="w-full p-4 bg-glass border border-border-dim rounded-xl focus:border-accent outline-none transition-colors text-sm" />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                    <CreditCard size={20} />
                  </div>
                  <h3 className="text-xl font-black uppercase tracking-tight">Payment Method</h3>
                </div>

                <div className="relative p-8 bg-gradient-to-br from-zinc-800 to-black rounded-3xl border border-white/10 overflow-hidden group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 blur-[100px] rounded-full -mr-32 -mt-32" />
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-16">
                      <div className="w-12 h-8 bg-zinc-700/50 rounded-md border border-white/10" />
                      <ShieldCheck className="text-accent" size={24} />
                    </div>
                    <div className="space-y-6">
                      <div className="text-2xl tracking-[0.25em] font-mono text-white/90">
                        {formData.cardNumber || '•••• •••• •••• ••••'}
                      </div>
                      <div className="flex justify-between items-end">
                        <div className="space-y-1">
                          <p className="text-[8px] font-black uppercase tracking-widest text-text-dim">Card Holder</p>
                          <p className="text-xs font-bold uppercase tracking-wider">{formData.firstName || 'First'} {formData.lastName || 'Last'}</p>
                        </div>
                        <div className="text-right space-y-1">
                          <p className="text-[8px] font-black uppercase tracking-widest text-text-dim">Expires</p>
                          <p className="text-xs font-bold">{formData.expiry || 'MM/YY'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-text-dim mb-3">Card Number</label>
                    <input required name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} className="w-full p-4 bg-glass border border-border-dim rounded-xl focus:border-accent outline-none transition-colors text-sm" placeholder="0000 0000 0000 0000" />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-text-dim mb-3">Expiry Date</label>
                      <input required name="expiry" value={formData.expiry} onChange={handleInputChange} className="w-full p-4 bg-glass border border-border-dim rounded-xl focus:border-accent outline-none transition-colors text-sm" placeholder="MM/YY" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-text-dim mb-3">CVV</label>
                      <input required name="cvv" value={formData.cvv} onChange={handleInputChange} className="w-full p-4 bg-glass border border-border-dim rounded-xl focus:border-accent outline-none transition-colors text-sm" placeholder="123" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                <h3 className="text-xl font-black uppercase tracking-tight">Final Review</h3>
                <div className="immersive-card p-8 space-y-6">
                  <div className="flex justify-between items-center py-4 border-b border-border-dim">
                    <span className="text-[10px] font-black uppercase tracking-widest text-text-dim">Shipping To</span>
                    <span className="text-sm font-bold">{formData.address}, {formData.city}</span>
                  </div>
                  <div className="flex justify-between items-center py-4 border-b border-border-dim">
                    <span className="text-[10px] font-black uppercase tracking-widest text-text-dim">Payment</span>
                    <span className="text-sm font-bold">Card ending in {formData.cardNumber.slice(-4) || '••••'}</span>
                  </div>
                  <div className="flex justify-between items-center py-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-text-dim">Total Amount</span>
                    <span className="text-xl font-black text-accent">{formatCurrency(total, currency)}</span>
                  </div>
                </div>
                <div className="p-4 bg-accent/5 border border-accent/10 rounded-xl text-[10px] font-bold text-accent uppercase tracking-widest text-center">
                  Secure SSL Encrypted Transaction
                </div>
              </motion.div>
            )}

            <div className="flex gap-4">
              {step > 1 && (
                <button 
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="flex-1 py-4 border border-border-dim rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-glass transition-colors"
                >
                  Back
                </button>
              )}
              <button 
                disabled={isProcessing}
                className="flex-[2] accent-button py-4 text-[10px] disabled:bg-zinc-800 disabled:text-text-dim disabled:shadow-none"
              >
                {isProcessing ? 'Processing...' : step === 3 ? 'Confirm Order' : 'Continue'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
