// 状态类型颜色
const SUCCESS = 'success' // 绿色： 成功
const ERROR = 'error' // 红色：失败
const WARNING = 'warning' // 橙色：告警
const PRIMARY = 'primary' // 蓝色：加载
const TIP = 'tip' // 灰色：说明，提示

// 状态基本图标
const RUNNING_ICON = 'running' // 运行中
const STOP_ICON = 'stop' // 停止
const DISABLE_ICON = 'disabled' // 禁用
const SUCCESS_ICON = 'success' // 成功，正常
const ERROR_ICON = 'error' // 失败，错误
const LOADING_ICON = 'loading' // 加载中，安装中
const WAITING_ICON = 'waiting' // 等待
const WARNNING_ICON = 'warnning' // 告警

function getTypeItemMethod(type, icon, text) {
  return {
    type,
    icon,
    text,
  }
}

/**
 * 用于映射 status 与 type,icon,text 的默认关系
 *  icon 不支持 prop 外传
 */
const status2typeItemMap = {
  Active: getTypeItemMethod(SUCCESS, SUCCESS_ICON, '已激活'),
  Succeed: getTypeItemMethod(SUCCESS, SUCCESS_ICON, '成功'),
  Normal: getTypeItemMethod(SUCCESS, SUCCESS_ICON, '正常'),
  Error: getTypeItemMethod(ERROR, ERROR_ICON, '失败'),
  OffLine: getTypeItemMethod(ERROR, ERROR_ICON, '离线'),
  UnConnect: getTypeItemMethod(WARNING, WARNNING_ICON, '连接异常'),
  Creating: getTypeItemMethod(PRIMARY, LOADING_ICON, '创建中'),
  Deleting: getTypeItemMethod(PRIMARY, LOADING_ICON, '删除中'),
  Unknown: getTypeItemMethod(TIP, DISABLE_ICON, '未知'),
  Invalid: getTypeItemMethod(TIP, DISABLE_ICON, '无效'),
  Restarting: getTypeItemMethod(PRIMARY, LOADING_ICON, '重启中'),
  Running: getTypeItemMethod(SUCCESS, RUNNING_ICON, '运行中'),
  Healthy: getTypeItemMethod(SUCCESS, SUCCESS_ICON, '健康'),
  Unhealthy: getTypeItemMethod(ERROR, ERROR_ICON, '不健康'),
  Imported: getTypeItemMethod(SUCCESS, SUCCESS_ICON, '导入成功'),
  Installed: getTypeItemMethod(SUCCESS, SUCCESS_ICON, '已安装'),
  Installing: getTypeItemMethod(PRIMARY, LOADING_ICON, '正在安装'),
  UnInstallFailed: getTypeItemMethod(ERROR, ERROR_ICON, '安装失败'),
  Deployed: getTypeItemMethod(SUCCESS, SUCCESS_ICON, '已部署'),
  NotImported: getTypeItemMethod(WARNING, WARNNING_ICON, '未导入'),
  ImportedFailed: getTypeItemMethod(ERROR, ERROR_ICON, '导入失败'),
  CancelImportFailed: getTypeItemMethod(ERROR, ERROR_ICON, '取消导入失败'),
  ImportedAbnormal: getTypeItemMethod(WARNING, WARNNING_ICON, '导入异常'),
  CancelImportAbnormal: getTypeItemMethod(WARNING, WARNNING_ICON, '取消导入异常'),
  Canceling: getTypeItemMethod(PRIMARY, LOADING_ICON, '正在取消'),
  Importing: getTypeItemMethod(PRIMARY, LOADING_ICON, '导入中'),
  Expanding: getTypeItemMethod(PRIMARY, LOADING_ICON, '扩容中'),
  Shrinking: getTypeItemMethod(TIP, DISABLE_ICON, '网络变动'),
  DeployFailed: getTypeItemMethod(ERROR, ERROR_ICON, '部署失败'),
  UnDeployFailed: getTypeItemMethod(ERROR, ERROR_ICON, '卸载失败'),
  NotDeployed: getTypeItemMethod(TIP, DISABLE_ICON, '未部署'),
  HbasePubConnSwitching: getTypeItemMethod(PRIMARY, LOADING_ICON, '网络变更中'),
  HbaseExpanding: getTypeItemMethod(PRIMARY, LOADING_ICON, '磁盘扩容中'),
  Initiating: getTypeItemMethod(PRIMARY, LOADING_ICON, '运行中'),
  InUse: getTypeItemMethod(SUCCESS, RUNNING_ICON, '使用中'),
  Available: getTypeItemMethod(SUCCESS, SUCCESS_ICON, '可用'),
  Attaching: getTypeItemMethod(PRIMARY, LOADING_ICON, '正在挂载'),
  Detaching: getTypeItemMethod(PRIMARY, LOADING_ICON, '正在卸载'),
  ErrorCreating: getTypeItemMethod(ERROR, ERROR_ICON, '创建失败'),
  RestoringBackup: getTypeItemMethod(PRIMARY, LOADING_ICON, '备份恢复中'),
  BackingUp: getTypeItemMethod(PRIMARY, LOADING_ICON, '备份创建中'),
  ErrorRestoring: getTypeItemMethod(ERROR, ERROR_ICON, '恢复失败'),
  ImageCreating: getTypeItemMethod(PRIMARY, LOADING_ICON, '创建镜像中'),
  EcsCreating: getTypeItemMethod(PRIMARY, LOADING_ICON, '创建云服务器中'),
  Extending: getTypeItemMethod(PRIMARY, LOADING_ICON, '扩容中'),
  ErrorExtending: getTypeItemMethod(ERROR, ERROR_ICON, '扩容失败'),
  ErrorDeleting: getTypeItemMethod(ERROR, ERROR_ICON, '删除失败'),
  Rollbacking: getTypeItemMethod(PRIMARY, LOADING_ICON, '回滚中'),
  ErrorRollbacking: getTypeItemMethod(ERROR, ERROR_ICON, '回滚失败'),
  Pending: getTypeItemMethod(PRIMARY, LOADING_ICON, '等待中'),
  Starting: getTypeItemMethod(PRIMARY, LOADING_ICON, '启动中'),
  Stopped: getTypeItemMethod(TIP, STOP_ICON, '已停止'),
  Stopping: getTypeItemMethod(PRIMARY, LOADING_ICON, '停止中'),
  Rebooting: getTypeItemMethod(PRIMARY, LOADING_ICON, '重启中'),
  HardRebooting: getTypeItemMethod(PRIMARY, LOADING_ICON, '强制重启中'),
  Rebuilding: getTypeItemMethod(PRIMARY, LOADING_ICON, '重建中'),
  Migrating: getTypeItemMethod(PRIMARY, LOADING_ICON, '迁移中'),
  Updating: getTypeItemMethod(PRIMARY, LOADING_ICON, '更新中'),
  Verifying: getTypeItemMethod(PRIMARY, LOADING_ICON, '校验中'),
  Deleted: getTypeItemMethod(TIP, DISABLE_ICON, '已删除'),
  Uploading: getTypeItemMethod(PRIMARY, LOADING_ICON, '上传中'),
  Modifying: getTypeItemMethod(PRIMARY, LOADING_ICON, '修改中'),
  Freezed: getTypeItemMethod(TIP, DISABLE_ICON, '冻结'),
  EipFreezed: getTypeItemMethod(TIP, DISABLE_ICON, 'Eip被冻结'),
  Exception: getTypeItemMethod(WARNING, WARNNING_ICON, '异常'),
  Enable: getTypeItemMethod(SUCCESS, SUCCESS_ICON, '可用'),
  Disable: getTypeItemMethod(TIP, DISABLE_ICON, '禁用'),
  Disabled: getTypeItemMethod(TIP, DISABLE_ICON, '禁用'),
  Expired: getTypeItemMethod(ERROR, ERROR_ICON, '过期'),
  UnAvailable: getTypeItemMethod(TIP, DISABLE_ICON, '不可用'),
  Unavailable: getTypeItemMethod(TIP, DISABLE_ICON, '不可用'),
  Wait: getTypeItemMethod(TIP, WAITING_ICON, '未配置'),
  UnStart: getTypeItemMethod(TIP, WAITING_ICON, '未启动'),
  ErrorStop: getTypeItemMethod(ERROR, ERROR_ICON, '异常终止'),
  Pause: getTypeItemMethod(TIP, STOP_ICON, '暂停'),
  Locked: getTypeItemMethod(TIP, STOP_ICON, '已锁定'),
  VerifyPass: getTypeItemMethod(SUCCESS, SUCCESS_ICON, '校验通过'),
  Completed: getTypeItemMethod(SUCCESS, SUCCESS_ICON, '完成'),
  Filling: getTypeItemMethod(PRIMARY, LOADING_ICON, '备份中'),
  UnCompleted: getTypeItemMethod(ERROR, ERROR_ICON, '未完成'),
  Failed: getTypeItemMethod(ERROR, ERROR_ICON, '失败'),
  OnLine: getTypeItemMethod(SUCCESS, SUCCESS_ICON, '在线'),
  offLine: getTypeItemMethod(ERROR, ERROR_ICON, '离线'),
  Upgrading: getTypeItemMethod(PRIMARY, LOADING_ICON, '升级中'),
  InTransition: getTypeItemMethod(PRIMARY, LOADING_ICON, '转换中'),
  Associating: getTypeItemMethod(PRIMARY, LOADING_ICON, '绑定中'),
  Unassociating: getTypeItemMethod(PRIMARY, LOADING_ICON, '解绑中'),
  Inactive: getTypeItemMethod(TIP, DISABLE_ICON, '不转发流量'),
  ImagePullBackOff: getTypeItemMethod(ERROR, ERROR_ICON, '镜像拉取失败'),
  CrashLoopBackOff: getTypeItemMethod(ERROR, ERROR_ICON, '崩溃循环关闭'),
}

