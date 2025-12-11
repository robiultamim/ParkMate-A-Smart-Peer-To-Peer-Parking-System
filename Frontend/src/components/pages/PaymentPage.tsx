import { CreditCard, Smartphone, Plus, Check, Shield, Trash2, Wallet, Star, Lock } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';

export function PaymentPage() {
  const paymentMethods = [
    {
      id: 1,
      type: 'card',
      name: 'Visa •••• 4532',
      icon: CreditCard,
      isDefault: true,
      expiry: '12/26'
    },
    {
      id: 2,
      type: 'mobile',
      name: 'bKash',
      icon: Smartphone,
      isDefault: false,
      number: '01712••••••'
    },
    {
      id: 3,
      type: 'mobile',
      name: 'Nagad',
      icon: Smartphone,
      isDefault: false,
      number: '01923••••••'
    }
  ];

  const transactions = [
    {
      id: 1,
      location: 'Central Plaza Parking',
      amount: '$5.00',
      date: 'Dec 28, 2024',
      status: 'completed',
      method: 'Visa •••• 4532'
    },
    {
      id: 2,
      location: 'Downtown Garage',
      amount: '$6.00',
      date: 'Dec 26, 2024',
      status: 'completed',
      method: 'bKash'
    },
    {
      id: 3,
      location: 'Mall Parking',
      amount: '$4.50',
      date: 'Dec 24, 2024',
      status: 'completed',
      method: 'Nagad'
    }
  ];

  return (
    <div className="max-w-lg mx-auto px-4 py-6 space-y-6 pb-24">
      {/* Payment Methods */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Payment Methods</h2>
          <Button size="sm" className="bg-gradient-to-r from-purple-600 to-blue-600">
            <Plus className="w-4 h-4 mr-1" />
            Add New
          </Button>
        </div>

        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <Card key={method.id} className="bg-white/80 backdrop-blur-sm border-white/20 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg flex items-center justify-center">
                    <method.icon className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{method.name}</h4>
                    <p className="text-sm text-gray-600">
                      {method.type === 'card' ? `Expires ${method.expiry}` : method.number}
                    </p>
                    {method.isDefault && (
                      <Badge variant="secondary" className="bg-green-100 text-green-700 mt-1">
                        Default
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!method.isDefault && (
                    <Button variant="ghost" size="sm">
                      Set Default
                    </Button>
                  )}
                  <Button variant="ghost" size="icon">
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Add Payment Method Form */}
      <Card className="bg-white/80 backdrop-blur-sm border-white/20 p-4 space-y-4">
        <h3 className="font-semibold text-gray-900">Add Credit Card</h3>
        <div className="space-y-3">
          <div>
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input 
              id="cardNumber" 
              placeholder="1234 5678 9012 3456"
              className="bg-white/60"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="expiry">Expiry Date</Label>
              <Input 
                id="expiry" 
                placeholder="MM/YY"
                className="bg-white/60"
              />
            </div>
            <div>
              <Label htmlFor="cvv">CVV</Label>
              <Input 
                id="cvv" 
                placeholder="123"
                className="bg-white/60"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="cardName">Cardholder Name</Label>
            <Input 
              id="cardName" 
              placeholder="John Doe"
              className="bg-white/60"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="setDefault" />
            <Label htmlFor="setDefault">Set as default payment method</Label>
          </div>
          <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600">
            <Shield className="w-4 h-4 mr-2" />
            Add Card Securely
          </Button>
        </div>
      </Card>

      {/* Mobile Wallets */}
      <Card className="bg-white/80 backdrop-blur-sm border-white/20 p-4 space-y-4">
        <h3 className="font-semibold text-gray-900">Mobile Wallets</h3>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="flex items-center gap-2 h-auto p-3">
            <Smartphone className="w-5 h-5 text-pink-600" />
            <div className="text-left">
              <div className="font-medium text-sm">bKash</div>
              <div className="text-xs text-gray-500">Add bKash account</div>
            </div>
          </Button>
          <Button variant="outline" className="flex items-center gap-2 h-auto p-3">
            <Smartphone className="w-5 h-5 text-orange-600" />
            <div className="text-left">
              <div className="font-medium text-sm">Nagad</div>
              <div className="text-xs text-gray-500">Add Nagad account</div>
            </div>
          </Button>
        </div>
      </Card>

      {/* Recent Transactions */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900">Recent Transactions</h3>
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <Card key={transaction.id} className="bg-white/80 backdrop-blur-sm border-white/20 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">{transaction.location}</h4>
                  <p className="text-sm text-gray-600">{transaction.date}</p>
                  <p className="text-xs text-gray-500">{transaction.method}</p>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">{transaction.amount}</div>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    <Check className="w-3 h-3 mr-1" />
                    Paid
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}