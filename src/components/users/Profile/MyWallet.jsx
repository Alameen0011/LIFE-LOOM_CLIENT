import React from 'react'
import SideBar from './SideBar'
import Wallet from './Wallet'

const MyWallet = () => {
    return (
        <div className="flex min-h-screen mx-auto max-w-5xl my-10 bg-background">
        {/* Sidebar */}
        <SideBar />
    
        {/* Main Content */}
         <Wallet/>
      </div>
      )
}

export default MyWallet