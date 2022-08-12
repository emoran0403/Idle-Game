import * as Types from "../../../../Types";
import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ListOfFish } from "../../../../Constants/Items/Fish";
import { ListOfLogs } from "../../../../Constants/Items/Logs";
import { ListOfOres } from "../../../../Constants/Items/Ores";

const BankPanel = (props: Types.BankPanelProps) => {
  // grab the bank slices from state
  const bank_logs = useSelector((state: Types.AllState) => state.Bank_Logs) as Types.ILogBankSlice;
  const bank_fish = useSelector((state: Types.AllState) => state.Bank_Fish) as Types.IFishBankSlice;
  const bank_ores = useSelector((state: Types.AllState) => state.Bank_Ores) as Types.IOreBankSlice;

  const arrayOfLogs: Types.IBankItem[] = Object.values(bank_logs);
  const arrayOfFish: Types.IBankItem[] = Object.values(bank_fish);
  const arrayOfOres: Types.IBankItem[] = Object.values(bank_ores);

  // useEffect(() => {}, []);

  // tracks each skill panel's expanded or collapsed state
  const [skillPanelsOpened, setSkillPanelsOpened] = useState({
    Woodcutting: false,
    Mining: false,
    Fishing: false,
    Thieving: false,
    Slayer: false,
    Farming: false,
    Firemaking: false,
    Hunter: false,
    Divination: false,
    Archaeology: false,
    Runecrafting: false,
    Construction: false,
    Summoning: false,
    Agility: false,
  });

  /**
   * Added as an onClick handler to toggle the display state of the SkillPanels.
   * Used to toggle the expanded or collapsed state of the SkillPanels.
   * @param panel - A string used to index the skillPanelsOpened object.
   */
  const handleToggleSkillPanel = (panel: string) => {
    let copyOfskillPanelsOpened = { ...skillPanelsOpened };
    copyOfskillPanelsOpened[panel as keyof Types.SkillPanels] = !copyOfskillPanelsOpened[panel as keyof Types.SkillPanels];
    setSkillPanelsOpened({ ...copyOfskillPanelsOpened });
  };

  const panelHeaderJSX = () => {
    return (
      <div className="row justify-content-lg-center">
        <div className="col-lg-2 justify-content-lg-center">
          <button
            className="btn btn-primary"
            onClick={() => {
              props.handleUpdateDisplay(`activityDisplay`);
            }}
          >
            Back
          </button>
        </div>
        <h1 className="col-lg-10 justify-content-lg-center">Bank</h1>
      </div>
    );
  };

  const WoodcuttingItems = () => {
    return (
      <div role="button" onClick={() => handleToggleSkillPanel(`Woodcutting`)} className="card-title border border-dark border-1 rounded-3 user-select-none">
        <h1 className="text-center">Woodcutting Resources</h1>
        <div className={`d-flex flex-row flex-wrap ${skillPanelsOpened.Woodcutting ? `` : `d-none`}`}>
          {arrayOfLogs.map((item) => {
            return item.amount ? (
              <div key={`resource-list-${item.name}`} className={`card border mb-3`}>
                <div className="card-body text">
                  <h5 className="card-title">{ListOfLogs[item.name as keyof Types.IListOfLogs].displayName}</h5>
                  <div className="card-text">
                    <div>{item.amount}</div>
                  </div>
                </div>
              </div>
            ) : (
              ``
            );
          })}
        </div>
      </div>
    );
  };

  const FishingItems = () => {
    return (
      <div role="button" onClick={() => handleToggleSkillPanel(`Fishing`)} className="card-title border border-dark border-1 rounded-3 user-select-none">
        <h1 className="text-center">Fishing Resources</h1>
        <div className={`d-flex flex-row flex-wrap ${skillPanelsOpened.Fishing ? `` : `d-none`}`}>
          {arrayOfFish.map((item) => {
            return item.amount ? (
              <div key={`resource-list-${item.name}`} className={`card border mb-3`}>
                <div className="card-body text">
                  <h5 className="card-title">Raw {ListOfFish[item.name as keyof Types.IListOfFish].displayName}</h5>
                  <div className="card-text">
                    <div>{item.amount}</div>
                  </div>
                </div>
              </div>
            ) : (
              ``
            );
          })}
        </div>
      </div>
    );
  };

  const MiningItems = () => {
    return (
      <div role="button" onClick={() => handleToggleSkillPanel(`Mining`)} className="card-title border border-dark border-1 rounded-3 user-select-none">
        <h1 className="text-center">Mining Resources</h1>
        <div className={`d-flex flex-row flex-wrap ${skillPanelsOpened.Mining ? `` : `d-none`}`}>
          {arrayOfOres.map((item) => {
            return item.amount ? (
              <div key={`resource-list-${item.name}`} className={`card border mb-3`}>
                <div className="card-body text">
                  <h5 className="card-title">{ListOfOres[item.name as keyof Types.IListOfOres].displayName}</h5>
                  <div className="card-text">
                    <div>{item.amount}</div>
                  </div>
                </div>
              </div>
            ) : (
              ``
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="container card border border-dark border-2 rounded-3" style={{ overflowY: "auto", position: "relative", height: "81%" }}>
      {panelHeaderJSX()}
      <div className="row justify-content-lg-center">
        <div className="card">
          <div className="card-body">
            {/* panel specific content goes here */}
            {WoodcuttingItems()}
            {FishingItems()}
            {MiningItems()}
            {/* end of panel specific content */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankPanel;
