import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewSkill } from "./skillsSlice";

const AddSkillForm = () => {
    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [addRequestStatus, setAddRequestStatus] = useState('idle')

    const onNameChanged = e => setName(e.target.value)
    const onImageChanged = e => setImage(e.target.value)

    const canSave = [name, image].every(Boolean) && addRequestStatus === 'idle';

    const onSaveSkillClicked = () => {
        if (canSave) {
            try {
                setAddRequestStatus('pending')
                dispatch(addNewSkill({ name, image })).unwrap()
                setName('')
                setImage('')
            } catch (err) {
                console.error('Failed to save the skill', err)
            } finally {
                setAddRequestStatus('idle')
            }
        }

    }

    return (
        <section>
            <h2>Add a New Skill</h2>
            <form>
                <label htmlFor="skillName">Name:</label>
                <input
                    type="text"
                    id="skillName"
                    name="skillName"
                    value={name}
                    onChange={onNameChanged}
                />
                <label htmlFor="skillImage">Image:</label>
                <input
                    type="text"
                    id="skillImage"
                    name="skillImage"
                    value={image}
                    onChange={onImageChanged}
                />
                <button
                    type="button"
                    onClick={onSaveSkillClicked}
                    disabled={!canSave}
                >SAVE</button>
            </form>
        </section>
    )
}

export default AddSkillForm