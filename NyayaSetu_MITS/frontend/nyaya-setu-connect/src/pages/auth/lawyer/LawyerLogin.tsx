
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, EyeOff, Mail, Lock, Scale, ArrowLeft, Sparkles, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const LawyerLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    barId: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Lawyer login:', formData);
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex items-center justify-center p-4">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"
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
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"
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
          <Link to="/auth" className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to selection
          </Link>
          <Badge className="mb-4 px-4 py-2 bg-purple-100 text-purple-800 border-purple-200">
            <Scale className="w-4 h-4 mr-2" />
            Legal Professional
          </Badge>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-2xl">
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Legal Portal Access
              </CardTitle>
              <CardDescription className="text-gray-600">
                Secure login for verified legal professionals
              </CardDescription>
              <div className="flex items-center justify-center space-x-2 text-sm text-purple-600 bg-purple-50 px-3 py-2 rounded-lg">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Practitioners Only</span>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <motion.div variants={itemVariants} className="space-y-2">
                  <Label htmlFor="barId" className="text-sm font-medium text-gray-700">
                    Bar Council ID
                  </Label>
                  <div className="relative">
                    <Scale className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="barId"
                      type="text"
                      placeholder="Enter your Bar Council ID"
                      value={formData.barId}
                      onChange={(e) => setFormData({...formData, barId: e.target.value})}
                      className="pl-10 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                      required
                    />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your registered email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="pl-10 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                      required
                    />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="pl-10 pr-10 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
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
                        <EyeOff className="w-4 h-4 text-gray-400" />
                      ) : (
                        <Eye className="w-4 h-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="flex items-center justify-between">
                  <label className="flex items-center space-x-2 text-sm">
                    <input type="checkbox" className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                    <span className="text-gray-600">Remember me</span>
                  </label>
                  <Link to="#" className="text-sm text-purple-600 hover:text-purple-700 transition-colors">
                    Forgot password?
                  </Link>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 transition-all duration-300 transform hover:scale-105"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Access Legal Portal
                  </Button>
                </motion.div>
              </form>

              <motion.div variants={itemVariants} className="text-center">
                <p className="text-gray-600">
                  Need to register?{' '}
                  <Link to="/auth/lawyer/register" className="text-purple-600 hover:text-purple-700 font-semibold transition-colors">
                    Apply for Access
                  </Link>
                </p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LawyerLogin;
