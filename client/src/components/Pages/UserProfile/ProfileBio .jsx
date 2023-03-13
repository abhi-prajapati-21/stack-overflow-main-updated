import React from 'react'

const ProfileBio  = ({ currentProfile }) => {

  return (
    <div>
        <div>
        {
            currentProfile?.tags.length !== 0 ? 
            (
               <>
                 <h1>Tags Watched</h1>
                 {
                    currentProfile?.tags.map(tag => (
                        <p key={tag}>{tag}</p>
                    ))
                 }
               </>  
            ) :(
                <p>0 Tags Watched</p>
            ) 
        }
        </div>
        <div>
            {
                currentProfile?.about ?
                (
                  <>
                     <h1>About</h1>
                     <p>{ currentProfile?.about }</p>
                  </>   
                ) :
                (
                    <p>No Bio found</p>
                )
            }
        </div>
    </div>
  )
}

export default ProfileBio 
