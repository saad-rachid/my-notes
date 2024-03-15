import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import {ReactComponent as ArrowLeft} from '../assets/arrow-left.svg'




const NotePage = () => {
  console.log(useParams())
  let noteId = useParams().id
  let [note , setNote] = useState(null)



  useEffect(() => {
    if(noteId === 'new') return 
    fetch(`http://localhost:8000/notes/${noteId}`).then(res =>{
      return res.json()   
    }).then(data=>{
      console.log(data)
      setNote(data)
    })    
  }, [noteId])

/*
  let getNote = async () => {
      let response = await fetch(`http://localhost:8000/notes/${noteId}`)
      let data = await response.json()    
      setNote(data)
    
}*/


  let updateNote = async () => {
      await fetch(`http://localhost:8000/notes/${noteId}`,{
        method : 'PUT',
        headers: {
          'content-type': 'application/json'          
        },
        body : JSON.stringify({...note, 'update': new Date()})
      })
  }

  let deleteNote = async  ()=> {
      await fetch(`http://localhost:8000/notes/${noteId}`,{
      method : 'Delete',
      headers: {
        'content-type': 'application/json'          
      },
      body : JSON.stringify(note)
    })
  }


  let createNote = async () => {
    await fetch(`http://localhost:8000/notes/`,{
      method : 'POST',
      headers: {
        'content-type': 'application/json'          
      },
      body : JSON.stringify({...note, 'update': new Date()})
    })
}

  let handleSubmit = ()=>{
    if(noteId !== 'new' && !note.body){
      deleteNote()
    }else if(noteId !== 'new'){
      updateNote()
    }
    else if(noteId==='new' && note !==null){
          createNote()
      }        
  }
   
  return (
    <div className= "note">
      <div className='note-header'>
      
        <h3>          
          <Link to="/">
            <ArrowLeft  onClick={handleSubmit} />   
          </Link>       
        </h3>
        {noteId !== 'new' ? (<button onClick={deleteNote}>
          <Link to="/">
          Delete
          </Link>
          </button>):(<button onClick={handleSubmit}>
          <Link to="/">
          Done
          </Link>
          </button>) }
        
        
      </div>
      { note? (<textarea onChange={(e)=>{setNote({...note, 'body': e.target.value })}} value={note.body}>

      </textarea>) : (<textarea onChange={(e)=>{setNote({...note, 'body': e.target.value })}}></textarea>)}
     
    </div>
  )
}

export default NotePage
