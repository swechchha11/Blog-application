import mongoose from "mongoose";


 const connection=async (USERNAME,PASSWORD)=>{
   const URL= `mongodb+srv://${USERNAME}:${PASSWORD}@blog-app.cwyo8oz.mongodb.net/?retryWrites=true&w=majority`;

    try{
       await mongoose.connect(URL,{useNewUrlParser:true});
       console.log('Database connected succesfully');
    }
    catch(error )

{
console.log('Error while connecting with the database',error);
}
};
export default connection;