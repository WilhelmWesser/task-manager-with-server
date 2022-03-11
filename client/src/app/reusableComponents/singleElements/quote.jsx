import React from "react";
import PropTypes from "prop-types";
import getRandomNumber from "../../utils/randomNum";
import colors from "../../assets/colors";

const Quote = ({ title, author }) => {
    const color = colors[getRandomNumber(0, 6)];
    return (
        <div
            className={`m-2 card text-center ${
                getRandomNumber(0, 1) ? `p-${getRandomNumber(0, 4)}` : ""
            } text-warning bg-dark border-${color}`}
        >
            <blockquote className="blockquote mb-0 card-body bg-cyan">
                <p>{title}</p>
                <footer className="blockquote-footer">
                    <small>
                        <cite title="Source Title">{author}</cite>
                    </small>
                </footer>
            </blockquote>
        </div>
    );
};

Quote.propTypes = {
    title: PropTypes.string,
    author: PropTypes.string
};
export default Quote;
