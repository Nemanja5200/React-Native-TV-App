/**
 * Simple focus restoration manager that avoids passing functions as navigation params
 */

import {FocusManager} from '@amazon-devices/react-native-kepler';

class FocusManagerCustome {
  private focusCallbacks: Map<string, () => void> = new Map();

  /**
   * Register a focus restoration callback for a specific ID
   */
  registerFocusCallback(id: string, callback: () => void) {
    this.focusCallbacks.set(id, callback);
  }

  /**
   * Execute and remove a focus restoration callback
   */
  restoreFocus(id: string) {
    console.log('restoreFocus called with key:', id);
    console.log('Available callbacks:', Array.from(this.focusCallbacks.keys()));
    const callback = this.focusCallbacks.get(id);
    if (callback) {
      callback();
    } else {
      console.log('No callback found for key:', id);
    }
  }

  /**
   * Remove a focus restoration callback without executing it
   */
  unregisterFocusCallback(id: string) {
    console.log('Deleting refrence');
    this.focusCallbacks.delete(id);
  }

  /**
   * Clear all focus callbacks
   */
  clearAll() {
    this.focusCallbacks.clear();
  }
}

export const focusManager = new FocusManagerCustome();
