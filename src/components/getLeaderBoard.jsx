import React, { useEffect, useState } from 'react';

function GetLeaderboard() {
    const [leaderboard, setLeaderboard] = useState([]);


useEffect(() => {  
    fetch('http://localhost:3000/api/getLeaderboard')
        .then((data) => data.json())
        .then(data => {
            console.log('THE DATA', data)
            setLeaderboard(data)
        })
        .catch((err) => {
            console.error('Database fetching error', err)
        })
    }, [])

    // let firstNameArr = []
    // let lastNameArr = []
    // let scoreArr = []

    // leaderboard.forEach(entry => {
    //     const { firstname, lastname, score} = entry

    //     firstNameArr.push(<tr>{firstname}</tr>)
    //     lastNameArr.push(<tr>{lastname}</tr>)
    //     scoreArr.push(<tr>{score}</tr>)
    // })

    let rows = []

    leaderboard.forEach((entry, idx) => {
            const { firstname, lastname, score} = entry

            rows.push(
                <tr key={`Row ${idx}`} >
                    <td> {firstname} </td>
                    <td> {lastname} </td>
                    <td> {score} </td>
                </tr>
            )
        })

    return(
            <table id='leaderboardList'>
                <thead>
                    <tr>
                        <th> First Name |</th>
                        <th> Last Name |</th>
                        <th> Score</th>
                    </tr>
                </thead>

                <tbody>
                    {rows}
                </tbody>
            </table>
    )
}

export default GetLeaderboard;