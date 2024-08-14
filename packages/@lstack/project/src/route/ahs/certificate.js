import { route } from '../../constructor'
import { Index } from './ahs-index'

export const Certificates = route('Certificates', '证书管理', 'certificates', {}, Index)
export const Certificate = route('Certificate', '证书详情', 'certificate', {}, Index)
export const CertificateCreate = route('CertificateCreate', '证书创建', 'certificate-create', {}, Index)
