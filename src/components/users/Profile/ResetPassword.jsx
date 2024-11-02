import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Home } from 'lucide-react'
import { Link } from 'react-router-dom'

const ResetPassword = () => {
  return (
   
    <div className="flex-1 p-6">
    <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
      <Link href="#" className="hover:text-gray-900">
        <Home className="h-4 w-4" />
        <span className="sr-only">Home</span>
      </Link>
      <span>/</span>
      <Link href="#" className="hover:text-gray-900">
        Accounts
      </Link>
      <span>/</span>
      <span className="text-gray-900">change password</span>
    </div>

    <div className="mx-auto max-w-md space-y-6 rounded-lg border p-6">
      <div className="text-center">
        <h2 className="text-lg font-medium">Update your password for</h2>
        <p className="text-sm text-gray-500">visguardi19@gmail.com</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            current password
          </label>
          <Input type="password" placeholder="Enter current password" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            new Password
          </label>
          <Input type="password" placeholder="Enter new password" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            confirm password
          </label>
          <Input type="password" placeholder="Confirm new password" />
        </div>

        <Button className="w-full bg-black text-white hover:bg-gray-800">
          update password
        </Button>
      </div>
    </div>
  </div>
  )
}

export default ResetPassword