
import Pagination from '@/app/components/Pagination';
import prisma from '@/prisma/client';
import { Status } from '@prisma/client';
import IssueActions from './IssueActions';
import IssueTable, { IssueQuery, columnNames } from './IssueTable';
import { Flex } from '@radix-ui/themes';
import { Metadata } from 'next';
import {User} from "@prisma/client";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';


interface Props {
  searchParams: IssueQuery
}

const users:{id?: string, name?: string}[] = [
  {  name: 'All' },
  { id: 'clnw3r2ei0000vfe8k8t0tcp1', name: 'Unassigned' },
  { id: 'clnw3r2ei0000vfe8k8t0tcp7', name: 'renan silva' },
  { id: 'clnw3r2ei0000vfe8k8t0tcf1', name: 'Luan' },
];

const IssuesPage = async ({ searchParams }: Props) => {


  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

    const allUsers = await prisma.user.findMany();
    const user = allUsers.find((user)=>( user.id === searchParams.assigned ));
    const assignedToUserId = user?.id!;
   
  const where = { assignedToUserId };


  const orderBy = columnNames
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: 'asc' }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    // select:{
    //   id: true,
    //   title: true,
    //   status: true,
    //   createdAt: true,
    //   assignedToUser: {
    //     select: {
    //       name: true
    //     }
    //   }
    // },
    include:{
      assignedToUser: {
            select: {
              name: true
            }
    }
    },
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <Flex direction="column" gap="4">
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </Flex>
  );
};

export const dynamic = 'force-dynamic';

// export const metadata: Metadata = {
//   title: 'Issue Tracker - Issue List',
//   description: 'View all project issues'
// };

export default IssuesPage;