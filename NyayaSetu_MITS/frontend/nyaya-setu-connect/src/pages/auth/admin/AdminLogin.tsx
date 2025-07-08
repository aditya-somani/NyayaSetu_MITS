
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, EyeOff, Mail, Lock, Shield, ArrowLeft, Sparkles, ShieldCheck, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    adminId: '',
    email: '',
    password: '',
    securityCode: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Admin login:', formData);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-black to-gray-900 flex items-center justify-center p-4">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-red-600 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gray-600 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md relative z-10"
      >
        <motion.div variants={itemVariants} className="text-center mb-8">
          <Link to="/auth" className="inline-flex items-center text-red-400 hover:text-red-300 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to selection
          </Link>
          <Badge className="mb-4 px-4 py-2 bg-red-900/50 text-red-200 border-red-800">
            <Crown className="w-4 h-4 mr-2" />
            System Administrator
          </Badge>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="backdrop-blur-sm bg-gray-900/80 border border-red-800/50 shadow-2xl">
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-red-400 to-gray-300 bg-clip-text text-transparent">
                Admin Access
              </CardTitle>
              <CardDescription className="text-gray-400">
                Maximum security clearance required
              </CardDescription>
              <div className="flex items-center justify-center space-x-2 text-sm text-red-400 bg-red-900/30 px-3 py-2 rounded-lg border border-red-800/50">
                <ShieldCheck className="w-4 h-4" />
                <span>Highest Level Security</span>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <motion.div variants={itemVariants} className="space-y-2">
                  <Label htmlFor="adminId" className="text-sm font-medium text-gray-300">
                    Administrator ID
                  </Label>
                  <div className="relative">
                    <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                    <Input
                      id="adminId"
                      type="text"
                      placeholder="Enter administrator ID"
                      value={formData.adminId}
                      onChange={(e) => setFormData({...formData, adminId: e.target.value})}
                      className="pl-10 bg-gray-800/50 border-gray-700 text-white focus:border-red-500 focus:ring-red-500"
                      required
                    />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-300">
                    Administrative Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter administrative email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="pl-10 bg-gray-800/50 border-gray-700 text-white focus:border-red-500 focus:ring-red-500"
                      required
                    />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-300">
                    Master Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter master password"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="pl-10 pr-10 bg-gray-800/50 border-gray-700 text-white focus:border-red-500 focus:ring-red-500"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-transparent"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4 text-gray-500" />
                      ) : (
                        <Eye className="w-4 h-4 text-gray-500" />
                      )}
                    </Button>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <Label htmlFor="securityCode" className="text-sm font-medium text-gray-300">
                    Security Code
                  </Label>
                  <div className="relative">
                    <ShieldCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                    <Input
                      id="securityCode"
                      type="text"
                      placeholder="Enter 6-digit security code"
                      value={formData.securityCode}
                      onChange={(e) => setFormData({...formData, securityCode: e.target.value})}
                      className="pl-10 bg-gray-800/50 border-gray-700 text-white focus:border-red-500 focus:ring-red-500"
                      maxLength={6}
                      required
                    />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="text-right">
                  <Link to="#" className="text-sm text-red-400 hover:text-red-300 transition-colors">
                    Emergency Access Protocol
                  </Link>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-red-600 to-gray-800 hover:from-red-700 hover:to-gray-900 text-white font-semibold py-3 transition-all duration-300 transform hover:scale-105 border border-red-800/50"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Access Control Panel
                  </Button>
                </motion.div>
              </form>

              <motion.div variants={itemVariants} className="text-center">
                <p className="text-xs text-gray-500">
                  All administrative actions are logged and monitored
                </p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
