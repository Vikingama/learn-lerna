import { route } from '../../constructor'
import { Index } from './csm-index'

export const AlertContact = route('AlertContactsPageHub', '告警联系', 'alert-contacts', {}, Index)
export const AlertContacts = route('AlertContacts', '告警联系人', 'contacts', {}, AlertContact)

AlertContact.setRedirectRoute(AlertContacts)
