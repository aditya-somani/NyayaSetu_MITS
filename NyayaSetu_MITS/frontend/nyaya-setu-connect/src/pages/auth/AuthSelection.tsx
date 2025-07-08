
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Scale, Building2, Shield, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const AuthSelection = () => {
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

  const roles = [
    {
      title: "Citizen",
      description: "Access government services and file complaints",
      icon: User,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      borderColor: "border-blue-200",
      path: "/auth/user/login",
      registerPath: "/auth/user/register"
    },
    {
      title: "Legal Professional",
      description: "Provide legal assistance and consultation",
      icon: Scale,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      borderColor: "border-purple-200",
      path: "/auth/lawyer/login",
      registerPath: "/auth/lawyer/register"
    },
    {
      title: "Government Employee",
      description: "Manage cases and provide official responses",
      icon: Building2,
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
      borderColor: "border-orange-200",
      path: "/auth/employee/login",
      registerPath: null
    },
    {
      title: "Administrator",
      description: "System administration and oversight",
      icon: Shield,
      color: "from-red-500 to-gray-600",
      bgColor: "bg-red-50",
      textColor: "text-red-600",
      borderColor: "border-red-200",
      path: "/auth/admin/login",
      registerPath: null
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center p-4">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-blue-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-6xl relative z-10"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <Badge className="mb-6 px-6 py-3 text-lg font-medium bg-blue-100 text-blue-800 border-blue-200">
            <Sparkles className="w-5 h-5 mr-2" />
            NyayaSetu Authentication
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Choose Your Role
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select your access level to continue to the appropriate portal
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {roles.map((role, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group"
            >
              <Card className={`h-full ${role.bgColor} ${role.borderColor} border-2 hover:shadow-2xl transition-all duration-300 backdrop-blur-sm`}>
                <CardHeader className="text-center pb-4">
                  <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${role.color} rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <role.icon className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className={`text-2xl font-bold ${role.textColor} mb-2`}>
                    {role.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-center">
                    {role.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0 space-y-4">
                  <Link to={role.path}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-full bg-gradient-to-r ${role.color} text-white py-3 px-6 rounded-xl font-semibold flex items-center justify-center group transition-all duration-300 shadow-lg hover:shadow-xl`}
                    >
                      Sign In
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </motion.div>
                  </Link>
                  
                  {role.registerPath && (
                    <Link to={role.registerPath}>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-full border-2 border-current ${role.textColor} py-3 px-6 rounded-xl font-semibold text-center hover:bg-current hover:text-white transition-all duration-300`}
                      >
                        Register
                      </motion.div>
                    </Link>
                  )}
                  
                  {!role.registerPath && (
                    <div className="text-center text-sm text-gray-500 py-3">
                      Contact administrator for access
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div variants={itemVariants} className="text-center mt-16">
          <Link 
            to="/" 
            className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors text-lg font-medium"
          >
            ← Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AuthSelection;
