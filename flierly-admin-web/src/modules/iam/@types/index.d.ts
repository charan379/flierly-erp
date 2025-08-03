// Define a interface based on the Privilege entity
interface Privilege extends EntityTimeStamps {
  id: number
  isActive: boolean
  name: string
  access: 'create' | 'read' | 'update' | 'delete' | 'manage'
  entity: string
  code: string
  roles?: Role[]
  usersWithRestrictedPrivileges?: User[]
  usersWithAdditionalPrivileges?: User[]
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

}

// Define a interface based on the Role entity
interface Role extends EntityTimeStamps {
  id: number
  isActive: boolean
  name: string
  code: string
  description: string
  privileges?: Privilege[]
  users?: User[]
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

interface User extends EntityTimeStamps {
  id: number
  isActive: boolean
  username: string
  email: string
  mobile: string
  additionalPrivileges?: Privilege[]
  restrictedPrivileges?: Privilege[]
  roles?: Role[]
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
} 
