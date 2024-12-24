import { FormFieldConfig } from "@/components/FormField";
import { accessOptions, activeFieldOptions } from "@/constants/select-options.constant";
import fetchEntityOptions from "@/features/SelectRemoteOptions/utils/fetchEntityOptions";
import queryTransformers from "@/utils/queryTransformers";

const privilegeAssociatedEntityQueryFields: {
    label: string,
    name: keyof Privilege,
    formField: FormFieldConfig<Privilege>
}[] = [
        {
            label: "ID", name: "id", formField: {
                input: { type: "Number" },
                rules: [{ required: true, message: "" }]
            }
        },
        { label: "Name", name: "name", formField: { input: { type: "Text" }, rules: [{ required: true, message: "" }] } },
        { label: "Code", name: "code", formField: { input: { type: "Text" }, rules: [{ required: true, message: "" }] } },
        {
            label: "Entity", name: "entity", formField: {
                input: {
                    type: "SelectRemoteOptions",
                    asyncOptionsFetcher: fetchEntityOptions,
                    debounceTimeout: 300, mode: "multiple"
                },
                rules: [{ type: "array", required: true, message: "" }],
                transform: queryTransformers.inArray
            }
        },
        {
            label: "Access", name: "access", formField: {
                input: { type: "Select", options: accessOptions },
                rules: [{ type: "string", required: true, message: "" }]
            }
        },
        {
            label: "Status", name: "isActive", formField: {
                input: { type: "Select", options: activeFieldOptions },
                rules: [{ type: "string", required: true, message: "" }]
            }
        }
    ];

export default privilegeAssociatedEntityQueryFields;