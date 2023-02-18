import React from "react";

const CardsTitle = ({title}) => {
    const styles = {
        color: "yellow",
        fontSize: "3rem"
    }
    return <h2 className="mt-2 mb-3 py-3 bg-dark" style={styles}>{title}</h2>
}

export default CardsTitle;