import FormField from './FormField'
import { FormFieldConfig as FFC } from './FormField'

export type FormFieldConfig<T = Record<string, any>> = FFC<T>

export default FormField
