import { useState } from 'react';
import classes from '../skills/Skills.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { selectSkillById, updateSkill } from './skillsSlice'
import { useParams, useNavigate } from 'react-router-dom'

const EditSkillForm = () => {
    const { skillId } = useParams()
    const navigate = useNavigate()

    const skill = useSelector((state) => selectSkillById(state, skillId))

    const [name, setName] = useState(skill?.name)
    const [image, setImage] = useState(skill?.image)
    const [requestStatus, setRequestStatus] = useState('idle')

    const dispatch = useDispatch()

    if (!skill) {
        return (
            <section>
                <h2>Skill not found!</h2>
            </section>
        )
    }

    const onNameChanged = e => setName(e.target.value)
    const onImageChanged = e => setImage(e.target.value)

    const canSave = [name, image].every(Boolean) && requestStatus === 'idle';

    const onSaveSkillClicked = () => {
        if (canSave) {
            try {
                setRequestStatus('pending')
                dispatch(updateSkill({ id: skill.id, name, image })).unwrap()
                setName('')
                setImage('')
                navigate("/skills/")
            } catch (err) {
                console.error('Failed to save the post', err)
            } finally {
                setRequestStatus('idle')
            }
        }
    }

    return (
        <section className={classes.skills}>
            <h2>Edit Skill</h2>
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
                >
                    SAVE
                </button>
            </form>
        </section>
    )
}

export default EditSkillForm