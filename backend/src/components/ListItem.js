import React from 'react';
import {Link} from 'react-router-dom';

let getTitle= (note) =>{
  const title =note.body.split('\n')[0]
  return title   
}

let getDate = (note) => {
  try {
    const updatedDate = new Date(note.update);
    if (isNaN(updatedDate)) {
      throw new Error('Invalid date');
    }
    return updatedDate.toDateString();
  } catch (error) {
    console.error('Error retrieving date:', error);
    return ''; // or any fallback value you prefer
  }
}

let getContent = (note) => {
  let title = getTitle(note)
  let content = note.body.replaceAll('\n', '')
  content = content.replaceAll(title, '')
  if(content.length >0){
    return content
  }

}
const ListItem = ({note}) => {
  /*console.log(props)*/
  return (    
      <Link to={`/note/${note.id}`}>
        <div className='notes-list-item'>
            <h3>{getTitle(note)}</h3>
            <p><span>{getDate(note)}</span>{getContent(note)}</p>
        </div>
      </Link>
  )
}

export default ListItem
