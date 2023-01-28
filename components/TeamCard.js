import React from 'react';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { deleteTeamMembersRelationship } from '../api/mergedData';

export default function TeamCard({ teamObj, onUpdate }) {
  const deleteThisTeam = () => {
    if (window.confirm(`Delete ${teamObj.name}?`)) {
      deleteTeamMembersRelationship(teamObj.firebaseKey).then(() => onUpdate());
    }
  };
  return (
    <div>
      <Card
        style={{
          width: '18rem',
          backgroundColor: 'black',
          color: 'white',
          borderColor: 'goldenrod',
        }}
        className="m-2"
      >
        <Card.Img variant="top" src={teamObj.image} style={{ height: '250px', width: '250px' }} className="m-3" />
        <Card.Body>
          <Card.Title>{teamObj.name}</Card.Title>
          <Card.Text>{teamObj.cheer}</Card.Text>
          <Link href={`/team/edit/${teamObj.firebaseKey}`} passHref>
            <Button variant="warning">Edit</Button>
          </Link>
          <Link href={`/team/${teamObj.firebaseKey}`} passHref>
            <Button variant="warning" className="m-2">View</Button>
          </Link>
          <Button variant="warning" onClick={deleteThisTeam}>Delete</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

TeamCard.propTypes = {
  teamObj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    cheer: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
