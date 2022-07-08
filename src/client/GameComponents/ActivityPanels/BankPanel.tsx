import * as Types from "../../../../Types";
import * as React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const BankPanel = (props: Types.BankPanelProps) => {
  const bank_logs = useSelector((state: Types.AllState) => state.Bank_Logs) as Types.ILogBankSlice;
  const bank_fish = useSelector((state: Types.AllState) => state.Bank_Fish) as Types.IFishBankSlice;

  const arrayOfLogs: Types.IBankItem[] = Object.values(bank_logs);

  const arrayOfFish: Types.IBankItem[] = Object.values(bank_fish);

  // const wow = Object.entries(bank_logs);
  // console.log(wow);
  // const wow2 = Object.keys(bank_logs);
  // console.log(wow2);

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
                <h5 className="card-title">{item.name}</h5>
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
                <h5 className="card-title">{item.name}</h5>
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
    <div className="container card border border-dark border-2 rounded-3">
      {panelHeaderJSX()}
      <div className="row justify-content-lg-center">
        <div className="card">
          <div className="card-body">
            {/* panel specific content goes here */}
            {WoodcuttingItems()}
            {FishingItems()}
            {/* end of panel specific content */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankPanel;
