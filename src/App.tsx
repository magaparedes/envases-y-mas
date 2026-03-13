import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Menu, 
  X, 
  ChevronRight, 
  Download, 
  Phone, 
  Mail, 
  Instagram, 
  Facebook,
  Package,
  Filter,
  ArrowRight
} from 'lucide-react';
import { PRODUCTS, CATEGORIES, Product } from './constants';

const Logo = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <div className="relative w-12 h-12 flex-shrink-0">
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        {/* Stylized 'E' from triangles as seen in PDF */}
        <path d="M20 20 L80 20 L50 50 Z" fill="#FFD700" /> {/* Top Yellow */}
        <path d="M20 20 L20 80 L50 50 Z" fill="#E91E63" /> {/* Left Magenta */}
        <path d="M20 80 L80 80 L50 50 Z" fill="#FFD700" /> {/* Bottom Yellow */}
        <path d="M80 20 L80 80 L50 50 Z" fill="#E91E63" className="opacity-40" /> {/* Right Magenta (Subtle) */}
        <path d="M45 45 L85 45 L85 55 L45 55 Z" fill="#F27D26" /> {/* Middle bar Orange */}
      </svg>
    </div>
    <div>
      <h1 className="text-2xl font-display font-black tracking-tighter text-slate-900 leading-none">
        ENVASES <span className="text-brand-orange">Y MÁS</span>
      </h1>
      <p className="text-[9px] uppercase tracking-[0.3em] text-slate-500 font-bold mt-1">
        Distribuidora Rosmar S.A.
      </p>
    </div>
  </div>
);

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [cart, setCart] = useState<{ product: Product; quantity: number; selectedSize?: string }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           product.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const addToCart = (product: Product, size?: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id && item.selectedSize === size);
      if (existing) {
        return prev.map(item => 
          (item.product.id === product.id && item.selectedSize === size) ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1, selectedSize: size }];
    });
    // Optional: Show a toast or feedback
  };

  const removeFromCart = (productId: string, size?: string) => {
    setCart(prev => prev.filter(item => !(item.product.id === productId && item.selectedSize === size)));
  };

  const updateQuantity = (productId: string, size: string | undefined, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === productId && item.selectedSize === size) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const sendWhatsAppOrder = () => {
    const message = `Hola Envases y Más! Me gustaría solicitar un presupuesto para los siguientes productos:\n\n` +
      cart.map(item => `- ${item.product.name}${item.selectedSize ? ` [Medida: ${item.selectedSize}]` : ''} (Cant: ${item.quantity})`).join('\n') +
      `\n\nQuedo a la espera de su respuesta. Gracias!`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/595974375968?text=${encodedMessage}`, '_blank');
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-brand-orange selection:text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-100 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <Logo />

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text"
                  placeholder="Buscar en el catálogo..."
                  className="pl-12 pr-6 py-3 bg-slate-100 border-none rounded-2xl text-sm focus:ring-2 focus:ring-brand-orange/20 transition-all w-80 font-medium"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-3 bg-slate-100 rounded-2xl text-slate-600 hover:bg-brand-orange hover:text-white transition-all"
              >
                <Package size={22} />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-6 h-6 bg-brand-orange text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                    {cart.reduce((acc, item) => acc + item.quantity, 0)}
                  </span>
                )}
              </button>

              <button 
                onClick={handleDownloadPDF}
                className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-sm font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10"
              >
                <Download size={18} />
                PDF
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex items-center gap-4 md:hidden">
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-slate-600"
              >
                <Package size={24} />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-orange text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                    {cart.length}
                  </span>
                )}
              </button>
              <button 
                className="p-2 text-slate-600"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-slate-50 no-print">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-yellow/10 to-transparent" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 bg-brand-orange/10 text-brand-orange text-xs font-bold uppercase tracking-widest rounded-full mb-6">
                Catálogo 2026
              </span>
              <h2 className="text-5xl md:text-7xl font-display font-bold text-slate-900 leading-[1.1] mb-8">
                Soluciones en <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-yellow">
                  Empaques y Envases
                </span>
              </h2>
              <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                Calidad, variedad y elegancia para tu negocio. Descubre nuestra amplia gama de productos descartables y de limpieza.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-4 bg-brand-orange text-white rounded-full font-bold hover:bg-orange-600 transition-all shadow-xl shadow-brand-orange/20 flex items-center gap-2">
                  Ver Productos <ArrowRight size={20} />
                </button>
                <div className="flex items-center gap-4 px-6 py-4 bg-white rounded-full shadow-sm border border-slate-100">
                  <div className="flex -space-x-2">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                        <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="User" referrerPolicy="no-referrer" />
                      </div>
                    ))}
                  </div>
                  <p className="text-sm font-medium text-slate-500">+500 clientes confían</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar Filters */}
          <aside className="lg:w-64 flex-shrink-0 no-print">
            <div className="sticky top-32">
              <div className="flex items-center gap-2 mb-8">
                <Filter size={20} className="text-brand-orange" />
                <h3 className="font-display font-bold text-lg uppercase tracking-wider">Categorías</h3>
              </div>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedCategory('All')}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all flex justify-between items-center ${
                    selectedCategory === 'All' 
                    ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/20' 
                    : 'text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  Todos los Productos
                  <ChevronRight size={14} className={selectedCategory === 'All' ? 'opacity-100' : 'opacity-0'} />
                </button>
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all flex justify-between items-center ${
                      selectedCategory === cat 
                      ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/20' 
                      : 'text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    {cat}
                    <ChevronRight size={14} className={selectedCategory === cat ? 'opacity-100' : 'opacity-0'} />
                  </button>
                ))}
              </div>

              {/* Contact Card */}
              <div className="mt-12 p-6 bg-slate-900 rounded-3xl text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-orange/20 rounded-full -mr-12 -mt-12 blur-2xl" />
                <h4 className="font-display font-bold mb-4">¿Necesitas ayuda?</h4>
                <p className="text-xs text-slate-400 mb-6 leading-relaxed">Contáctanos para presupuestos personalizados y pedidos al por mayor.</p>
                <a href="https://wa.me/595974375968" className="flex items-center gap-3 text-sm font-bold text-brand-yellow hover:underline">
                  <Phone size={16} /> 0974 375 968
                </a>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h3 className="text-3xl font-display font-bold text-slate-900 mb-2">
                  {selectedCategory === 'All' ? 'Nuestra Colección' : selectedCategory}
                </h3>
                <p className="text-slate-500 text-sm">Mostrando {filteredProducts.length} productos encontrados</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product, idx) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="group cursor-pointer"
                    onClick={() => {
                      setSelectedProduct(product);
                      setSelectedSize(product.sizes ? product.sizes[0] : null);
                    }}
                  >
                    <div className="relative aspect-square rounded-3xl overflow-hidden bg-slate-100 mb-4">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <span className="text-white text-sm font-bold flex items-center gap-2">
                          Ver detalles <ChevronRight size={16} />
                        </span>
                      </div>
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
                          {product.category}
                        </span>
                      </div>
                    </div>
                    <h4 className="font-display font-bold text-lg text-slate-900 group-hover:text-brand-orange transition-colors">
                      {product.name}
                    </h4>
                    <p className="text-slate-500 text-sm line-clamp-1 mt-1">
                      {product.details?.join(' • ')}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filteredProducts.length === 0 && (
              <div className="py-20 text-center">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                  <Search size={40} />
                </div>
                <h4 className="text-xl font-display font-bold text-slate-900 mb-2">No encontramos productos</h4>
                <p className="text-slate-500">Intenta con otra búsqueda o categoría.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-100 py-20 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 lg:col-span-2">
              <Logo className="mb-6" />
              <p className="text-slate-500 max-w-md leading-relaxed mb-8">
                Líderes en la distribución de envases, descartables y productos de limpieza en Paraguay. Calidad garantizada para tu hogar y negocio.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-brand-orange hover:text-white hover:border-brand-orange transition-all">
                  <Instagram size={20} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-brand-orange hover:text-white hover:border-brand-orange transition-all">
                  <Facebook size={20} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-display font-bold text-slate-900 mb-6 uppercase tracking-wider text-sm">Contacto</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-slate-500 text-sm">
                  <Phone size={18} className="text-brand-orange shrink-0" />
                  <div>
                    <p>0974 375 968</p>
                    <p>0981 636 464</p>
                  </div>
                </li>
                <li className="flex items-center gap-3 text-slate-500 text-sm">
                  <Mail size={18} className="text-brand-orange shrink-0" />
                  <p>ventascentral@envasesymas.com.py</p>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-display font-bold text-slate-900 mb-6 uppercase tracking-wider text-sm">Horario</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li>Lunes a Viernes: 07:30 - 17:30</li>
                <li>Sábados: 07:30 - 12:00</li>
                <li className="pt-4 text-brand-orange font-bold">¡Te esperamos!</li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400 font-medium uppercase tracking-widest">
            <p>© 2026 DISTRIBUIDORA ROSMAR S.A. - TODOS LOS DERECHOS RESERVADOS</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-brand-orange">Privacidad</a>
              <a href="#" className="hover:text-brand-orange">Términos</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Product Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setSelectedProduct(null);
                setSelectedSize(null);
              }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              layoutId={selectedProduct.id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row"
            >
              <button 
                onClick={() => {
                  setSelectedProduct(null);
                  setSelectedSize(null);
                }}
                className="absolute top-6 right-6 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full text-slate-900 hover:bg-white transition-colors shadow-sm"
              >
                <X size={20} />
              </button>

              <div className="md:w-1/2 h-80 md:h-auto bg-slate-100">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto max-h-[70vh] md:max-h-none">
                <span className="inline-block px-3 py-1 bg-brand-orange/10 text-brand-orange text-[10px] font-bold uppercase tracking-widest rounded-full mb-4">
                  {selectedProduct.category}
                </span>
                <h3 className="text-3xl font-display font-bold text-slate-900 mb-6">{selectedProduct.name}</h3>
                
                <div className="space-y-8">
                  {selectedProduct.sizes && (
                    <div>
                      <h5 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Seleccionar Medida</h5>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.sizes.map(size => (
                          <button 
                            key={size} 
                            onClick={() => setSelectedSize(size)}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
                              selectedSize === size 
                              ? 'bg-brand-orange text-white border-brand-orange shadow-md' 
                              : 'bg-slate-50 text-slate-700 border-slate-100 hover:bg-slate-100'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedProduct.details && (
                    <div>
                      <h5 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Especificaciones</h5>
                      <ul className="space-y-3">
                        {selectedProduct.details.map((detail, i) => (
                          <li key={i} className="flex items-center gap-3 text-slate-600 text-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="pt-8 border-t border-slate-100 flex gap-4">
                    <button 
                      onClick={() => {
                        addToCart(selectedProduct, selectedSize || undefined);
                        setSelectedProduct(null);
                        setSelectedSize(null);
                      }}
                      className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg flex items-center justify-center gap-2"
                    >
                      <Package size={20} /> Agregar al Pedido
                    </button>
                    <button 
                      onClick={() => {
                        const message = encodeURIComponent(`Hola! Me interesa el producto: ${selectedProduct.name}`);
                        window.open(`https://wa.me/595974375968?text=${message}`, '_blank');
                      }}
                      className="p-4 bg-brand-orange text-white rounded-2xl font-bold hover:bg-orange-600 transition-all shadow-lg shadow-brand-orange/20"
                    >
                      <Phone size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-[110] flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Package className="text-brand-orange" />
                  <h3 className="text-xl font-display font-bold">Tu Pedido</h3>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center text-slate-400">
                    <Package size={64} className="mb-4 opacity-20" />
                    <p className="text-lg font-medium">Tu pedido está vacío</p>
                    <p className="text-sm">Agrega productos para solicitar un presupuesto.</p>
                  </div>
                ) : (
                  cart.map((item, idx) => (
                    <div key={`${item.product.id}-${item.selectedSize || idx}`} className="flex gap-4">
                      <div className="w-20 h-20 bg-slate-100 rounded-2xl overflow-hidden flex-shrink-0">
                        <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-900 text-sm mb-1">{item.product.name}</h4>
                        <div className="flex flex-wrap gap-2 mb-2">
                          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">{item.product.category}</p>
                          {item.selectedSize && (
                            <span className="text-[10px] bg-brand-orange/10 text-brand-orange px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                              {item.selectedSize}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 bg-slate-50 rounded-lg p-1">
                            <button 
                              onClick={() => updateQuantity(item.product.id, item.selectedSize, -1)}
                              className="w-6 h-6 flex items-center justify-center hover:bg-white rounded shadow-sm transition-colors"
                            >
                              -
                            </button>
                            <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.product.id, item.selectedSize, 1)}
                              className="w-6 h-6 flex items-center justify-center hover:bg-white rounded shadow-sm transition-colors"
                            >
                              +
                            </button>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                            className="text-xs font-bold text-red-500 hover:underline"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-slate-100 bg-slate-50">
                  <button 
                    onClick={sendWhatsAppOrder}
                    className="w-full py-4 bg-brand-orange text-white rounded-2xl font-bold hover:bg-orange-600 transition-all shadow-xl shadow-brand-orange/20 flex items-center justify-center gap-3"
                  >
                    <Phone size={20} /> Solicitar Presupuesto
                  </button>
                  <p className="text-[10px] text-center text-slate-400 mt-4 uppercase tracking-widest font-bold">
                    Se enviará tu lista por WhatsApp
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Print View (Hidden on Screen) */}
      <div className="hidden print:block p-10">
        <div className="flex justify-between items-center mb-10 border-b pb-6">
          <div>
            <h1 className="text-3xl font-display font-bold">ENVASES Y MÁS</h1>
            <p className="text-sm text-slate-500">Distribuidora Rosmar S.A.</p>
          </div>
          <div className="text-right text-sm">
            <p>0974 375 968</p>
            <p>ventascentral@envasesymas.com.py</p>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold mb-8">Catálogo de Productos</h2>
        
        <div className="grid grid-cols-2 gap-10">
          {PRODUCTS.map(p => (
            <div key={p.id} className="border p-6 rounded-xl">
              <h3 className="font-bold text-lg mb-2">{p.name}</h3>
              <p className="text-sm text-slate-600 mb-4">{p.category}</p>
              {p.sizes && <p className="text-xs mb-2"><strong>Medidas:</strong> {p.sizes.join(', ')}</p>}
              {p.details && <p className="text-xs"><strong>Detalles:</strong> {p.details.join(' • ')}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
