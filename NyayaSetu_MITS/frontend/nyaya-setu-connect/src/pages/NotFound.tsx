
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  ArrowLeft, 
  Search, 
  AlertTriangle,
  Sparkles,
  Bot,
  RefreshCw
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const FloatingOrb = ({ delay = 0, duration = 20, size = 100 }) => (
  <motion.div
    className="absolute rounded-full bg-gradient-to-r from-red-400/20 to-orange-600/20 blur-xl"
    style={{ width: size, height: size }}
    animate={{
      x: [0, 100, -50, 0],
      y: [0, -100, 50, 0],
      scale: [1, 1.2, 0.8, 1],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  />
);

const NotFound = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  const glitchVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: [1, 0.8, 1, 0.9, 1],
      x: [0, -2, 2, -1, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse" as const
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900 text-white overflow-hidden flex items-center justify-center">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <FloatingOrb delay={0} duration={25} size={200} />
        <FloatingOrb delay={5} duration={30} size={150} />
        <FloatingOrb delay={10} duration={20} size={100} />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-404" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(239, 68, 68, 0.3)" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-404)" />
          </svg>
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl mx-auto text-center px-4"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <Badge className="mb-6 px-6 py-3 text-lg font-medium bg-red-500/20 text-red-300 border-red-500/30">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Page Not Found
          </Badge>
        </motion.div>

        <motion.div variants={glitchVariants} className="mb-8">
          <h1 className="text-8xl md:text-9xl lg:text-[12rem] font-bold mb-6">
            <span className="bg-gradient-to-r from-red-400 via-orange-500 to-yellow-400 bg-clip-text text-transparent">
              404
            </span>
          </h1>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
            Oops! This page seems to be{' '}
            <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              lost in the system
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            The page you're looking for might have been moved, deleted, or doesn't exist. 
            Don't worry, our justice system will help you find your way back.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-12">
          <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-center mb-4">
              <Bot className="w-8 h-8 text-red-400 mr-3" />
              <span className="text-lg font-semibold text-red-300">Auto-redirect in progress</span>
            </div>
            <p className="text-gray-300 mb-4">
              You'll be automatically redirected to the homepage in:
            </p>
            <div className="text-4xl font-bold text-red-400 mb-2">
              {countdown}
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <motion.div 
                className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full"
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 10, ease: "linear" }}
              />
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link to="/">
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring" as const, stiffness: 400, damping: 17 }}
            >
              <Button 
                size="lg" 
                className="group relative overflow-hidden bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 px-12 py-6 text-lg font-semibold border-0 shadow-2xl shadow-red-500/25"
              >
                <span className="relative z-10 flex items-center">
                  <Home className="mr-3 h-5 w-5" />
                  Go Home
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
              </Button>
            </motion.div>
          </Link>
          
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring" as const, stiffness: 400, damping: 17 }}
          >
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => window.history.back()}
              className="px-12 py-6 text-lg font-semibold border-2 border-red-400/50 text-red-400 hover:bg-red-400/10 backdrop-blur-sm"
            >
              <ArrowLeft className="mr-3 h-5 w-5" />
              Go Back
            </Button>
          </motion.div>
          
          <Link to="/complaints">
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring" as const, stiffness: 400, damping: 17 }}
            >
              <Button 
                variant="outline" 
                size="lg" 
                className="px-12 py-6 text-lg font-semibold border-2 border-orange-400/50 text-orange-400 hover:bg-orange-400/10 backdrop-blur-sm"
              >
                <Search className="mr-3 h-5 w-5" />
                File Complaint
              </Button>
            </motion.div>
          </Link>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-16">
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <Link to="/auth" className="group">
              <motion.div
                whileHover={{ y: -5 }}
                className="p-6 bg-gradient-to-br from-gray-800/50 to-gray-700/30 rounded-2xl border border-gray-600/50 backdrop-blur-sm transition-all duration-300 group-hover:border-red-400/50"
              >
                <Sparkles className="w-8 h-8 text-red-400 mb-4 mx-auto" />
                <h3 className="text-lg font-semibold text-white mb-2">Authentication</h3>
                <p className="text-gray-400 text-sm">Access your account or create new one</p>
              </motion.div>
            </Link>
            
            <Link to="/legal" className="group">
              <motion.div
                whileHover={{ y: -5 }}
                className="p-6 bg-gradient-to-br from-gray-800/50 to-gray-700/30 rounded-2xl border border-gray-600/50 backdrop-blur-sm transition-all duration-300 group-hover:border-orange-400/50"
              >
                <RefreshCw className="w-8 h-8 text-orange-400 mb-4 mx-auto" />
                <h3 className="text-lg font-semibold text-white mb-2">Legal Services</h3>
                <p className="text-gray-400 text-sm">Get legal assistance and consultation</p>
              </motion.div>
            </Link>
            
            <Link to="/dashboard" className="group">
              <motion.div
                whileHover={{ y: -5 }}
                className="p-6 bg-gradient-to-br from-gray-800/50 to-gray-700/30 rounded-2xl border border-gray-600/50 backdrop-blur-sm transition-all duration-300 group-hover:border-yellow-400/50"
              >
                <Home className="w-8 h-8 text-yellow-400 mb-4 mx-auto" />
                <h3 className="text-lg font-semibold text-white mb-2">Dashboard</h3>
                <p className="text-gray-400 text-sm">Access your personal dashboard</p>
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
