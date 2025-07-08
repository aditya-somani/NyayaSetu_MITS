
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  Scale, 
  ArrowLeft, 
  Sparkles, 
  Phone,
  MapPin,
  Calendar,
  Shield,
  FileText,
  Building,
  Award,
  ShieldCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'sonner';

const LawyerRegister = () => {
   const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    licenseNumber: '',
    practiceAreas: '',
    experience: '',
    firmName: '',
    address: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    agreeToEthics: false,
    agreeToPrivacy: false
  });

   const navigate = useNavigate();
   
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result=await axios.post('http://localhost:5000/lawyer/register',formData,{withCredentials:true})
    if (result.status === 201 || result.status === 200) {
      console.log('Lawyer registration:', formData);
      toast({
        title: "User Registered!",
        description: "Welcome Your NyayaSetu Lawyer Account is Created"
      });
      navigate('/'); // 👈 redirect here
    }
    console.log('Lawyer registration:', formData);
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
        className="w-full max-w-4xl relative z-10"
      >
        <motion.div variants={itemVariants} className="text-center mb-8">
          <Link to="/auth" className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to selection
          </Link>
          <Badge className="mb-4 px-4 py-2 bg-purple-100 text-purple-800 border-purple-200">
            <Scale className="w-4 h-4 mr-2" />
            Legal Professional Registration
          </Badge>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-2xl">
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Join Our Legal Network
              </CardTitle>
              <CardDescription className="text-gray-600">
                Apply for verified legal professional status
              </CardDescription>
              <div className="flex items-center justify-center space-x-2 text-sm text-purple-600 bg-purple-50 px-3 py-2 rounded-lg">
                <ShieldCheck className="w-4 h-4" />
                <span>All applications are verified by the Bar Council</span>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                    Personal Information
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <motion.div variants={itemVariants} className="space-y-2">
                      <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                        First Name
                      </Label>
                      <div className="relative">
                        <Scale className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="firstName"
                          type="text"
                          placeholder="Enter your first name"
                          value={formData.firstName}
                          onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                          className="pl-10 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                          required
                        />
                      </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="space-y-2">
                      <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                        Last Name
                      </Label>
                      <div className="relative">
                        <Scale className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="lastName"
                          type="text"
                          placeholder="Enter your last name"
                          value={formData.lastName}
                          onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                          className="pl-10 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                          required
                        />
                      </div>
                    </motion.div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <motion.div variants={itemVariants} className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Professional Email
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your professional email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="pl-10 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                          required
                        />
                      </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                        Phone Number
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="Enter your phone number"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="pl-10 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                          required
                        />
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Professional Credentials */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                    Professional Credentials
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                

                    <motion.div variants={itemVariants} className="space-y-2">
                      <Label htmlFor="licenseNumber" className="text-sm font-medium text-gray-700">
                        License Number
                      </Label>
                      <div className="relative">
                        <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="licenseNumber"
                          type="text"
                          placeholder="Enter your license number"
                          value={formData.licenseNumber}
                          onChange={(e) => setFormData({...formData, licenseNumber: e.target.value})}
                          className="pl-10 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                          required
                        />
                      </div>
                    </motion.div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <motion.div variants={itemVariants} className="space-y-2">
                      <Label htmlFor="experience" className="text-sm font-medium text-gray-700">
                        Years of Experience
                      </Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="experience"
                          type="number"
                          placeholder="Years of practice"
                          value={formData.experience}
                          onChange={(e) => setFormData({...formData, experience: e.target.value})}
                          className="pl-10 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                          required
                        />
                      </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="space-y-2">
                      <Label htmlFor="firmName" className="text-sm font-medium text-gray-700">
                        Law Firm/Organization
                      </Label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="firmName"
                          type="text"
                          placeholder="Enter firm/organization name"
                          value={formData.firmName}
                          onChange={(e) => setFormData({...formData, firmName: e.target.value})}
                          className="pl-10 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                        />
                      </div>
                    </motion.div>
                  </div>

                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label htmlFor="practiceAreas" className="text-sm font-medium text-gray-700">
                      Areas of Practice
                    </Label>
                    <Textarea
                      id="practiceAreas"
                      placeholder="List your areas of specialization (e.g., Criminal Law, Civil Rights, Corporate Law)"
                      value={formData.practiceAreas}
                      onChange={(e) => setFormData({...formData, practiceAreas: e.target.value})}
                      className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                      rows={3}
                      required
                    />
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label htmlFor="address" className="text-sm font-medium text-gray-700">
                      Professional Address
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="location"
                        type="text"
                        placeholder="Enter your professional address"
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                        className="pl-10 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                        required
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Security */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                    Account Security
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <motion.div variants={itemVariants} className="space-y-2">
                      <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                        Create Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a strong password"
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

                    <motion.div variants={itemVariants} className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                        Confirm Password
                      </Label>
                      <div className="relative">
                        <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                          className="pl-10 pr-10 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-transparent"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="w-4 h-4 text-gray-400" />
                          ) : (
                            <Eye className="w-4 h-4 text-gray-400" />
                          )}
                        </Button>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Agreements */}
                <motion.div variants={itemVariants} className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="terms" 
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => setFormData({...formData, agreeToTerms: !!checked})}
                    />
                    <Label htmlFor="terms" className="text-sm text-gray-600">
                      I agree to the{' '}
                      <Link to="#" className="text-purple-600 hover:text-purple-700 underline">
                        Terms of Service
                      </Link>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="ethics" 
                      checked={formData.agreeToEthics}
                      onCheckedChange={(checked) => setFormData({...formData, agreeToEthics: !!checked})}
                    />
                    <Label htmlFor="ethics" className="text-sm text-gray-600">
                      I agree to abide by the{' '}
                      <Link to="#" className="text-purple-600 hover:text-purple-700 underline">
                        Professional Ethics Code
                      </Link>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="privacy" 
                      checked={formData.agreeToPrivacy}
                      onCheckedChange={(checked) => setFormData({...formData, agreeToPrivacy: !!checked})}
                    />
                    <Label htmlFor="privacy" className="text-sm text-gray-600">
                      I agree to the{' '}
                      <Link to="#" className="text-purple-600 hover:text-purple-700 underline">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Button
                    type="submit"
                    disabled={!formData.agreeToTerms || !formData.agreeToEthics || !formData.agreeToPrivacy}
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Submit Application
                  </Button>
                </motion.div>
              </form>

              <motion.div variants={itemVariants} className="text-center">
                <p className="text-gray-600">
                  Already have an account?{' '}
                  <Link to="/auth/lawyer/login" className="text-purple-600 hover:text-purple-700 font-semibold transition-colors">
                    Sign In
                  </Link>
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <p className="text-sm text-purple-700 text-center">
                  <Shield className="w-4 h-4 inline mr-2" />
                  Your application will be reviewed by our verification team within 2-3 business days. 
                  You will receive an email notification once your account is approved.
                </p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LawyerRegister;
