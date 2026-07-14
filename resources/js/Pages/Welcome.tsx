import { Head } from '@inertiajs/react';

export default function Welcome() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <Head title="Welcome" />
            <h1 className="text-4xl font-bold text-blue-600">
                Laravel 12 + React 18 + Inertia is Ready!
            </h1>
        </div>
    );
}