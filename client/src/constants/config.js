// API Notification _messages
export const API_NOTIFICATION_MESSAGES={
    loading:{
        title:'loading ....',
        message:' Data is being loaded ,Please wait'
    },
    success:{
        title:'Success',
        message:'Data successfully loaded'
    },
    responseFailure:{
        title:'error',
        message:'An error occured while fetching from the server .Please try again'
    },
    requestFailure:{
        title:'Error',
        message:'An error occured while parsing request data'
    },
    networkError: {
        title: "Error!",
        message: "Unable to connect to the server. Please check internet connectivity and try again."
    }
}

//API SERVICE CALL
// SAMPLE REQUEST
// NEED SERVICE CALL :{url:'/', method:'POST/GET/PUT/DELETE' params:true/false , query :true/false}
export const SERVICE_URLS={
    userSignup:{url:'/signup',method:'POST'},
  userLogin:{url:'/login',method:'POST'},
  uploadFile:{url:'/file/upload',method:'POST'},
  CreatePost:{url:'create',method:'POST'},
  getAllPosts:{url:'/posts',method:'GET',params:true},
  getPostById:{url:'post', method:'GEt',query:true},
  updatePost:{url:'update',method:'PUt',query:true},
  deletePost:{url:'delete',method:'DELETE',query:true},
  newComment:{url:'/comment/new', method:'POST'},
  getAllComments:{url:'comments',method:'GET',query:true},
  deleteComment:{url:'comment/delete', method:'DELETE',query:true}

}