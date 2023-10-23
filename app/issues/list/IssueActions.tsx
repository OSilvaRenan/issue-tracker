import { Button, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';
import IssueStatusFilter from './IssueStatusFilter';
import IssueAssigneeFilter from './IssueAssigneeFilter';
import prisma from '@/prisma/client';

const IssueActions = async() => {

  const allUsers = await prisma.user.findMany();


  return (
    <Flex justify="between">
      <IssueStatusFilter />
      <IssueAssigneeFilter users={allUsers}/>
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </Flex>
  );
};

export default IssueActions;