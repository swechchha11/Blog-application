import { useState,useEffect } from "react";
import {API} from'../../../service/api';
import {Box, Grid} from '@mui/material';
import { useSearchParams,Link } from "react-router-dom";
import Post from'./Post';
const Posts=()=>{
    // component
   
    const [posts,setPosts]=useState([]);
    // to search post category wise
    const [searchParams]=useSearchParams();
    const category=searchParams.get('category');
        useEffect(()=>{
        const fetchData= async ()=>{
           let response= await API.getAllPosts({category:category || ''});
        if(response.isSuccess){
            setPosts(response.data);
        }
        
        }
        fetchData();

    },[category])
    return (
        // loop all the post which we have
        <>
            {
                posts && posts.length>0 ? posts.map(post =>(
                   <Grid item lg={3} sm={4} xs={12}>
                  <Link to={`details/${post._id}`} style={{textDecoration:'none', color:'inherit'}}>

                   <Post post={post}/>
                   </Link>
                   </Grid>
                )): <Box style={{color:'#878787' , margin:'30px 80px', fontSize:18}}> No data available to display</Box>
            }
        </>
    )
}
export default Posts;