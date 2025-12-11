import { Smartphone, DollarSign, Clock, CheckCircle, AlertCircle, CreditCard } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useState } from 'react';

export function WithdrawalPage() {
  const [selectedWallet, setSelectedWallet] = useState('');
  const [withdrawalAmount, setWithdrawalAmount] = useState('');

  const availableBalance = 890.25;
  const minimumWithdrawal = 10.00;

  const walletOptions = [
    {
      id: 'bkash',
      name: 'bKash',
      icon: '💳',
      color: 'from-pink-500 to-red-500',
      fee: '1%',
      processingTime: '5-10 minutes'
    },
    {
      id: 'nagad',
      name: 'Nagad',
      icon: '📱',
      color: 'from-orange-500 to-red-500',
      fee: '0.5%',
      processingTime: '5-15 minutes'
    },
    {
      id: 'rocket',
      name: 'Rocket',
      icon: '🚀',
      color: 'from-purple-500 to-blue-500',
      fee: '1.5%',
      processingTime: '10-20 minutes'
    }
  ];

  const recentWithdrawals = [
    {
      id: 1,
      amount: 250.00,
      wallet: 'bKash',
      number: '017XXXXXXXX',
      date: 'Dec 28, 2024',
      status: 'completed',
      fee: 2.50
    },
    {
      id: 2,
      amount: 180.75,
      wallet: 'Nagad',
      number: '019XXXXXXXX',
      date: 'Dec 25, 2024',
      status: 'completed',
      fee: 0.90
    },
    {
      id: 3,
      amount: 150.00,
      wallet: 'bKash',
      number: '017XXXXXXXX',
      date: 'Dec 22, 2024',
      status: 'pending',
      fee: 1.50
    }
  ];

  const calculateFee = (amount: number, walletId: string) => {
    const wallet = walletOptions.find(w => w.id === walletId);
    if (!wallet) return 0;
    return amount * (parseFloat(wallet.fee) / 100);
  };

  const amount = parseFloat(withdrawalAmount) || 0;
  const fee = selectedWallet ? calculateFee(amount, selectedWallet) : 0;
  const finalAmount = amount - fee;

  return (
    <div className="max-w-lg mx-auto px-4 py-6 space-y-6 pb-24">
      {/* Available Balance */}
      <Card className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-6">
        <div className="text-center">
          <p className="text-purple-100 text-sm">Available Balance</p>
          <p className="text-3xl font-bold">${availableBalance.toFixed(2)}</p>
          <p className="text-purple-200 text-sm mt-1">Ready for withdrawal</p>
        </div>
      </Card>

      {/* Withdrawal Form */}
      <Card className="bg-white/80 backdrop-blur-sm border-white/20 p-4 space-y-4">
        <Label className="font-semibold text-gray-900">Withdraw to Mobile Wallet</Label>
        
        {/* Select Wallet */}
        <div className="space-y-3">
          <Label>Select Wallet</Label>
          <div className="grid grid-cols-1 gap-3">
            {walletOptions.map((wallet) => (
              <Button
                key={wallet.id}
                variant={selectedWallet === wallet.id ? 'default' : 'outline'}
                className={`flex items-center justify-between p-4 h-auto ${
                  selectedWallet === wallet.id 
                    ? `bg-gradient-to-r ${wallet.color}` 
                    : ''
                }`}
                onClick={() => setSelectedWallet(wallet.id)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{wallet.icon}</span>
                  <div className="text-left">
                    <div className="font-semibold">{wallet.name}</div>
                    <div className="text-xs opacity-80">Fee: {wallet.fee} • {wallet.processingTime}</div>
                  </div>
                </div>
                {selectedWallet === wallet.id && (
                  <CheckCircle className="w-5 h-5" />
                )}
              </Button>
            ))}
          </div>
        </div>

        {/* Mobile Number */}
        {selectedWallet && (
          <div>
            <Label htmlFor="mobileNumber">Mobile Number</Label>
            <Input 
              id="mobileNumber" 
              placeholder="01XXXXXXXXX"
              className="bg-white/60"
            />
          </div>
        )}

        {/* Amount */}
        <div>
          <Label htmlFor="amount">Withdrawal Amount</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
            <Input 
              id="amount" 
              type="number"
              step="0.01"
              min={minimumWithdrawal}
              max={availableBalance}
              placeholder={minimumWithdrawal.toFixed(2)}
              value={withdrawalAmount}
              onChange={(e) => setWithdrawalAmount(e.target.value)}
              className="pl-8 bg-white/60"
            />
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Minimum: ${minimumWithdrawal.toFixed(2)} • Maximum: ${availableBalance.toFixed(2)}
          </p>
        </div>

        {/* Fee Breakdown */}
        {amount > 0 && selectedWallet && (
          <Card className="bg-gray-50 p-3 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Withdrawal Amount:</span>
              <span>${amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Processing Fee:</span>
              <span>-${fee.toFixed(2)}</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-semibold">
              <span>You'll Receive:</span>
              <span className="text-green-600">${finalAmount.toFixed(2)}</span>
            </div>
          </Card>
        )}

        {/* Quick Amount Buttons */}
        <div className="space-y-2">
          <Label>Quick Select</Label>
          <div className="grid grid-cols-4 gap-2">
            {[50, 100, 200, availableBalance].map((quickAmount) => (
              <Button
                key={quickAmount}
                variant="outline"
                size="sm"
                onClick={() => setWithdrawalAmount(quickAmount.toFixed(2))}
                disabled={quickAmount > availableBalance}
              >
                ${quickAmount === availableBalance ? 'All' : quickAmount}
              </Button>
            ))}
          </div>
        </div>

        {/* Withdraw Button */}
        <Button 
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600"
          disabled={!selectedWallet || amount < minimumWithdrawal || amount > availableBalance}
        >
          <Smartphone className="w-4 h-4 mr-2" />
          Withdraw ${finalAmount.toFixed(2)}
        </Button>
      </Card>

      {/* Recent Withdrawals */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900">Recent Withdrawals</h3>
        <div className="space-y-3">
          {recentWithdrawals.map((withdrawal) => (
            <Card key={withdrawal.id} className="bg-white/80 backdrop-blur-sm border-white/20 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg flex items-center justify-center">
                    <Smartphone className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{withdrawal.wallet}</h4>
                    <p className="text-sm text-gray-600">{withdrawal.number}</p>
                    <p className="text-xs text-gray-500">{withdrawal.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">${withdrawal.amount.toFixed(2)}</div>
                  <div className="text-xs text-gray-500">Fee: ${withdrawal.fee.toFixed(2)}</div>
                  <Badge 
                    variant={withdrawal.status === 'completed' ? 'secondary' : 'outline'}
                    className={withdrawal.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}
                  >
                    {withdrawal.status}
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Important Notes */}
      <Card className="bg-blue-50 border-blue-200 p-4">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
          <div className="space-y-2 text-sm text-blue-800">
            <p className="font-medium">Important Notes:</p>
            <ul className="space-y-1 text-blue-700">
              <li>• Withdrawals are processed within 24 hours</li>
              <li>• Ensure your mobile wallet is active and verified</li>
              <li>• Processing fees vary by wallet provider</li>
              <li>• Minimum withdrawal amount is ${minimumWithdrawal.toFixed(2)}</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}