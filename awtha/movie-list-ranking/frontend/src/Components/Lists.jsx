import React from 'react'

function Lists(props) {

    return (
        <div className="homepage">
            <h1 className="">Live User Lists</h1>

            <div className="lists-container  extra-margin">
                <table>
                    <tr>
                        <th>List</th>
                        <th>Description</th>
                        <th>Created By</th>
                    </tr>
                    {props.lists.map((list, index)=> (
                        <tr key={index}>
                            <td><a href={"/lists/" + list.title} className="black-text"><h1>{list.title}</h1></a></td>
                            <td><h3>{list.text}</h3></td>
                            <td><p>{list.username}</p></td>
                        </tr>
                    ))}
                </table>
            </div>
        </div>
    )
}

export default Lists;