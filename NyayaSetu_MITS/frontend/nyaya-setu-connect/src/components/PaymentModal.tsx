
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  CreditCard, 
  Wallet, 
  Building, 
  IndianRupee,
  Lock,
  CheckCircle,
  X
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  description: string;
  serviceType: string;
}

const PaymentModal = ({ isOpen, onClose, amount, description, serviceType }: PaymentModalProps) => {
  const { toast } = useToast();
  const [selectedMethod, setSelectedMethod] = useState('razorpay');
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods = [
    {
      id: 'razorpay',
      name: 'Razorpay',
      description: 'UPI, Cards, Net Banking, Wallets',
      icon: Wallet,
      recommended: true
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      description: 'Visa, Mastercard, RuPay',
      icon: CreditCard,
      recommended: false
    },
    {
      id: 'netbanking',
      name: 'Net Banking',
      description: 'All major banks supported',
      icon: Building,
      recommended: false
    }
  ];

  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));

      // In a real implementation, you would:
      // 1. Create order on your backend
      // 2. Initialize Razorpay with order details
      // 3. Handle payment success/failure

      // Mock Razorpay integration
      const options = {
        key: 'YOUR_RAZORPAY_KEY_ID', // Replace with actual key
        amount: amount * 100, // Amount in paise
        currency: 'INR',
        name: 'NyayaSetu',
        description: description,
        image: '/logo.png',
        order_id: 'order_' + Math.random().toString(36).substr(2, 9),
        handler: function (response: any) {
          toast({
            title: "Payment Successful!",
            description: `Payment ID: ${response.razorpay_payment_id}`,
          });
          onClose();
        },
        prefill: {
          name: 'User Name',
          email: 'user@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#3B82F6'
        }
      };

      // This would normally initialize Razorpay
      // const rzp = new window.Razorpay(options);
      // rzp.open();

      // For demo purposes, simulate success
      toast({
        title: "Payment Successful!",
        description: `₹${amount} paid for ${serviceType}`,
      });
      onClose();

    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "Please try again or contact support",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <IndianRupee className="w-5 h-5 text-green-600" />
                <span>Payment</span>
              </DialogTitle>
              <DialogDescription>
                Complete your payment securely
              </DialogDescription>
            </DialogHeader>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {/* Payment Summary */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{serviceType}</h3>
                <p className="text-sm text-gray-600 mb-3">{description}</p>
                
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total Amount:</span>
                  <span className="text-2xl font-bold text-green-600 flex items-center">
                    <IndianRupee className="w-5 h-5" />
                    {amount}
                  </span>
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Select Payment Method</h4>
                <div className="space-y-2">
                  {paymentMethods.map((method) => (
                    <motion.div
                      key={method.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                        selectedMethod === method.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                      onClick={() => setSelectedMethod(method.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <method.icon className={`w-5 h-5 ${
                          selectedMethod === method.id ? 'text-blue-600' : 'text-gray-400'
                        }`} />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{method.name}</span>
                            {method.recommended && (
                              <Badge className="bg-green-100 text-green-800 text-xs">
                                Recommended
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{method.description}</p>
                        </div>
                        {selectedMethod === method.id && (
                          <CheckCircle className="w-5 h-5 text-blue-600" />
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Security Notice */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <Lock className="w-4 h-4 text-blue-600" />
                  <p className="text-sm text-blue-800">
                    Your payment is secured with 256-bit SSL encryption
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <Button 
                  variant="outline" 
                  onClick={onClose}
                  className="flex-1"
                  disabled={isProcessing}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  {isProcessing ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <IndianRupee className="w-4 h-4" />
                      <span>Pay ₹{amount}</span>
                    </div>
                  )}
                </Button>
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal;
