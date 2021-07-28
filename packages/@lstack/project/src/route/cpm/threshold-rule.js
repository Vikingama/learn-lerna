import { route } from '../../constructor'
import { Index } from './cpm-index'

export const ThresholdRules = route('ThresholdRules', '阈值规则', 'threshold-rules', {}, Index)
export const ThresholdRuleCreate = route('ThresholdRuleCreate', '创建阈值规则', 'threshold-rule-create', {}, Index)
