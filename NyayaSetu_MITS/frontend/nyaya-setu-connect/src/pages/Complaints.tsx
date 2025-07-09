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

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const Complaints = () => {
  const { toast } = useToast();
  const[Authenticate ,setIsAuthenticated]=useState(false)

  useEffect(() => {
  const checkAuth = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/auth/check`, {
  withCredentials: true
});

      console.log("User is authenticated:", res.data);
      setIsAuthenticated(true);
    } catch (err) {
      console.log("User not authenticated");
      setIsAuthenticated(false);
    }
  };

  checkAuth();
}, []);

  // Track Complaint State
  const [trackNo, setTrackNo] = useState("");
  const [trackResult, setTrackResult] = useState<any>(null);
  const [trackError, setTrackError] = useState("");
  const [trackLoading, setTrackLoading] = useState(false);

  const handleTrackComplaint = async () => {
    setTrackError("");
    setTrackResult(null);
    setTrackLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/ticket/track/${trackNo}`);
    
      setTrackResult(res.data[0]);
    } catch (err) {
      setTrackError("Complaint not found. Please check the number and try again.");
    } finally {
      setTrackLoading(false);
    }
  };
  
  const [selectedCategory, setSelectedCategory] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      console.log("DATA");
      const complaintdetail=Math.random().toString(36).substr(2, 6).toUpperCase()
      await axios.post(
  `${import.meta.env.VITE_API_BASE_URL}/ticket/create`,
  { formData, complaintdetail },
  { withCredentials: true }
);

      toast({
        title: "Complaint Submitted Successfully!",
        description: "Your complaint has been registered. Tracking ID: " + complaintdetail,
      });

      // Reset form
      setFormData({
        title: '',
        description: '',
        category: '',
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

          {/* Track Complaint Bar */}
          <Card className="w-full max-w-xl mx-auto mb-8">
            <CardHeader>
              <CardTitle>Track Your Complaint</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-4">
                <Input
                  placeholder="Enter Complaint Number"
                  value={trackNo}
                  onChange={(e) => setTrackNo(e.target.value)}
                />
                <Button onClick={handleTrackComplaint} disabled={trackLoading}>
                  {trackLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    "Search"
                  )}
                </Button>
              </div>
              {trackError && (
  <div className="text-red-600 font-medium text-sm bg-red-50 border border-red-200 rounded-md p-3 mb-4">
    ⚠️ {trackError}
  </div>
)}

{trackResult && (
  <div className="space-y-3 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
    <h2 className="text-lg font-semibold text-blue-600 mb-2">📋 Complaint Details</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
      <div>
        <span className="font-semibold text-gray-900">Title:</span><br />
        {trackResult.title}
      </div>

      <div>
        <span className="font-semibold text-gray-900">Status:</span><br />
        <span className={`px-2 py-1 rounded-full text-white text-xs font-semibold 
          ${trackResult.status === 'resolved' ? 'bg-green-500' : 'bg-yellow-500'}`}>
          {trackResult.status}
        </span>
      </div>

      <div className="md:col-span-2">
        <span className="font-semibold text-gray-900">Description:</span><br />
        <p className="text-gray-600 mt-1">{trackResult.description}</p>
      </div>

      <div>
        <span className="font-semibold text-gray-900">Priority:</span><br />
        <span className="inline-block bg-red-100 text-red-700 text-xs font-medium px-2 py-1 rounded">
          {trackResult.priority}
        </span>
      </div>

      <div>
        <span className="font-semibold text-gray-900">Category:</span><br />
        {trackResult.category}
      </div>

      <div>
        <span className="font-semibold text-gray-900">Location:</span><br />
        {trackResult.location.city}, {trackResult.location.state}
      </div>

      <div>
        <span className="font-semibold text-gray-900">Created On:</span><br />
        {dayjs(trackResult.createdAt).format("DD MMM YYYY, h:mm A")}
      </div>

      <div>
        <span className="font-semibold text-gray-900">Time Since:</span><br />
        {dayjs(trackResult.createdAt).fromNow()}
      </div>
    </div>
  </div>
)}

            </CardContent>
          </Card>

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

          {!Authenticate && (
  <div className="text-center mt-6 text-red-600 text-lg font-semibold">
    LogIn to Track Your Complaint
  </div>
)}

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