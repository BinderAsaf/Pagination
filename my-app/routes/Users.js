const express= require('express');
const router = express.Router();
const fs = require('fs');

//defualt to return if not specified in request
const DocsPerPage=20;

//global vars to store data from JSON files
var Users,userNames;

//Reading async the jsons file ONLY ONCE and stores then on var
fs.readFile('users.json', 'utf8',  (err, data) =>{
    if (err) {
       console.log(err);
       return;
    }
    Users=  JSON.parse(data).users;
});
fs.readFile('userNames.json', 'utf8',  (err, data)=> {
    if (err) {
        console.log(err);
        return;
     }
    userNames= JSON.parse(data).users;  
});


// @router   GET /getUsers
// @Info     Get all users
router.get('/getUsers', async(req,res) => {
    var { PageNum , PerPage} = req.query;
    // check that the global array exist - from JSONs files
    if(!Users || !userNames)
    {
        console.log('SERVER ERROR : reading JSONs file failed!');
        return res.send(JSON.stringify({error:true,msg:'server error, try again later'}));
    }
    //if item per page not accepted - assign defualt
    if(!PerPage) 
        PerPage = DocsPerPage
    if(!PageNum)
        return res.send(JSON.stringify({
            error:true,
            msg:'Request must include PageNum,PerPage as parameters. (PerPage defaule:20)'}));
    //cast to type number
    PageNum=parseInt(PageNum, 10);
    PerPage=parseInt(PerPage, 10);

    // round up number of pages
    var numOfPages=Math.ceil(Users.length / PerPage)

    // if the page number that send isnt valit return an response with error and mesaage
    if(PageNum <= 0 || PageNum>numOfPages) 
        return res.send(JSON.stringify({error:true,msg:'invalid page number',numOfPages}))

    //the List to send back
    var ToSend=[]
    
    var start = (PageNum-1)*PerPage
    for(var  i = start ; i < start + PerPage; i++ ){
        
        if(i > Users.length-1)
            break;
        var {id,position,monthlySlary } = Users[i]
        var {name} = userNames[i]
        if(Users[i].id != userNames[i].id )
            console.log('bad')
        ToSend.push({id,name,position,monthlySlary})
    }
    // send the response : no error , the data , and number of pages
    res.send({error:false,data:ToSend , numOfPages})

});

// @router   POST /addUsers
// @Info     Add new users
router.post('/addUsers', (req,res) => {
    // check that the global array exist - from JSONs files
    if(!Users || !userNames)
    {
        console.log('SERVER ERROR : reading JSONs file failed!');
        return res.send(JSON.stringify({error:true,msg:'server error, try again later'}));
    }
    //read the data from request
    const {users}=req.body;
    // if the json not contain array named users - sending response with instruction
    if(!users)
        return res.send(JSON.stringify({
            error:true, 
            msg:'Data must be an array of JSONs called users. example:{users:[{id=1 , name=a , position=b , monthlySlary=2}]} '
        }));

    var names=[],rest=[]
    for(var i=0 ; i < users.length ; i++)
    {
        var {id , name , position , monthlySlary} = users[i];
        //check that all fields exsit in every user object
        if(!id || !name || !position || !monthlySlary)
            return res.send(JSON.stringify({error:true,msg:"All users must include values for: id , name , position , monthlySlary "}));
        //data to update
        names.push({id,name});
        rest.push({id,position,monthlySlary});
    }

    //sending notification to the user with the new users
    var io = req.app.get('socketio');
    io.sockets.emit('FromAPI',{users});
    //Updating the global users and usrname arrays
    for(var i=0 ; i< names.length ; i++)
    {
        Users.push(rest[i]);
        userNames.push(names[i])
    }

    // sending a response with no error and  the data 
    res.send({error:false,users,msg:'Users added successfully'});
    
    // updating the JSONs files
    fs.writeFile("users.json", JSON.stringify({users:Users}), (err)=>{
        if(err)
            console.log(err)
    })
    fs.writeFile("userNames.json", JSON.stringify({users:userNames}), (err)=>{
        if(err)
            console.log(err)
    })
    
    
});



module.exports = router;