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
import ShopPanel from "../../ActivityPanels/ShopPanel";
import MapPanel from "../../ActivityPanels/MapPanel";

//@ This is a component to hold the activity buttons and the activity display components to manage state for rendering purposes
const ActivityArea = (props: Types.ActivityAreaCompProps) => {
  const [display, setDisplay] = useState<string>("activityDisplay"); // set the default to render the activityDisplay component

  const handleUpdateDisplay = (displayString: string): void => {
    setDisplay(displayString);
  };

  // the structure below is an object containing references to components.
  // We can conditionally render the components contained in the object via bracket notation
  // state is set on buttons in another component, which changes the display state, thus selecting the component to render
  return (
    <div className="border border-dark border-2 rounded-3">
      <ActivityButtons handleUpdateDisplay={handleUpdateDisplay} />
      {
        {
          activityDisplay: <ActivityDisplay />,
          skills: (
            <SkillsPanel
              setNeedsToBank={props.setNeedsToBank}
              handleUpdateDisplay={handleUpdateDisplay}
              newChatLog={props.newChatLog}
              chatLogArray={props.chatLogArray}
              setCurrentEquipment={props.setCurrentEquipment}
              currentEquipment={props.currentEquipment}
            />
          ),
          quests: (
            <QuestPanel
              handleUpdateDisplay={handleUpdateDisplay}
              newChatLog={props.newChatLog}
              chatLogArray={props.chatLogArray}
              questStepProgress={props.questStepProgress}
            />
          ),
          combat: (
            <CombatPanel
              handleUpdateDisplay={handleUpdateDisplay}
              newChatLog={props.newChatLog}
              chatLogArray={props.chatLogArray}
              currentEquipment={props.currentEquipment}
              playerLifePoints={props.playerLifePoints}
              targetLifePoints={props.targetLifePoints}
            />
          ),
          bank: <BankPanel handleUpdateDisplay={handleUpdateDisplay} newChatLog={props.newChatLog} />,
          shop: <ShopPanel handleUpdateDisplay={handleUpdateDisplay} newChatLog={props.newChatLog} chatLogArray={props.chatLogArray} />,
          bosses: <BossesPanel handleUpdateDisplay={handleUpdateDisplay} newChatLog={props.newChatLog} />,
          minigames: <MinigamePanel handleUpdateDisplay={handleUpdateDisplay} newChatLog={props.newChatLog} />,
          clues: <CluesPanel handleUpdateDisplay={handleUpdateDisplay} newChatLog={props.newChatLog} />,
          map: <MapPanel handleUpdateDisplay={handleUpdateDisplay} newChatLog={props.newChatLog} />,
        }[display]
      }
    </div>
  );
};

export default ActivityArea;
