'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<{ email: string; role: string } | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem('user');
        if (!stored) { 
            router.push('/login');
        } else {
            setUser(JSON.parse(stored));
        }
    }, [router]);

    if (!user) return null;

   return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Welcome, {user.role}</h1>
      <p className="text-gray-700 mt-2">Logged in as: {user.email}</p>
    </div>
  );
}