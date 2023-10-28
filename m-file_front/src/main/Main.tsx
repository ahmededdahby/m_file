import React from 'react'
import Client from '../search/Client.tsx'

let searchClientURL = "https://localhost:7053/api/Auth/searchInClientByProperty"
let searchDocumentURL = "https://localhost:7053/api/Auth/searchDocument"
let uploadDocument = "https://localhost:7053/api/Auth/UploadFile"
const Main = () => {
  return (
    <div style={{display:"flex",flexDirection:"column",justifyContent:"space-evenly",height:"100vh"}}>
      <Client text={"search in clients"} URL={searchClientURL} type={"text"} />
      <Client text={"search in documents"} URL={searchDocumentURL} type={"text"} />
      <Client text={"upload document"} URL={uploadDocument} type={"file"}/>
    </div>
  
  )
}

export default Main