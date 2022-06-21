import * as Types from "../../../../../Types";
import * as React from "react";
import { useEffect, useState } from "react";
import ActivityButtons from "./ActivityButtonsBar";
import ActivityDisplay from "./ActivityDisplay";
import SkillsPanel from "../../ActivityPanels/SkillsPanel";
import QuestPanel from "../../ActivityPanels/QuestPanel";
import CombatPanel from "../../ActivityPanels/CombatPanel";
import BossesPanel from "../../ActivityPanels/BossesPanel";
import MinigamePanel from "../../ActivityPanels/MinigamePanel";
import CluesPanel from "../../ActivityPanels/CluesPanel";
import BankPanel from "../../ActivityPanels/BankPanel";
//@ This is a component to hold the activity buttons and the activity display components to manage state for rendering purposes

const ActivityArea = (props: Types.NoProps) => {
  const [display, setDisplay] = useState<string>("activityDisplay"); // set the default to render the activityDisplay component

  const handleUpdateDisplay = (displayString: string): void => {
    setDisplay(displayString);
  };

  useEffect(() => {
    console.log(display);
  }, [display]);

  return (
    <div className="border border-dark border-2 rounded-3">
      <ActivityButtons handleUpdateDisplay={handleUpdateDisplay} />
      {
        {
          activityDisplay: <ActivityDisplay />,
          skills: <SkillsPanel handleUpdateDisplay={handleUpdateDisplay} />,
          quests: <QuestPanel handleUpdateDisplay={handleUpdateDisplay} />,
          bank: <BankPanel handleUpdateDisplay={handleUpdateDisplay} />,
          combat: <CombatPanel handleUpdateDisplay={handleUpdateDisplay} />,
          bosses: <BossesPanel handleUpdateDisplay={handleUpdateDisplay} />,
          minigames: <MinigamePanel handleUpdateDisplay={handleUpdateDisplay} />,
          clues: <CluesPanel handleUpdateDisplay={handleUpdateDisplay} />,
        }[display]
      }

      {
        {
          wow: 3,
          pizza: 2,
        }[`wow`]
      }
    </div>
  );
};

export default ActivityArea;
