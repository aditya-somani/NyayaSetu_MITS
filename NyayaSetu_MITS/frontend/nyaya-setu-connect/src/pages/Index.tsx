import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Scale, 
  Shield, 
  Zap,
  ArrowRight,
  MousePointer2,
  Sparkles,
  Users,
  FileText,
  Globe
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const FloatingOrb = ({ delay = 0, duration = 20, size = 100 }) => (
  <motion.div
    className="absolute rounded-full bg-gradient-to-r from-blue-400/20 to-purple-600/20 blur-xl"
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

const GridPattern = () => (
  <div className="absolute inset-0 overflow-hidden">
    <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(59, 130, 246, 0.1)" strokeWidth="1"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-600/5"
      animate={{ opacity: [0.3, 0.7, 0.3] }}
      transition={{ duration: 4, repeat: Infinity }}
    />
  </div>
);

const ParticleField = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 10,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute bg-blue-400/30 rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            left: particle.x,
            top: particle.y,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0, 1, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 6,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

const Index = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const scaleSpring = useSpring(scale, springConfig);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove);
      return () => heroElement.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: "spring" as const, 
        stiffness: 100, 
        damping: 15 
      }
    }
  };

  const features = [
    {
      icon: Scale,
      title: "Legal Framework",
      desc: "Comprehensive legal support and framework for all government services",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Shield,
      title: "Secure Platform",
      desc: "Enterprise-grade security protecting your sensitive information",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Users,
      title: "Expert Network",
      desc: "Connect with verified legal professionals and government experts",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Globe,
      title: "Digital Government",
      desc: "Seamless integration with government services and departments",
      color: "from-orange-500 to-red-500"
    }
  ];

  const stats = [
    { number: "50K+", label: "Cases Resolved", icon: FileText },
    { number: "1.2K+", label: "Legal Experts", icon: Users },
    { number: "98%", label: "Success Rate", icon: Shield },
    { number: "24/7", label: "Support", icon: Zap }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <Navbar />
      
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <GridPattern />
        <ParticleField />
        
        {/* Floating Orbs */}
        <FloatingOrb delay={0} duration={25} size={200} />
        <FloatingOrb delay={5} duration={30} size={150} />
        <FloatingOrb delay={10} duration={20} size={100} />
        
        {/* Interactive Gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-blue-500/10 via-transparent to-transparent"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)`
          }}
        />
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-10"
      >
        {/* Hero Section */}
        <motion.section 
          ref={heroRef}
          style={{ y, opacity, scale: scaleSpring }}
          className="min-h-screen flex items-center justify-center px-4 relative"
        >
          <div className="max-w-6xl mx-auto text-center">
            <motion.div variants={itemVariants} className="mb-8">
              <Badge className="mb-6 px-6 py-3 text-sm font-medium bg-blue-500/20 text-blue-300 border-blue-500/30 hover:bg-blue-500/30">
                <Sparkles className="w-4 h-4 mr-2" />
                Next-Gen Government Services
              </Badge>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-8">
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent animate-pulse-slow">
                  NyayaSetu
                </span>
              </h1>
              
              <motion.div
                className="text-xl md:text-2xl lg:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
                variants={itemVariants}
              >
                <motion.span
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1, duration: 0.8 }}
                >
                  Bridging the gap between citizens and justice through
                </motion.span>
                <br />
                <motion.span
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.5, duration: 0.8 }}
                  className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent font-semibold"
                >
                  intelligent government services
                </motion.span>
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/auth/register">
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button 
                    size="lg" 
                    className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-12 py-6 text-lg font-semibold border-0 shadow-2xl shadow-blue-500/25"
                  >
                    <span className="relative z-10 flex items-center">
                      Get Started
                      <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "0%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </Button>
                </motion.div>
              </Link>
              
              <Link to="/complaints">
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="px-12 py-6 text-lg font-semibold border-2 border-blue-400/50 text-blue-400 hover:bg-blue-400/10 backdrop-blur-sm"
                  >
                    <MousePointer2 className="mr-3 h-5 w-5" />
                    File Complaint
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </motion.section>

        {/* Stats Section */}
        <motion.section 
          variants={containerVariants}
          className="py-24 px-4 relative"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.1, y: -10 }}
                  className="text-center group cursor-pointer"
                >
                  <div className="relative mb-4">
                    <motion.div 
                      className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform duration-300"
                      whileHover={{ rotate: 12 }}
                    >
                      <stat.icon className="w-8 h-8 text-white" />
                    </motion.div>
                  </div>
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section 
          variants={containerVariants}
          className="py-24 px-4 relative"
        >
          <div className="max-w-7xl mx-auto">
            <motion.div variants={itemVariants} className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-bold mb-8">
                <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  Powerful Features
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Built with cutting-edge technology to provide seamless government service experiences
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -20, rotateY: 5 }}
                  className="group relative"
                >
                  <div className="relative h-full p-8 bg-gradient-to-br from-gray-900/50 to-gray-800/30 rounded-3xl border border-gray-700/50 backdrop-blur-sm overflow-hidden">
                    {/* Animated background */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                    />
                    
                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-300">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-400 leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section 
          variants={containerVariants}
          className="py-24 px-4 relative"
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.div variants={itemVariants}>
              <h2 className="text-5xl md:text-6xl font-bold mb-8">
                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                  Ready to Transform
                </span>
                <br />
                <span className="text-white">Government Services?</span>
              </h2>
            </motion.div>
            
            <motion.p variants={itemVariants} className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Join thousands of citizens who trust NyayaSetu for transparent, efficient, and accessible government services
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/auth">
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    size="lg" 
                    className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-12 py-6 text-lg font-semibold border-0 shadow-2xl shadow-blue-500/25"
                  >
                    Get Started Today
                    <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              </Link>
              
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="px-12 py-6 text-lg font-semibold border-2 border-gray-600 text-gray-300 hover:bg-gray-800/50 backdrop-blur-sm"
                >
                  Learn More
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </motion.div>

      <Footer />
    </div>
  );
};

export default Index;
