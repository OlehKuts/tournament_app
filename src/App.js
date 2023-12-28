import "./styles.css";
import { useState, useEffect } from "react";
import { defaultTeam, initTeams } from "./constants/initialData";
import { MatchItem } from "./components/MatchItem";
import { TournamentTable } from "./components/TournamentTable";
import { muteTeams, muteTeamsByRemovingMatch } from "./utils/utils";
import { Settings } from "./components/Settings";
import { Header } from "./components/Header";
import { useLocalStorage } from "./components/hooks/useLocalStorage";
import useCopyToClipboard from "./components/hooks/useCopyToClipboard";
import { isJsonString, uniteInTour } from "./utils/utils";
import { ImportPage } from "./components/ImportPage";
import { useMemo } from "react";

export const App = () => {
  const [teams, setTeams] = useLocalStorage("teams_test", []);
  const [matches, setMatches] = useLocalStorage("matches_test", []);
  const [showMain, setShowMain] = useState([true, false, false]);
  const [showImport, setShowImport] = useState(false);
  const [tournamentName, setTournamentName] = useLocalStorage(
    "tournamentName_test",
    ""
  );
  const [copiedToClipboard] = useCopyToClipboard();
  const importInitialData = (importedData) => {
    if (!isJsonString(importedData)) {
      alert("Невірний формат даних!");
      return;
    }
    const impData = JSON.parse(importedData);
    setTeams(impData.teams);
    setMatches(impData.matches);
    alert("Дані успішно імпортовано");
    setShowMain([true, false, false]);
  };
  const exportData = () => {
    const exData = { teams: teams, matches: matches };
    copiedToClipboard(JSON.stringify(exData));
    alert(
      "Дані про поточний турнір скопійовано в буфер обіну. Збережіть їх в текстовому документі, щоб використати пізніше."
    );
    setShowMain([true, false, false]);
  };
  const addMatch = (newMatch) => {
    setTeams(muteTeams(newMatch, teams));
    setMatches((prev) => {
      const newMatches = [...prev, newMatch];
      return newMatches.sort((a, b) => Number(a.tour) - Number(b.tour));
    });
    setShowMain([true, false, false]);
  };
  const removeMatch = (matchId) => {
    const selectedMatch = matches.find((item) => item.id === matchId);
    setMatches((prev) => [...prev].filter((item) => item.id !== matchId));
    setTeams(muteTeamsByRemovingMatch(selectedMatch, teams));
  };
  const replaceMatch = (newMatch) => {
    const fixedMatch = { ...newMatch, scheduled: false };
    const newMatches = [...matches].map((item) => {
      if (fixedMatch.id === item.id) {
        return fixedMatch;
      } else return item;
    });
    setMatches(newMatches);
    setTeams(muteTeams(fixedMatch, teams));
  };
  const removeTeam = (teamId) => {
    setTeams((prev) => [...prev].filter((item) => item.id !== teamId));
  };
  const addTeam = (newTeam) => {
    const finalTeam = {
      ...defaultTeam,
      ...newTeam,
      isAdult: newTeam.isAdult === "false" ? false : true,
    };
    setTeams((prev) => [...prev, finalTeam]);
    setShowMain([true, false, false]);
  };
  const setTournament = (tName) => {
    setTournamentName(tName);
    setShowMain([true, false, false]);
  };
  const toggleMain = (arr) => {
    setShowMain(arr);
  };
  const qualifiedTeams = useMemo(() => {
    const adultTeams = [...teams].filter((item) => item.isAdult);
    return [...adultTeams]
      .filter((item, idx) => idx < 4)
      .map((item) => item.teamName);
  }, [teams, matches]);
  const displayedMatches = useMemo(() => {
    return uniteInTour(matches);
  }, [teams, matches]);
  useEffect(() => {
    console.log(displayedMatches, teams);
  }, [matches, teams]);

  return (
    <div className="App">
      <Header toggleMain={toggleMain} showMain={showMain} />

      {showMain[0] ? (
        <>
          <h3>{tournamentName}</h3>
          <hr />
          <h3>Турнірна таблиця</h3>
          <TournamentTable
            teams={teams}
            onRemove={removeTeam}
            qualifiedTeams={qualifiedTeams}
          />
          <div className="matches">
            <h3>Матчі</h3>
            {matches.length ? (
              <>
                {" "}
                {displayedMatches.map((tour, idx) => (
                  <div key={idx}>
                    <h5>Тур - {tour[0]}</h5>
                    {tour[1].map((item, itemIdx) => (
                      <MatchItem
                        match={item}
                        key={item.id}
                        onRemove={removeMatch}
                        idx={itemIdx}
                        onReplaceMatch={replaceMatch}
                      />
                    ))}
                  </div>
                ))}
              </>
            ) : (
              <h5>На даний момент не зіграно жодного матчу</h5>
            )}
          </div>
        </>
      ) : null}
      {showMain[1] ? (
        <Settings
          onSetTournamentName={setTournament}
          addTeam={addTeam}
          addMatch={addMatch}
          teams={teams}
          tournamentNameSaved={tournamentName}
        />
      ) : null}
      {showMain[2] ? (
        <ImportPage
          setShowImport={setShowImport}
          exportData={exportData}
          importInitialData={importInitialData}
          showImport={showImport}
        />
      ) : null}
    </div>
  );
};


