// Define a type based on the Privilege entity
type Privilege = {
  id: number
  isActive: boolean
  name: string
  access: 'Create' | 'Read' | 'Update' | 'Delete' | 'Manage'
  entity: string
  code: string
  roles?: Role[]
  usersWithRestrictedPrivileges?: User[]
  usersWithAdditionalPrivileges?: User[]
} & EntityTimeStamps

// Define a type based on the Role entity
type Role = {
  id: number
  isActive: boolean
  name: string
  code: string
  description: string
  privileges?: Privilege[]
  users?: User[]
} & EntityTimeStamps

type User = {
  id: number
  isActive: boolean
  username: string
  email: string
  mobile: string
  additionalPrivileges: Privilege[]
  restrictedPrivileges: Privilege[]
  roles: Role[]
} & EntityTimeStamps
