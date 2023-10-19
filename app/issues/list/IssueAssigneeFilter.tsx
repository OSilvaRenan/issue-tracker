'use client';

import prisma from '@/prisma/client';
import { Status, User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

const users = [
    { name:'All' },
    { id: 'clnw3r2ei0000vfe8k8t0tcp1', name: 'Unassigned' },
    { id: 'clnw3r2ei0000vfe8k8t0tcp7', name: 'renan silva' },
    { id: 'clnw3r2ei0000vfe8k8t0tcf1', name: 'Luan' },
];

const IssueAssigneeFilter = async () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    // const allUsers = await prisma.user.findMany();

    return (
        <Select.Root
            defaultValue={searchParams.get('assigned') || ''}
            onValueChange={(users) => {
                const params = new URLSearchParams();

                if (users) params.append('assigned', users);

                if (searchParams.get('orderBy'))
                    params.append('orderBy', searchParams.get('orderBy')!);

                    if (searchParams.get('assigned'))
                    params.append('assigned', searchParams.get('assigned')!);

                // const query = params.size ? '?' + params.toString() : '';
                // router.push('/issues/list' + query);
            }}
        >
            <Select.Trigger placeholder='Filter by assigned...' />
            <Select.Content>
                {users.map((user) => (
                    <Select.Item
                        key={user.name}
                        value={user.id!}
                    >
                        {user.name}
                    </Select.Item>
                ))}
            </Select.Content>
        </Select.Root>
    );
};

export const dynamic = 'force-dynamic';

export default IssueAssigneeFilter;