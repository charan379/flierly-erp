import { AMQueryBuilderFieldConfig, createBooleanAMQueryField, createNumericAMQueryField, createTextAMQueryField } from "@/modules/core/utils/create-assignment-manager-queryfield";

const createRoleAMQueryBuilderFields = (translate: (value: string) => string): AMQueryBuilderFieldConfig<Role>[] => {

    return [
        createNumericAMQueryField({
            label: translate('id'),
            name: 'id'
        }),
        createTextAMQueryField({
            label: translate('name'),
            name: 'name'
        }),
        createTextAMQueryField({
            label: translate('code'),
            name: 'code'
        }),
        createBooleanAMQueryField({
            label: translate('status'),
            name: 'isActive',
            optionLabels: [translate('active'), translate('inactive')]
        }),
    ]
};

export default createRoleAMQueryBuilderFields;