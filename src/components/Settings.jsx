import { useState } from "react";
import { CreateTeamForm } from "./CreateTeamForm";
import { MatchForm } from "./MatchForm";
import { useFormFields } from "./hooks/useFormFields";
import { Modal } from "./Modal";

export const Settings = ({
  addTeam,
  addMatch,
  onSetTournamentName,
  teams,
  tournamentNameSaved,
}) => {
  const [showBasic, setShowBasic] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const { fields, changeField } = useFormFields({
    tournamentName: tournamentNameSaved,
  });
  const { tournamentName } = fields;
  return (
    <div className="settings">
      <Modal active={modalActive} setActive={setModalActive}>
        <div>
          <MatchForm onAddMatch={addMatch} teams={teams} />
        </div>
      </Modal>
      <div>
        {teams.length > 1 ? (
          <button onClick={() => setModalActive(true)}>Новий матч</button>
        ) : null}
      </div>
      {showBasic ? (
        <>
          <hr />
          <CreateTeamForm onAddTeam={addTeam} />
          <div className="tournamentNameLine">
            <h4>Змінити назву турніру</h4>
            <input
              className="extraLongInput"
              name="tournamentName"
              type="text"
              placeholder="Назва турніру..."
              value={tournamentName}
              onChange={changeField}
            />
          </div>
          <div className="submitBtnLine">
            <button
              onClick={() => {
                if (tournamentName === "") {
                  alert("Введіть назву турніру!");
                  return;
                }
                onSetTournamentName(tournamentName);
                setShowBasic(false);
              }}
            >
              Підтвердити
            </button>
          </div>
          <hr />
        </>
      ) : (
        <div>
          <button onClick={() => setShowBasic(true)}>Базові параметри</button>
        </div>
      )}
    </div>
  );
};
