import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription,  CardHeader, CardTitle } from '@/components/ui/card'
import { Check, Copy } from 'lucide-react'
import { useFetchRefferalCodeQuery } from '@/app/service/userApiSlice'

const Refferal = () => {
    const [referCode , setReferCode] = useState(null)
    const [copied, setCopied] = useState(false)
    const referralCode = "FRIEND2023"

  
    const copyToClipboard = () => {
      navigator.clipboard.writeText(referralCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }

    const {data:refferalData,isLoading} = useFetchRefferalCodeQuery()


    useEffect(() => {

        if(refferalData){
            console.log(refferalData,"refferal data")
            setReferCode(refferalData.refferalCode)

        }

    },[refferalData])

    if(isLoading){
        <h1>HSDFSLFJLSF LIS DSFJL SFIOS</h1>
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
            value={referCode && referCode } 
            readOnly 
            className="font-mono text-lg"
          />
          <Button variant="outline" size="icon" onClick={copyToClipboard}>
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
     
      </CardContent>
 
    </Card>
  </div>
  )
}

export default Refferal