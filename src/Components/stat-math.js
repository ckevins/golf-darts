import _ from 'lodash';

const totaller = (scores) => {
    const totalsArray = scores.map(array => {
        const total = array.reduce((a,b)=> a+b);
        return total;
        });
    return totalsArray
}

export const nums = _.range(1, 19);
export const numsSkipOne = _.range(2, 19);

export const getStat = (games, stat) => {
    const average = (totaller(games).reduce((a,b)=>a+b)) / games.length;
    switch(stat) {
        case 'average':
            return average;
        case 'personal best':
            return Math.min(...totaller(games));
        case 'personal worst':
            return Math.max(...totaller(games));
        case 'under par':
            const gamesUnderPar = totaller(games).filter(x => x < 72).length;
            const underPercentage = ((gamesUnderPar / games.length) * 100).toFixed(1);
            return [gamesUnderPar, underPercentage];
        case 'over par':
            const gamesOverPar = totaller(games).filter(x => x >= 72).length;
            const overPercentage = ((gamesOverPar / games.length) * 100).toFixed(1);
            return [gamesOverPar, overPercentage];
        case 'ones record':
            const onesCounter = games.map(game => {
                return game.filter(x => x === 1).length
            });
            const onesRecord = Math.max(...onesCounter);
            const onesRecordGame = (onesCounter.indexOf(onesRecord)) + 1;
            return [onesRecord, onesRecordGame];
        case 'reds record':
            const redsCounter = games.map(game => {
                return game.filter(x => x < 4).length;
            });
            const redsRecord = Math.max(...redsCounter);
            const redsRecordGame = (redsCounter.indexOf(redsRecord)) + 1;
            return [redsRecord, redsRecordGame];
        case 'all holes average':
            return average/18;
        default:
            console.log('No valid stat argument received');
            return
    }
}

export const getThisScore = (games, scoreValue) => {
    switch (scoreValue) {
        case 'reds':
            const redCount = _.sum(games.map(game => game.filter(x => x < 4).length));
            const redPercentage = (redCount/(games.length*18)) * 100;
            return [redCount, redPercentage]
        case 'blues':
            const blueCount = _.sum(games.map(game => game.filter(x => x >= 4).length));
            const bluePercentage = (blueCount/(games.length*18)) * 100;
            return [blueCount, bluePercentage]
        default:
            const thisScoreCount = _.sum(games.map(game => game.filter(x => x === scoreValue).length));
            const thisScorePercentage = (thisScoreCount/(games.length*18)) * 100;
            return [thisScoreCount, thisScorePercentage]
    }
}

export const getHoleStats = (hole, games) => {
    const thisHoleScores = games.map(game => game[hole-1]);
    const thisHoleAvg = (_.sum(thisHoleScores)/thisHoleScores.length).toFixed(2);
    const thisHoleOnes = thisHoleScores.filter(x => x === 1).length;
    const thisHoleTwos = thisHoleScores.filter(x => x === 2).length;
    const thisHoleThrees = thisHoleScores.filter(x => x === 3).length;
    const thisHoleFours = thisHoleScores.filter(x => x === 4).length;
    const thisHoleFives = thisHoleScores.filter(x => x === 5).length;
    const thisHoleSixes = thisHoleScores.filter(x => x === 6).length;
    const holeArray = [thisHoleAvg, thisHoleOnes, thisHoleTwos, thisHoleThrees, thisHoleFours, thisHoleFives, thisHoleSixes];
    return holeArray;
}

export const getRankList = (nums, scores) => {
    const allHolesArray = nums.map(hole => getHoleStats(hole, scores));
    const averagesObjArray = allHolesArray.map((hole,i) => {
        const avg = hole[0];
        return {
            "average": avg, 
            "hole": i+1
        }
    });
    const ranking = _.sortBy(averagesObjArray, ["average", "hole"]);
    return ranking.map(rank => {
        return <td>{rank.hole}</td>;
    });
}

export const checkClass = (holeScore) => {
    if (holeScore < 4) {
        return "red"
    } else {
        return "blue"
    }
}

