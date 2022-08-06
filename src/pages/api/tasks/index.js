import {dbConnect} from 'utils/mongoose'; //por el archico jsconfig.json(ahí le puse src, porque todas las carpetas están en src)
import Task from 'models/Task'

dbConnect();

export default async function handler(req, res) {
    const {method, body}=req; //destructuring de los valores que vienen por body
    switch(method){//si el método es GET
        case "GET":
            try {

                const tasks= await Task.find(); //hace ésto
                console.log(tasks)
               return res.status(200).json( tasks );//url=localhost:3000/api/tasks
                
            } catch (error) {
                return res.status(500).json({error:error.message});
                
            }
        

         case "POST":
            try {
                const newTask= new Task(body);//es el objeto nuevo que crea mongoose
                   const savedTask= await newTask.save();//lo guarda en la db
                     return res.status(201).json(savedTask)//201 objeto nuevo creado
                       
                 }  catch (error) {
                return res.status(500).json({error: error.message})
            }
                
            default:
            }

    }
    //console.log(req.method, req.url)
    

  