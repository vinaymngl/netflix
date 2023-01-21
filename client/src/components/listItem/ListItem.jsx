import { faPlay, faHeart, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import "./listItem.scss"

const ListItem = ({ item, index }) => {
  console.log(item)
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});
  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get("/movies/find/" + item, {
          headers: {
            token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzY2FjNGFmMGJhMDBiZGQ4ZTU2ZDg4ZSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3NDMxMjc0NiwiZXhwIjoxNjc0NzQ0NzQ2fQ.LQZdY_n1cNzd5YM6cPOOMetD5KQSXQLLmV8SNRXKF68",
          },
        });
        setMovie(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMovie();
  }, [item])

  return (
    <div className='listItem'
      style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <img
        src={movie.img}
        alt=""
      />
      {isHovered && (<div>
        <video src={movie.trailer} autoPlay={true} loop></video>
        <div className="itemInfo">
          <div className="icons">
            <FontAwesomeIcon className="icon" icon={faPlay} />
            <FontAwesomeIcon className="icon" icon={faHeart} />
            <FontAwesomeIcon className="icon" icon={faThumbsUp} />
            <FontAwesomeIcon className="icon" icon={faThumbsDown} />
          </div>

          <div className="itemInfoTop">
            <span>
              {movie.duration}
            </span>
            <span className='limit'>
              +{movie.limit}
            </span>
            <span>
              {movie.year}
            </span>
            <div className="desc">
              {movie.desc}
            </div>
            <div className="genre">
              {movie.genre}
            </div>
          </div>
        </div></div>)}
    </div>
  )
}

export default ListItem
