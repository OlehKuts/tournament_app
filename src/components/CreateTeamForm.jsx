import { isAdultList } from "../constants/initialData";
import { useFormFields } from "./hooks/useFormFields";

export const CreateTeamForm = ({ onAddTeam }) => {
  const { fields, clearForm, changeField } = useFormFields({
    teamName: "",
    isAdult: true,
  });
  const { teamName, isAdult } = fields;
  const onHandleSubmit = (e) => {
    e.preventDefault();
    if (teamName === "") return;
    const newTeam = { teamName, isAdult, id: Math.random() };
    onAddTeam(newTeam);
    clearForm();
  };
  return (
    <div className="teamForm">
      <h4>Створити нову команду</h4>
      <form onSubmit={onHandleSubmit}>
        <input
          className="longInput"
          name="teamName"
          value={teamName}
          placeholder="Назва команди..."
          onChange={changeField}
        />
        <select onChange={changeField} name="isAdult" value={isAdult}>
          {isAdultList.map((item) => (
            <option value={item.value} key={item.name}>
              {item.name}
            </option>
          ))}
        </select>
        <div className="submitBtnLine">
          <button type="submit">Додати команду</button>
        </div>
      </form>
      <hr />
    </div>
  );
};
