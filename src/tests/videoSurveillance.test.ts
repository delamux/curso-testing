import { MotionSensor, SurveillanceController, VideoRecorder } from '../core/surveillanceController';

describe('The Video Controller', () => {
	it('ask the recorder to stop recording when the sensor DETECTS NO motion', () => {
		let called = false;
		const saveCall = () => {
			called = true;
		};

		const sensor = new FakeSensor();
		const recorder = new FakeRecorder();
		// spy of stop recording
		recorder.stopRecording = saveCall;

		const controller = new SurveillanceController(sensor, recorder);

		controller.recordMotion();

		expect(called).toBeTruthy();
	});

	it('ask the recorder to start recording when the sensor DETECTS motion', () => {
		let called = false;
		const saveCall = () => {
			called = true;
		};

		const sensor = new FakeSensor();
		const recorder = new FakeRecorder();
		sensor.isDetectingMotion = () => true;
		// spy of start recording
		recorder.startRecording = saveCall;

		const controller = new SurveillanceController(sensor, recorder);

		controller.recordMotion();

		expect(called).toBeTruthy();
	});
});

export class FakeSensor implements MotionSensor {
	isDetectingMotion(): boolean {
		return false;
	}
}

export class FakeRecorder implements VideoRecorder {
	startRecording(): void {
		console.log('start recording ...');
	}
	stopRecording(): void {
		console.log('stop recording ...');
	}
}
