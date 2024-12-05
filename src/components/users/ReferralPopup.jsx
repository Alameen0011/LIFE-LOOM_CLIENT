import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { CheckCircle, Gift, X } from 'lucide-react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useApplyRefferalCodeMutation, useSkipRefferalCodeMutation } from '@/app/service/userApiSlice'
import { toast } from 'react-toastify'


const ReferralPopup = ({isOpen,onClose}) => {

    const [refferalCode,setReferralCode] = useState("")
    const [applyReferral] = useApplyRefferalCodeMutation() 
    const [skipRefferal] = useSkipRefferalCodeMutation()



    const handleApplyCode = async() => {
      console.log("applying code")
      try {

        console.log(refferalCode,"===refferal code")


        const res = await applyReferral({refferalCode:refferalCode}).unwrap()

        if(res.success){
          toast.success("Referral applied successfully")
        }
     
        
      } catch (error) {
        console.log(error,"error whiel applying referal code")
      }finally{
        onClose()
      }


    }

    const handleSkip = async () => {
      console.log("skipping code")
      try {

        const res = await skipRefferal().unwrap()

        if(res.success){
          toast.success("skiped successfully")
        }
        
      } catch (error) {
        console.log(error,"Error while skipping reffferal")
      }finally{
        onClose()
      }

    }


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="sm:max-w-[425px]  font-primary">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold flex items-center gap-2">
          <Gift className="w-6 h-6 text-green-300" />
          Enter Referral Code
        </DialogTitle>
      </DialogHeader>
      <div className="mt-6 space-y-4">
        <div className="relative">
          <Input
            placeholder="Enter your referral code"
            value={refferalCode}
            onChange={(e) => setReferralCode(e.target.value)}
            className="pr-10"
          />
          {refferalCode && (
            <X
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600"
              onClick={() => setReferralCode("")}
            />
          )}
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={handleApplyCode}
            className="flex-1 bg-green-600 hover:bg-green-800 text-white"
            disabled={!refferalCode}
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Apply Code
          </Button>
          <Button onClick={handleSkip} variant="outline" className="flex-1">
            Skip
          </Button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
  )
}

export default ReferralPopup