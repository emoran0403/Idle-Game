import * as Types from "../../../../Types";
import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ListOfFish } from "../../../../Constants/Items/Fish";
import { ListOfLogs } from "../../../../Constants/Items/Logs";
import { ListOfOres } from "../../../../Constants/Items/Ores";
import { ListOfRunes } from "../../../../Constants/RuneCrafting/Runes";

const BankPanel = (props: Types.BankPanelProps) => {
  // grab the bank slices from state, and turn them into arrays for JSX mapping
  const arrayOfLogsFromBank: Types.IBankItem[] = Object.values(useSelector((state: Types.AllState) => state.Bank_Logs) as Types.ILogBankSlice);
  const arrayOfFishFromBank: Types.IBankItem[] = Object.values(useSelector((state: Types.AllState) => state.Bank_Fish) as Types.IFishBankSlice);
  const arrayOfOresFromBank: Types.IBankItem[] = Object.values(useSelector((state: Types.AllState) => state.Bank_Ores) as Types.IOreBankSlice);
  const arrayOfRunesFromBank: Types.IBankItem[] = Object.values(useSelector((state: Types.AllState) => state.Bank_Runes) as Types.IRuneBankSlice);

  const Wallet = useSelector((state: Types.AllState) => state.Wallet) as Types.IWallet;
  const RunespanPoints = useSelector((state: Types.AllState) => state.RunespanPoints) as Types.IRunespanPoints;

  let wow = Object.entries(Wallet);
  let wow2 = Object.entries(RunespanPoints);
  let wow3 = [...wow, ...wow2];
  console.log({ wow3 });

  // useEffect(() => {}, []);

  // tracks each skill panel's expanded or collapsed state
  const [skillPanelsOpened, setSkillPanelsOpened] = useState({
    Currencies: true,
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

  /**
   * This function displays the currencies the player has in the bank.
   * @returns JSX for currencies.
   */
  const CurrencyJSX = () => {
    return (
      <div className="card-title border border-dark border-1 rounded-3 user-select-none">
        <h1 className="text-center">Currencies</h1>
        <div className={`d-flex flex-row flex-wrap ${skillPanelsOpened.Woodcutting ? `` : `d-none`}`}>
          {arrayOfLogsFromBank.map((item) => {
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
  /**
   * This function displays the woodcutting items the player has in the bank.
   * @returns JSX for woodcutting items.
   */
  const WoodcuttingItems = () => {
    return (
      <div role="button" onClick={() => handleToggleSkillPanel(`Woodcutting`)} className="card-title border border-dark border-1 rounded-3 user-select-none">
        <h1 className="text-center">Woodcutting Resources</h1>
        <div className={`d-flex flex-row flex-wrap ${skillPanelsOpened.Woodcutting ? `` : `d-none`}`}>
          {arrayOfLogsFromBank.map((item) => {
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
  /**
   * This function displays the fishing items the player has in the bank.
   * @returns JSX for fishing items.
   */
  const FishingItems = () => {
    return (
      <div role="button" onClick={() => handleToggleSkillPanel(`Fishing`)} className="card-title border border-dark border-1 rounded-3 user-select-none">
        <h1 className="text-center">Fishing Resources</h1>
        <div className={`d-flex flex-row flex-wrap ${skillPanelsOpened.Fishing ? `` : `d-none`}`}>
          {arrayOfFishFromBank.map((item) => {
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
  /**
   * This function displays the runecrafting items the player has in the bank.
   * @returns JSX for runecrafting items.
   */
  const RunecraftingItems = () => {
    return (
      <div role="button" onClick={() => handleToggleSkillPanel(`Runecrafting`)} className="card-title border border-dark border-1 rounded-3 user-select-none">
        <h1 className="text-center">Runecrafting Resources</h1>
        <div className={`d-flex flex-row flex-wrap ${skillPanelsOpened.Runecrafting ? `` : `d-none`}`}>
          {arrayOfRunesFromBank.map((item) => {
            return item.amount ? (
              <div key={`resource-list-${item.name}`} className={`card border mb-3`}>
                <div className="card-body text">
                  <h5 className="card-title">{ListOfRunes[item.name as keyof Types.IListOfRunes].displayName}</h5>
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
  /**
   * This function displays the mining items the player has in the bank.
   * @returns JSX for mining items.
   */
  const MiningItems = () => {
    return (
      <div role="button" onClick={() => handleToggleSkillPanel(`Mining`)} className="card-title border border-dark border-1 rounded-3 user-select-none">
        <h1 className="text-center">Mining Resources</h1>
        <div className={`d-flex flex-row flex-wrap ${skillPanelsOpened.Mining ? `` : `d-none`}`}>
          {arrayOfOresFromBank.map((item) => {
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
            {RunecraftingItems()}
            {/* end of panel specific content */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankPanel;
