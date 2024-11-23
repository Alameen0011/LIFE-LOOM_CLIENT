/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import { Trash2 } from 'lucide-react'
import { Badge } from '../ui/badge'
import Modal from './managementModal'

const OfferTable = ({ offers, onDelete }) => {

  const [isModalOpen,setIsModalOpen] = useState(false)
  const [offerId,setOfferId]  = useState(null)


  const onDeleteRequest = (offerId) => {
    setOfferId(offerId)
    setIsModalOpen(true)

  }
  const handleConfirmDelete = () => {
    onDelete(offerId);  
    setIsModalOpen(false);  
  };

  console.log(offers,"offer on offer table props passed")

    
      const getStatusBadge = (status) => {
        switch (status) {
          case 'upcoming':
            return <Badge variant="secondary">Upcoming</Badge>
          case 'active':
            return <Badge variant="success" className="bg-green-400">Active</Badge>
          case 'expired':
            return <Badge variant="destructive" className="bg-red-500"  >Expired</Badge>
          default:
            return null
        }
      }
  return (
    <div className="overflow-x-auto">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px] font-bold ">Offer Name</TableHead>
          <TableHead className=" font-bold ">Discount</TableHead>
          <TableHead  className=" font-bold ">Valid Period</TableHead>
          <TableHead  className=" font-bold ">Type</TableHead>
          <TableHead  className=" font-bold ">Target</TableHead>
          <TableHead  className=" font-bold ">Status</TableHead>
          <TableHead  className=" font-bold ">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {offers?.map(offer => {
          const status = offer.status
          return (
            <TableRow key={offer._id}>
              <TableCell className="font-medium">{offer.name}</TableCell>
              <TableCell>{`${offer.offerPercentage}% `}</TableCell>
              <TableCell>{new Date(offer.startDate).toLocaleDateString()} - {new Date(offer.endDate).toLocaleDateString()}</TableCell>
              <TableCell>{offer.offerType}</TableCell>
              <TableCell>{offer.targetName}</TableCell>
              <TableCell>{getStatusBadge(status)}</TableCell>
              <TableCell>
                <Button variant="ghost" onClick={() => onDeleteRequest(offer._id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
    <Modal
    isOpen={isModalOpen}
    onConfirm={handleConfirmDelete}
    onClose={() => setIsModalOpen(false)}
    
    
    />
  </div>

   
  )
}

export default OfferTable