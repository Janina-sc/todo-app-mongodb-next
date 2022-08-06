import {dbConnect} from 'utils/mongoose';
import Task  from 'models/Task';

//dentro de corchetes, porque es un parámetro y por lo tanto va a ir cambiando

dbConnect();//sin ésto da error jiji
export default async(req, res)=>{
    const {method, body, query:{id}}=req;//sólo el id de query
    switch(method){
        case "GET":
            try {
                const task= await Task.findById(id)
            if(!task) return res.status(400).json({msg: "Task not found"})
            return res.status(200).json(task)//si la tarea existe la devuelve
            } catch (error) {
                return res.status(500).json({msg:error.message});
            }
            case "PUT":
                try {
                  const updatedTask=  await Task.findByIdAndUpdate(id, body, {
                    new:true, //para que devuelva el objeto nuevo y no el viejo(modificado)
                  });
                    if(!updatedTask)return res.status(400).json({msg: "Task not found"});
                    return res.status(200).json(updatedTask);

                } catch (error) {
                    return res.status(500).json({msg:error.message});
                }
                case "DELETE":
                    try {
                        const deletedTask= await Task.findByIdAndDelete(id);
                        if(!deletedTask)return res.status(404).json({msg:"Task not foun"});
                        return res.status(200).json(deletedTask)//si existe la tarea, me devuelve la tarea eliminada
                        
                    } catch (error) {
                        return res.status(400).json({msg:error.message});
                        
                    }
        default:
            return res.status(400).json({msg:"This method is not supported"});
    }
    // console.log(req.query)//query: vienen los datos de la consulta
  
    //(100 es el número de tarea que estoy buscando)Por consola veo:{id:100}.Como le puse de nombre [id]al arch me devuelve id:...
}