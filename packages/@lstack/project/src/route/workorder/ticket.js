import { route } from '../../constructor'
import { Index } from './workorder-index'

export const Tickets = route('Tickets', '我的工单', 'tickets', {}, Index)
export const TicketCreate = route('TicketCreate', '提交工单', 'ticket-create', {}, Index)

Index.setRedirectRoute(Tickets)
