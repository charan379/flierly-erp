import React from "react";
import { ModalForm, ProFormText } from "@ant-design/pro-components";
import { Button } from "antd";
import useLocale from "@/features/Language/hooks/useLocale";
import userService from "../../service/user.service";

const UserPasswordUpdate = ({ userId }) => {
  const { translate } = useLocale();

  const onFinish = async (values) => {
    const response = await userService.updateUserPassword({
      userId: values.userId,
      password: values.password,
    });

    if (response?.success) return true;
  };

  // Prevent context menu propagation
  const handleContextMenu = (e) => {
    e.stopPropagation(); // Stop the event from propagating
  };

  // password regex pattern validator
  const passwordRegex = ({}) => ({
    validator(_, value) {
      return new Promise((resolve, reject) => {
        if (!value) resolve();
        if (/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).*)$/.test(value)) {
          resolve();
        } else {
          reject("password_is_not_valid");
        }
      });
    },
  });

  // password regex pattern validator
  const userIdValidator = ({}) => ({
    validator(_, value) {
      return new Promise((resolve, reject) => {
        if (!value) resolve();
        if (/\d$/.test(value)) {
          resolve();
        } else {
          reject("password_is_not_valid");
        }
      });
    },
  });

  return (
    <div onContextMenu={handleContextMenu}>
      {" "}
      {/* Prevent right-click context menu */}
      <ModalForm
        title={translate("update_user_password")}
        onFinish={onFinish}
        initialValues={{ userId }}
        modalProps={{
          destroyOnClose: true,
          centered: true,
        }}
        trigger={<Button type="primary" icon={<i className="fas fa-key" />} />}
        submitter={{
          searchConfig: {
            resetText: translate("reset"),
            submitText: translate("update"),
          },
        }}
      >
        {/*  */}
        <ProFormText
          name="userId"
          label={translate("user_id")}
          disabled={true}
          readonly={true}
          hidden={true}
          rules={[{ required: true, type: "string" }, userIdValidator]}
          placeholder={translate("enter_user_id")}
        />
        {/*  */}
        <ProFormText.Password
          name="password"
          label={translate("new_password")}
          rules={[
            {
              required: true,
              min: 8,
              max: 26,
            },
            passwordRegex, // Custom validation function for password regex
          ]}
          placeholder={translate("enter_new_password")}
        />
        {/*  */}
        <ProFormText.Password
          name="confirm"
          label={translate("confirm_password")}
          rules={[
            {
              required: true,
              message: translate("confirm_password_required"),
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(translate("passwords_do_not_match"))
                );
              },
            }),
          ]}
          placeholder={translate("confirm_new_password")}
        />
        {/*  */}
      </ModalForm>
    </div>
  );
};

export default UserPasswordUpdate;
