/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { viewTeamDetails } from '../../api/mergedData';
import MemberCard from '../../components/MemberCard';

export default function ViewTeam() {
  const [teamDetails, setTeamDetails] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;
  console.warn(teamDetails);

  const getTeamDetails = () => {
    viewTeamDetails(firebaseKey).then(setTeamDetails);
  };

  useEffect(() => {
    getTeamDetails();
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={teamDetails.image} alt={teamDetails.name} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5>
          {teamDetails.name}
        </h5>
        Team Cheer: <div>{teamDetails.cheer}</div>
      </div>
      <div className="mt-5 d-flex flex-wrap">
        {teamDetails.memberArray?.map((member) => <MemberCard key={member.firebaseKey} memberObj={member} onUpdate={getTeamDetails} />)}
      </div>
    </div>
  );
}
