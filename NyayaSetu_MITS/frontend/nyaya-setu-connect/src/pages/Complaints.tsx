
import { useState,useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import { 
  FileText, 
  Upload, 
  Car, 
  Building, 
  Hospital, 
  GraduationCap,
  Phone,
  Mail,
  MapPin,
  Clock,
  User,
  AlertCircle,
  CheckCircle,
  Plus,
  X
} from 'lucide-react';
import {  Bus, Shield, Flame, Leaf, Tractor, Banknote, Users } from 'lucide-react';

import Navbar from '@/components/Navbar';
import { useToast } from '@/hooks/use-toast';




const Complaints = () => {
const navigate = useNavigate();
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get("accessToken"); // Read cookie
    setIsAuthenticated(!!token); // Set true if exists
  }, []);

  if (!isAuthenticated) {
    return (
     <div className="flex flex-col items-center justify-center mt-20">
  <div className="bg-red-50 border border-red-200 rounded-xl px-8 py-6 shadow-md flex flex-col items-center">
    <svg className="w-10 h-10 text-red-500 mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01" />
    </svg>
    <h2 className="text-xl font-semibold text-red-700 mb-2">Please login to file a complaint.</h2>
    <p className="text-red-600 text-sm">You must be signed in to access the complaint form.</p>
     <button
            onClick={() => navigate('/auth/user/login')}
            className="mt-2 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Sign In
          </button>
  </div>
</div>
    );
  }

  
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    priority: '',
    city: '',
    state:'',
    contactNumber: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

 const categories = [
  { 
    id: 'railway', 
    name: 'Railway Services', 
    icon: Car, 
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    description: 'Issues with train services, stations, booking'
  },
  { 
    id: 'municipal', 
    name: 'Municipal Services', 
    icon: Building, 
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    description: 'Water supply, electricity, roads, waste management'
  },
  { 
    id: 'healthcare', 
    name: 'Healthcare', 
    icon: Hospital, 
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    description: 'Hospital services, medical facilities, public health'
  },
  { 
    id: 'education', 
    name: 'Education', 
    icon: GraduationCap, 
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    description: 'Schools, colleges, educational policies'
  },
  {
    id: 'transport',
    name: 'Transport & Roads',
    icon: Bus,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
    description: 'Road conditions, public buses, traffic issues'
  },
  {
    id: 'police',
    name: 'Police & Law Enforcement',
    icon: Shield,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100',
    description: 'Crime reporting, safety issues, traffic policing'
  },
  {
    id: 'fire',
    name: 'Fire & Emergency Services',
    icon: Flame,
    color: 'text-rose-600',
    bgColor: 'bg-rose-100',
    description: 'Fire safety, fire brigade complaints, emergency response'
  },
  {
    id: 'environment',
    name: 'Environment & Pollution',
    icon: Leaf,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-100',
    description: 'Air/water pollution, green spaces, illegal dumping'
  },
  {
    id: 'telecom',
    name: 'Telecom Services',
    icon: Phone,
    color: 'text-teal-600',
    bgColor: 'bg-teal-100',
    description: 'Mobile network, broadband, customer support issues'
  },
  {
    id: 'agriculture',
    name: 'Agriculture & Farmer Support',
    icon: Tractor,
    color: 'text-lime-600',
    bgColor: 'bg-lime-100',
    description: 'Farming support, subsidies, irrigation problems'
  },
  {
    id: 'finance',
    name: 'Banking & Finance',
    icon: Banknote,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    description: 'Bank services, pensions, financial aid issues'
  },
  {
    id: 'welfare',
    name: 'Social Welfare',
    icon: Users,
    color: 'text-pink-600',
    bgColor: 'bg-pink-100',
    description: 'Pensions, disability, women/child welfare schemes'
  }
];


  const priorities = [
    { value: 'low', label: 'Low', color: 'bg-green-100 text-green-800' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'high', label: 'High', color: 'bg-red-100 text-red-800' },
    { value: 'urgent', label: 'Urgent', color: 'bg-red-200 text-red-900' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    // Handle file upload logic here
    console.log('Files uploaded:', files);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      console.log("DATA");
      
      await axios.post('http://localhost:5000/ticket/create',formData,{withCredentials:true})
      
      toast({
        title: "Complaint Submitted Successfully!",
        description: "Your complaint has been registered. Tracking ID: NYC" + Math.random().toString(36).substr(2, 6).toUpperCase(),
      });

      // Reset form
      setFormData({
        title: '',
        description: '',
        category: '',
        priority: '',
        city: '',
        state:'',
        contactNumber: '',
        email: ''
      });
      setSelectedCategory('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit complaint. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Navbar />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="pt-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">File a Complaint</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Report your concerns about government services. We'll ensure they reach the right department for prompt resolution.
            </p>
          </motion.div>

          {/* Category Selection */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold">Select Complaint Category</CardTitle>
                <CardDescription>Choose the category that best describes your complaint</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {categories.map((category, index) => (
                    <motion.div
                      key={category.id}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                        selectedCategory === category.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300 hover:bg-blue-25'
                      }`}
                      onClick={() => {
                        setSelectedCategory(category.id);
                        handleInputChange('category', category.name);
                      }}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 ${category.bgColor} rounded-xl flex items-center justify-center`}>
                          <category.icon className={`w-6 h-6 ${category.color}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{category.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                        </div>
                        {selectedCategory === category.id && (
                          <CheckCircle className="w-6 h-6 text-blue-500" />
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Complaint Form */}
          {selectedCategory && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-bold flex items-center">
                    <FileText className="w-6 h-6 mr-2 text-blue-600" />
                    Complaint Details
                  </CardTitle>
                  <CardDescription>Provide detailed information about your complaint</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title */}
                    <div>
                      <Label htmlFor="title" className="text-sm font-medium text-gray-700 mb-2 block">
                        Complaint Title *
                      </Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        placeholder="Brief description of your complaint"
                        className="w-full"
                        required
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <Label htmlFor="description" className="text-sm font-medium text-gray-700 mb-2 block">
                        Detailed Description *
                      </Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        placeholder="Provide a detailed description of the issue, including when it occurred, location, and any relevant information..."
                        className="w-full min-h-[120px]"
                        required
                      />
                    </div>

                    {/* Priority and Location Row */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="priority" className="text-sm font-medium text-gray-700 mb-2 block">
                          Priority Level *
                        </Label>
                        <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            {priorities.map((priority) => (
                              <SelectItem key={priority.value} value={priority.value}>
                                <div className="flex items-center space-x-2">
                                  <Badge className={priority.color}>{priority.label}</Badge>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                      <Label htmlFor="city" className="text-sm font-medium text-gray-700 mb-2 block">
                          City *
                        </Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          placeholder="City"
                          required
                        />
                        <Label htmlFor="state" className="text-sm font-medium text-gray-700 mb-2 block">
                          State *
                        </Label>
                        <Input
                          id="state"
                          value={formData.state}
                          onChange={(e) => handleInputChange('state', e.target.value)}
                          placeholder="State"
                          required
                        />
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-2 block">
                          Contact Number *
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.contactNumber}
                          onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                          placeholder="+91 XXXXX XXXXX"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2 block">
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>
                    </div>

                    {/* File Upload */}
                    {/* <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Supporting Documents (Optional)
                      </Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-2">
                          Drag and drop files here, or click to browse
                        </p>
                        <p className="text-sm text-gray-500 mb-4">
                          Supported formats: JPG, PNG, PDF, DOC (Max 10MB each)
                        </p>
                        <Input
                          type="file"
                          multiple
                          accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                          onChange={handleFileUpload}
                          className="hidden"
                          id="file-upload"
                        />
                        <Label htmlFor="file-upload">
                          <Button type="button" variant="outline" className="cursor-pointer">
                            Choose Files
                          </Button>
                        </Label>
                      </div>
                    </div> */}

                    {/* Important Notice */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="bg-blue-50 border border-blue-200 rounded-lg p-4"
                    >
                      <div className="flex items-start space-x-3">
                        <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-blue-900 mb-1">Important Information</h4>
                          <ul className="text-sm text-blue-800 space-y-1">
                            <li>• You will receive an acknowledgment with a unique tracking ID</li>
                            <li>• The complaint will be forwarded to the relevant department</li>
                            <li>• You can track the status using your tracking ID</li>
                            <li>• False complaints may result in legal action</li>
                          </ul>
                        </div>
                      </div>
                    </motion.div>

                    {/* Submit Button */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      className="flex justify-end space-x-4"
                    >
                      <Button type="button" variant="outline" onClick={() => setSelectedCategory('')}>
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-8"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Submitting...</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <FileText className="w-4 h-4" />
                            <span>Submit Complaint</span>
                          </div>
                        )}
                      </Button>
                    </motion.div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Complaints;
