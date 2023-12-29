import { Diagnosis, DiseaseFilter, Case } from '../core/diseaseFilter';

describe('Disease filter', () => {
	it('filters cases when several diagnosis filters are applied together', () => {
		const searchCriteria1 = 'Vías respiratorias altas';
		const searchCriteria2 = 'Cerebro';

		const expectedName1 = 'Juliana';
		const expectedName2 = 'Chupito';

		// const diagnoses = [
		// 	createDiagnosis(1, searchCriteria1),
		// 	createDiagnosis(2, searchCriteria2),
		// 	createDiagnosis(3, 'Irrelevant location'),
		// ];
		//
		// const cases = [createCase(1, 'Chupito'), createCase(2, 'Juliana'), createCase(3, 'Dinwell')];

		const fixtures = casesWithDiagnosis()
			.havingDiagnosisWithLocationAndCaseWithName(searchCriteria1, expectedName1)
			.havingDiagnosisWithLocationAndCaseWithName(searchCriteria2, expectedName2)
			.havingDiagnosisWithLocationAndCaseWithName('Irrelevant-location', 'Irrelevant-name')
			.build();
		const diseaseFilter = DiseaseFilter.create(fixtures.cases(), fixtures.diagnoses());

		diseaseFilter.addFilter(searchCriteria2);
		diseaseFilter.addFilter(searchCriteria1);

		const result = diseaseFilter.casesFilteredByLocation;

		expect(result.length).toBe(2);

		expect(result[0].patientName).toBe(expectedName2);
		expect(result[1].patientName).toBe(expectedName1);
	});
});

function casesWithDiagnosis() {
	let diagnosisId = 0;
	const diagnoses: Diagnosis[] = [];
	const cases: Case[] = [];

	const add = (location: string, patientName: string) => {
		diagnosisId++;
		diagnoses.push(createDiagnosis(diagnosisId, location));
		cases.push(createCase(diagnosisId, patientName));
	};

	const builder = {
		havingDiagnosisWithLocationAndCaseWithName: (location: string, patientName: string) => {
			add(location, patientName);
			return builder;
		},

		build: () => ({
			cases: () => cases,
			diagnoses: () => diagnoses,
		}),
	};

	return builder;
}

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
