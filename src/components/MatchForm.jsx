import { useFormFields } from "./hooks/useFormFields";
import { useToggle } from "./hooks/useToggle";

export const MatchForm = ({ onAddMatch, teams }) => {
  const { fields, changeField, clearForm } = useFormFields({
    tour: 0,
    home: "",
    away: "",
    homeSets: 0,
    awaySets: 0,
  });
  const { tour, home, away, homeSets, awaySets } = fields;
  const [scheduled, setScheduled] = useToggle(false);
  const onHandleSubmit = (e) => {
    e.preventDefault();
    if (!tour || home === away || !away || !home) {
      alert("Заповніть усі поля правильно!");
      return;
    }
    if (
      !scheduled &&
      (awaySets + homeSets < 3 ||
        (Number(awaySets) + Number(homeSets) === 3 &&
          Number(awaySets) < 3 &&
          Number(homeSets) < 3) ||
        awaySets === homeSets)
    ) {
      alert("Заповніть усі поля правильно!");
      return;
    }
    const newMatch = {
      tour: Number(tour),
      home,
      away,
      homeSets: Number(homeSets),
      awaySets: Number(awaySets),
      id: Math.random(),
      scheduled,
    };
    onAddMatch(newMatch);
    clearForm();
  };
  return (
    <div className="matchForm">
      <h4>Додати матч</h4>
      <form onSubmit={onHandleSubmit}>
        <div className="form_tour_line">
          <label className="container">
            Незіграний матч
            <input
              type="checkbox"
              checked={scheduled}
              onChange={setScheduled}
            />
            <span className="checkmark"></span>
          </label>
        </div>
        <div>
          <label htmlFor="tour">Тур №</label>
          <input
            className="number_inputs"
            name="tour"
            type="number"
            min={1}
            max={100}
            value={tour}
            onChange={changeField}
          />
        </div>

        <select onChange={changeField} value={home} name="home">
          <option value={""}>Господарі</option>
          {teams.map((team) => (
            <option value={team.teamName} key={team.teamName}>
              {team.teamName}
            </option>
          ))}
        </select>
        <input
          className="number_inputs"
          name="homeSets"
          type="number"
          min={0}
          max={3}
          value={homeSets}
          onChange={changeField}
          disabled={scheduled}
        />
        <input
          className="number_inputs"
          name="awaySets"
          type="number"
          min={0}
          max={3}
          value={awaySets}
          onChange={changeField}
          disabled={scheduled}
        />
        <select onChange={changeField} value={away} name="away">
          <option value={""}>Гості</option>
          {teams.map((team) => (
            <option value={team.teamName} key={team.teamName}>
              {team.teamName}
            </option>
          ))}
        </select>
        <div>
          <button type="submit">Додати матч</button>
        </div>
      </form>
    </div>
  );
};
