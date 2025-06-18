'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('manager');
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email && password) {
            localStorage.setItem('user',  JSON.stringify({ email, role }));
            router.push('/dashboard');
        } else {
            alert('Please enter email and password');
        }
    };

 return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md mx-auto"
    >
      <h2 className="text-2xl font-bold mb-4">Login</h2>

    {/* Email Field */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
        <input
          type="email"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

    {/* Password Field */}
          <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
        <input
          type="password"
          className="shadow border rounded w-full py-2 px-3 text-gray-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

    {/* Role Selection */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border rounded px-3 py-2"
        >
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="worker">Worker</option>
          <option value="customer">Customer</option>
        </select>
      </div>
    {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Log In
      </button>
    </form>
  );
}