import { DurationToMinutesSecondsPipe } from './duration-to-minutes-seconds.pipe';

describe('DurationToMinutesSecondsPipe', () => {
  it('create an instance', () => {
    const pipe = new DurationToMinutesSecondsPipe();
    expect(pipe).toBeTruthy();
  });
});
