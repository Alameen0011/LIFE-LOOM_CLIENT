import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Copy } from 'lucide-react';
import { useFetchRefferalCodeQuery } from '@/app/service/userApiSlice';

const Referral = () => {
  const [copied, setCopied] = useState(false);

  // Fetch the referral code from the API
  const { data: referralData, isLoading, error,refetch:refetchRefferal } = useFetchRefferalCodeQuery();

  useEffect(() => {
    refetchRefferal()
  },[])

  // Handle copy to clipboard
  const copyToClipboard = () => {
    if (referralData?.referralCode) {
      navigator.clipboard.writeText(referralData.referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Loading and error states
  if (isLoading) {
    return <div className="flex-1 p-6 text-center">Loading referral code...</div>;
  }

  if (error) {
    return (
      <div className="flex-1 p-6 text-center text-red-500">
        Failed to fetch referral code. Please try again later.
      </div>
    );
  }

  return (
    <div className="flex-1 p-6">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Your Referral Code</CardTitle>
          <CardDescription>Share this code with friends to earn rewards</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <input
              value={referralData?.refferalCode || ''}
              readOnly
              className="font-mono text-lg p-2 border rounded w-full"
            />
            <Button variant="outline" size="icon" onClick={copyToClipboard}>
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
          {copied && <p className="text-sm text-green-500">Referral code copied!</p>}
        </CardContent>
      </Card>
    </div>
  );
};

export default Referral;
