import { createEffect, onCleanup } from "solid-js";

interface NuiMessageData<T = unknown> {
  action: string;
  data: T;
}

type NuiHandlerSignature<T> = (data: T) => void;

export const useNuiEvent = <T = unknown>(
  action: string,
  handler: (data: T) => void
) => {
  let savedHandler: NuiHandlerSignature<T> = handler;

  // Make sure we handle for a reactive handler
  createEffect(() => {
    savedHandler = handler;
  });

  createEffect(() => {
    const eventListener = (event: MessageEvent<NuiMessageData<T>>) => {
      const { action: eventAction, data } = event.data;

      if (savedHandler) {
        if (eventAction === action) {
          savedHandler(data);
        }
      }
    };

    window.addEventListener("message", eventListener);

    // Remove Event Listener on component cleanup
    onCleanup(() => {
      window.removeEventListener("message", eventListener);
    });
  });
};