import EditableListView from './editable-list-view'

EditableListView.install = Vue => {
  Vue.component(EditableListView.name, EditableListView)
}

export default EditableListView
