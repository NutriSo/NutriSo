import ExcelExport from 'export-xlsx';

const mapColumns = (columnsArray) =>
	columnsArray.map((column) => ({
		key: column?.key,
		name: column?.title,
		width: column?.width ? Math.abs(column?.width / 2) : 20
	}));

const mapData = (dataArray) => [{ data: [...dataArray] }];

export const getExcelConfig = ({
	fileName,
	sheetName,
	tableTitle,
	headerGroups,
	columns,
	data
}) => {
	const xlsxColumns = mapColumns(columns);
	const xlsxData = mapData(data);
	return [
		{
			// Table settings
			fileName: fileName ?? 'Documento XLSX',
			workSheets: [
				{
					sheetName: sheetName ?? 'Hoja 1',
					startingRowNumber: 2,
					gapBetweenTwoTables: 2,
					tableSettings: {
						data: {
							importable: true,
							tableTitle: tableTitle ?? null,
							notification: null,
							headerGroups: headerGroups ?? [],
							headerDefinition: xlsxColumns ?? []
						}
					}
				}
			]
		},
		xlsxData,
		xlsxColumns
	];
};

export const exportXlsx = ({ data, columns, fileName }) => {
	const excelExport = new ExcelExport();
	const [CONFIG, xlsxData] = getExcelConfig({ data, columns, fileName });
	excelExport.downloadExcel(CONFIG, xlsxData);
};
