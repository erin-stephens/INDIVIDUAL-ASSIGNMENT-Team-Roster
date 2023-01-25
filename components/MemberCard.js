import React from 'react';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { deleteMember } from '../api/memberData';

function MemberCard({ memberObj, onUpdate }) {
  const deleteThisMember = () => {
    if (window.confirm(`Delete ${memberObj.name}?`)) {
      deleteMember(memberObj.firebaseKey).then(() => onUpdate());
    }
  };

  console.warn(memberObj);

  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={memberObj.image} style={{ height: '300px' }} />
        <Card.Body>
          <Card.Title>{memberObj.name}</Card.Title>
          <Card.Text>{memberObj.role}</Card.Text>
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
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default MemberCard;
