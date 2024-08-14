import { routeFamily } from '../../constructor'

import { UserGroup as UserGroupRoute, UserGroupCreate, UserGroups } from '../../route/iam'

export const SubUser = routeFamily(UserGroupCreate, UserGroups, UserGroupRoute)

UserGroupCreate.setFamily(SubUser)
UserGroups.setFamily(SubUser)
UserGroupRoute.setFamily(SubUser)
