import { AMQueryBuilderFieldConfig, createBooleanAMQueryField, createNumericAMQueryField, createTextAMQueryField } from "@/modules/core/utils/create-assignment-manager-queryfield";

const createRoleAMQueryBuilderFields = (translate: (value: string) => string): AMQueryBuilderFieldConfig<Role>[] => {
    return [
        // id
        createNumericAMQueryField({
            label: translate('id'),
            name: 'id'
        }),
        // isActive
        createBooleanAMQueryField({
            label: translate('status'),
            name: 'isActive',
            optionLabels: [translate('active'), translate('inactive')]
        }),
        // name
        createTextAMQueryField({
            label: translate('name'),
            name: 'name'
        }),
        // code
        createTextAMQueryField({
            label: translate('code'),
            name: 'code'
        }),
    ]
};

export default createRoleAMQueryBuilderFields;