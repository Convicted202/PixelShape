import keyboardjs from 'keyboardjs';

export default KeyListenerComponent => {
  const displayName = KeyListenerComponent.displayName
        || KeyListenerComponent.name
        || 'Component';

  const componentWillUnmount = KeyListenerComponent.componentWillUnmount;

  KeyListenerComponent.prototype.bindKey = function (keyCombo, fn) {
    this._keyBindings = this._keyBindings || [];
    this._keyBindings.push(
      keyboardjs.on(keyCombo, e => {
        if (['INPUT', 'TEXTAREA'].indexOf(e.target.tagName) >= 0) return;
        fn();
      })
    );
  };

  KeyListenerComponent.prototype.bindKeys = function (keyComboObj) {
    Object.keys(keyComboObj)
      .forEach(key => this.bindKey(key, keyComboObj[key]));
  };

  KeyListenerComponent.prototype.componentWillUnmount = function () {
    if (componentWillUnmount) componentWillUnmount();

    if (this._keyBindings) this._keyBindings.forEach(binding => binding.clear());
  };

  KeyListenerComponent.displayName = `KeyListener(${displayName})`;

  return KeyListenerComponent;
};
