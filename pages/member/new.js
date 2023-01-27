import React from 'react';
import Head from 'next/head';
import MemberForm from '../../components/forms/MemberForm';

export default function AddMember() {
  return (
    <>
      <Head>
        <title>Add a Member</title>
      </Head>
      <MemberForm />
    </>
  );
}
