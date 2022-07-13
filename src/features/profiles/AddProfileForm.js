import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addNewProfile } from "./profilesSlice";
import { selectAllSkills } from "../skills/skillsSlice";


const AddProfileForm = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [location, setLocation] = useState("");
  const [skillName, setSkillName] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const skills = useSelector(selectAllSkills);

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
          addNewProfile({ name, image, dateOfBirth, location, skills: skillName })
        ).unwrap();
        setName("");
        setImage("");
        setLocation("");
        setDateOfBirth("");
        setSkillName("");
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
    <section>
      <h2>Add a New Profile</h2>
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
  );
};
export default AddProfileForm;
