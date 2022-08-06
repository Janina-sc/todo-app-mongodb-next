import React,{useState} from "react";
import Error from "next/error"
import { Grid,  Button, Confirm, Loader} from "semantic-ui-react";
import {useRouter} from 'next/router'


function TaskDetail ({task, error}) {//el back va a recibir un objeto task
  const [confirm, setConfirm]=useState(false)
  const {query, push}=useRouter();//del useRouter sólo extraigo el query
  const [isDeleting, setIsDeleting]=useState(false)
  
  const open=()=> setConfirm(true)
  const close=()=>setConfirm(false)

  const deleteTask= async()=>{
   const {id}=query;
   try {
    await fetch(`http://localhost:3000/api/tasks/${id}`,{
      method:"DELETE",
    }
    )
   
   } catch (error) {
    console.log(error)
    
   }
    
  }

  const handleDelete=()=>{
    setIsDeleting(true)
    deleteTask()
    close();
    push('/')
  }
  if(error&&error.statusCode) return <Error statusCode={error.statusCode} title={error.statusText} />;
  
  return (
  <Grid centered 
  verticalAlign="middle"
  columns="1"
  style={{height:"80vh"}}>
    <Grid.Row>
      <Grid.Column textAlign="center">
        <h1>{task.title}</h1>
        <p>{task.description}</p>
        <div>
          <Button color="red"
          onClick={open}
          loading={isDeleting}>
            Delete

          </Button>
        </div>

      </Grid.Column>

    </Grid.Row>
    <Confirm
    header="Please confirm" 
    content="Are you sure you want to delete this task?"
    open={confirm} 
    onConfirm={handleDelete}//cuando confirme que lance el handleDelete
    onCancel={close}//cuando cancela ejecuta el close
    />
    </Grid>
  );
}
  // return (
  //   <div>
  //       {JSON.stringify(task)}
  //   </div>
  // )

export async function getServerSideProps({query:{id}}){
  const res= await fetch(`http://localhost:3000/api/tasks/${id}`)

  if(res.status===200){//si el status es 200
    const task=await res.json()// me convierte la respuesta en json
    return { //y me retorna la tarea
      props:{
        task,
      }
    }
  }

  return {
    props:{
      error:{
        statusCode:res.status,
        statusText:"Invalid Id"
      }
    }
  }

}


export default TaskDetail;
