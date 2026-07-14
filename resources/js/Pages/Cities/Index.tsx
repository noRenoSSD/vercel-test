import { Head, useForm } from '@inertiajs/react';
import React, { FormEventHandler } from 'react';

interface City {
    id: number;
    name: string;
    province: string;
    created_at: string;
}

interface Props {
    cities: City[];
}

export default function Index({ cities }: Props) {
    const { data, setData, post, processing, reset, errors } = useForm({
        name: '',
        province: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/cities', {
            onSuccess: () => reset(),
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <Head title="Manajemen Wilayah" />
            
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Form Section */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Registrasi Kota/Kabupaten</h2>
                    <form onSubmit={submit} className="flex flex-col md:flex-row gap-4 items-start">
                        <div className="flex-1 w-full">
                            <input
                                type="text"
                                placeholder="Nama Kota (ex: Semarang)"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                        </div>
                        
                        <div className="flex-1 w-full">
                            <input
                                type="text"
                                placeholder="Provinsi (ex: Jawa Tengah)"
                                value={data.province}
                                onChange={e => setData('province', e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            {errors.province && <span className="text-red-500 text-sm">{errors.province}</span>}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full md:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg disabled:opacity-50 transition-colors"
                        >
                            {processing ? 'Menyimpan...' : 'Simpan'}
                        </button>
                    </form>
                </div>

                {/* Data Table Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
                                <th className="px-6 py-4 font-medium">ID</th>
                                <th className="px-6 py-4 font-medium">Kota</th>
                                <th className="px-6 py-4 font-medium">Provinsi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {cities.map((city) => (
                                <tr key={city.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4 text-sm text-gray-500 font-mono">#{city.id}</td>
                                    <td className="px-6 py-4 font-medium text-gray-800">{city.name}</td>
                                    <td className="px-6 py-4 text-gray-600">{city.province}</td>
                                </tr>
                            ))}
                            {cities.length === 0 && (
                                <tr>
                                    <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                                        Belum ada data wilayah.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}