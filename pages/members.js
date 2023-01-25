/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { getMembers } from '../api/memberData';
import { useAuth } from '../utils/context/authContext';
import MemberCard from '../components/MemberCard';

export default function ShowMembers() {
  const [members, setMembers] = useState([]);
  const { user } = useAuth();
  const [searchInput, setSearchInput] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);

  const getAllMembers = () => {
    getMembers(user.uid).then(setMembers);
  };

  useEffect(() => {
    getAllMembers();
  }, []);

  const searchMembers = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== '') {
      const filteredMembers = members.filter((item) => Object.values(item).includes(searchInput));
      setFilteredResults(filteredMembers);
    } else {
      setFilteredResults(members);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
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
        value={searchInput}
      />
      <div className="d-flex flex-wrap">{searchInput.length > 1 ? (
        filteredResults.map((member) => (
          <MemberCard key={member.firebaseKey} memberObj={member} onUpdate={searchMembers} />
        ))
      ) : (
        members.map((member) => (
          <MemberCard key={member.firebaseKey} memberObj={member} onUpdate={getAllMembers} />
        )))}
      </div>
    </div>
  );
}
