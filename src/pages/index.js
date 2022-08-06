import { useRouter } from 'next/router'
import {Button, Card, Container, Grid} from 'semantic-ui-react'

export default function HomePage({tasks}) {//esto es el front

  const router=useRouter();
  if(tasks.length===0) return (
    <Grid  centered verticalAlign='middle' columns={1} 
    style={{height:"80vh"}}>
      <Grid.Row>
        <Grid.Column textAlign='center'>
          <h1>There is no tasks yet.</h1>
          <img src="https://stories.freepiklabs.com/storage/18539/no-data-pana-1440.png" alt="empty file"></img>
          <div>
            <Button primary>Create a Task</Button>
          </div>
        
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
  console.log(tasks)
  //Render a list of tasks
  return (
    <div>
      <Container style={{padding:"20px"}}>
     
        <Card.Group itemsPerRow={4}> 
        {
          tasks.map(task =>(
            <Card key={task._id}>
              <Card.Content>
                <Card.Header>{task.title}</Card.Header>
                <p>{task.description}</p>
              </Card.Content>
              <Card.Content extra>
                <Button primary onClick={()=>router.push(`/tasks/${task._id}`)}>View</Button>
                <Button primary onClick={()=>router.push(`/tasks/${task._id}/edit`)}>Edit</Button>
              </Card.Content>
            </Card>

          ))
        }

        </Card.Group>

      </Container>
      
    </div>
  )
}

export const getServerSideProps= async(ctx)=>{ //retorna un obj props//así se comunica back y front
   const res  =await fetch('http://localhost:3000/api/tasks')//así el front importa lo del back
   const tasks= await res.json()
  console.log(tasks)
    return { //lo que me viene del back lo paso por props
      props:{
        tasks,


      }
    }
}