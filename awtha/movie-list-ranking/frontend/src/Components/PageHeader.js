import React from "react";
import NavH from "./NavHeader";

function PageHeader(props) {
    return (
        <header className="App-header">
            <section className="head-page">
                <h1>
                    <a href="/">{props.heading}</a>
                </h1>
                <div className="head-page">
                    <NavH />
                    
                </div>
            </section>
        </header>
    )
}

export default PageHeader;