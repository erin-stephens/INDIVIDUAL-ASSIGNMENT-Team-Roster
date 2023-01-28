import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getTeams, updateTeam, createTeam } from '../../api/teamData';

const initialState = {
  name: '',
  image: '',
  cheer: '',
};

export default function TeamForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [, setTeams] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getTeams(user.uid).then(setTeams);
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateTeam(formInput)
        .then(() => router.push('/teams'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createTeam(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };

        updateTeam(patchPayload).then(() => {
          router.push('/teams');
        });
      });
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h2>{obj.firebaseKey ? 'Update' : 'Create'} A Member</h2>

        <FloatingLabel controlId="floatingInput1" label="Team Name" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter team name"
            name="name"
            value={formInput.name}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput2" label="Team Image" className="mb-3">
          <Form.Control
            type="url"
            placeholder="Enter an image url"
            name="image"
            value={formInput.image}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput3" label="Team Cheer" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter a team cheer"
            name="cheer"
            value={formInput.cheer}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Team</Button>
      </Form>
    </>
  );
}

TeamForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

TeamForm.defaultProps = {
  obj: initialState,
};
