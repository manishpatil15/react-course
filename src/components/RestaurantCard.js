import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  // console.log(props);
  const { resData } = props;

  // Safe access: handle cases where structure differs or info is undefined
  const info = resData?.card?.card?.info;
  if (!info) return null; // skip rendering if no info available

  const {
    name = "",
    cuisines = [],
    avgRating = "",
    costForTwoMessage = "",
    sla = {},
    areaName = "",
    cloudinaryImageId = "",
    address = "",
    locality = "",
  } = info;

  const deliveryTime = sla?.deliveryTime;

  return (
    <div className="res-card">
      {cloudinaryImageId ? (
        <img
          className="res-logo"
          alt="res-logo"
          src={CDN_URL + cloudinaryImageId}
        />
      ) : (
        <div className="res-logo placeholder" /> /* simple placeholder if no image */
      )}
      <h2>{name}</h2>
      <h4>➡ {Array.isArray(cuisines) ? cuisines.join(", ") : cuisines}</h4>
      <h4>⭐ {avgRating}</h4>
      <h4>{costForTwoMessage}</h4>
      <h4>🕒 {deliveryTime} mins</h4>
      <h4>🏠 {locality}</h4>
      <h4>📌 {areaName}</h4>
    </div>
  );
};

export default RestaurantCard;
