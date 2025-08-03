import React, { useState } from 'react'
import { ModalForm, ProFormText } from '@ant-design/pro-components'
import { Button, Form } from 'antd'
import userService from '../../service/user.service'
import { LockTwoTone } from '@ant-design/icons'
import useLocale from '@/modules/core/features/Locale/hooks/useLocale'
import Loading from '@/modules/core/components/Loading'
import vr from '@/modules/core/utils/get-validation-regex.util'

interface UserPasswordUpdateProps {
  userId: number,
  username: string,
}

const UserPasswordUpdate: React.FC<UserPasswordUpdateProps> = ({ userId, username }) => {
  const { translate: t } = useLocale()
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
        if (vr("password").test(value)) {
          resolve()
        } else {
          reject(new Error(t('auth.password.invalid')))
        }
      })
    },
  })

  // userId validator
  const userIdValidator = () => ({
    validator(_: any, value: string) {
      return new Promise<void>((resolve, reject) => {
        if (!value) resolve()
        if (vr("userId").test(value)) {
          resolve()
        } else {
          reject(new Error(t('auth.user_id.invalid')))
        }
      })
    },
  })

  return (
    <div onContextMenu={handleContextMenu}>
      <ModalForm
        title={t('title.update_user_password')}
        form={form}
        loading={isLoading}
        initialValues={{ userId, username }}
        modalProps={{
          destroyOnClose: true,
          centered: true,
        }}
        trigger={
          <Button type="link" icon={<LockTwoTone />}>
            {t('button.update_password')}
          </Button>
        }
        submitter={{
          searchConfig: {
            resetText: t('button.reset'),
            submitText: t('button.update'),
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
            label={t('user.userId')}
            disabled
            hidden
            rules={[{ required: true, type: 'string' }, userIdValidator]}
            placeholder={t('user.userId')}
          />
          <ProFormText
            name="username"
            label={t('user.username')}
            disabled
            hidden
            rules={[{ required: true, type: 'string' }]}
            placeholder={t('user.username')}
          />
          <ProFormText.Password
            name="password"
            label={t('auth.new_password')}
            rules={[{ required: true, min: 8, max: 26 }, passwordRegex]}
            placeholder={t('auth.new_password')}
          />
          <ProFormText.Password
            name="confirm"
            label={t('auth.confirm_password')}
            rules={[
              { required: true, message: t('auth.confirm_password.required') },
              ({ getFieldValue }) => ({
                validator(_: any, value: string) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error(t('auth.confirm_password.mismatch')))
                },
              }),
            ]}
            placeholder={t('auth.confirm_password')}
          />
        </Loading>
      </ModalForm>
    </div >
  )
}

export default UserPasswordUpdate
