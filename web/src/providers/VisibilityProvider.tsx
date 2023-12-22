import { createSignal, onCleanup, createEffect, Context, createContext, useContext, JSX } from "solid-js";
import { useNuiEvent } from "../hooks/useNuiEvent";
import { fetchNui } from "../utils/fetchNui";
import { isEnvBrowser } from "../utils/misc";

interface VisibilityProviderValue {
  setVisible: (visible: boolean) => void;
  visible: boolean;
}

const VisibilityCtx: Context<VisibilityProviderValue | undefined> = createContext();

export const VisibilityProvider: (props: { children: JSX.Element }) => JSX.Element = (props) => {
  const [visible, setVisible] = createSignal(false);

  useNuiEvent<boolean>("setVisible", setVisible);

  createEffect(() => {
    // Handle pressing escape/backspace
    const keyHandler = (e: KeyboardEvent) => {
      if (["Backspace", "Escape"].includes(e.code)) {
        if (!isEnvBrowser()) fetchNui("hideFrame");
        else setVisible(!visible());
      }
    };

    // Only attach listener when we are visible
    if (visible()) {
      window.addEventListener("keydown", keyHandler);
    }

    // Remove Event Listener on component cleanup
    onCleanup(() => {
      window.removeEventListener("keydown", keyHandler);
    });
  });

  return (
    <VisibilityCtx.Provider value={{ visible: visible(), setVisible }}>
      <div style={{ visibility: visible() ? "visible" : "hidden", height: "100%" }}>
        {props.children}
      </div>
    </VisibilityCtx.Provider>
  );
};

export const useVisibility: () => VisibilityProviderValue = () => {
  const contextValue = useContext(VisibilityCtx);
  if (!contextValue) {
    throw new Error("useVisibility must be used within a VisibilityProvider");
  }
  return contextValue;
};