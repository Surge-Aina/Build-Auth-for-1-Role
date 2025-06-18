import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Auth Demo</h1>
      <Link
        href="/login"
        className="text-blue-500 underline hover:text-blue-700"
      >
        Go to Login
      </Link>
    </main>
  );
}
