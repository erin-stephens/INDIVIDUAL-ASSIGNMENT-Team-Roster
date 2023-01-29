# Team Roster  [![Netlify Status](https://api.netlify.com/api/v1/badges/6231cdfc-5aa9-4caa-96c3-399e3aa7440a/deploy-status)](https://app.netlify.com/sites/team-roster-applees/deploys)

My product can be used to keep track of staff/ students. You can add them and place them on teams (classes). This can help keep track of which class students are in or which staff belong to each grade level if you chose to use it for just staff. 

[View App](https://team-roster-applees.netlify.app/)

## About the User <!-- This is a scaled down user persona -->
- The ideal user for this application is an admin at a school.
- Admin can use this app to place students into teams or classes. 
- The problem this app solves for them is it allows them to stay organized by seeing where each student has been placed, and also being able to see all members who have been added to the app.

## Features <!-- List your app features using bullets! Do NOT use a paragraph. No one will read that! -->
- When a new member is added an object should be created and that object should be pushed into an array of members that then shows on the view members page.
- Members can be placed on teams.
- Team view can be accessed from the view teams page.
- Users can search for members on the view members page.

## Video Walkthrough of Team Roster <!-- A loom link is sufficient -->
(to come)

## Relevant Links <!-- Link to all the things that are required outside of the ones that have their own section -->
- [Check out the deployed site](https://team-roster-applees.netlify.app/)
- [Wireframes](https://www.figma.com/file/ad4A8xRc0r0gD4kEU4hhru/Team-Roster?node-id=0%3A1&t=sN7Bh6iqm3ncUDbo-1)

## Code Snippet <!-- OPTIONAL, but doesn't hurt -->
```
const initialState = {
  name: '',
  image: '',
  role: '',
};

export default function MemberForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [teams, setTeams] = useState([]);
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
  ```

## Project Screenshots <!-- These can be inside of your project. Look at the repos from class and see how the images are included in the readme -->
<img width="148" alt="homepage" src="/screenshots/homepage.png"><img width="148" alt="homepage" src="/screenshots/addmember.png"><img width="148" alt="homepage" src="/screenshots/membersview.png"><img width="148" alt="homepage" src="/screenshots/addteam.png"><img width="148" alt="homepage" src="/screenshots/teamview.png">

## Contributors
- [Erin Stephens](https://github.com/erin-stephens)

