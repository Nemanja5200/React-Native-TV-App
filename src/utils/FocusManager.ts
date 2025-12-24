type FocusCallback = () => void;

class FocusManagerClass {
  private focusCallbacks: Map<string, FocusCallback> = new Map();

  registerFocusCallback(key: string, callback: FocusCallback) {
    this.focusCallbacks.set(key, callback);
  }

  restoreFocus(key: string) {
    const callback = this.focusCallbacks.get(key);
    if (callback) {
      setTimeout(() => {
        callback();
      }, 100);
    }
  }

  removeFocusCallback(key: string) {
    this.focusCallbacks.delete(key);
  }
}

export const focusManager = new FocusManagerClass();
