import { useEffect, useState } from "react";

export const MatchItem = ({ match, onRemove, onReplaceMatch, idx }) => {
  const { home, away, homeSets, awaySets, id, scheduled } = match;
  const [newMatch, setNewMatch] = useState(match);
  const [allowEdit, setAllowEdit] = useState(false);
  return (
    <div className={`matchLine ${idx % 2 === 0 ? "grayBckg" : "yellowBckg"}`}>
      {scheduled && !allowEdit ? (
        <div>
          <button
            title="Внести зміни"
            className="editMatchBtn matchRemove "
            onClick={() => {
              setAllowEdit(true);
            }}
          >
            <ion-icon name="create-outline"></ion-icon>
          </button>
        </div>
      ) : (
        <div>
          {allowEdit ? (
            <button
              title="Підтвердити зміни"
              className="editMatchBtn matchRemove "
              onClick={() => {
                onReplaceMatch(newMatch);
                setAllowEdit(false);
              }}
            >
              <ion-icon name="checkmark-done-outline"></ion-icon>
            </button>
          ) : null}
        </div>
      )}
      <div className="matchCell" id="homeCell">
        {home}
      </div>
      {!allowEdit ? (
        <div className="matchCell setsCell">{homeSets}</div>
      ) : (
        <input
          className="matchInput"
          type="number"
          min={0}
          max={3}
          value={newMatch.homeSets}
          onChange={(e) =>
            setNewMatch({ ...newMatch, homeSets: Number(e.target.value) })
          }
        />
      )}
      {!allowEdit ? <div className="matchCell setsCell">-</div> : <div></div>}

      {!allowEdit ? (
        <div className="matchCell setsCell">{awaySets}</div>
      ) : (
        <input
          className="matchInput"
          type="number"
          min={0}
          max={3}
          value={newMatch.awaySets}
          onChange={(e) =>
            setNewMatch({ ...newMatch, awaySets: Number(e.target.value) })
          }
        />
      )}

      <div className="matchCell" id="awayCell">
        {away}
      </div>
      <div>
        <button
          title="Видалити матч"
          className="removeItem matchRemove"
          onClick={() => {
            onRemove(id);
          }}
        >
          <ion-icon name="trash-outline"></ion-icon>
        </button>
      </div>
    </div>
  );
};
