import { ClientSideRowModelModule, CsvExportModule } from 'ag-grid-community';
// import { ExcelExportModule, MasterDetailModule } from 'ag-grid-enterprise';

// Shared modules available to all grids
export const gridSharedModules = [ClientSideRowModelModule, CsvExportModule];

// Grid-specific modules
// export const gridSpecificModules = [ExcelExportModule, MasterDetailModule];
