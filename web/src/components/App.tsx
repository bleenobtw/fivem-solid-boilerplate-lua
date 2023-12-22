import { Component, createSignal } from "solid-js";
import './App.css'
import { fetchNui } from "../utils/fetchNui";
import { debugData } from "../utils/debugData";

debugData([
  {
    action: "setVisible",
    data: true,
  },
]);

interface ReturnClientDataCompProps {
  data: unknown;
}

const ReturnClientDataComp: Component<ReturnClientDataCompProps> = (props) => (
  <>
    <h5>Returned Data:</h5>
    <pre>
      <code>{JSON.stringify(props.data, null)}</code>
    </pre>
  </>
)

interface ReturnData {
  x: number;
  y: number;
  z: number;
}

const App: Component = () => {
  const [clientData, setClientData] = createSignal<ReturnData | null>(null);

  const handleGetClientData = () => {
    fetchNui<ReturnData>("getClientData")
      .then((retData) => {
        console.log("Got return data from client scripts:");
        console.dir(retData);
        setClientData(retData);
      })
      .catch((e) => {
        console.error("Setting mock data due to error", e);
        setClientData({ x: 500, y: 300, z: 200 });
      });
  }

  return (
    <div class="nui-wrapper">
      <div class="popup-thing">
        <div>
          <h1>This is the NUI Popup!</h1>
          <p>Exit with the escape key</p>
          <button onClick={handleGetClientData}>Get Client Data</button>
          {clientData && <ReturnClientDataComp data={clientData()} />}
        </div>
      </div>
    </div>
  );
}

export default App;