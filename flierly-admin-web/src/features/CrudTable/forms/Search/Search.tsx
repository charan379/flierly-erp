import React, { Suspense, useState } from "react";
import { Badge, Button, Tooltip } from "antd";
import { ActionType, PageLoading } from "@ant-design/pro-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import useLocale from "@/features/Locale/hooks/useLocale";
import useCrudTableContext from "../../hooks/useCrudTableContext/useCrudTableContext";
import { QueryFieldConfig } from "@/features/QueryBuilder/QueryBuilder";
import ResizableDrawer from "@/components/ResizableDrawer";

const QueryBuilder = React.lazy(() => import("@/features/QueryBuilder/QueryBuilder"));

// Define types for the component props
interface SearchProps {
    title?: string; // Optional title for the drawer
    render: boolean; // A boolean to control the rendering of the component
    actions: ActionType | undefined;
}

const exampleConfig: QueryFieldConfig<Record<string, any>>[] = [
    {
        field: { label: "Category", namePath: "category" },
        conditions: [
            {
                condition: { label: "Equals To", namePath: "equalTo" },
                formField: {
                    input: {
                        type: "Select",
                        options: [
                            { label: "Electronics", value: "electronics" },
                            { label: "Clothing", value: "clothing" },
                        ],
                    },
                },
            },
            {
                condition: { label: "Not Equals To", namePath: "notEqualTo" },
                formField: {
                    input: {
                        type: "Select",
                        options: [
                            { label: "Electronics", value: "electronics" },
                            { label: "Clothing", value: "clothing" },
                        ],
                    },
                },
            },
        ],
    },
    {
        field: { label: "Price", namePath: "price" },
        conditions: [
            {
                condition: { label: "Greater Than", namePath: "greaterThan" },
                formField: { input: { type: "Number" } },
            },
            {
                condition: { label: "Less Than", namePath: "lessThan" },
                formField: { input: { type: "Number" } },
            },
        ],
    },
    {
        field: { label: "Availability", namePath: "availability" },
        conditions: [
            {
                condition: { label: "Equals", namePath: "equalTo" },
                formField: {
                    input: {
                        type: "Select",
                        options: [
                            { label: "In Stock", value: "in_stock" },
                            { label: "Out of Stock", value: "out_of_stock" },
                        ],
                    },
                },
            },
        ],
    },
];

const Search: React.FC<SearchProps> = ({ title = "filter_data", render, actions }) => {
    if (!render || !actions) return null;

    const { translate } = useLocale();
    const { crudTableContextHandler } = useCrudTableContext();

    const [drawerOpen, setDrawerOpen] = useState(false);

    const onApplyFilters = () => {
        // Simulate filter application
        const filters = crudTableContextHandler.filters.get();
        actions.reload();
        setDrawerOpen(false); // Close the drawer after applying filters
    };

    const onResetFilters = () => {
        crudTableContextHandler.filters.reset();
        actions.reload();
        setDrawerOpen(false); // Close the drawer after reset
    };

    return (
        <ResizableDrawer
            title={title}
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            trigger={
                <Tooltip title={translate("apply_filters")}>
                    <Badge
                        count={Object.keys(crudTableContextHandler.filters.get()).length}
                        overflowCount={99}
                    >
                        <Button
                            type="primary"
                            icon={<FontAwesomeIcon icon={faFilter} />}
                            shape="circle"
                            size="middle"
                            style={{ backgroundColor: "#722ed1" }}
                        />
                    </Badge>
                </Tooltip>
            }
            minWidth={window.innerWidth * 0.3}
            maxWidth={window.innerWidth * 0.9}
            destroyOnClose={false}
            styles={{
                body: { padding: "0px 10px" }
            }}
            footer={
                <div style={{ display: "flex", justifyContent: "flex-end", padding: 16 }}>
                    <Button onClick={onResetFilters} danger>
                        {translate("rest")}
                    </Button>
                    <Button type="primary" onClick={onApplyFilters} style={{ marginLeft: 8 }}>
                        {translate("search")}
                    </Button>
                </div>
            }
        >
            <Suspense name="QueryBuilder-Suspense-Wrap" fallback={<PageLoading />}>
                <QueryBuilder config={exampleConfig} />
            </Suspense>

        </ResizableDrawer>
    );
};

export default Search;
