import "./styles.css";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { useState, useEffect } from "react";
import { defaultTeam } from "./constants/initialData";
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
  };
  const exportData = () => {
    const exData = { teams: teams, matches: matches };
    copiedToClipboard(JSON.stringify(exData));
    alert(
      "Дані про поточний турнір скопійовано в буфер обіну. Збережіть їх в текстовому документі, щоб використати пізніше."
    );
  };
  const addMatch = (newMatch) => {
    setTeams(muteTeams(newMatch, teams));
    setMatches((prev) => {
      const newMatches = [...prev, newMatch];
      return newMatches.sort((a, b) => Number(a.tour) - Number(b.tour));
    });
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
  };
  const setTournament = (tName) => {
    setTournamentName(tName);
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

  return (<>
  <Router>
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={
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
        }></Route>
      
      <Route path="/settings" element={
         <Settings
         onSetTournamentName={setTournament}
         addTeam={addTeam}
         addMatch={addMatch}
         teams={teams}
         tournamentNameSaved={tournamentName}
       />
      }></Route>
       <Route path="/importPage" element={
         <ImportPage
         setShowImport={setShowImport}
         exportData={exportData}
         importInitialData={importInitialData}
         showImport={showImport}
       />
       }></Route>
      </Routes>
    </div>
    </Router>
    </>
  );
};


