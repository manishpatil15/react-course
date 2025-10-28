
import RestaurantCard from "./RestaurantCard";
// import { RES_LIST as resList } from "../utils/mockData";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";

const Body = () => {
  const [listOfRes, setListOfRes] = useState([]);

  useEffect(() => {
    fetchData();
  },[]);

  const fetchData = async () => {
    const data = await fetch("https://www.swiggy.com/dapi/restaurants/search/v3?lat=28.4894154&lng=77.01186960000001&str=all%20restaurant&trackingId=undefined&submitAction=ENTER&queryUniqueId=481d6f1a-281b-e056-c780-b8d76ff8e92e");
    const json = await data.json();
    // console.log(json?.data?.cards[1]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards);

    //optinal chaining to avoid undefined errors
    const cards = json?.data?.cards[1]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards;
    setListOfRes(cards);
  };

// conditional rendering
  // if(listOfRes.length === 0){
  //   return <Shimmer />;
  // }

  return (listOfRes.length === 0) ? <Shimmer /> : (
    <div className="body">
      <div className="filter">
        <div className="filter-btn"  onClick={()=>{
          const filteredList = listOfRes.filter((res) => res.card?.card?.info.avgRating > 4.0);
          setListOfRes(filteredList);
        }}>Top Rated Restaurants</div>
      </div>
      <div className="res-container">
        {/* <RestaurantCard resName="McDonald's" cusine="Burgers, Fast Food"  rating="4.2" /> */}
        {listOfRes.map((restaurant, index) => (
          <RestaurantCard key={restaurant?.card?.card?.info.id} resData={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Body;