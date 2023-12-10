import { DiseaseFilter } from '../core/diseaseFilter';

describe('Disease filter', () => {
	it('filters cases when several diagnosis filters are applied together', () => {
		const cases = [createCase(1, 'Chupito'), createCase(2, 'Juliana'), createCase(3, 'Dinwell')];

		const searchCriteria1 = 'Vías respiratorias altas';
		const searchCriteria2 = 'Cerebro';
		const diagnoses = [
			createDiagnosis(1, searchCriteria1),
			createDiagnosis(2, searchCriteria2),
			createDiagnosis(3, 'Irrelevant location'),
		];
		const diseaseFilter = DiseaseFilter.create(cases, diagnoses);

		diseaseFilter.addFilter('Cerebro');
		diseaseFilter.addFilter('Vías respiratorias altas');

		const result = diseaseFilter.casesFilteredByLocation;

		expect(result.length).toBe(2);
		const expectedName1 = 'Juliana';
		const expectedName2 = 'Chupito';

		expect(result[0].patientName).toBe(expectedName1);
		expect(result[1].patientName).toBe(expectedName2);
	});
});

function createCase(diagnosisId: number, patientName: string) {
	return {
		id: 0,
		patientName: patientName,
		diagnosisId: diagnosisId,
		diagnosisName: 'Irrelevant diagnosis name',
		publicNotes: [],
		privateNotes: [],
	};
}
function createDiagnosis(id: number, location: string) {
	return {
		id: id,
		name: 'irrelevant name',
		location: location,
		system: 'irrelevant system',
		origin: 'irrelevant origin',
		specie: 'irrelevant specie',
	};
}
