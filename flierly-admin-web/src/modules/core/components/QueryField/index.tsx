import QueryField from './QueryField'
import { QueryFieldConfig as FFC } from './QueryField'

export type QueryFieldConfig<T = Record<string, any>> = FFC<T>

export default QueryField
