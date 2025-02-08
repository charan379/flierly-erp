import React, { useState } from 'react'
import { ModalForm, ProFormText } from '@ant-design/pro-components'
import { Button, Form } from 'antd'
import userService from '../../service/user.service'
import { LockTwoTone } from '@ant-design/icons'
import useLocale from '@/modules/core/features/Locale/hooks/useLocale'
import Loading from '@/modules/core/components/Loading'

interface UserPasswordUpdateProps {
  userId: number,
  username: string,
}

const UserPasswordUpdate: React.FC<UserPasswordUpdateProps> = ({ userId, username }) => {
  const { translate } = useLocale()
  const [isLoading, setIsLoading] = useState(false);

  const [form] = Form.useForm<{ userId: string; password: string, username: string }>();

  const onSubmit = async (values: { userId: number; password: string, username: string }) => {
    setIsLoading(true);
    await userService.updateUserPassword({
      userId: values.userId,
      password: values.password,
      username: values.username,
    })
    setIsLoading(false);
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
        form={form}
        loading={isLoading}
        initialValues={{ userId, username }}
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
          resetButtonProps: {
            danger: true
          },
          async onSubmit(_) {
            const formValues = form.getFieldsValue();
            await onSubmit({ username: formValues.username, password: formValues.password, userId: parseInt(formValues.userId) })
          }
        }
        }
      >
        <Loading isLoading={isLoading}>
          <ProFormText
            name="userId"
            label={translate('user_id')}
            disabled
            hidden
            rules={[{ required: true, type: 'string' }, userIdValidator]}
            placeholder={translate('enter_user_id')}
          />
          <ProFormText
            name="username"
            label={translate('username')}
            disabled
            hidden
            rules={[{ required: true, type: 'string' }]}
            placeholder={translate('enter_username')}
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
        </Loading>
      </ModalForm>
    </div >
  )
}

export default UserPasswordUpdate
