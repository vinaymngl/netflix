import axios from 'axios';
import React from 'react';
import { useEffect,useState } from 'react';
import Featured from '../../components/featured/Featured';
import List from '../../components/list/List';
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";

const Home = ({type}) => {
  const [lists,setLists] = useState([]);
  const [genre,setGenre] = useState(null);
  useEffect(()=>{
    const getRandomLists = async()=>{
      try{
        const res = await axios.get(
          `lists${type ? "?type=" + type : ""}${
            genre ? "&genre=" + genre : ""
          }`,{
          headers : {
            token : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzY2FjNGFmMGJhMDBiZGQ4ZTU2ZDg4ZSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3NDMxMDAyNSwiZXhwIjoxNjc0NzQyMDI1fQ.euJpisO8I_f7qPLyZTg4m4_OlcTTQRtv2Vop_Rsj4uA"
          },
        }
        );
        setLists(res.data);
      }catch(err){
        console.log(err)
      }
    } 
    getRandomLists();
  },[type,genre]);
  return (
    <div className='home'>
      <Navbar/>
      <Featured type = {type}/>
      {lists.map((list,index)=>(
        <List list = {list} index = {index}/>
      ))}
    </div>

  )
}

export default Home
