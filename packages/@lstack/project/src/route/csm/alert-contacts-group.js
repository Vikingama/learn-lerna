import { route } from '../../constructor'
import { AlertContact } from './alert-contacts'

export const AlertContactsGroups = route('AlertContactsGroups', '告警联系人组', 'groups', {}, AlertContact)
