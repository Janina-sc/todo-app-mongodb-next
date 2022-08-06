import {connect, connection} from 'mongoose'

const conn={
    isConnected:false
}

export async function  dbConnect(){
    if(conn.isConnected) return; //ojo
   const db= await connect(process.env.MONGODB_URL) //mi objeto de conexión
   
   conn.isConnected=db.connections[0].readyState;//en el tutorial lo usan pero no me servía, me rompía todo!!
console.log(db.connection.db.databaseName)

}

connection.on("connected", ()=>{
    console.log("Mongodb is now connected")
});
connection.on("error", (err)=>{
    console.log(err)
});

