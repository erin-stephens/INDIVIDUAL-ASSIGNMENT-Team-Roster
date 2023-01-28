/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { getMembers } from '../api/memberData';
import { useAuth } from '../utils/context/authContext';
import MemberCard from '../components/MemberCard';

const getFilteredMembers = (query, members) => {
  if (!query) {
    return members;
  }
  return members.filter((member) => member.name.includes(query));
};

export default function ShowMembers() {
  const [members, setMembers] = useState([]);
  const { user } = useAuth();
  const [query, setQuery] = useState('');

  const getAllMembers = () => {
    getMembers(user.uid).then(setMembers);
  };

  useEffect(() => {
    getAllMembers();
  }, []);

  const filteredItems = getFilteredMembers(query, members);

  const handleChange = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  return (
    <div>
      <Head>
        <title>Team Members</title>
      </Head>
      <h1> Team Members </h1>
      <input
        type="text"
        placeholder="Search Members"
        onChange={handleChange}
        className="m-2"
      />
      <div className="d-flex flex-wrap">{filteredItems.map((member) => (
        <MemberCard key={member.firebaseKey} memberObj={member} onUpdate={getAllMembers} />
      ))}
      </div>
    </div>
  );
}
