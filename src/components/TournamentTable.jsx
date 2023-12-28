import { TeamItem } from "./TeamItem";
import { teamHeader } from "../constants/initialData";

export const TournamentTable = ({ teams, qualifiedTeams, onRemove }) => {
  return (
    <>
      <TeamItem team={teamHeader} />
      {teams.map((item, idx) => (
        <TeamItem
          key={item.teamName}
          team={item}
          idx={idx}
          onRemove={onRemove}
          isQualified={qualifiedTeams.includes(item.teamName)}
        />
      ))}
      <hr />
    </>
  );
};
