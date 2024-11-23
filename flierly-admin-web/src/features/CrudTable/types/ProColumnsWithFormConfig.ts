import { FormFieldConfig } from "@/components/FormField/FormField";
import { ProColumns } from "@ant-design/pro-components";

export type ProColumnsWithFormConfig<T> = ProColumns<T> & { createFormConfig?: FormFieldConfig, updateFormConfig?: FormFieldConfig, queryFormConfig?: FormFieldConfig }
