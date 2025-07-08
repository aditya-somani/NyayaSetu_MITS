
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  Scale, 
  Star, 
  MapPin, 
  Clock, 
  Phone, 
  Mail,
  Calendar,
  Video,
  MessageCircle,
  Award,
  BookOpen,
  Users,
  Filter,
  Search,
  IndianRupee
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import { useToast } from '@/hooks/use-toast';

const Legal = () => {
  const { toast } = useToast();
  const [selectedSpeciality, setSelectedSpeciality] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const specialities = [
    { id: 'all', name: 'All Lawyers', count: 150 },
    { id: 'civil', name: 'Civil Law', count: 45 },
    { id: 'criminal', name: 'Criminal Law', count: 32 },
    { id: 'consumer', name: 'Consumer Rights', count: 28 },
    { id: 'labor', name: 'Labor Law', count: 25 },
    { id: 'constitutional', name: 'Constitutional Law', count: 20 }
  ];

  const lawyers = [
    {
      id: 1,
      name: 'Adv. Rajesh Sharma',
      speciality: 'Civil Law',
      experience: 15,
      rating: 4.8,
      reviews: 124,
      location: 'New Delhi',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
      consultationFee: 1500,
      languages: ['Hindi', 'English'],
      education: 'LLB, Delhi University',
      availability: 'Available Today',
      proBono: true,
      verified: true
    },
    {
      id: 2,
      name: 'Adv. Priya Mehta',
      speciality: 'Consumer Rights',
      experience: 12,
      rating: 4.9,
      reviews: 98,
      location: 'Mumbai',
      image: 'https://images.unsplash.com/photo-1594824911330-20e84705b55f?w=400',
      consultationFee: 1200,
      languages: ['Hindi', 'English', 'Marathi'],
      education: 'LLM, Mumbai University',
      availability: 'Available Tomorrow',
      proBono: false,
      verified: true
    },
    {
      id: 3,
      name: 'Adv. Suresh Kumar',
      speciality: 'Criminal Law',
      experience: 20,
      rating: 4.7,
      reviews: 156,
      location: 'Bangalore',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      consultationFee: 2000,
      languages: ['Hindi', 'English', 'Kannada'],
      education: 'LLB, Bangalore University',
      availability: 'Busy Today',
      proBono: true,
      verified: true
    },
    {
      id: 4,
      name: 'Adv. Kavita Singh',
      speciality: 'Labor Law',
      experience: 10,
      rating: 4.6,
      reviews: 87,
      location: 'Chennai',
      image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400',
      consultationFee: 1000,
      languages: ['Hindi', 'English', 'Tamil'],
      education: 'LLM, Chennai Law College',
      availability: 'Available Today',
      proBono: true,
      verified: true
    }
  ];

  const handleBookConsultation = (lawyer: any) => {
    toast({
      title: "Consultation Booking",
      description: `Booking consultation with ${lawyer.name}. You will be redirected to payment.`,
    });
  };

  const filteredLawyers = lawyers.filter(lawyer => {
    const matchesSpeciality = selectedSpeciality === 'all' || 
      lawyer.speciality.toLowerCase().includes(selectedSpeciality);
    const matchesSearch = lawyer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lawyer.speciality.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSpeciality && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Navbar />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="pt-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Legal Assistance</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect with qualified lawyers and legal professionals. Get expert advice for your legal concerns.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
          >
            {[
              { label: 'Verified Lawyers', value: '150+', icon: Scale },
              { label: 'Consultations', value: '2,500+', icon: Users },
              { label: 'Success Rate', value: '95%', icon: Award },
              { label: 'Pro Bono Services', value: '40%', icon: BookOpen }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8"
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Search */}
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search lawyers by name or speciality..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  {/* Speciality Filter */}
                  <div className="flex flex-wrap gap-2">
                    {specialities.map((spec) => (
                      <Button
                        key={spec.id}
                        variant={selectedSpeciality === spec.id ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedSpeciality(spec.id)}
                        className={selectedSpeciality === spec.id ? 
                          'bg-gradient-to-r from-blue-600 to-indigo-600' : ''}
                      >
                        {spec.name} ({spec.count})
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Lawyers Grid */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredLawyers.map((lawyer, index) => (
              <motion.div
                key={lawyer.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={lawyer.image} alt={lawyer.name} />
                        <AvatarFallback>{lawyer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-bold text-lg">{lawyer.name}</h3>
                          {lawyer.verified && (
                            <Badge className="bg-green-100 text-green-800">
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-blue-600 font-medium">{lawyer.speciality}</p>
                        <p className="text-sm text-gray-600">{lawyer.experience} years experience</p>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Rating */}
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(lawyer.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-medium">{lawyer.rating}</span>
                      <span className="text-gray-500">({lawyer.reviews} reviews)</span>
                    </div>

                    {/* Details */}
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{lawyer.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <BookOpen className="w-4 h-4" />
                        <span>{lawyer.education}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{lawyer.availability}</span>
                      </div>
                    </div>

                    {/* Languages */}
                    <div className="flex flex-wrap gap-1">
                      {lawyer.languages.map((lang) => (
                        <Badge key={lang} variant="outline" className="text-xs">
                          {lang}
                        </Badge>
                      ))}
                    </div>

                    {/* Consultation Fee */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <IndianRupee className="w-4 h-4 text-green-600" />
                        <span className="font-bold text-green-600">₹{lawyer.consultationFee}</span>
                        <span className="text-sm text-gray-500">/ consultation</span>
                      </div>
                      {lawyer.proBono && (
                        <Badge className="bg-blue-100 text-blue-800">
                          Pro Bono Available
                        </Badge>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-2 pt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center space-x-1"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Chat</span>
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleBookConsultation(lawyer)}
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 flex items-center space-x-1"
                      >
                        <Video className="w-4 h-4" />
                        <span>Book</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Nyaya Bandhu Section */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16"
          >
            <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <CardContent className="p-8">
                <div className="text-center">
                  <Scale className="w-16 h-16 mx-auto mb-4 text-blue-200" />
                  <h2 className="text-3xl font-bold mb-4">Nyaya Bandhu Initiative</h2>
                  <p className="text-xl text-blue-100 mb-6 max-w-3xl mx-auto">
                    Access free legal aid through our government-sponsored Nyaya Bandhu program. 
                    Quality legal assistance for those who need it most.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
                      <BookOpen className="w-5 h-5 mr-2" />
                      Learn More
                    </Button>
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                      <Phone className="w-5 h-5 mr-2" />
                      Apply for Free Aid
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Legal;
