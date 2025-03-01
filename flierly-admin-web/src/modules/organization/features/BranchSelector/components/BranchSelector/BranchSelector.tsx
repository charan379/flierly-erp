import React, { useState } from "react";
import useBranchSelector from "../../hooks/useBranchSelector";
import SelectRemoteOptions from "@/modules/core/features/SelectRemoteOptions";
import fetchEntityRecordsAsOptions, {
    ProcessResultFunction,
} from "@/modules/core/features/SelectRemoteOptions/utils/fetch-entity-rows-as-options";
import crudService from "@/modules/core/features/CrudModule/service/crud-module.service";
import useResponsive from "@/modules/core/hooks/useResponsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import BranchFormFields from "@/modules/organization/form-fields/BranchFormFields";
import pr from "@/modules/auth/utils/get-permission-regex.util";
import { Form } from "antd";
import useLocale from "@/modules/core/features/Locale/hooks/useLocale";

const BranchSelector: React.FC = React.memo(() => {
    const { isMobile } = useResponsive();
    const { selectedBranch, setSelectedBranch, resetSelectedBranch } = useBranchSelector();
    const [selectedBranchId, setSelectedBranchId] = useState<number>(selectedBranch?.id);
    const [branchFormInstance] = Form.useForm<Branch>();
    const { translate: t } = useLocale();

    // Memoize async fetch function
    const asyncOptionsFetcher = (v: string) => {
        let filters;

        const selectedBranchId = selectedBranch?.id;

        // Filters logic based on input value
        if (v === "focus") {
            filters = selectedBranchId
                ? { id: { $in: [selectedBranchId, ...Array.from({ length: 9 }, (_, i) => i + 1)] } }
                : { name: { $iContains: `%` } };
        } else {
            filters =
                v ? { name: { $iContains: `%${v}%` } } : { name: { $iContains: `` } };
        }

        const processBranchesAsOptions: ProcessResultFunction<Branch> = (branches: Branch[]) => [
            { label: t("option.all"), value: 0 },
            ...branches.map((branch) => ({
                label: branch.name,
                value: branch.id,
            }))
        ];

        return fetchEntityRecordsAsOptions<Branch>("branch", filters, 10, processBranchesAsOptions);
    };

    // Memoize onChange function
    const handleChange = async (value: string) => {
        if (value && value !== "all") {
            const response = await crudService.read<Branch>({
                entity: "branch",
                entityRecordId: Number(value),
                loadRelations: [],
                withDeleted: true,
            });

            if (response.success && response.result) {
                setSelectedBranchId(response.result.id)
                setSelectedBranch(response.result);
            }
        } else {
            resetSelectedBranch();
            setSelectedBranchId(0);
        }
    };

    return (
        <SelectRemoteOptions<Branch>
            size="middle"
            style={{
                width: isMobile ? "110px" : "140px",
                float: "right",
                cursor: "pointer",
                direction: "ltr",
            }}
            defaultValue={"all"}
            value={selectedBranchId}
            onChange={handleChange}
            optionCreatorConfig={{
                entity: "branch",
                formFields: <BranchFormFields />,
                formInstance: branchFormInstance,
                title: t("branch.create"),
                permissionCode: pr("branch.create"),
                onCreateSuccess: (branch, appendOptions) => {
                    setSelectedBranch(branch);
                    setSelectedBranchId(branch.id);
                    appendOptions((prev) => [...prev, { label: branch.name, value: branch.id }]);
                },
            }}
            asyncOptionsFetcher={asyncOptionsFetcher}
            suffixIcon={<FontAwesomeIcon icon={faBuilding} size="2x" />}
        />
    );
});

export default React.memo(BranchSelector);
