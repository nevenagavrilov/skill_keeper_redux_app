import React from 'react'
import classes from '../skills/Skills.module.css'
import AddSkillForm from './AddSkillForm'
import SkillsList from './SkillsList'

const Skills = () => {
  return (
    <div className={classes.skills}>
      <AddSkillForm/>
      <SkillsList/>
    </div>
  )
}

export default Skills