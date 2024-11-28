import { QueryFieldConfig } from "@/features/QueryBuilder/QueryBuilder";

const privilegeQueryFields: QueryFieldConfig<Privilege>[] = [
    // id
    {
        field: { label: "ID", namePath: "id" },
        conditions: [
            {
                condition: { label: "Equals To", namePath: "equalTo" },
                formField: { input: { type: "Number" } }
            }
        ]
    }
];

export default privilegeQueryFields;