import SelectableListView from './selectable-list-view'

SelectableListView.install = Vue => {
  Vue.component(SelectableListView.name, SelectableListView)
}

export default SelectableListView
