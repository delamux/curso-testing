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

	it('The startRecording should be called just one time in 3 seconds when is recording', () => {
		const stubSensor = jest.spyOn(sensor, 'isDetectingMotion');
		stubSensor.mockImplementation(() => true);
		const numberOfSeconds = 3;

		const spyRecorder = jest.spyOn(recorder, 'startRecording');
		controller.recordMotion(numberOfSeconds);

		expect(spyRecorder).toHaveBeenCalledTimes(3);
	});
});

export class FakeSensor implements MotionSensor {
	isDetectingMotion(): boolean {
		return false;
	}
}

export class FakeRecorder implements VideoRecorder {
	private state: VideoRecorder;

	constructor() {
		this.state = new IdleState(this);
	}

	setState(state: VideoRecorder): void {
		this.state = state;
	}

	startRecording(): void {
		console.log('start recording ...');
		this.state.startRecording();
	}
	stopRecording(): void {
		console.log('stop recording ...');
		this.state.stopRecording();
	}
}

class IdleState implements VideoRecorder {
	constructor(private recorder: FakeRecorder) {}

	startRecording(): void {
		console.log('Recording started.');
		this.recorder.setState(new RecordingState(this.recorder));
	}

	stopRecording(): void {
		console.log('Cannot stop. Not recording.');
	}
}

class RecordingState implements VideoRecorder {
	constructor(private recorder: FakeRecorder) {}

	startRecording(): void {
		console.log('Already recording.');
	}

	stopRecording(): void {
		console.log('Recording stopped.');
		this.recorder.setState(new IdleState(this.recorder));
	}
}
