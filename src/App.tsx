import './App.scss';
import { CSSProperties } from 'react';
import { CombatantData, LimitBreakData } from 'ffxiv-overlay-api';
import Combatant from './views/Combatant';
import Encounter from './views/Encounter';
import Settings from './views/Settings';
import SW from './SW';
import { useAppSelector } from './hooks';
import { cloneDeep } from './utils/lodash';
import { fmtMergePet } from './utils/formatters';

function App() {
  const showCombatants = useAppSelector(
    (state) => state.settings.showCombatants
  );
  const sort = useAppSelector((state) => state.settings.sort);
  const playerLimit = useAppSelector((state) => state.settings.playerLimit);
  const showLB = useAppSelector((state) => state.settings.showLB);
  const petMergeID = useAppSelector((state) => state.settings.petMergeID);
  const opacity = useAppSelector((state) => state.settings.opacity);
  const playerPerRow = useAppSelector((state) => state.settings.playerPerRow);

  // get data from store
  const data = useAppSelector((state) => state.api.data);
  const history = useAppSelector((state) => state.api.history);
  const { combatant, limitBreak } = cloneDeep(history.data || data);

  let players = combatant;

  // merge pet if enabled
  if (petMergeID) {
    players = fmtMergePet(players, petMergeID);
  }

  // sort combatant
  players.sort((a, b) => sort.rule * (a[sort.key] - b[sort.key]));

  // limit combatants
  const temp = players;
  players = [];
  for (let i = 0; i < playerLimit; i++) {
    temp[i] && temp[i].name && players.push(temp[i]);
  }

  // add lb if enabled
  const playersWithLB: Array<CombatantData | LimitBreakData> = players;
  if (showLB && limitBreak) {
    playersWithLB.push(limitBreak);
  }

  const opacityStyle: CSSProperties = {
    opacity: opacity >= 0.1 && opacity <= 1 ? opacity : 1,
  };

  return (
    <div className='app'>
      <div className='container' style={opacityStyle}>
        {showCombatants && Boolean(combatant) && combatant.length > 0 && (
          <div
            className='combatants'
            style={{ width: `${playerPerRow * 1.26 + 0.01}rem` }}
          >
            {playersWithLB.map((player, index) => (
              <Combatant player={player} index={index} key={player.name} />
            ))}
          </div>
        )}
      </div>
      <div className='container' style={opacityStyle}>
        <Encounter />
      </div>
      <div className='container'>
        <SW />
      </div>
      <div className='container'>
        <Settings />
      </div>
    </div>
  );
}

export default App;
