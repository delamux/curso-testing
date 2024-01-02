import { MotionSensor, SurveillanceController, VideoRecorder } from '../core/surveillanceController';

describe('The Video Controller', () => {
	let sensor: MotionSensor;
	let recorder: VideoRecorder;
	let controller: SurveillanceController;

	beforeEach(() => {
		sensor = new FakeSensor();
		recorder = new FakeRecorder();
		controller = new SurveillanceController(sensor, recorder);
	});

	it('ask the recorder to stop recording when the sensor DETECTS NO motion', () => {
		const stubSensor = jest.spyOn(sensor, 'isDetectingMotion');
		stubSensor.mockImplementation(() => false);
		const spyRecorder = jest.spyOn(recorder, 'stopRecording');

		controller.recordMotion();

		expect(spyRecorder).toHaveBeenCalled();
	});

	it('ask the recorder to start recording when the sensor DETECTS motion', () => {
		const stubSensor = jest.spyOn(sensor, 'isDetectingMotion');
		stubSensor.mockImplementation(() => true);
		const spyRecorder = jest.spyOn(recorder, 'startRecording');
		controller.recordMotion();

		expect(spyRecorder).toHaveBeenCalled();
	});

	it('ask the recorder to stop recording when the sensor throws an unexpected error', () => {
		const stubSensor = jest.spyOn(sensor, 'isDetectingMotion');
		stubSensor.mockImplementation(() => {
			throw new Error('Unexpected Error');
		});
		const spyRecorder = jest.spyOn(recorder, 'stopRecording');
		controller.recordMotion();

		expect(spyRecorder).toHaveBeenCalled();
	});

	it('Check the sensor status once per second', () => {
		const spySensor = jest.spyOn(sensor, 'isDetectingMotion');
		const numberOfSeconds = 3;

		controller.recordMotion(numberOfSeconds);

		expect(spySensor).toHaveBeenCalledTimes(numberOfSeconds);
	});
});

export class FakeSensor implements MotionSensor {
	isDetectingMotion(): boolean {
		return false;
	}
}

export class FakeRecorder implements VideoRecorder {
	private isRecording = false;
	startRecording(): void {
		if (!this.isRecording) {
			this.isRecording = true;
			console.log('start recording ...');
		}
		console.log('Already recording ...');
	}
	stopRecording(): void {
		this.isRecording = false;
		console.log('stop recording ...');
	}
}
