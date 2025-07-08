
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Plus,
  Scale,
  Users,
  TrendingUp,
  Bell,
  Calendar,
  Download,
  Filter,
  Search
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Input } from '@/components/ui/input';

const Dashboard = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const stats = [
    {
      title: 'Total Complaints',
      value: '12',
      change: '+3 this month',
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Pending',
      value: '5',
      change: '2 urgent',
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      title: 'Resolved',
      value: '7',
      change: '85% success rate',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Legal Consultations',
      value: '3',
      change: '1 scheduled',
      icon: Scale,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  const recentComplaints = [
    {
      id: 'NYC001',
      title: 'Railway Service Delay',
      category: 'Railways',
      status: 'In Progress',
      priority: 'High',
      date: '2024-06-25',
      progress: 65
    },
    {
      id: 'NYC002',
      title: 'Municipal Water Supply Issue',
      category: 'Municipal',
      status: 'Resolved',
      priority: 'Medium',
      date: '2024-06-20',
      progress: 100
    },
    {
      id: 'NYC003',
      title: 'Healthcare Facility Complaint',
      category: 'Healthcare',
      status: 'Pending',
      priority: 'High',
      date: '2024-06-28',
      progress: 25
    }
  ];

  const notifications = [
    {
      title: 'Complaint NYC001 Updated',
      message: 'Department has taken action on your railway complaint',
      time: '2 hours ago',
      type: 'update'
    },
    {
      title: 'Legal Consultation Scheduled',
      message: 'Your session with Advocate Sharma is confirmed for tomorrow',
      time: '1 day ago',
      type: 'appointment'
    },
    {
      title: 'Monthly Report Ready',
      message: 'Your complaint activity report is available for download',
      time: '3 days ago',
      type: 'report'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Pending':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600 mt-2">Welcome back! Here's your complaint overview.</p>
              </div>
              <div className="flex space-x-3">
                <Button variant="outline" className="flex items-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </Button>
                <Link to="/complaints/new">
                  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>New Complaint</span>
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                        <p className="text-sm text-gray-500 mt-1">{stat.change}</p>
                      </div>
                      <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Recent Complaints */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-2"
            >
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-xl font-bold">Recent Complaints</CardTitle>
                      <CardDescription>Track the status of your submitted complaints</CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Search className="w-4 h-4 mr-2" />
                        Search
                      </Button>
                      <Button variant="outline" size="sm">
                        <Filter className="w-4 h-4 mr-2" />
                        Filter
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentComplaints.map((complaint, index) => (
                      <motion.div
                        key={complaint.id}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="border rounded-lg p-4 hover:shadow-md transition-all duration-300"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold text-gray-900">{complaint.title}</h3>
                            <p className="text-sm text-gray-500">ID: {complaint.id}</p>
                          </div>
                          <div className="flex space-x-2">
                            <Badge className={getStatusColor(complaint.status)}>
                              {complaint.status}
                            </Badge>
                            <Badge className={getPriorityColor(complaint.priority)}>
                              {complaint.priority}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-sm text-gray-600">{complaint.category}</span>
                          <span className="text-sm text-gray-500">{complaint.date}</span>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{complaint.progress}%</span>
                          </div>
                          <Progress value={complaint.progress} className="h-2" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Notifications & Quick Actions */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-bold">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link to="/complaints/new">
                    <Button className="w-full justify-start bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600">
                      <Plus className="w-4 h-4 mr-2" />
                      File New Complaint
                    </Button>
                  </Link>
                  <Link to="/legal">
                    <Button variant="outline" className="w-full justify-start">
                      <Scale className="w-4 h-4 mr-2" />
                      Legal Consultation
                    </Button>
                  </Link>
                  <Link to="/track">
                    <Button variant="outline" className="w-full justify-start">
                      <Search className="w-4 h-4 mr-2" />
                      Track Complaint
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Meeting
                  </Button>
                </CardContent>
              </Card>

              {/* Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-bold flex items-center">
                    <Bell className="w-5 h-5 mr-2" />
                    Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {notifications.map((notification, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="border-l-4 border-blue-500 pl-4 py-2"
                      >
                        <h4 className="font-medium text-sm text-gray-900">{notification.title}</h4>
                        <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                        <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
