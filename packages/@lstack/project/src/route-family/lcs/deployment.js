import { routeFamily } from '../../constructor'
import { Deployment as DeploymentRoute, DeploymentCreate, Deployments } from '../../route/lcs'

export const Deployment = routeFamily(DeploymentCreate, Deployments, DeploymentRoute)

DeploymentCreate.setFamily(Deployment)
Deployments.setFamily(Deployment)
DeploymentRoute.setFamily(Deployment)
