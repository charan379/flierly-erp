import activateEntityRecords from "./activate-entity-records";
import getAssociatedEntityRecordsPage from "./associated-entity-records-page";
import createEntityRecord from "./create-entity-record";
import deleteEntityRecords from "./delete-entity-records";
import inActivateEntityRecords from "./inactivate-entity-records";
import isEntityExists from "./is-entity-exists";
import entityRecordsPage from "./enity-records-page";
import readEntityRecord from "./read-entity-record";
import restoreEntityRecords from "./restore-entity-records";
import searchEntityRecords from "./search-entity-records";
import updateEntityRecord from "./update-entity-record";
import updateAssociatedEntityRecords from "./update-entity-associated-records";


const crudService = {
    entityRecordsPage,
    activateEntityRecords,
    deleteEntityRecords,
    inActivateEntityRecords,
    updateEntityRecord,
    createEntityRecord,
    getAssociatedEntityRecordsPage,
    isEntityExists,
    readEntityRecord,
    restoreEntityRecords,
    searchEntityRecords,
    updateAssociatedEntityRecords,
};

export default crudService;