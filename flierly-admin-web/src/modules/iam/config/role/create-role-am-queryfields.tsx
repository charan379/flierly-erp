import { FormFieldConfig } from "@/components/FormField";
import { createBooleanAMQueryField, createNumericAMQueryField, createTextAMQueryField } from "@/utils/create-assignment-manager-queryfield";

const createRoleAMQueryFields = (translate: (value: string) => string): {
    label: string
    name: keyof Role
    formField: FormFieldConfig<Role>
}[] => {

    return [
        createNumericAMQueryField(translate('id'), 'id'),
        createTextAMQueryField(translate('name'), 'name'),
        createTextAMQueryField(translate('code'), 'code'),
        createBooleanAMQueryField(translate('status'), 'isActive', [translate('active'), translate('inactive')]),
    ]
};

export default createRoleAMQueryFields;