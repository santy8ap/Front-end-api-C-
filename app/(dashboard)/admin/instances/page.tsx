'use client';

import { useEffect, useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { InstanceService } from '../../../services/instance.service';
import { DatabaseInstance } from '../../../types/instance.types';
import Link from 'next/link';
import { ROUTES } from '../../../utils/constants';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FaPlus, FaDatabase, FaTrash, FaEdit } from 'react-icons/fa';

export default function InstancesPage() {
    const [instances, setInstances] = useState<DatabaseInstance[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadInstances();
    }, []);

    const loadInstances = async () => {
        try {
            const data = await InstanceService.getAll();
            setInstances(data);
        } catch (error) {
            toast.error('Error loading instances');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this instance?')) return;

        try {
            await InstanceService.delete(id);
            toast.success('Instance deleted');
            loadInstances();
        } catch (error) {
            toast.error('Error deleting instance');
        }
    };

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-black text-white mb-2">Database Instances</h1>
                        <p className="text-gray-400">Manage all your database connections</p>
                    </div>
                    <Link href={ROUTES.ADMIN_CREATE_INSTANCE}>
                        <Button variant="primary" leftIcon={<FaPlus />}>
                            New Instance
                        </Button>
                    </Link>
                </div>

                {isLoading ? (
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-32 bg-white/[0.02] rounded-xl animate-pulse" />
                        ))}
                    </div>
                ) : instances.length === 0 ? (
                    <div className="bg-white/[0.02] border border-white/10 rounded-xl p-12 text-center">
                        <FaDatabase className="text-6xl text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-400 text-lg mb-4">No instances created yet</p>
                        <Link href={ROUTES.ADMIN_CREATE_INSTANCE}>
                            <Button variant="primary">Create First Instance</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {instances.map((instance, index) => (
                            <motion.div
                                key={instance.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="relative group"
                            >
                                <div className="absolute inset-0 bg-white/[0.03] border border-white/10 rounded-xl backdrop-blur-sm group-hover:border-cyan-500/30 transition-all" />
                                <div className="relative p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <h3 className="text-xl font-bold text-white">{instance.name}</h3>
                                        <div className="flex gap-2">
                                            <span className="px-2 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs rounded font-mono">
                                                {instance.type}
                                            </span>
                                            <span className={`px-2 py-1 text-xs rounded font-mono ${instance.isActive
                                                    ? 'bg-green-500/10 border border-green-500/20 text-green-400'
                                                    : 'bg-red-500/10 border border-red-500/20 text-red-400'
                                                }`}>
                                                {instance.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        </div>
                                    </div>

                                    {instance.description && (
                                        <p className="text-gray-400 text-sm mb-4">{instance.description}</p>
                                    )}

                                    <p className="text-gray-500 text-xs mb-4 font-mono">
                                        Created: {new Date(instance.createdAt).toLocaleDateString()}
                                    </p>

                                    <div className="flex gap-2">
                                        <Button variant="secondary" size="sm" className="flex-1" leftIcon={<FaEdit />}>
                                            Edit
                                        </Button>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            className="flex-1"
                                            onClick={() => handleDelete(instance.id)}
                                            leftIcon={<FaTrash />}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}