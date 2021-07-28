import { route } from '../../constructor'
import { Index } from './isv-index'

export const ProduceApis = route('ProduceApis', '应用接入调试', 'produce-apis', {}, Index)
export const ProduceApiTestcases = route('ProduceApiTestcases', '调试用例管理', 'produce-api-test-cases', {}, Index)
