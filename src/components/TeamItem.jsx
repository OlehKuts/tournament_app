export const TeamItem = ({ team, idx, isQualified, onRemove }) => {
  const {
    teamName,
    points,
    wins,
    losses,
    winSets,
    lostSets,
    games,
    isAdult,
    id,
  } = team;
  const winsLosses = `${wins}-${losses}`;
  const sets = `${winSets}-${lostSets}`;
  const gms = wins + losses;
  const childTeam = isAdult;
  return (
    <div
      className={`tableLine ${idx % 2 === 0 ? "ghostWhiteBckg" : ""}`}
      style={{ fontWeight: idx === undefined ? "bold" : "normal" }}
    >
      <div className="tableCell">{idx === undefined ? "#" : idx + 1}</div>
      <div className="tableCell">
        {teamName}{" "}
        {childTeam && isQualified ? (
          <>
            <ion-icon
              name="arrow-forward-circle-outline"
              id="arrowIcon"
            ></ion-icon>{" "}
          </>
        ) : null}
      </div>
      <div className="tableCell">{games || gms}</div>
      <div className="tableCell">{points}</div>
      <div className="tableCell">{wins}</div>
      <div className="tableCell">{winsLosses}</div>
      <div className="tableCell">{sets}</div>
      <div>
        {games !== "Ігри" && games < 1 ? (
          <button
            title="Видалити команду"
            className="removeItem matchRemove"
            onClick={() => {
              onRemove(id);
            }}
          >
            X
          </button>
        ) : null}
      </div>
    </div>
  );
};
