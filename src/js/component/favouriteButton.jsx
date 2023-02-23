import React, { useContext } from "react";
import { Context } from "../store/appContext";

const FavouriteButton = ({ uri, name }) => {
    // set context
    const { actions } = useContext(Context);

    let btnClassStyles;

    if (actions.isFavourite(uri)) btnClassStyles = "btn btn-warning ms-1";
    else btnClassStyles = "btn btn-outline-warning ms-1";

    return (
        <>
            <button 
                className={btnClassStyles}
                onClick={actions.favouritesClickHandler}
                value={uri}
                name={name}
                >
                <span><i className="fa fa-regular fa-heart"></i></span>
            </button>
        </>
    )
}

export default FavouriteButton;