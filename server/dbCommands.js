const db = require('../db/index.js')

const dbCommands = {};

dbCommands.getLeaderboard = (req, res, next ) => {
    return db.connect()
        .then((client) => {
            return client.query('SELECT * FROM leaderboardTest')
                .then(result => {
                    res.locals.leaderboard = result.rows
                    client.release()
                    return next()
                })
        })

    .catch((err) => {
        console.error('Get Leaderboard Error:', err)
        next(err);
    })
}

dbCommands.getHighScore = (req, res, next ) => {
    const { firstName, lastName } = req.body
    // console.log('FIRST LAST',firstName, lastName)
    db.connect()
        .then((client) => {
            return client.query(`SELECT score FROM leaderboardTest WHERE firstName = '${firstName}' AND lastName = '${lastName}'`)
                .then ((result) => {
                    // console.log('THE RESULT', result.rows[0].score)
                    res.locals.highScore = result.rows[0].score
                    client.release()
                    return next()
                })
        })

    .catch((err) => {
        console.error('Get High Score Error:', err)
        throw err;
    })
}

dbCommands.checkLeaderboard = (req, res, next ) => {
    const { firstName, lastName} = req.body
    db.connect()
        .then((client) => {
            return client.query(`SELECT firstName, lastName FROM leaderboardTest WHERE firstName = '${firstName}' AND lastName = '${lastName}'`)
        })
        .then((result) => {
            res.locals.exists = result.rowCount > 0
            return next();
        })

    .catch((err) => {
        console.error('Check Leaderboard Error:', err)
        throw err;
    })
}

dbCommands.addToLeaderboard = (req, res, next ) => {
    const { firstName, lastName, score } = req.body
    db.connect()
        .then((client) => {
            return client.query(`INSERT INTO leaderboardTest (firstname, lastname, score) VALUES ('${firstName}', '${lastName}', ${score})`)
        })
        .then((result) => {
            // console.log('result', result)
            return next();
        })

    .catch((err) => {
        console.error('Add to Leaderboard Error:', err)
        throw err;
    })
}

dbCommands.updateLeaderboard = (req, res, next ) => {
    const { firstName, lastName, score } = req.body
    db.connect()
        .then((client) => {
            return client.query(`UPDATE leaderboardTest SET score = ${score} WHERE firstName = '${firstName}' AND lastName = '${lastName}'`)
        })
        .then((result) => {
            // console.log('result', result)
            return next()
        })

    .catch((err) => {
        console.error('Update Leaderboard Error:', err)
        throw err;
    })
}

dbCommands.deleteFromLeaderboard = (req, res, next) => {
    const { firstName, lastName, score } = req.body

    db.connect()
        .then((client) => {
            return client.query(`DELETE FROM leaderboardTest WHERE firstName = '${firstName}' AND lastName = '${lastName}'`)
        })
        .then((result) => {
            // console.log('result', result)
            return next()
        })

    .catch((err) => {
        console.error('Delete From Leaderboard Error:', err)
        throw err;
    })
}

module.exports = dbCommands;