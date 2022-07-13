import { useState } from 'react';
import classes from '../skills/Skills.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { selectProfileById, updateProfile } from './profilesSlice';
import { selectAllSkills } from '../skills/skillsSlice';

const EditProfileForm = () => {
    const { profileId } = useParams()
    const navigate = useNavigate()

    const profile = useSelector((state) => selectProfileById(state, profileId))
    const dispatch = useDispatch();

    const [name, setName] = useState(profile?.name);
    const [image, setImage] = useState(profile?.image);
    const [dateOfBirth, setDateOfBirth] = useState(profile?.dateOfBirth);
    const [location, setLocation] = useState(profile?.location);
    const [skillName, setSkillName] = useState(profile?.skillName);
    const [addRequestStatus, setAddRequestStatus] = useState("idle");
  
    const skills = useSelector(selectAllSkills)
  
    const onNameChanged = (e) => setName(e.target.value);
    const onImageChanged = (e) => setImage(e.target.value);
    const onDateofBirthChanged = (e) => setDateOfBirth(e.target.value);
    const onLocationChanged = (e) => setLocation(e.target.value);
    const onSkillsChanged = (e) => setSkillName(e.target.value);
  
    const canSave =
      [name, image, dateOfBirth, location, skillName].every(Boolean) &&
      addRequestStatus === "idle";
  
    const onSaveProfileClicked = () => {
      if (canSave) {
        try {
          setAddRequestStatus("pending");
          dispatch(
            updateProfile({ id: profile.id, name, image, dateOfBirth, location, skills: skillName })
          ).unwrap();
          setName("");
          setImage("");
          setLocation("");
          setDateOfBirth("");
          setSkillName("");
          navigate("/profiles/")
        } catch (err) {
          console.error("Failed to save the profile", err);
        } finally {
          setAddRequestStatus("idle");
        }
      }
    };
  
  
    const skillsOptions = skills.map((skill) => (
      <option key={skill.id} value={skill.name}>
        {skill.name}
      </option>
    ));
  

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
        <select
            id="profileSkill"
            name="profileSkill"
            value={skillName}
            onChange={onSkillsChanged}
        >
          <option value=""></option>
          {skillsOptions}
        </select>
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