import React from 'react'
import AddProfileForm from './AddProfileForm'
import classes from './Profiles.module.css'
import ProfilesList from './ProfilesList'

const Profiles = () => {

  return (
    <div className={classes.profiles}>
      <AddProfileForm/>
      <ProfilesList/>
    </div>
  )
}

export default Profiles