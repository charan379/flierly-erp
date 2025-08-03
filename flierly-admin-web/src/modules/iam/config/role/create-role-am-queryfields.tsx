import { AMQueryBuilderFieldConfig, createBooleanAMQueryField, createNumericAMQueryField, createTextAMQueryField } from "@/modules/core/utils/create-assignment-manager-queryfield";

const createRoleAMQueryBuilderFields = (t: (value: string) => string): AMQueryBuilderFieldConfig<Role>[] => {
    return [
        // id
        createNumericAMQueryField({
            label: t('record.id'),
            name: 'id'
        }),
        // isActive
        createBooleanAMQueryField({
            label: t('record.is_active'),
            name: 'isActive',
            optionLabels: [t('option.active'), t('option.inactive')]
        }),
        // name
        createTextAMQueryField({
            label: t('record.name'),
            name: 'name'
        }),
        // code
        createTextAMQueryField({
            label: t('record.code'),
            name: 'code'
        }),
    ]
};

export default createRoleAMQueryBuilderFields;