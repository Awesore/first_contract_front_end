
import './App.css'
import {TonConnectButton} from "@tonconnect/ui-react";
import { useMainContract } from './hooks/useMainContract';
import { useTonConnect } from './hooks/useTonConnect';
import { fromNano } from '@ton/core';
import WebApp from '@twa-dev/sdk';

function App() {

  const {
    recent_sender,
    contract_address,
    owner_address,
    counter_value,
    contract_balance,
    sendIncrement,
    sendDeposit,
    sendWithdrawal,
    
  } = useMainContract();

  const {connected} = useTonConnect();

  const showAlert = () => {
    WebApp.showAlert("hey there!");
  };

  return (
   <div>
      <TonConnectButton />

      <div className="container">
        <div>
          <b>{WebApp.platform}</b>
          <h3>Contract Data:</h3>
          <b>Our contract Address:</b>
          <div className="Hint">{contract_address}</div>
          <hr />

          <b>Our contract Owner:</b>
          <div className="Hint">{owner_address?.toString()}</div>
          <hr />

          {contract_balance && (
            <>
              <b>Our contract Balance:</b>
              <div className="Hint">{fromNano(contract_balance)}</div>
              <hr />
            </>
          )}

          {recent_sender && (
            <>
              <b>Recent sender:</b>
              <div className="Hint">{recent_sender.toString()}</div>
              <hr />
            </>
          )}

          <>
            <b>Counter Value:</b>
            <div>{counter_value ?? "Loading..."}</div>
          </>
        </div>
        <div>
          <h3>Contract actions: </h3>
          {connected ? (
            <>

              <p>Show ALERT</p>
              <button onClick={showAlert}>Show Alert</button>
              <hr />



              <p>Increment contract balance by 1 TON, with 0.05 TON as a comission</p>
              <button onClick={sendIncrement}>Increment</button>
              <hr />


              <p>Deposit contract balance by 1 TON</p>
              <button onClick={sendDeposit}>Deposit</button>
              <hr />

              <p>Withdrawal from contract balance by 0.2 TON</p>
              <button onClick={sendWithdrawal}>Withdrawal</button>
              <hr />
            </>
          ) : (
            <p>Connect wallet to start action</p>
          )}
        </div>
        <div>
          <a 
            href="https://testnet.tonscan.org/address/EQCS7PUYXVFI-4uvP1_vZsMVqLDmzwuimhEPtsyQKIcdeNPu"
            target="_blank"
          >
            explorer
          </a>

          <br />
         
        </div>
      </div>
    </div>  );
}


 export default App
