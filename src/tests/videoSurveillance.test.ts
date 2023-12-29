import { MotionSensor, SurveillanceController, VideoRecorder } from '../core/surveillanceController';

describe('The Video Controller', () => {
	it('ask the recorder to stop recording when the sensor DETECTS NO motion', () => {
		const sensor = new StubSensorDetectingNoMotion();
		const recorder = new SpyRecorder();
		const controller = new SurveillanceController(sensor, recorder);

		controller.recordMotion();

		expect(recorder.stopCalled).toBeTruthy();
	});

	it('ask the recorder to start recording when the sensor DETECTS motion', () => {
		const sensor = new StubSensorDetectingMotion();
		const recorder = new SpyRecorder();
		sensor.isDetectingMotion = () => true;

		const controller = new SurveillanceController(sensor, recorder);

		controller.recordMotion();

		expect(recorder.startCalled).toBeTruthy();
	});
});

export class StubSensorDetectingNoMotion implements MotionSensor {
	isDetectingMotion(): boolean {
		return false;
	}
}
export class StubSensorDetectingMotion implements MotionSensor {
	isDetectingMotion(): boolean {
		return false;
	}
}

export class SpyRecorder implements VideoRecorder {
	startCalled = false;
	stopCalled = false;
	startRecording(): void {
		console.log('start recording ...');
		this.startCalled = true;
	}
	stopRecording(): void {
		console.log('stop recording ...');
		this.stopCalled = true;
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
