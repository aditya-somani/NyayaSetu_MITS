
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  ArrowRight,
  Shield,
  Phone,
  Scale
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginMethod, setLoginMethod] = useState('email'); // 'email' or 'otp'
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    otp: '',
    rememberMe: false
  });
  
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Login Successful!",
        description: "Welcome back to NyayaSetu",
      });
      
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate OTP verification
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "OTP Verified!",
        description: "Login successful",
      });
      
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Invalid OTP",
        description: "Please check your OTP and try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const sendOTP = async () => {
    if (!formData.phone) {
      toast({
        title: "Phone Required",
        description: "Please enter your phone number",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "OTP Sent!",
        description: `Verification code sent to ${formData.phone}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send OTP. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-8"
        >
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Scale className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            NyayaSetu
          </h1>
          <p className="text-gray-600 mt-2">Welcome back! Sign in to your account</p>
        </motion.div>

        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
            <CardDescription>
              Choose your preferred login method
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Login Method Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                type="button"
                onClick={() => setLoginMethod('email')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                  loginMethod === 'email'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <Mail className="w-4 h-4 inline mr-2" />
                Email
              </button>
              <button
                type="button"
                onClick={() => setLoginMethod('otp')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                  loginMethod === 'otp'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <Phone className="w-4 h-4 inline mr-2" />
                OTP
              </button>
            </div>

            {/* Email Login Form */}
            {loginMethod === 'email' && (
              <motion.form
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                onSubmit={handleEmailLogin}
                className="space-y-4"
              >
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter your email"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative mt-1">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder="Enter your password"
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={formData.rememberMe}
                      onCheckedChange={(checked) => handleInputChange('rememberMe', checked as boolean)}
                    />
                    <Label htmlFor="remember" className="text-sm text-gray-600">
                      Remember me
                    </Label>
                  </div>
                  <Link to="/auth/forgot-password" className="text-sm text-blue-600 hover:underline">
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span>Sign In</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </Button>
              </motion.form>
            )}

            {/* OTP Login Form */}
            {loginMethod === 'otp' && (
              <motion.form
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                onSubmit={handleOTPLogin}
                className="space-y-4"
              >
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative mt-1">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+91 XXXXX XXXXX"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="button"
                  onClick={sendOTP}
                  disabled={isLoading}
                  variant="outline"
                  className="w-full"
                >
                  {isLoading ? 'Sending...' : 'Send OTP'}
                </Button>

                <div>
                  <Label htmlFor="otp">Enter OTP</Label>
                  <Input
                    id="otp"
                    type="text"
                    value={formData.otp}
                    onChange={(e) => handleInputChange('otp', e.target.value)}
                    placeholder="Enter 6-digit OTP"
                    className="text-center text-lg tracking-widest"
                    maxLength={6}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading || !formData.otp}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Verifying...</span>
                    </div>
                  ) : (
                    'Verify & Sign In'
                  )}
                </Button>
              </motion.form>
            )}

            {/* Security Notice */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-blue-50 border border-blue-200 rounded-lg p-3"
            >
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-blue-600" />
                <p className="text-sm text-blue-800">
                  Your data is protected with enterprise-grade security
                </p>
              </div>
            </motion.div>

            {/* Register Link */}
            <div className="text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link to="/auth/register" className="text-blue-600 font-medium hover:underline">
                  Create one now
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Guest Access */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 text-center"
        >
          <p className="text-gray-600 mb-2">Or continue as guest</p>
          <Link to="/complaints">
            <Button variant="outline" className="w-full">
              File Complaint as Guest
            </Button>
          </Link>
          <p className="text-xs text-gray-500 mt-2">
            Limited to 5 complaints without registration
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
