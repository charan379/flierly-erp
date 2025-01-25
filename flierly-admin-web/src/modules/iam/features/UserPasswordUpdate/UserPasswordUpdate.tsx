import React from 'react'
import { ModalForm, ProFormText } from '@ant-design/pro-components'
import { Button } from 'antd'
import userService from '../../service/user.service'
import { LockTwoTone } from '@ant-design/icons'
import useLocale from '@/modules/core/features/Locale/hooks/useLocale'

interface UserPasswordUpdateProps {
  userId: number
}

const UserPasswordUpdate: React.FC<UserPasswordUpdateProps> = ({ userId }) => {
  const { translate } = useLocale()

  const onFinish = async (values: { userId: string; password: string }) => {
    const response = await userService.updateUserPassword({
      userId: Number(values.userId),
      newPassword: values.password,
    })

    return response?.success || false
  }

  // Prevent context menu propagation
  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }

  // password regex pattern validator
  const passwordRegex = () => ({
    validator(_: any, value: string) {
      return new Promise<void>((resolve, reject) => {
        if (!value) resolve()
        if (/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).*)$/.test(value)) {
          resolve()
        } else {
          reject(new Error(translate('password_is_not_valid')))
        }
      })
    },
  })

  // userId validator
  const userIdValidator = () => ({
    validator(_: any, value: string) {
      return new Promise<void>((resolve, reject) => {
        if (!value) resolve()
        if (/\d$/.test(value)) {
          resolve()
        } else {
          reject(new Error(translate('user_id_is_not_valid')))
        }
      })
    },
  })

  return (
    <div onContextMenu={handleContextMenu}>
      <ModalForm
        title={translate('update_user_password')}
        onFinish={onFinish}
        initialValues={{ userId }}
        modalProps={{
          destroyOnClose: true,
          centered: true,
        }}
        trigger={
          <Button type="link" icon={<LockTwoTone />}>
            {translate('update_password')}
          </Button>
        }
        submitter={{
          searchConfig: {
            resetText: translate('reset'),
            submitText: translate('update'),
          },
        }}
      >
        <ProFormText
          name="userId"
          label={translate('user_id')}
          disabled
          hidden
          rules={[{ required: true, type: 'string' }, userIdValidator]}
          placeholder={translate('enter_user_id')}
        />
        <ProFormText.Password
          name="password"
          label={translate('new_password')}
          rules={[{ required: true, min: 8, max: 26 }, passwordRegex]}
          placeholder={translate('enter_new_password')}
        />
        <ProFormText.Password
          name="confirm"
          label={translate('confirm_password')}
          rules={[
            { required: true, message: translate('confirm_password_required') },
            ({ getFieldValue }) => ({
              validator(_: any, value: string) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error(translate('passwords_do_not_match')))
              },
            }),
          ]}
          placeholder={translate('confirm_new_password')}
        />
      </ModalForm>
    </div>
  )
}

export default UserPasswordUpdate
