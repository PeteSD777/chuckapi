import React from "react";
import {Joke} from "./joke";
import{ Button, TextField }from "@material-ui/core";
import {Dropdown, DropdownButton} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { classicNameResolver } from "typescript";
import Chuck from "./images/Chuck.jpg";

function FetchJoke(){
    const [joke, setJoke]=React.useState<any>();
    const [cat, setCat]=React.useState<Array<any>>([]);
    const [name, setName]=React.useState<any>([]);
    
//starting states for category and joke
const joketext = JSON.stringify(joke?.value.joke)
 const data = new Blob([joketext], {type:'text/plain'});
 const url=window.URL.createObjectURL(data);
 function handlechange(e: any){
        
        setName(e.target.value);
        
        

    }



//function  calls api and fetches a joke
function handleJoke(){

   
    if(name==""){
 fetch("https://api.icndb.com/jokes/random?escape=javascript")
    
    .then(res=>res.json())
    .then((results)=>(
        setJoke(results)
        
    ))
    }
    else{
        const nameArray  =name.split(" ");
        fetch("http://api.icndb.com/jokes/random?escape=javascript&firstName="+nameArray[0]+"&lastName="+nameArray[1]+"")
        .then(nameresponse=>nameresponse.json())
        .then((r)=>(
            setJoke(r)
        ))

    }

   
    
  }
 //function fetches api and saves a category
function Category(){
    fetch("http://api.icndb.com/categories?escape=javascript")
    .then(res=>res.json())
    .then((results)=>(setCat(results?.value)))


}



    
    

React.useEffect(()=>{
    handleJoke();
    Category();
   
    
},[])
return(
    
    <div >

        <ul>    
            
            <img className="chuck" src={Chuck} alt="none" />
            <p className="joke">{joke?.value.joke}</p>
            <form>
    

        <TextField className="name" id="outlined-basic" onChange={handlechange} label="Name" variant="outlined" />
  </form>


        <DropdownButton  variant="contained" onClick={Category} id="dropdown-basic-button" title="Categories">
            
            
            
            {cat.map(i=>(
                <Button  onClick={()=>{
                    
                     fetch("http://api.icndb.com/jokes/random?limitTo=["+i+"]?escape=javascript")
                    .then(resp=>resp.json())
                    .then((result)=>{
                        setJoke(result)
                    })
                   
                   
                }}>{i}</Button>
            ))}

</DropdownButton>

            <Button className="button" onClick={handleJoke}>Random Joke</Button>
            <a id="file"href={url} download={data}>download</a>
            
           
        
        
            
        </ul>
    </div>
)
}
export default FetchJoke;