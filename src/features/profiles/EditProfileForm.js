import { useState , useRef} from 'react';
import classes from '../skills/Skills.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { selectProfileById, updateProfile } from './profilesSlice';
import { selectAllSkills } from '../skills/skillsSlice';
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";


const EditProfileForm = () => {
    const { profileId } = useParams()
    const navigate = useNavigate()

    const profile = useSelector((state) => selectProfileById(state, profileId))
    const dispatch = useDispatch();

    const [name, setName] = useState(profile?.name);
    const [image, setImage] = useState(profile?.image);
    const [dateOfBirth, setDateOfBirth] = useState(profile?.dateOfBirth);
    const [location, setLocation] = useState(profile?.location);
    const [addRequestStatus, setAddRequestStatus] = useState("idle");
  
    const skills = useSelector(selectAllSkills)
    const profileSkillsRef = useRef();
    const [skName, setSkName] = useState([]);
  
  
    const onNameChanged = (e) => setName(e.target.value);
    const onImageChanged = (e) => setImage(e.target.value);
    const onDateofBirthChanged = (e) => setDateOfBirth(e.target.value);
    const onLocationChanged = (e) => setLocation(e.target.value);
  
    const canSave =
      [name, image, dateOfBirth, location, skName].every(Boolean) &&
      addRequestStatus === "idle";
  
    const onSaveProfileClicked = () => {
      if (canSave) {
        try {
          setAddRequestStatus("pending");
          dispatch(
            updateProfile({ id: profile.id, name, image, dateOfBirth, location, skills: profileSkillsRef.current.value })
          ).unwrap();
          setName("");
          setImage("");
          setLocation("");
          setDateOfBirth("");
          setSkName([]);
          navigate("/profiles/")
        } catch (err) {
          console.error("Failed to save the profile", err);
        } finally {
          setAddRequestStatus("idle");
        }
      }
    };
  
  
    var skillsNames = [];
    for (var i = 0; i < skills.length; i++) {
      skillsNames.push(skills[i].name);
    }
    console.log(skillsNames);
  
    const handleChange = (event) => {
      const {
        target: { value },
      } = event;
      setSkName(typeof value === "string" ? value.split(",") : value);
    };

  return (
    <section className={classes.skills}>
      <h2>Edit Profile</h2>
      <form>
        <label htmlFor="profileName"> Name:</label>
        <input
          type="text"
          id="profileName"
          name="profileName"
          value={name}
          onChange={onNameChanged}
        />
        <label htmlFor="profileImage"> Image:</label>
        <input
          type="text"
          id="profileImage"
          name="profileImage"
          value={image}
          onChange={onImageChanged}
        />
        <label htmlFor="profileDateOfBirth"> Date Of Birth:</label>
        <input
          type="text"
          id="profileDateOfBirth"
          name="profileDateOfBirth"
          value={dateOfBirth}
          onChange={onDateofBirthChanged}
        />
        <label htmlFor="profileLocation"> Location:</label>
        <input
          type="text"
          id="profileLocation"
          name="profileLocation"
          value={location}
          onChange={onLocationChanged}
        />
        <label htmlFor="profileSkill"> Skill:</label>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={skName}
          onChange={handleChange}
          inputRef={profileSkillsRef}
          style ={{
            backgroundColor: "white",
            borderColor: "black",
            marginBottom: 20,
          }} 
        >
          {skillsNames.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
        <button
          type="button"
          onClick={onSaveProfileClicked}
          disabled={!canSave}
        >
          SAVE
        </button>
      </form>
    </section>
  )
}

export default EditProfileForm