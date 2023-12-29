export interface MotionSensor {
	isDetectingMotion(): boolean;
}

export interface VideoRecorder {
	startRecording(): void;

	stopRecording(): void;
}

export class SurveillanceController {
	constructor(private sensor: MotionSensor, private recorder: VideoRecorder) {}

	public async recordMotion(seconds = 1) {
		this.range(seconds).forEach(() => {
			this.tryToRecord();
			this.waitOneSecond();
		});
	}

	private waitOneSecond() {
		const aSecond = 1000;
		let startTime = new Date().getTime();
		const endTime = startTime + aSecond;
		while (startTime < endTime) {
			startTime = new Date().getTime();
		}
	}

	private tryToRecord() {
		try {
			this.sensor.isDetectingMotion() ? this.recorder.startRecording() : this.recorder.stopRecording();
		} catch (error) {
			this.recorder.stopRecording();
		}
	}

	private range(length: number) {
		return Array.from({ length }, (_, i) => i);
	}
}
