export const uniteInTour = (arr) => {
    const result = Object.groupBy(arr, ({ tour }) => tour);
    const output = Object.entries(result);
    return output;
  };
  export const muteTeams = (match, teams) => {
    const newTeams = teams.map((item) => {
      if (match.home === item.teamName) {
        return {
          ...item,
          wins: match.homeSets == 3 ? item.wins + 1 : item.wins,
          losses:
            !match.scheduled && Number(match.homeSets) < 3
              ? item.losses + 1
              : item.losses,
          points: item.points + getPoints(match.homeSets, match.awaySets),
          winSets: item.winSets + Number(match.homeSets),
          lostSets: item.lostSets + Number(match.awaySets),
          games: match.scheduled ? item.games : item.games + 1,
        };
      } else return item;
    });
    const finalTeams = newTeams.map((item) => {
      if (match.away === item.teamName) {
        return {
          ...item,
          wins: match.awaySets == 3 ? item.wins + 1 : item.wins,
          losses:
            !match.scheduled && Number(match.awaySets) < 3
              ? item.losses + 1
              : item.losses,
          points: item.points + getPoints(match.awaySets, match.homeSets),
          winSets: item.winSets + Number(match.awaySets),
          lostSets: item.lostSets + Number(match.homeSets),
          games: match.scheduled ? item.games : item.games + 1,
        };
      } else return item;
    });
    const sortedTeams = finalTeams.sort(compareNumbers);
    return sortedTeams;
  };
  
  export const muteTeamsByRemovingMatch = (match, teams) => {
    const newTeams = teams.map((item) => {
      if (match.home === item.teamName) {
        return {
          ...item,
          wins: match.homeSets == 3 ? item.wins - 1 : item.wins,
          losses: Number(match.homeSets) < 3 ? item.losses - 1 : item.losses,
          points: item.points - getPoints(match.homeSets, match.awaySets),
          winSets: item.winSets - Number(match.homeSets),
          lostSets: item.lostSets - Number(match.awaySets),
          games: item.games - 1,
        };
      } else return item;
    });
    const finalTeams = newTeams.map((item) => {
      if (match.away === item.teamName) {
        return {
          ...item,
          wins: match.awaySets == 3 ? item.wins - 1 : item.wins,
          losses: Number(match.awaySets) < 3 ? item.losses - 1 : item.losses,
          points: item.points - getPoints(match.awaySets, match.homeSets),
          winSets: item.winSets - Number(match.awaySets),
          lostSets: item.lostSets - Number(match.homeSets),
          games: item.games - 1,
        };
      } else return item;
    });
    const sortedTeams = finalTeams.sort(compareNumbers);
    return sortedTeams;
  };
  export function isJsonString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }
  function compareNumbers(a, b) {
    if (b.wins !== a.wins) {
      return b.wins - a.wins;
    } else if (b.points !== a.points) {
      return b.points - a.points;
    } else {
      return b.winSets - b.lostSets - (a.winSets - a.lostSets);
    }
  }
  const getPoints = (sets, rivalSets) => {
    const output = Number(sets) === 3 ? 3 : Number(sets) === 2 ? 1 : 0;
    return Number(rivalSets) === 2 ? 2 : output;
  };
  