import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button'

const AdminReturnModal = ({ isOpen, onClose, returnRequest, onApprove, onReject }) => {

    console.log(returnRequest,"return request")
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="font-primary">
      <DialogHeader>
        <DialogTitle >Return Request Details</DialogTitle>
        <DialogDescription>
          Review the return request details below.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div>
          <h3 className="font-medium">Reason:</h3>
          <p>{returnRequest.reason}</p>
        </div>
        <div>
          <h3 className="font-medium">Comment:</h3>
          <p>{returnRequest.comment}</p>
        </div>
      </div>
      <DialogFooter>
        <Button onClick={onReject} variant="outline">
          Reject
        </Button>
        <Button onClick={onApprove}>
          Approve
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  )
}

export default AdminReturnModal