import { routeFamily } from '../../constructor'
import { FileSystem as FileSystemRoute, FileSystemCreate, FileSystems } from '../../route/cpc'

export const FileSystem = routeFamily(FileSystemCreate, FileSystems, FileSystemRoute)

FileSystemRoute.setFamily(FileSystem)
FileSystemCreate.setFamily(FileSystem)
FileSystems.setFamily(FileSystem)
