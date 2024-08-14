import SelectableButton from './selectable-button'

SelectableButton.install = Vue => {
  Vue.component(SelectableButton.name, SelectableButton)
}

export default SelectableButton
