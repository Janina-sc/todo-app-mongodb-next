import {Form, Grid, Button} from 'semantic-ui-react'
import React, {useState, useEffect} from 'react';
import {useRouter} from 'next/router'

function TaskFormPage() {
    const [newTask, setNewTask]=useState({
        title:"",
        description:""
    });
    const [errors, setErrors]=useState({
        title:"", 
        description:""
    });

    const {query, push}= useRouter()

    const validate=()=>{
        const errors={}
        if(!newTask.title) errors.title="Title is required"
        if(!newTask.description) errors.description="Description is required"
        return errors;
    }
    const handleSubmit= async (e)=>{
        e.preventDefault();
        let errors= validate();
        if(Object.keys(errors).length) return setErrors(errors)//si hay errores
       console.log("submiting")
       if(query.id){
         await updateTask();
        } else{
        await createTask();
       }

       await push('/')
    }

    const createTask= async ()=>{
        try {
            await fetch('http://localhost:3000/api/tasks',{
                method:"Post",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(newTask)//lo que reciba lo convierte en string y lo manda al back
            })
            
        } catch (error) {
            console.log(error)
            
        }

    }
    const updateTask= async()=>{
        try {
            await fetch('http://localhost:3000/api/tasks/' + query.id ,{
                method:"PUT",
                headers:{
                    "Content-Type":"application/json",
                },
                body: JSON.stringify(newTask)//lo que reciba lo convierte en string y lo manda al back
            })
            
        } catch (error) {
            console.log(error)
            
        }

    }
    const handleChange=(e)=>setNewTask({
        ...newTask,
        [e.target.name]:e.target.value
    });
    const getTask= async()=>{
       const res= await fetch('http://localhost:3000/api/tasks/' + query.id)
       const data= await res.json()
       setNewTask({
        title:data.title, 
        description:data.description});

    }

    useEffect(()=>{
        if(query.id) getTask();//si encuentra un id ejecuta el getTask

    }, []);



    return(
    <Grid
    centered
    verticalAlign='middle'
    columns="3"
    style={{height : "80vh"}}
    >
        <Grid.Row>
            <Grid.Column
            textAlign='center'
            >
                {query.id ?'Update Task' : 'Create Task'}
            <Form onSubmit={handleSubmit}>
        <Form.Input name="title" 
        label="Title" placeholder="Title"
         onChange={handleChange}
         error={errors.title ? {content: "Please, enter a title",
         pointing:"below"}: null}
         value={newTask.title}/>

        <Form.TextArea name="description" 
        label="Description" placeholder="Description"
        onChange={handleChange}
        error={errors.description ? {content: "Please, enter a description",
         pointing: "below"}: null}
         value={newTask.description}
         />

        <Button primary>
            {query.id ? 'Update task'  : 'Create new task'}

        </Button >
    </Form>
            </Grid.Column>
        </Grid.Row>

    </Grid>
    
  )
}

export default TaskFormPage