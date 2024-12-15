import React, { Suspense, useRef, useState } from "react";
import { Badge, Button, Tooltip } from "antd";
import { ActionType, PageLoading } from "@ant-design/pro-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import useLocale from "@/features/Locale/hooks/useLocale";
import useCrudModuleContext from "../../../CrudModule/hooks/useCrudModuleContext";
import { QueryBuilderRef, QueryFieldConfig } from "@/features/QueryBuilder/QueryBuilder";
import ResizableDrawer from "@/components/ResizableDrawer";

const QueryBuilder = React.lazy(() => import("@/features/QueryBuilder/QueryBuilder"));

// Define types for the component props
interface SearchProps {
    title?: string; // Optional title for the drawer
    render: boolean; // A boolean to control the rendering of the component
    actions: ActionType | undefined;
    queryFieldsConfig?: QueryFieldConfig<any>[]
}

const Search: React.FC<SearchProps> = ({ title = "filter_data", render, actions, queryFieldsConfig }) => {
    if (!render || !actions || !queryFieldsConfig) return null;

    const { translate } = useLocale();
    const { CrudModuleContextHandler } = useCrudModuleContext();
    const queryBuilderRef = useRef<QueryBuilderRef | null>(null);

    const [drawerOpen, setDrawerOpen] = useState(false);

    const onApplyFilters = () => {
        // Simulate filter application
        if (queryBuilderRef?.current) {
            const query = queryBuilderRef.current.getQuery();
            CrudModuleContextHandler.filters.set(query);
            actions?.setPageInfo?.({ current: 1, total: 0 })
            actions.reload();
            setDrawerOpen(false); // Close the drawer after applying filters
        }
    };

    const onResetFilters = () => {
        if (queryBuilderRef?.current) {
            queryBuilderRef.current.resetQuery();
            CrudModuleContextHandler.filters.reset();
            actions.reload();
            setDrawerOpen(false); // Close the drawer after reset
        }

    };

    return (
        <ResizableDrawer
            title={title}
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            onOpen={() => setDrawerOpen(true)}
            trigger={
                <Tooltip title={translate("apply_filters")}>
                    <Badge
                        count={Object.keys(CrudModuleContextHandler.filters.get()).length}
                        overflowCount={99}
                    >
                        <Button
                            type="primary"
                            icon={<FontAwesomeIcon icon={faFilter} />}
                            shape="circle"
                            size="middle"
                            style={{ backgroundColor: "#722ed1" }}
                            disabled={queryFieldsConfig?.length > 0 ? false : true}
                        />
                    </Badge>
                </Tooltip>
            }
            minWidth={400}
            initialWidth={700}
            maxWidth={window.innerWidth * 0.9}
            destroyOnClose={false}
            styles={{
                body: { padding: "0px 10px" },
            }}
            footer={
                <div style={{ display: "flex", justifyContent: "flex-end", padding: 16 }}>
                    <Button onClick={onResetFilters} danger>
                        {translate("rest")}
                    </Button>
                    <Button type="default" onClick={() => setDrawerOpen(false)} style={{ marginLeft: 8 }}>
                        {translate("cancel")}
                    </Button>
                    <Button type="primary" onClick={onApplyFilters} style={{ marginLeft: 8 }}>
                        {translate("search")}
                    </Button>
                </div>
            }
        >
            <Suspense name="queryBuilder-suspense-wrap" fallback={<PageLoading />}>
                <QueryBuilder config={queryFieldsConfig} ref={queryBuilderRef} />
            </Suspense>
        </ResizableDrawer>
    );
};

export default Search;
