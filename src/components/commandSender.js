import { getLeaderboard, getHighScore, checkLeaderboard, addToLeaderboard, updateLeaderboard } from '../server/dbCommands.js';

onGameOver = function(inputArr) {
    let playerData = {}
    playerData[firstName] = inputArr[0]
    playerData[lastName] = inputArr[1]
    playerData[score] = inputArr[2]
    
    // let highScore = getHighScore(playerData)
    
    // if(checkLeaderboard(playerData)) {
    //     if (highScore > inputArr[2]) {
    //         updateLeaderboard(playerData)
    //         return (`${firstName, lastName}'s score has been updated from ${inputArr[2]} to ${highScore}!`)
    //     } else {
    //         return (`${firstName, lastName}'s score was not changed. Your score ${inputArr[2]} was and your current High Score is ${highScore}`)
    //     }
    // } else {
    //     addToLeaderboard(playerData)
    //     return (`${firstName, lastName} has been added to the leaderboard with a high score of ${inputArr[2]}!`)
    // }

    return checkLeaderboard(playerData)
        .then((exists) => {
            getHighScore(playerData)
            .then((highScore) => ({exists, highScore}))
        })
        .then(({exists, highScore}) => {
            if (exists) 
            {
                if (highScore > score) {
                    return updateLeaderboard(playerData)
                    .then(() => {
                        return (`${firstName, lastName}'s score has been updated from ${inputArr[2]} to ${highScore}!`)
                    });
                } 

                else {
                    (() => {
                        return (`${firstName, lastName}'s score was not changed. Your score ${inputArr[2]} was and your current High Score is ${highScore}`)
                    })
                } 
            }
                
            else {
                return addToLeaderboard(playerData)
                .then(() => {
                    return (`${firstName, lastName}'s score has been updated from ${inputArr[2]} to ${highScore}!`)
                })
                
            }
        })
    

        .catch((error) => {
            console.error('onGameOver Error:', error)
            return 'onGameOver Error'
        })

}


//           TESTS

// onGameOver(['first', 'test', 16])
//     .then((result) => {
//         console.log(result)
//     })
//     .catch((error) => {
//         console.error('Game Test Error:', error)
//     })


// loadLeaderboard = function() {
    
//         getLeaderboard()
//     }


// getLeaderboard()