
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  Building2, 
  ArrowLeft, 
  Sparkles, 
  ShieldCheck,
  IdCard,
  AlertTriangle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const EmployeeLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    employeeId: '',
    email: '',
    password: '',
    department: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Employee login:', formData);
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center p-4">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"
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
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"
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
          <Link to="/auth" className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to selection
          </Link>
          <Badge className="mb-4 px-4 py-2 bg-orange-100 text-orange-800 border-orange-200">
            <Building2 className="w-4 h-4 mr-2" />
            Government Employee
          </Badge>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-2xl">
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Employee Portal
              </CardTitle>
              <CardDescription className="text-gray-600">
                Secure access for government employees
              </CardDescription>
              <div className="flex items-center justify-center space-x-2 text-sm text-orange-600 bg-orange-50 px-3 py-2 rounded-lg">
                <ShieldCheck className="w-4 h-4" />
                <span>Authorized Personnel Only</span>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-2 text-amber-700">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="text-sm font-medium">Official Use Only</span>
                </div>
                <p className="text-xs text-amber-600 mt-1">
                  This portal is restricted to authorized government employees. 
                  Unauthorized access is prohibited and monitored.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <motion.div variants={itemVariants} className="space-y-2">
                  <Label htmlFor="employeeId" className="text-sm font-medium text-gray-700">
                    Employee ID
                  </Label>
                  <div className="relative">
                    <IdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="employeeId"
                      type="text"
                      placeholder="Enter your employee ID"
                      value={formData.employeeId}
                      onChange={(e) => setFormData({...formData, employeeId: e.target.value})}
                      className="pl-10 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                      required
                    />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <Label htmlFor="department" className="text-sm font-medium text-gray-700">
                    Department
                  </Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="department"
                      type="text"
                      placeholder="Enter your department"
                      value={formData.department}
                      onChange={(e) => setFormData({...formData, department: e.target.value})}
                      className="pl-10 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                      required
                    />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Official Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your official email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="pl-10 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
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
                      className="pl-10 pr-10 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
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
                    <input type="checkbox" className="rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                    <span className="text-gray-600">Keep me signed in</span>
                  </label>
                  <Link to="#" className="text-sm text-orange-600 hover:text-orange-700 transition-colors">
                    Reset password?
                  </Link>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold py-3 transition-all duration-300 transform hover:scale-105"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Access Portal
                  </Button>
                </motion.div>
              </form>

              <motion.div variants={itemVariants} className="text-center">
                <p className="text-xs text-gray-500">
                  For account setup or technical support, contact IT administration
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <p className="text-xs text-gray-600 text-center">
                  <ShieldCheck className="w-3 h-3 inline mr-1" />
                  All login attempts are logged and monitored for security purposes
                </p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default EmployeeLogin;
