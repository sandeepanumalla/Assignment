

import React, { Component, Fragment } from 'react'
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import { data } from "./data";
import { api, courses, isAuthenticated } from "../auth/helper";
import '../../node_modules/semantic-ui-css/semantic.min.css';
import Axios from 'axios';


export default class Home extends Component {
    state ={
        comment:[],
        newPost:[],
        child:[],
        check:false,
        post:"",
        addcomments:"",
        showComments:"",
        comment_id:"",
        post_id:"",
        AddComment: "",
        AddCommentId:"",
        allComments:[],
        deletePostId:"",
        postIdForComment:"",
        replyCommentId:"",
        replypostId:"",
        addReply:"",
        postDeleteId:""

    }

      
    
    componentWillMount(){
        courses().then(e =>{ console.log(e)
            this.setState({comment:e})
            this.setState({child:e.comments})
          })
          .catch(err => console.log(err))
          console.log("isAuthenticated",isAuthenticated())
    }
    onClickPost= ()=>{
        console.log("clicked")
        if(isAuthenticated()){
            console.log("running")
            this.setState({check:true})
            console.log("click state", this.state.check)
        }
        else{
        window.alert("please login to add posts")
        }
    }
    handleChange=name=>event=>{
        this.setState({error:false,[name]:event.target.value})
    }
    submitPost = item =>{
      
        return  fetch(`http://localhost:8000/api/users/new-post/${isAuthenticated().user._id}`,
        {method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${isAuthenticated().token}`
        },
    
        body: JSON.stringify(item)})
        .then(response => {
            return response.json()
          
        })
        .catch(err => console.log(err));
        
      }
     /*  addReply = item =>{
      
        return  fetch(`http://localhost:8000/api/users/new-reply/${isAuthenticated().user._id}`,
        {method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${isAuthenticated().token}`
        },
    
        body: JSON.stringify(item)})
        .then(response => {
            return response.json()
          
        })
        .catch(err => console.log(err));
        
      } */
    onSubmitPost=()=>{
        const text = this.state.post;
        return this.submitPost({text})
        .then(success =>{
            console.log("success",success)
            let {comment} = this.state
            comment.push(success)
            this.setState({comment})
            window.alert("successfully added new post! check below")
        })
        .catch((err)=>{console.log(err)})

    }
    onClickReply =(id)=>{
        console.log("onreply clicked",id)
    }
    onclickComment =(id) =>{
        console.log("clicked id",id)
        if(isAuthenticated()){
          this.setState({AddComment:"true"})
          this.setState({AddCommentId:id})
          console.log("authenticated")
        }
        else window.alert("login to add comment")
        
    }
    clicckk =(id)=>{
        console.log("clicked id",id)
        this.setState({deletePostId:id})
    }
    
    submitDelete =(item) =>{
      console.log("itme",item)
      this.setState({postDeleteId:item})
      
      return fetch(`http://localhost:8000/api/users/delete-post/${isAuthenticated().user._id}/${item}`,
      {method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${isAuthenticated().token}`
      },
  
      body: JSON.stringify()})
      .then(response => {
        if(response.ok){
          let {comment} = this.state
          const filter  =comment.filter(e => e._id !== item)
          this.setState({comment:filter})
        }
          return response.json()
      })

      .catch(err => console.log("err",err))
     /* return this.SubmitDeleteRequest()
     .then(data => console.log("success",data))
     .catch(err => console.log(err)) */
     /*  api.delete(`/delete-post/${isAuthenticated().user._id}/${item}`)
      .then(data=>{
        console.log(data)
        let {comment} = this.state
        const filter  =comment.filter(e => e._id !== data.data._id)

        this.setState({comment:filter})
      


      })
      .catch(err => console.log(err)) */
    }
   

    
    onClickReply =(id,id2)=>{
      if(isAuthenticated()){
        this.setState({replyCommentId:id})
        this.setState({replypostId:id2})
        console.log("onreply clicked id1",this.state.replyCommentId)
        console.log("id2",this.state.replypostId)
      }
      else{

        window.alert("you need to login to reply")
      }
    }
    
   
    submitComment = item =>{
      console.log("postId",this.state.AddCommentId)
      return  fetch(`http://localhost:8000/api/users/new-comment/${isAuthenticated().user._id}/${this.state.AddCommentId}`,
      {method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${isAuthenticated().token}`
      },
  
      body: JSON.stringify(item)})
      .then(response => {
          return response.json()
        
      })
      .catch(err => console.log(err));
      
    }

    onSubmitComment = ()=>{
      const content = this.state.addcomments;
        return this.submitComment({content})
        .then(success =>{
            console.log("success",success)
           /*  let {comment} = this.state
            comment.push(success)
            this.setState({comment}) */
           /*  window.alert("comment successfully added please reload") */
           window.location.reload();
        })
        .catch((err)=>{console.log(err)})
    }
    ReplyRequest = (item)=>{
      return fetch(`http://localhost:8000/api/users/new-reply/${isAuthenticated().user._id}/${this.state.replypostId}/${this.state.replyCommentId}`,
      {method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${isAuthenticated().token}`
      },
  
      body: JSON.stringify(item)})
      .then(response => {
          return response.json()
        
      })
      .catch(err => console.log(err));
    }

    

    onSubmitReply=()=>{
      const content = this.state.addReply;
     return this.ReplyRequest({content})
     .then(data =>{
       console.log(data)
       window.location.reload()
     })
     .catch(err => console.log("err"))
    }
  
    render() {
     
        /* console.log("user",this.state.comment) */
        const c =this.state.comment.map(e =>e.comments)
       /* console.log("check",this.state.check) */
        /* this.setState({child:c})
        console.log("user",this.state.child) */
        function Comment({ comment }) {
            const nestedComments = (comment.comments || []).map(comment => {
              return <Comment key={comment._id} comment={comment} type="child" />
            })
          
            return (
              <div>
              <div style={{"marginLeft": "25px", "marginTop": "10px" , "border":"1px solid black", "paddingBottom":"10px",
               "paddingRight":"10px",minHeight:"35px", "width":"90%", "marginLeft":"9%", borderRadius:"4px", marginRight:"15px", marginBottom:"7px"}}>
               <div className="ff"><b>{comment.username+" said: "}</b>{comment.content}</div>
               
                
                {nestedComments}
                
              </div>
              <div>
              
              </div>
              </div>
            )
          }

        return (
            <div>
    <Base title='Posting App ' description="Welcome to Posting app"  >
    <div className="d-flex justify-content-center">
    <button className="btn btn-primary" onClick={()=>this.onClickPost()} >Add post</button>
    
    </div>
      <div className="d-flex justify-content-center text-dark">
      {this.state.check ?
        <div> <textarea style={{width:"500px",height:"150px",marginTop:"15px"}} onChange={this.handleChange("post")} type="text" placeholder="Write something"></textarea>
      <button style={{marginLeft:"215px"}} onClick={()=>{this.onSubmitPost()}} className="d-flex justify-content-center ui teal button">Submit</button>
      </div>
      : null
      
          
      }
      </div>
      </Base>
      <div className="upper-post-wrapper">
      <div className="post-wrapper" style={{marginTop:"-11px"}}>
      
         
         {
           this.state.comment.map(e => {
               const alComments= e.comments.map(e => e)
             
               return <div key={e._id} style={{border:"0.2px solid black",borderRadius:"4px", width:"60%", marginLeft:"20%",background:"white" ,marginTop:"10px"}} key={e._id}> 
               <p style={{margin:"5px"}}><b>{"submitted by "+e.user}</b></p>
               <p style={{margin:"15px"}} className="author">{e.text}</p>
               
               <Fragment>
               {
                  isAuthenticated() && e.user_id === isAuthenticated().user._id ?
                   <button className="btn btn-danger "  style={{marginLeft:"10px",borderRadius:"4px", marginBottom:"10px"}}
                    key={e._id} onClick={()=>this.submitDelete(e._id)} >Delete</button>:
                   null
               }
               </Fragment>
               
               <button className="btn btn-secondary " key={e._id} style={{marginLeft:"10px",borderRadius:"4px", marginBottom:"10px"}}
                onClick={()=>this.onclickComment(e._id)} >Add Comments</button>
               
                <div>
                {
                 this.state.AddComment !== "" && this.state.AddCommentId === e._id?
                 <div >
                 <textarea onChange={this.handleChange("addcomments")} type="text"
                  style={{marginTop:"10px",marginLeft:"10%",width:"35%",height:"20%"}} 
                 placeholder="type comment"></textarea>
                 <div style={{marginTop:"10px",marginLeft:"10%",width:"45%",height:"20%"}}>
                 <button className="ui teal button" onClick={()=>{this.onSubmitComment()}} >Comment</button>
                 </div>
                 </div>
                 :null
                }
                 </div>
               
               

               
                 <Fragment >{
                   alComments.map((e) =>{
                    
                      return <div style={{height:"100%"}}><Comment  style={{height:"100px"}} key={e._id} comment={e}/>
                      <button onClick={()=>{this.onClickReply(e._id,e.postId)}}
                       className="btn-group-sm btn-primary" 
                       style={{ marginLeft:"78px",borderRadius:"4px"}}>Reply</button>
                       <div>
                       {
                        this.state.replyCommentId !== "" && this.state.replyCommentId === e._id?
                        <div>
                        
                 <textarea onChange={this.handleChange("addReply")} type="text"
                  style={{marginTop:"10px",marginLeft:"10%",width:"35%",height:"20%"}} 
                 placeholder="type comment"></textarea>
                 <div className="d-flex justify-content-center" onClick={()=>this.onSubmitReply()} style={{marginRight:"120px",width:"45%",height:"20%"}}>
                 <button style={{marginRight:"120px"}} className="ui teal button" onClick={()=>{this.onSubmitComment()}} >Reply</button>
                 </div>
                 
                        </div>:
                   null
                       }
                       </div>
                     
                    
                     </div>
               
                    })
                 }
            </Fragment>
               </div>
           })  
         }
        
  

  
  
      </div>
      </div>
     
      
      </div>
        )
    }
}
