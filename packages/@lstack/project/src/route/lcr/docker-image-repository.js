import { route } from '../../constructor'
import { Index } from './lcr-index'

export const Image = route('ImageHubPageHub', '镜像中心', 'image', {}, Index)
export const DockerImageRepository = route('DockerImageRepository', '官方镜像', 'docker-image-repository', {}, Image)

Image.setRedirectRoute(DockerImageRepository)
