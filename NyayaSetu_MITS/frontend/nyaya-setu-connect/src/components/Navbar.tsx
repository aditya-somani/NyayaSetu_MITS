
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Scale, 
  Menu, 
  X, 
  User, 
  FileText, 
  Phone,
  LogIn,
  UserPlus,
  Sparkles
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const navItems = [
    { name: 'Home', href: '/', icon: Scale },
    { name: 'Dashboard', href: '/dashboard', icon: User },
    { name: 'Complaints', href: '/complaints', icon: FileText },
    { name: 'Legal Help', href: '/legal', icon: Scale },
    { name: 'Contact', href: '/contact', icon: Phone },
  ];

  const isActive = (path: string) => location.pathname === path;

  // Different styles for home page vs other pages
  const navbarClasses = isHomePage 
    ? "fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-xl border-b border-gray-800/50"
    : "fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b shadow-sm";

  const logoTextClasses = isHomePage
    ? "text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent"
    : "text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent";

  const navItemClasses = (itemHref: string) => isHomePage
    ? `px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
        isActive(itemHref)
          ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
          : 'text-gray-300 hover:text-blue-400 hover:bg-blue-500/10'
      }`
    : `px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
        isActive(itemHref)
          ? 'bg-blue-100 text-blue-700'
          : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
      }`;

  const mobileMenuClasses = isHomePage
    ? "md:hidden bg-black/90 backdrop-blur-xl border-t border-gray-800/50 shadow-lg"
    : "md:hidden bg-white border-t shadow-lg";

  const mobileItemClasses = (itemHref: string) => isHomePage
    ? `flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
        isActive(itemHref)
          ? 'bg-blue-500/20 text-blue-300'
          : 'text-gray-300 hover:bg-blue-500/10'
      }`
    : `flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
        isActive(itemHref)
          ? 'bg-blue-100 text-blue-700'
          : 'text-gray-600 hover:bg-blue-50'
      }`;

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={navbarClasses}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center relative overflow-hidden"
            >
              {isHomePage && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
              )}
              <Scale className="w-6 h-6 text-white relative z-10" />
            </motion.div>
            <div className="hidden sm:block">
              <h1 className={logoTextClasses}>
                NyayaSetu
              </h1>
              <p className={`text-xs -mt-1 ${isHomePage ? 'text-gray-400' : 'text-gray-500'}`}>
                Justice Platform
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link key={item.name} to={item.href}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={navItemClasses(item.href)}
                >
                  <div className="flex items-center space-x-2">
                    <item.icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {isHomePage && (
              <Badge className="px-3 py-1 bg-blue-500/20 text-blue-300 border-blue-500/30 hover:bg-blue-500/30">
                <Sparkles className="w-3 h-3 mr-1" />
                Beta
              </Badge>
            )}
            <Link to="/auth">
              <Button 
                variant="ghost" 
                className={isHomePage 
                  ? "text-gray-300 hover:text-blue-400 hover:bg-blue-500/10" 
                  : "text-gray-600 hover:text-blue-600"
                }
              >
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </Button>
            </Link>
            <Link to="/auth">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 relative overflow-hidden group">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10 flex items-center">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Register
                  </span>
                </Button>
              </motion.div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <motion.div
              animate={{ rotate: isMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.div>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={mobileMenuClasses}
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={item.href} onClick={() => setIsMenuOpen(false)}>
                    <motion.div
                      whileTap={{ scale: 0.95 }}
                      className={mobileItemClasses(item.href)}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
              
              <div className="pt-4 border-t border-gray-700/50 space-y-2">
                {isHomePage && (
                  <Badge className="mb-2 px-3 py-1 bg-blue-500/20 text-blue-300 border-blue-500/30">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Beta Version
                  </Badge>
                )}
                <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                  <Button 
                    variant="ghost" 
                    className={`w-full justify-start ${
                      isHomePage ? "text-gray-300 hover:bg-blue-500/10" : ""
                    }`}
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Login
                  </Button>
                </Link>
                <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Register
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
