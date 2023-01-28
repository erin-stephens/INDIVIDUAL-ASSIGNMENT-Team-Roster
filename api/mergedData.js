import { getSingleMember, deleteMember } from './memberData';
import { getTeamsMembers, getSingleTeam, deleteSingleTeam } from './teamData';

// for merged promises
// TODO: Get data for viewMember
const getMemberDetails = (firebaseKey) => new Promise((resolve, reject) => {
  // GET SINGLE Member
  getSingleMember(firebaseKey).then((memberObject) => { // returns single member object
    getSingleTeam(memberObject.team_id) // we nest this promise so that we can use the member object
      .then((teamObject) => resolve({ ...memberObject, teamObject }));
  }).catch(reject);
  // GET Team
  // Create an object that has member data and an object named teamObject
});

const viewTeamDetails = (firebaseKey) => new Promise((resolve, reject) => {
  getSingleTeam(firebaseKey).then((teamObject) => {
    getTeamsMembers(firebaseKey)
      .then((memberArray) => resolve({ ...teamObject, memberArray }));
  }).catch(reject);
});

const deleteTeamMembersRelationship = (firebaseKey) => new Promise((resolve, reject) => {
  getTeamsMembers(firebaseKey).then((teamMembersArray) => {
    const deleteMemberPromises = teamMembersArray.map((member) => deleteMember(member.firebaseKey));

    Promise.all(deleteMemberPromises).then(() => {
      deleteSingleTeam(firebaseKey).then(resolve);
    });
  }).catch(reject);
});

export {
  getMemberDetails,
  viewTeamDetails,
  deleteTeamMembersRelationship,
};
