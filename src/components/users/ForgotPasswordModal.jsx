import React from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ForgotEmailSchema } from '@/validationSchemas/forgotEmail';

const ForgotPasswordModal = ({ isOpen, onSubmit, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ForgotEmailSchema),
  });

  const handleEmail = (data) => {
    console.log(data,"data on submit ie , email")
    onSubmit(data)
  }



  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4">Reset Password</h2>
        <form onSubmit={handleSubmit(handleEmail)}>
          <Label htmlFor="resetEmail" className="block text-sm font-medium text-gray-700 mb-2">
            Enter your email
          </Label>
          <Input
            type="email"
            id="resetEmail"
            {...register('email')}
            placeholder="Enter your email"
            className="block w-full mb-4 p-2 border border-gray-300 rounded-md"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
          <div className="flex justify-end mt-4">
            <Button type="button" onClick={onClose} className="mr-2">
              Cancel
            </Button>
            <Button type="submit" className="bg-indigo-500 text-white">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
