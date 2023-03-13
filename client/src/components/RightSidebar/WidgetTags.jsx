import React from 'react'
import './RightSidebar.css'

const WidgetTags = () => {

  const tags = ["c","css","html","javascript","react.js","node.js","next.js","php","firebase","express.js","mongodb"];

  return (
    <div className='widget-tags'>
      <h3>Watched Tags</h3>
      <div className="widget-tags-div">
        {
          tags.map((tag)=>(
            <p key={tag}>{tag}</p>
          ))
        }
      </div>
      
    </div>
  )
}

export default WidgetTags
