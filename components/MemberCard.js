import React, { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { deleteMember } from '../api/memberData';
import { getSingleTeam } from '../api/teamData';

function MemberCard({ memberObj, onUpdate }) {
  const [teams, setTeams] = useState({});

  const deleteThisMember = () => {
    if (window.confirm(`Delete ${memberObj.name}?`)) {
      deleteMember(memberObj.firebaseKey).then(() => onUpdate());
    }
  };

  useEffect(() => {
    getSingleTeam(memberObj.team_id).then(setTeams);
  });

  console.warn(memberObj);

  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={memberObj.image} style={{ height: '300px' }} />
        <Card.Body>
          <Card.Title>{memberObj.name}</Card.Title>
          <Card.Text>{memberObj.role}</Card.Text>
          <Card.Text>{teams.name}</Card.Text>
          <Link href={`/member/edit/${memberObj.firebaseKey}`} passHref>
            <Button variant="warning">Edit</Button>
          </Link>
          <Button variant="warning" onClick={deleteThisMember}>Delete</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

MemberCard.propTypes = {
  memberObj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    role: PropTypes.string,
    team_id: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default MemberCard;
