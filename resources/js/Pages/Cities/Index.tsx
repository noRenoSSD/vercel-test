import { Head, useForm, router } from '@inertiajs/react';
import React, { FormEventHandler, useState, useEffect } from 'react';
import { Building2, MapPin, Pencil, Trash2, Map } from 'lucide-react';

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
    const { data, setData, post, put, processing, reset, errors, clearErrors } = useForm({
        name: '',
        province: '',
    });

    const [editingCity, setEditingCity] = useState<City | null>(null);

    useEffect(() => {
        if (editingCity) {
            setData({
                name: editingCity.name,
                province: editingCity.province,
            });
            clearErrors();
        } else {
            reset();
            clearErrors();
        }
    }, [editingCity]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (editingCity) {
            put(`/cities/${editingCity.id}`, {
                onSuccess: () => setEditingCity(null),
            });
        } else {
            post('/cities', {
                onSuccess: () => reset(),
            });
        }
    };

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus kota ini?')) {
            router.delete(`/cities/${id}`);
        }
    };

    const cancelEdit = () => {
        setEditingCity(null);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
            <Head title="Manajemen Wilayah" />
            
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Form Section */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-4">
                        <Map className="w-6 h-6 text-blue-600" />
                        <h2 className="text-xl font-bold text-gray-800">
                            {editingCity ? 'Edit Kota/Kabupaten' : 'Registrasi Kota/Kabupaten'}
                        </h2>
                    </div>
                    
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

                        <div className="flex gap-2 w-full md:w-auto">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full md:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
                            >
                                {processing ? 'Menyimpan...' : 'Simpan'}
                            </button>
                            {editingCity && (
                                <button
                                    type="button"
                                    onClick={cancelEdit}
                                    className="w-full md:w-auto px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-colors flex items-center justify-center"
                                >
                                    Batal
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Data Table Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse whitespace-nowrap">
                        <thead>
                            <tr className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
                                <th className="px-6 py-4 font-medium">ID</th>
                                <th className="px-6 py-4 font-medium">Kota</th>
                                <th className="px-6 py-4 font-medium">Provinsi</th>
                                <th className="px-6 py-4 font-medium text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {cities.map((city) => (
                                <tr key={city.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4 text-sm text-gray-500 font-mono">#{city.id}</td>
                                    <td className="px-6 py-4 font-medium text-gray-800">
                                        <div className="flex items-center gap-2">
                                            <Building2 className="w-4 h-4 text-gray-400" />
                                            {city.name}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4 text-gray-400" />
                                            {city.province}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => setEditingCity(city)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                title="Edit"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(city.id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Hapus"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {cities.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                                        Belum ada data wilayah.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
        </div>
    );
}