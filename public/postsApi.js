

class postApi{
    constructor () {
    }
    fetch() {
       return   $.ajax({
            method:"GET",
            url: "/posts"
        }).catch(function(data){
            console.log(data)
        })
        }
    post(content) {
        return   $.ajax({
            method:"POST",
            url: "/posts",
            data: content
             }).catch(function(data){
                 console.log(data)
             })
             }
    delete(id) {
        return $.ajax({
            method:"DELETE",
            url: '/posts/'+id
        }).catch(function(data){
            console.log(data)
        })
    }  
    postCom(contents, id) {
        return $.ajax({
            method:"POST",
            url: '/posts/'+id+'/comments',
            data: contents
        }).catch(function(data){
            console.log(data)
        })
    } 
    deleteCom(id, comId) {
        return $.ajax({
            method:"DELETE",
            url: '/posts/'+id+'/comments/'+comId,
        }).catch(function(data){
            console.log(data)
        })
    } 

 }

    export default postApi