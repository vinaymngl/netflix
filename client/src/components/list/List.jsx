import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import "./list.scss"
import ListItem from '../listItem/ListItem';
import { useRef } from 'react';
import { useState } from 'react';

const List = ({list}) => {
    console.log(list.content)
    const listRef = useRef();
    const [slideNumber,setSlideNumber] = useState(0);
    const[isMoved, setIsMoved] = useState(false);
    const handleClick = (direction)=>{
        setIsMoved(true);
        let distance = listRef.current.getBoundingClientRect().x -50;
        if(direction === "left" && slideNumber>0){
            setSlideNumber(slideNumber-1)
            listRef.current.style.transform = `translateX(${distance+230}px)`
        }
        if(direction === "right" && slideNumber<5){
            setSlideNumber(setSlideNumber+1)
            listRef.current.style.transform = `translateX(${distance -230}px)`
        }

    }
  return (
    <div className='list'>
        <span className="listTitle">
            {list.title}
        </span>
        <div className="wrapper">
        <FontAwesomeIcon icon = {faArrowCircleLeft}  style  = {{display : !isMoved && "none"}} className= "sliderArrow left" onClick={()=>handleClick("left")} />
        <div className="container" ref = {listRef}>
            {list.content.map((item,index)=>(<ListItem index= {index} item = {item}/>
            ))}
            <ListItem/>
        </div>
        <FontAwesomeIcon icon = {faArrowCircleRight} className= "sliderArrow right" onClick={()=>handleClick("right")}  />
        </div>
      
    </div>
  )
}

export default List
