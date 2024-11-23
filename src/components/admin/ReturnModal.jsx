import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { Send } from 'lucide-react'

const ReturnModal = ({ open, onOpenChange, onSubmit }) => {
    const [reason, setReason] = useState("")
    const [comments, setComments] = useState("")
  
    const handleSubmit = (e) => {
      e.preventDefault()
      onSubmit(reason, comments)
      console.log("submitting reason ",reason)
      setReason("")
      setComments("")
    }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="sm:max-w-[425px] bg-background text-foreground border-2 border-border font-primary">
      <DialogHeader>
        <DialogTitle className="text-xl font-bold ">Return Product</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="reason" className="text-sm font-medium">
            Reason for Return
          </Label>
          <Select onValueChange={setReason} value={reason}>
            <SelectTrigger id="reason" className="w-full border-2 border-input">
              <SelectValue placeholder="Select a reason" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="wrong-size">Wrong Size</SelectItem>
              <SelectItem value="defective">Defective Product</SelectItem>
              <SelectItem value="not-as-described">Not as Described</SelectItem>
              <SelectItem value="changed-mind">Changed My Mind</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="comments" className="text-sm font-medium">
             Comments
          </Label>
          <Textarea
            id="comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className="min-h-[100px] border-2 border-input"
            placeholder="Please provide any additional details..."
          />
        </div>
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Send className="mr-2 h-4 w-4" /> Submit
          </Button>
        </div>
      </form>
    </DialogContent>
  </Dialog>


    
  )
}

export default ReturnModal