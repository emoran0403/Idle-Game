import * as Types from "../../../../Types";
import * as React from "react";
import { useEffect } from "react";
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

  useEffect(() => {}, []);

  const panelHeaderJSX = () => {
    return (
      <div className="row justify-content-lg-center">
        <div className="col-lg-3 justify-content-lg-center">
          <button
            className="btn btn-primary"
            onClick={() => {
              props.handleUpdateDisplay(`activityDisplay`);
            }}
          >
            Back
          </button>
        </div>
        <div className="col-lg-9 justify-content-lg-center">Bank</div>
      </div>
    );
  };

  const WoodcuttingItems = () => {
    return (
      <div className="card-title border border-dark border-1 rounded-3">
        <h6 className="text-center">Woodcutting Resources</h6>
        <div className="d-flex flex-row flex-wrap">
          {arrayOfLogs.map((item) => (
            <div key={`resource-list-${item.name}`} className={`card border mb-3`}>
              <div className="card-body text">
                <h5 className="card-title">{ListOfLogs[item.name as keyof Types.IListOfLogs].displayName}</h5>
                <div className="card-text">
                  <div>{item.amount}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const FishingItems = () => {
    return (
      <div className="card-title border border-dark border-1 rounded-3">
        <h6 className="text-center">Fishing Resources</h6>
        <div className="d-flex flex-row flex-wrap">
          {arrayOfFish.map((item) => (
            <div key={`resource-list-${item.name}`} className={`card border mb-3`}>
              <div className="card-body text">
                <h5 className="card-title">Raw {ListOfFish[item.name as keyof Types.IListOfFish].displayName}</h5>
                <div className="card-text">
                  <div>{item.amount}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const MiningItems = () => {
    return (
      <div className="card-title border border-dark border-1 rounded-3">
        <h6 className="text-center">Mining Resources</h6>
        <div className="d-flex flex-row flex-wrap">
          {arrayOfOres.map((item) => (
            <div key={`resource-list-${item.name}`} className={`card border mb-3`}>
              <div className="card-body text">
                <h5 className="card-title">{ListOfOres[item.name as keyof Types.IListOfOres].displayName}</h5>
                <div className="card-text">
                  <div>{item.amount}</div>
                </div>
              </div>
            </div>
          ))}
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
