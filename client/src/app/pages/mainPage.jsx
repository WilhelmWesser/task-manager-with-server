import React from "react";
import Quote from "../reusableComponents/singleElements/quote";
import quotes from "../assets/quotes";

const MainPage = () => {
    return (
        <div className="bg-dark" style={{ overflow: "hidden" }}>
            <div className="text-center">
                {quotes.map((quote) => (
                    <Quote
                        key={quote.key}
                        title={quote.title}
                        author={quote.author}
                    />
                ))}
            </div>
        </div>
    );
};

export default MainPage;