export const status2typeMap = Object.entries(status2typeItemMap)
  .map(([key, item]) => [key, item.type])
  .reduce((pre, cur) => {
    const [key, val] = cur
    pre[key] = val
    return pre
  }, {})

export const status2iconMap = Object.entries(status2typeItemMap)
  .map(([key, item]) => [key, item.icon])
  .reduce((pre, cur) => {
    const [key, val] = cur
    pre[key] = val
    return pre
  }, {})

export const status2textMap = Object.entries(status2typeItemMap)
  .map(([key, item]) => [key, item.text])
  .reduce((pre, cur) => {
    const [key, val] = cur
    pre[key] = val
    return pre
  }, {})

/**
 *
 * 💘❤💓💔💕💖💗💙💚💛💜💝💞💟
 * 没错，这些心都是送给你的，my sweetheart
 *
 *  */
import { isEmpty, logError } from '@lstack/utils'

export default {
  name: 'StatusFormat',
  props: {
    status: String,
    type: String,
  },
  computed: {
    cStatus() {
      if (typeof this.status === 'string') {
        const stausFirst = this.status.slice(0, 1)
        return stausFirst.toUpperCase() + this.status.slice(1)
      }
      return this.status
    },
    cType() {
      if (!isEmpty(status2typeMap[this.cStatus])) {
        return status2typeMap[this.cStatus]
      }
      if (this.status) {
        logError(`未对该 status:${this.status} 适配，请在 status2typeMap 针对${this.status} status 进行适配`)
      }

      return undefined
    },
  },
}
